import {Bugsnag} from '~/foundation/Bugsnag/Bugsnag';
import {hasThirdPartyCookieSupport} from '~/utils/cookies';
import {createCustomElement} from '~/utils/customElement';
import {isoDocument} from '~/utils/document';

interface InitShopCartSyncOptions {
  experiments?: object;
}

export async function initShopCartSync(initOptions?: InitShopCartSyncOptions) {
  const bugsnag = new Bugsnag('initShopCartSync');

  try {
    let element: HTMLElement | null;
    let shouldAppendCartSync = false;

    const cookieSupport = await hasThirdPartyCookieSupport();

    if (!cookieSupport) {
      return;
    }

    // Finds an existing cart sync element on the page. If one does not exist, we will create one.
    element = isoDocument.querySelector('shop-cart-sync');

    if (!element) {
      element = createCustomElement('shop-cart-sync') as HTMLElement;
      shouldAppendCartSync = true;
    }

    element.setAttribute(
      'experiments',
      JSON.stringify(initOptions?.experiments || {}),
    );

    if (shouldAppendCartSync) {
      isoDocument.body.appendChild(element);
    }
  } catch (error) {
    if (error instanceof Error) {
      bugsnag.notify(error);
    }
  }
}
