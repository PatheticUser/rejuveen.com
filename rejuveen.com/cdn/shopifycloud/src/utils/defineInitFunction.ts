import {isoWindow} from '~/utils/window';

export function defineInitFunction(
  signInWithShopKey: string,
  initFunction: (...args: any[]) => any,
) {
  const customElementsSupported = Boolean(isoWindow.customElements);

  if (!customElementsSupported) {
    return;
  }

  if (!isoWindow.Shopify) {
    isoWindow.Shopify = {};
  }

  if (!isoWindow.Shopify.SignInWithShop) {
    isoWindow.Shopify.SignInWithShop = {};
  }

  isoWindow.Shopify.SignInWithShop[signInWithShopKey] = initFunction;
}
