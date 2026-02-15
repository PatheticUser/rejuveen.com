import {isoDocument} from './document';
import {isoNavigator} from './navigator';

export function getCookie(key: string): string | null {
  try {
    const value = new RegExp(`(${key})=([^;]+)`).exec(isoDocument.cookie);
    return value ? value[2] : null;
  } catch (_ignore) {
    return null;
  }
}

/**
 * Checks whether 3rd party cookies are enabled using progressive enhancement.
 *
 * The function uses two detection methods in order of reliability:
 * 1. User-Agent Client Hints API - modern structured browser detection
 * 2. Regex-based user agent parsing - legacy fallback
 *
 * */
export async function hasThirdPartyCookieSupport(): Promise<boolean> {
  // Primary method: User-Agent Client Hints API
  if ('userAgentData' in isoNavigator && isoNavigator.userAgentData) {
    try {
      const brandsData = isoNavigator.userAgentData.brands || [];

      // Check for Chrome or Edge in the brands array
      const isChromeOrEdge = brandsData.some(({brand}) =>
        /chrome|edge|chromium/i.test(brand),
      );

      return isChromeOrEdge;
    } catch {
      // Fall through to regex fallback if Client Hints fail
    }
  }

  // Fallback: Regex-based user agent detection
  if (typeof isoNavigator !== 'undefined' && isoNavigator.userAgent) {
    return userAgentMatchesBrowserWith3pCookieSupport();
  }

  // If all detection methods fail, assume 3p cookies are not supported
  return false;
}

// This function checks if the user agent matches a browser with 3rd party cookie support.
export function userAgentMatchesBrowserWith3pCookieSupport(): boolean {
  const userAgent = isoNavigator.userAgent;

  // Chrome detection (including mobile variants) - from ua-parser-js
  const isChrome = /(chrome|crios)\/([\w.]+)/i.test(userAgent);

  // Edge detection (including mobile variants) - from ua-parser-js
  const isEdge = /(edg|edge|edga|edgios)\/([\w.]+)/i.test(userAgent);

  // Exclude other Chrome-based browsers that might have different policies
  const isOtherChromeBrowser = /(opr|opera|brave|vivaldi)\/([\w.]+)/i.test(
    userAgent,
  );

  // Return true only for genuine Chrome/Edge, not other Chrome-based browsers
  return (isChrome || isEdge) && !isOtherChromeBrowser;
}
