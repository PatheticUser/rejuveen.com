import {useEffect, useMemo, useRef} from 'preact/hooks';

import {PAY_AUTH_DOMAIN} from '~/constants/authorize';
import {useOpenTelemetry} from '~/foundation/OpenTelemetry/hooks';
import {useRootProvider} from '~/foundation/RootProvider/hooks';
import {RootProvider} from '~/foundation/RootProvider/RootProvider';
import register from '~/utils/register';
import {isoWindow} from '~/utils/window';

import type {ShopCartSyncProps, ShopCartSyncWebComponentProps} from './types';
import {useShopCartSyncEventListener} from './utils';

export const ShopCartSyncInternal = (_props: ShopCartSyncProps) => {
  const {log} = useOpenTelemetry();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {instanceId} = useRootProvider();
  const {destroy} = useShopCartSyncEventListener({
    source: iframeRef,
  });

  useEffect(() => {
    const iframe = iframeRef.current;
    return () => {
      if (iframe) {
        destroy();
      }
    };
  }, [destroy]);

  const url = useMemo(() => {
    const targetOrigin = isoWindow.location.origin;
    const myShopifyDomain = isoWindow.Shopify?.shop;

    if (!myShopifyDomain) {
      log({
        body: 'Missing Shopify domain from window.Shopify',
        attributes: {
          analyticsTraceId: instanceId,
          domain: isoWindow.location.origin,
        },
      });
      return '';
    }

    const designMode = isoWindow.Shopify?.designMode;

    if (designMode) {
      return '';
    }

    const params = new URLSearchParams({
      /* eslint-disable @typescript-eslint/naming-convention */
      analytics_trace_id: instanceId,
      target_origin: targetOrigin,
      client_handle: myShopifyDomain,
      /* eslint-enable @typescript-eslint/naming-convention */
    } as Record<string, string>);

    const path = '/pay/hop';

    return `${PAY_AUTH_DOMAIN}${path}?${params}`;
  }, [instanceId, log]);

  return (
    // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
    <iframe
      aria-hidden="true"
      className="hidden"
      data-testid="shop-cart-sync-iframe"
      ref={iframeRef}
      src={url}
      tabIndex={-1}
      title="Shop Pay cart sync"
    />
  );
};

register<ShopCartSyncProps>(
  ({element, ...props}) => (
    <RootProvider element={element} featureName="ShopCartSync">
      <ShopCartSyncInternal {...props} />
    </RootProvider>
  ),
  {
    name: 'shop-cart-sync',
    shadow: 'open',
  },
);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace preact.JSX {
    interface IntrinsicElements {
      ['shop-cart-sync']: ShopCartSyncWebComponentProps;
    }
  }
}

export function ShopCartSync(props: ShopCartSyncWebComponentProps) {
  return <shop-cart-sync {...props} />;
}
