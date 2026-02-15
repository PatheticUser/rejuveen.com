import {useCallback} from 'preact/hooks';

import {useMonorail} from '~/foundation/Monorail/hooks';
import type {BuildAuthorizeUrlParams} from '~/types/authorizeUrlParams';
import type {IframeElement} from '~/types/iframe';

export const useWindoidPreAuthPromptContinue = ({
  getAuthorizeUrl,
  getEmail,
  iframeRef,
  openWindoid,
}: {
  getAuthorizeUrl: (
    additionalProps?: Partial<BuildAuthorizeUrlParams>,
  ) => string;
  getEmail: () => string;
  iframeRef: React.RefObject<IframeElement>;
  openWindoid: (src: string) => void;
}) => {
  const {trackUserAction} = useMonorail();

  return useCallback(() => {
    trackUserAction({
      userAction: 'SIGN_IN_WITH_SHOP_PROMPT_CONTINUE_CLICK',
    });

    iframeRef?.current?.close({
      dismissMethod: 'windoid_continue',
      reason: 'user_prompt_continue_clicked',
    });
    const email = getEmail();
    const src = getAuthorizeUrl({
      ...(email && {loginHint: email}),
      origin: 'preauth_prompt',
      // By default, prompt is 'login'. This forces the server driven ui to be rendered.
      // If prompt isn't provided, and a user is already authenticated and has consented with the client, we
      // skip the sign in flow entirely.
      prompt: undefined,
    });
    openWindoid(src);
  }, [getAuthorizeUrl, getEmail, iframeRef, openWindoid, trackUserAction]);
};
