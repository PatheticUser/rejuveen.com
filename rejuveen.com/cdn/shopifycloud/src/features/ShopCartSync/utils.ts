import type {MutableRef} from 'preact/hooks';
import {useCallback} from 'preact/hooks';

import {PAY_AUTH_DOMAIN} from '~/constants/authorize';
import {useBugsnag} from '~/foundation/Bugsnag/hooks';
import {useOpenTelemetry} from '~/foundation/OpenTelemetry/hooks';
import {useEventListener} from '~/hooks/useEventListener';
import {isoWindow} from '~/utils/window';

import type {ShopCartSyncEvent} from './types';

interface ExchangeLoginCookieProps {
  onError: (error: any) => void;
  onResolve: (status: number) => void;
}

function exchangeLoginCookie({
  onError,
  onResolve,
}: ExchangeLoginCookieProps): Promise<void | Response> {
  return fetch(
    `${isoWindow.location.origin}/services/login_with_shop/buyer/finalize`,
  )
    .then((result) => onResolve(result.status))
    .catch((error) => onError(error));
}

function extractError(error: any): Error {
  if (error instanceof Error) {
    return error;
  }

  switch (typeof error) {
    case 'string':
      return new Error(error);
    case 'object':
      if ('message' in error) {
        return new Error(error.message);
      }

      return new Error(JSON.stringify(error));
    default:
      return new Error(String(error));
  }
}

interface UseCartSyncEventListenerProps {
  source: MutableRef<HTMLIFrameElement | null>;
}

export function useShopCartSyncEventListener({
  source,
}: UseCartSyncEventListenerProps) {
  const {notify} = useBugsnag();
  const {recordCounter} = useOpenTelemetry();

  const handler = useCallback(
    (event: ShopCartSyncEvent) => {
      if (event.type === 'completed') {
        recordCounter('shop_js_cart_sync_finalize_fetch');
        exchangeLoginCookie({
          onError: (err) => {
            const error = extractError(err);
            recordCounter('shop_js_cart_sync_finalize_error');
            notify(error);
          },
          onResolve: (status) => {
            recordCounter('shop_js_cart_sync_finalize_resolve', {
              attributes: {
                status,
              },
            });
          },
        });
      }
    },
    [notify, recordCounter],
  );

  const {destroy} = useEventListener({
    allowedOrigins: [PAY_AUTH_DOMAIN, isoWindow.location.origin],
    handler,
    source,
  });

  return {
    destroy,
  };
}
