import {ConsentTrackingApiProvider} from '@shopify/consent-tracking-api/lib/monorail-consent-provider';
import type {Middleware} from '@shopify/monorail';
import {ConsentTrackingMiddleware} from '@shopify/monorail/lib/middleware/consent-tracking-middleware';
import {
  MonorailRequestError,
  MonorailResponseReadError,
  MonorailUnableToProduceError,
} from '@shopify/monorail/lib/producers/producer-errors';

import type {
  TrekkieAttributes,
  TrekkieDefaultAttribute,
} from '~/types/analytics';
import {isoDocument} from '~/utils/document';
import {isoWindow} from '~/utils/window';

export function getStorefrontAnalytics() {
  const analyticsTag = isoDocument.querySelector(
    'script#shop-js-analytics',
  )?.innerHTML;
  if (analyticsTag) {
    return JSON.parse(analyticsTag);
  } else {
    return {};
  }
}

async function getTrekkiePromise() {
  let timer: NodeJS.Timeout;

  const promise = Promise.race<TrekkieAttributes>([
    new Promise(
      (resolve) =>
        (timer = setTimeout(() => resolve({} as TrekkieAttributes), 10000)),
    ),
    new Promise((resolve) => {
      const readyPromise =
        isoWindow.ShopifyAnalytics?.lib?.ready || isoWindow.analytics?.ready;

      readyPromise?.(() => {
        const trekkie =
          isoWindow.ShopifyAnalytics?.lib?.trekkie ||
          isoWindow.analytics?.trekkie;
        const attributes = trekkie?.defaultAttributes ?? {};
        resolve(attributes);
      });
    }),
  ]);
  return promise.finally(() => clearTimeout(timer));
}

export async function getTrekkieAttributes(
  ...attributes: TrekkieDefaultAttribute[]
) {
  // If ShopifyAnalytics or analytics are not available on the window object,
  // then the element is being rendered somewhere outside the scope of the storefront/arrive-website.
  if (!isoWindow.ShopifyAnalytics && !isoWindow.analytics) {
    return {} as TrekkieAttributes;
  }

  let defaultAttributesPromise: Promise<TrekkieAttributes>;
  const trekkiePromiseIsAvailable = Boolean(isoWindow.trekkie?.ready);

  if (trekkiePromiseIsAvailable) {
    defaultAttributesPromise = getTrekkiePromise();
  } else {
    isoWindow.trekkie = isoWindow.trekkie || [];
    defaultAttributesPromise = new Promise((resolve) => {
      isoWindow.trekkie.push([
        'ready',
        () => {
          resolve(getTrekkiePromise());
        },
      ]);
    });
  }
  const defaultAttributes = await defaultAttributesPromise;

  return attributes.reduce((selectedAttributes, attributeName) => {
    const attributeValue = defaultAttributes[attributeName];
    if (attributeValue !== undefined) {
      selectedAttributes[attributeName] = attributeValue;
    }
    return selectedAttributes;
  }, {} as TrekkieAttributes);
}

export function isUsefulError(error: any) {
  /**
   * Matching against the following cases:
   *
   * - "Cannot read properties of null (reading 'status')"
   * - "Cannot read properties of undefined (reading 'status')"
   */
  const cannotReadPropertyRegex =
    /Cannot read properties of (null|undefined) \(reading 'status'\)/;
  /**
   * Matching against the following cases:
   *
   * - "null is not an object (evaluating 'n.status')"
   * - "undefined is not an object (evaluating 'n.status')"
   *
   * Where n is any a-z character to accept various characters used from the compiled package.
   */
  const notAnObjectRegex =
    /(null|undefined) is not an object \(evaluating '[a-zA-Z]+\.status'\)/;
  /**
   * Matching against the following cases:
   *
   * - "n is null"
   * - "n is undefined"
   *
   * Where n is any a-z character to accept various characters used from the compiled package.
   */
  const notAStatusRegex = /[a-zA-Z]+ is (null|undefined)/;

  /**
   * Monorail should not raise MonorailResponseReadError when the response is a 200.
   */
  const isMonorailResponseReadErrorWith200 =
    error instanceof MonorailResponseReadError && error.status === 200;

  return (
    !(error instanceof MonorailRequestError) &&
    !(error instanceof MonorailUnableToProduceError) &&
    !error?.message?.includes('Invalid agent:') &&
    /**
     * Ignore errors related to .text is not a function
     *
     * Examples can be identified in the following Bugsnag grouping:
     * https://app.bugsnag.com/shopify/shop-js/errors/678e7f98381dfe5fc152a528?filters[error.status]=open&filters[error][]=6610e8c5c777920008ad03ab&filters[error][]=66198ac424022d000863e46e&filters[error][]=678e7f98381dfe5fc152a528&filters[error][]=678e7fbb381dfe5fc152adff
     */
    !error?.message?.includes('.text is not a function') &&
    /**
     * Ignore Monorail errors from bot traffic missing timestamps
     * These errors occur when bots (like bingbot) don't properly support JavaScript timing
     */
    !error?.message?.includes(
      'event_sent_at_ms metadata field cannot be empty',
    ) &&
    !error?.message?.includes(
      'event_created_at_ms metadata field cannot be empty.',
    ) &&
    !error?.message?.match(cannotReadPropertyRegex) &&
    !error?.message?.match(notAnObjectRegex) &&
    !error?.message?.match(notAStatusRegex) &&
    !isMonorailResponseReadErrorWith200
  );
}

export function getMonorailMiddleware(): [Middleware] {
  const consentTrackingApiProvider = new ConsentTrackingApiProvider({
    version: 'v1',
  });
  const consentTrackingApiMiddleware = new ConsentTrackingMiddleware({
    provider: consentTrackingApiProvider,
  });

  return [consentTrackingApiMiddleware];
}
