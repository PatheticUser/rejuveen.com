import type {MutableRef} from 'preact/hooks';
import {useCallback, useEffect, useMemo, useRef, useState} from 'preact/hooks';

import {useAuthorizeState} from '~/foundation/AuthorizeState/hooks';
import {useBugsnag} from '~/foundation/Bugsnag/hooks';
import {useMonorail} from '~/foundation/Monorail/hooks';
import type {LoginWithShopSdkUserAction} from '~/types/analytics';
import type {IframeElement} from '~/types/iframe';
import {isoDocument} from '~/utils/document';
import {AbstractShopJSError} from '~/utils/errors';
import {isValidEmail} from '~/utils/validators';
import {unzoomIos} from '~/utils/zoom';

import {useDebouncedCallback} from './useDebounce';
import {usePasswordManagerDetection} from './usePasswordManagerDetection';

export interface UseEmailListenerProps {
  email?: string;
  emailInputSelector?: string;
  onGetEmailInput?: () => HTMLInputElement | null;
  hideChange?: boolean;
  iframeRef: MutableRef<IframeElement | null>;
  shouldListen?: boolean;
}

/**
 * A reusable email listener hook. This hook listens to either the input event of a provided email input id
 * or a provided email prop and updates the user information in the Authorize iframe when the email provided
 * is a valid email address.
 *
 * Should there be no provided email input id or email, the hook does not do anything.
 */
