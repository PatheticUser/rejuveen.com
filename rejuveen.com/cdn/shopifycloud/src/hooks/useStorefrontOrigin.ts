import {useMemo} from 'preact/hooks';

import {useOpenTelemetry} from '~/foundation/OpenTelemetry/hooks';
import {validateStorefrontOrigin} from '~/utils/validators';
import {isoWindow} from '~/utils/window';

export function useStorefrontOrigin(providedStorefrontOrigin?: string) {
  const {recordCounter} = useOpenTelemetry();

  const storefrontOrigin = useMemo(() => {
    try {
      if (
        providedStorefrontOrigin &&
        validateStorefrontOrigin(providedStorefrontOrigin)
      ) {
        return providedStorefrontOrigin!;
      }
    } catch (error) {
      if (error instanceof Error) {
        recordCounter('shop_js_invalid_storefront_origin', {
          attributes: {error},
        });
      }
    }
    return isoWindow.location.origin;
  }, [providedStorefrontOrigin, recordCounter]);

  return storefrontOrigin;
}
