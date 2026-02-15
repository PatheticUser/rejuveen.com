import {useRef} from 'preact/hooks';

import {ShopIcon} from '~/components/ShopIcon';
import {useShopLogin} from '~/foundation/ShopLogin/useShopLogin';

export function AnimatedShopLogo() {
  const shopLogoContainerRef = useRef<HTMLDivElement>(null);
  const {state} = useShopLogin();

  const iconVisible = state.localPresentationMode === 'button';

  return (
    <div
      className="flex-shrink-0 opacity-100 data-hidden_opacity-0"
      data-testid="animated-shop-logo"
      data-visible={!state.processing}
    >
      <div
        className="group relative h-4 flex-shrink-0 overflow-hidden transition-all duration-300 ease-out motion-reduce_transition-none"
        data-testid="shop-logo-width-aware-container"
        data-visible={iconVisible}
        style={{
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '--shop-logo-container-width': `${shopLogoContainerRef.current?.offsetWidth}px`,
          width: iconVisible ? 'var(--shop-logo-container-width)' : '0px',
        }}
      >
        <div
          className="aspect-branded-button-icon h-4 translate-x-0 opacity-100 transition-all duration-300 group-data-hidden_translate-x-full group-data-hidden_opacity-0 motion-reduce_transition-opacity"
          data-testid="shop-logo-container"
          ref={shopLogoContainerRef}
        >
          <ShopIcon className="h-4 text-purple-primary" />
        </div>
      </div>
    </div>
  );
}
