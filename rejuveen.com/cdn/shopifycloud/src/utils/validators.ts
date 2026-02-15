import {isoWindow} from '~/utils/window';

export function isRootDomainMatch(
  urlString1: string,
  urlString2: string,
): boolean {
  try {
    const host1Tokens = new isoWindow.URL(urlString1).host.split('.').reverse();
    const host2Tokens = new isoWindow.URL(urlString2).host.split('.').reverse();
    for (let i = 0; i < Math.min(host1Tokens.length, host2Tokens.length); i++) {
      if (host1Tokens[i] !== host2Tokens[i]) {
        return false;
      }
    }
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Because TS doesn't infer that the email is a string after the check,
 * we can instead utilize `email is string` to assert that the provided
 * value is both a string and a valid email.
 */
export function isValidEmail(email?: string): email is string {
  if (typeof email !== 'string' || !email) return false;

  return RegExp(/^[^@]+@[^@]+\.[^@]{2,}$/i).test(email);
}

export function validateStorefrontOrigin(storefrontOrigin: string): boolean {
  const url = new isoWindow.URL(storefrontOrigin);
  if (
    (url.hostname === 'localhost' || url.hostname === '127.0.0.1') &&
    url.protocol !== 'https:'
  ) {
    throw new Error('using_localhost');
  }
  if (url.protocol !== 'https:') {
    throw new Error('not_using_https');
  }
  if (url.pathname !== '/') {
    throw new Error('has_path');
  }
  if (url.hash) {
    throw new Error('has_hash');
  }
  if (url.search) {
    throw new Error('has_search');
  }

  return true;
}

/**
 * Validates a redirect URI to prevent XSS attacks by only allowing safe protocols.
 *
 * @param redirectUri - The URL to validate
 * @returns true if the URL is safe to redirect to, false otherwise
 */
export function isValidRedirectUri(redirectUri: string): boolean {
  try {
    const url = new isoWindow.URL(redirectUri);
    if (url.protocol !== 'https:') {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
