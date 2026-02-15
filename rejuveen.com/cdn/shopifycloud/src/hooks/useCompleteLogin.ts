import {useCallback} from 'preact/hooks';

import {useBugsnag} from '~/foundation/Bugsnag/hooks';
import {useOpenTelemetry} from '~/foundation/OpenTelemetry/hooks';
import type {CompletedEvent} from '~/types/event';
import {exchangeLoginCookie} from '~/utils/cookieExchange';
import {isValidRedirectUri} from '~/utils/validators';
import {isoWindow} from '~/utils/window';

export const useCompleteLogin = ({
  storefrontOrigin,
}: {
  storefrontOrigin?: string;
}) => {
  const {notify} = useBugsnag();
  const {log} = useOpenTelemetry();

  return useCallback(
    async ({loggedIn, shouldFinalizeLogin, redirectUri}: CompletedEvent) => {
      if (loggedIn && shouldFinalizeLogin) {
        await exchangeLoginCookie(storefrontOrigin, notify);
        /**
         * TODO: In the future we will publish an event to shop hub to create a user session.
         *
         * Issue: https://github.com/Shopify/shop-identity/issues/2859
         * Pull request: https://github.com/Shopify/shop-js/pull/2363
         */
      }

      if (redirectUri) {
        if (isValidRedirectUri(redirectUri)) {
          isoWindow.location.href = redirectUri;
        } else {
          log({
            body: 'Invalid redirect URI',
            attributes: {
              redirectUri,
              storefrontOrigin,
            },
          });
        }
      }
    },
    [notify, log, storefrontOrigin],
  );
};
