import {isoWindow} from '~/utils/window';

export const COOKIE_EXCHANGE_PATH_CORE = '/services/login_with_shop/finalize';

export const buildCookieExchangeUrl = (origin: string): string => {
  return `${origin}${COOKIE_EXCHANGE_PATH_CORE}`;
};

export function exchangeLoginCookie(
  storefrontOrigin: string = isoWindow.location.origin,
  errorCallback: (error: any) => void,
): Promise<void | Response> {
  const cookieExchangeUrl = buildCookieExchangeUrl(storefrontOrigin);
  return fetch(cookieExchangeUrl).catch(errorCallback);
}
