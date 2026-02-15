import type {Toast} from '~/types/toast';
import {defineInitFunction} from '~/utils/defineInitFunction';
import {isoDocument} from '~/utils/document';

const SHOP_TOAST_MANAGER = 'shop-toast-manager';

export function renderToast(props: Toast) {
  let shopToastManager = isoDocument.querySelector(SHOP_TOAST_MANAGER);
  if (!shopToastManager) {
    shopToastManager = isoDocument.createElement(SHOP_TOAST_MANAGER);
    isoDocument.body.appendChild(shopToastManager);
  }

  customElements
    .whenDefined(SHOP_TOAST_MANAGER)
    .then(() => {
      (shopToastManager as any).renderToast(props);
    })
    .catch(() => {});
}

(() => defineInitFunction('renderToast', renderToast))();