export function useEmailListener({
  email,
  emailInputSelector,
  onGetEmailInput,
  hideChange,
  iframeRef,
  shouldListen = true,
}: UseEmailListenerProps) {
  const {loaded, modalVisible} = useAuthorizeState();
  const {leaveBreadcrumb, notify} = useBugsnag();
  const {trackUserAction} = useMonorail();
  const {isFilledWithPasswordManager} = usePasswordManagerDetection({
    emailInputSelector,
  });
  const abortController = useRef<AbortController | null>(null);
  const [emailToPost, setEmailToPost] = useState<string | undefined>();
  const [firstNameToPost, setFirstNameToPost] = useState<string | undefined>();
  const [lastNameToPost, setLastNameToPost] = useState<string | undefined>();

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const submittedEmail = useRef<string>('');

  const trackedEvents = useMemo(
    () => new Set<LoginWithShopSdkUserAction>(),
    [],
  );

  const getSubmittedEmail = () => submittedEmail.current;

  const updateUserInformation = useCallback(
    async (providedEmail: string, firstName = '', lastName = '') => {
      const isValid = isValidEmail(providedEmail);

      if (
        isFilledWithPasswordManager &&
        !trackedEvents.has('PASSWORD_MANAGER_AUTOFILL_DETECTED')
      ) {
        trackedEvents.add('PASSWORD_MANAGER_AUTOFILL_DETECTED');

        trackUserAction({
          userAction: 'PASSWORD_MANAGER_AUTOFILL_DETECTED',
        });
      }

      if (isValid && !trackedEvents.has('EMAIL_ENTERED')) {
        trackedEvents.add('EMAIL_ENTERED');

        trackUserAction({
          userAction: 'EMAIL_ENTERED',
        });
      }

      leaveBreadcrumb('email entered', {}, 'state');

      if (!iframeRef.current || modalVisible) {
        return;
      }

      // We should not postMessage if the iframe has not loaded yet, the reason is two fold:
      // 1. The iframe is not ready to receive the message
      // 2. Once the iframe is loaded, the modal could be auto-opened. Submitting an email before auto open could result
      //    in the modal opening to an email input step, instead of the continue step.
      if (!loaded) {
        return;
      }

      const email = isValid ? providedEmail : '';

      if (abortController.current && !abortController.current?.signal.aborted) {
        abortController.current.abort();
      }

      abortController.current = new AbortController();

      try {
        const {open, postMessage, waitForMessage} = iframeRef.current;

        submittedEmail.current = email;

        // Submit the name at the same time as the email

        postMessage({
          firstName,
          lastName,
          type: 'namesubmitted',
        });

        postMessage({
          email,
          hideChange: hideChange === undefined ? email.length > 0 : hideChange,
          type: 'emailsubmitted',
        });

        leaveBreadcrumb(
          'email submitted',
          {email: email ? 'redacted' : ''},
          'state',
        );

        const shopUserMatchedPromise = waitForMessage(
          'shop_user_matched',
          abortController.current.signal,
        );
        const captchaChallengePromise = new Promise((resolve, reject) => {
          const waitForCaptcha = async () => {
            try {
              const response = await waitForMessage(
                'error',
                abortController.current!.signal,
              );

              if (
                response.type === 'error' &&
                response.code === 'captcha_challenge'
              ) {
                resolve(undefined);
              } else {
                await waitForCaptcha();
              }
            } catch (err) {
              reject(err);
            }
          };

          waitForCaptcha();
        });

        await Promise.race([shopUserMatchedPromise, captchaChallengePromise]);

        // Open the Authorize modal.
        open('event_shop_user_matched');

        // Blur the input
        emailInputRef?.current?.blur();
        unzoomIos();

        abortController.current.abort();

        // Clear the emailToPost to ensure that subsequent start requests will still send.
        setEmailToPost(undefined);
      } catch (error) {
        if (
          error instanceof AbstractShopJSError &&
          error.name === 'AbortSignalReceivedError'
        ) {
          return;
        }
        if (error instanceof Error) {
          notify(
            new Error(
              `Error updating user info: ${error.name} - ${error.message}`,
            ),
          );
        }
      }
    },
    [
      hideChange,
      iframeRef,
      isFilledWithPasswordManager,
      leaveBreadcrumb,
      loaded,
      modalVisible,
      notify,
      trackUserAction,
      trackedEvents,
    ],
  );

  const debouncedUpdateUserInfo = useDebouncedCallback(
    (email: string, firstName?: string, lastName?: string) => {
      updateUserInformation(email, firstName, lastName);
    },
    200,
  );

  useEffect(() => {
    if (emailToPost !== undefined && loaded) {
      debouncedUpdateUserInfo(emailToPost, firstNameToPost, lastNameToPost);
    }
  }, [
    debouncedUpdateUserInfo,
    emailToPost,
    loaded,
    firstNameToPost,
    lastNameToPost,
  ]);

  useEffect(() => {
    if (!emailInputSelector && !onGetEmailInput) {
      return;
    }

    const emailInput = emailInputSelector
      ? (isoDocument.querySelector(
          emailInputSelector,
        ) as HTMLInputElement | null)
      : onGetEmailInput?.();

    if (!emailInput) {
      return;
    }

    // Retained for functionality of blurring the input when the modal is opened.
    emailInputRef.current = emailInput;

    const handler = () => {
      if (emailInput) {
        setEmailToPost(emailInput.value);
      }
    };

    // Immediately check the input value if it was provided before this listener is attached.
    if (emailInput?.value) {
      handler();
    }

    if (!shouldListen) {
      emailInput?.removeEventListener('input', handler);
      return;
    }

    emailInput?.addEventListener('input', handler);

    return () => {
      emailInput?.removeEventListener('input', handler);
    };
  }, [emailInputSelector, onGetEmailInput, shouldListen]);

  useEffect(() => {
    if (email !== undefined) {
      setEmailToPost(email);
    }
  }, [email]);

  const updateNames = (firstName = '', lastName = '') => {
    setFirstNameToPost(firstName);
    setLastNameToPost(lastName);
  };

  return {
    getSubmittedEmail,
    updateEmailToPost: (email?: string) => setEmailToPost(email || ''),
    updateNamesToPost: (firstName?: string, lastName?: string) =>
      updateNames(firstName, lastName),
  };
}
