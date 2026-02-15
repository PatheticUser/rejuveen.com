import type {BuildAuthorizeUrlParams} from '~/types/authorizeUrlParams';
import {booleanQueryParam} from '~/utils/booleanQueryParam';
import {isoWindow} from '~/utils/window';

export function buildUrlSearchParams({
  analyticsContext,
  analyticsTraceId,
  apiKey,
  avoidSdkSession,
  checkoutRedirectUrl,
  checkoutToken,
  checkoutVersion,
  clientId,
  codeChallenge,
  codeChallengeMethod,
  consentChallenge,
  ctx,
  disableSignUp,
  embed,
  error,
  experiments,
  flow,
  flowVersion,
  hideCopy,
  isCompactLayout = true,
  isFullView,
  locale,
  loginHint,
  modalCustomized,
  orderId,
  origin,
  personalizeAds,
  prompt,
  placement,
  popUpFeatures,
  popUpName,
  redirectType,
  redirectUri,
  requireVerification,
  responseMode,
  responseType,
  returnUri,
  scope,
  shopId,
  shopifyEssential,
  state,
  storefrontDomain,
  transactionParams,
  uxMode,
  uxRole,
  hideButtons,
  hideHeader,
  accentColor,
  darkMode,
  returnTo,
}: BuildAuthorizeUrlParams) {
  const signUpEnabled =
    disableSignUp === undefined ? undefined : disableSignUp === false;

  /* eslint-disable @typescript-eslint/naming-convention */
  const baseParams: Record<string, string | undefined> = {
    analytics_context: analyticsContext,
    analytics_trace_id: analyticsTraceId,
    avoid_sdk_session: booleanQueryParam(avoidSdkSession),
    api_key: apiKey,
    checkout_redirect_url: checkoutRedirectUrl,
    checkout_token: checkoutToken,
    checkout_version: checkoutVersion,
    client_id: clientId,
    code_challenge: codeChallenge,
    code_challenge_method: codeChallengeMethod,
    compact_layout: booleanQueryParam(isCompactLayout),
    consent_challenge: booleanQueryParam(consentChallenge),
    ctx,
    'customize-modal': booleanQueryParam(modalCustomized),
    embed,
    ...(error && {error}),
    ...(experiments && {experiments}),
    flow: flow ? flow.toString() : undefined,
    flow_version: flowVersion,
    full_view: booleanQueryParam(isFullView),
    hide_copy: booleanQueryParam(hideCopy),
    locale,
    ...(loginHint && {login_hint: loginHint}),
    order_id: orderId ? orderId.toString() : undefined,
    origin,
    personalize_ads: booleanQueryParam(personalizeAds),
    hide_buttons: booleanQueryParam(hideButtons),
    hide_header: booleanQueryParam(hideHeader),
    accent_color: accentColor,
    dark_mode: booleanQueryParam(darkMode),
    placement,
    pop_up_features: redirectType === 'pop_up' ? popUpFeatures : undefined,
    pop_up_name: redirectType === 'pop_up' ? popUpName : undefined,
    preact: 'true',
    prompt,
    redirect_type: redirectType,
    redirect_uri: redirectUri || isoWindow.location.origin,
    require_verification: booleanQueryParam(requireVerification),
    response_mode: responseMode || 'web_message',
    response_type: responseType || 'id_token',
    ...(returnUri && {return_uri: returnUri}),
    ...(returnTo && {return_to: returnTo}),
    scope: scope || 'openid email profile',
    sign_up_enabled: booleanQueryParam(signUpEnabled),
    shop_id: shopId ? shopId.toString() : undefined,
    shopify_essential: shopifyEssential,
    state,
    storefront_domain: storefrontDomain,
    target_origin: isoWindow.location.origin,
    transaction_params: transactionParams,
    ux_mode: uxMode,
    ux_role: uxRole,
  };
  /* eslint-enable @typescript-eslint/naming-convention */

  Object.keys(baseParams).forEach(
    (key) => baseParams[key] === undefined && delete baseParams[key],
  );

  return new URLSearchParams(baseParams as Record<string, string>);
}

/**
 * Builds URL search parameters specifically for customer_authentication/login endpoint.
 * Separates allowed top-level params from shop_params that get URL encoded.
 */
export function buildCustomerAuthLoginParams(params: BuildAuthorizeUrlParams) {
  const allParams = buildUrlSearchParams(params);

  // Parameters that should remain at the top level for customer_authentication/login
  const allowedTopLevelParams = new Set([
    'return_to',
    'locale',
    'login_hint',
    'login_hint_mode',
    'sso',
  ]);

  const topLevelParams: Record<string, string> = {};
  const shopParams: Record<string, string> = {};

  if (params.prompt === 'none') {
    topLevelParams.sso = 'silent';
  }

  // If the uxMode is windoid, set the display to popup as
  if (params.uxMode === 'windoid') {
    // When there is a returnTo url, the display needs to be set to redirect or
    // the url will be opened in the popup
    topLevelParams.display = params.returnTo ? 'redirect' : 'popup';
  }

  // Separate parameters into top-level and shop_params
  for (const [key, value] of allParams.entries()) {
    if (allowedTopLevelParams.has(key)) {
      topLevelParams[key] = value;
    } else {
      shopParams[key] = value;
    }
  }

  // Add URL encoded shop_params if there are any
  if (Object.keys(shopParams).length > 0) {
    topLevelParams.shop_params = new URLSearchParams(shopParams).toString();
  }

  return new URLSearchParams(topLevelParams);
}
