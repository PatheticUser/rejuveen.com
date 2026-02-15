import {CORE_AUTH_DOMAIN, PAY_AUTH_DOMAIN} from '~/constants/authorize';
import type {BuildAuthorizeUrlParams} from '~/types/authorizeUrlParams';
import {
  buildUrlSearchParams,
  buildCustomerAuthLoginParams,
} from '~/utils/buildUrlSearchParams';

export function buildAuthorizeUrl(payload: BuildAuthorizeUrlParams) {
  if (!payload.proxy && payload?.clientId === undefined) {
    return '';
  }

  if (payload.proxy) {
    if (payload.proxyCoreIdp) {
      // Use special shop_params parameter handling for customer_authentication/login
      const params = buildCustomerAuthLoginParams(payload);
      return `${CORE_AUTH_DOMAIN}/customer_authentication/login?${params}`;
    } else {
      const params = buildUrlSearchParams(payload);
      return `${CORE_AUTH_DOMAIN}/services/login_with_shop/authorize?${params}`;
    }
  }

  const params = buildUrlSearchParams(payload);

  if (shouldUseNewUI(payload)) {
    return `${PAY_AUTH_DOMAIN}/oauth/authorize?${params}`;
  }

  /**
   * When `avoidPayAltDomain` is false, we need to route requests through the shop.app/pay/sdk-session endpoint.
   * The session endpoint will allow us to check for the presence of a Pay user session  and hoist it to the
   * "alt" pay.shopify.com/pay/sdk-authorize endpoint.
   */
  const path = payload.avoidPayAltDomain
    ? '/pay/sdk-authorize'
    : '/pay/sdk-session';

  return `${PAY_AUTH_DOMAIN}${path}?${params}`;
}

// For new customer accounts, if uxMode is windoid or redirect,
// deliver the new login UI, except for the PreAuthPrompt
function shouldUseNewUI(payload: BuildAuthorizeUrlParams) {
  return (
    payload.analyticsContext === 'loginWithShopSelfServe' &&
    payload.uxMode !== 'iframe' &&
    payload.uxRole !== 'prompt'
  );
}
