import {useEffect, useMemo, useState} from 'preact/hooks';

import {isoDocument} from '~/utils/document';

interface UsePasswordManagerDetectionProps {
  emailInputSelector?: string;
}

const THRESHOLD_MS = 100;

export function usePasswordManagerDetection({
  emailInputSelector,
}: UsePasswordManagerDetectionProps) {
  const [emailLastUpdated, setEmailLastUpdated] = useState<
    number | undefined
  >();
  const [passwordLastUpdated, setPasswordLastUpdated] = useState<
    number | undefined
  >();

  useEffect(() => {
    function trackInputChange(this: HTMLInputElement, ev: Event) {
      if (this.type === 'password') {
        setPasswordLastUpdated(ev.timeStamp);
      } else {
        setEmailLastUpdated(ev.timeStamp);
      }
    }

    if (emailInputSelector) {
      const emailInput =
        isoDocument.querySelector<HTMLInputElement>(emailInputSelector);

      if (emailInput) {
        emailInput.addEventListener('input', trackInputChange);

        const passwordInput = emailInput.form?.querySelector(
          'input[type="password"]',
        );

        if (passwordInput && passwordInput instanceof HTMLInputElement) {
          passwordInput.addEventListener('input', trackInputChange);
        }

        return () => {
          emailInput.removeEventListener('input', trackInputChange);

          if (passwordInput) {
            passwordInput.removeEventListener('input', trackInputChange);
          }
        };
      }
    }
  }, [emailInputSelector]);

  const isFilledWithPasswordManager = useMemo(() => {
    if (emailLastUpdated === undefined || passwordLastUpdated === undefined) {
      return false;
    }

    return Math.abs(emailLastUpdated - passwordLastUpdated) < THRESHOLD_MS;
  }, [emailLastUpdated, passwordLastUpdated]);

  return {
    isFilledWithPasswordManager,
  };
}
