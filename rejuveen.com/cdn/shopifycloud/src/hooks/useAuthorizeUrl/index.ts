import {useCallback, useMemo} from 'preact/hooks';

import {PAY_AUTH_DOMAIN} from '~/constants/authorize';
import {useI18nContext} from '~/foundation/I18n/hooks';
import {useRootProvider} from '~/foundation/RootProvider/hooks';
import type {BuildAuthorizeUrlParams} from '~/types/authorizeUrlParams';
import type {UxModeType} from '~/types/uxMode';
import {buildAuthorizeUrl} from '~/utils/buildAuthorizeUrl';
import {isoWindow} from '~/utils/window';

export function useAuthorizeUrl({
  analyticsContext,
  avoidPayAltDomain = false,
  avoidSdkSession = false,
  disableSignUp = false,
  experiments,
  proxy,
  clientId,
  flow = 'default',
  flowVersion = 'unspecified',
  error,
  prompt = 'login',
  responseMode,
  storefrontDomain,
  ...props
}: BuildAuthorizeUrlParams) {
  const {locale} = useI18nContext();
  const {instanceId} = useRootProvider();

  const getAuthorizeUrl = useCallback(
    (additionalProps?: Partial<BuildAuthorizeUrlParams>) => {
      if (additionalProps?.uxRole === 'prompt' && !proxy && clientId) {
        return buildPreAuthUrl({
          analyticsTraceId: instanceId,
          clientId,
          flow,
          flowVersion,
          locale,
          storefrontDomain,
        });
      }

      const adjustedResponseMode = adjustResponseMode(
        responseMode,
        props.uxMode,
      );

      const adjustedAnalyticsContext = adjustAnalyticsContext(
        analyticsContext,
        props.uxMode,
      );

      return buildAuthorizeUrl({
        analyticsContext: adjustedAnalyticsContext,
        analyticsTraceId: instanceId,
        avoidPayAltDomain,
        avoidSdkSession,
        clientId,
        disableSignUp,
        error,
        flow,
        flowVersion,
        locale,
        prompt,
        proxy,
        storefrontDomain,
        ...(adjustedResponseMode && {responseMode: adjustedResponseMode}),
        ...props,
        ...additionalProps,
      } as BuildAuthorizeUrlParams);
    },
    [
      analyticsContext,
      avoidPayAltDomain,
      avoidSdkSession,
      clientId,
      disableSignUp,
      error,
      flow,
      flowVersion,
      instanceId,
      locale,
      prompt,
      props,
      proxy,
      responseMode,
      storefrontDomain,
    ],
  );

  const authorizeUrl = useMemo(() => getAuthorizeUrl(), [getAuthorizeUrl]);

  return {
    authorizeUrl,
    getAuthorizeUrl,
  };
}

/**
 * Adjusts the response mode based on the provided UX mode.
 *
 * @param responseMode - The initial response mode, which can be a string or undefined.
 * @param uxMode - The UX mode which determines how the response mode should be adjusted.
 *                 It can be 'iframe', 'redirect', or 'windoid'.
 * @returns The adjusted response mode based on the UX mode. If the UX mode is 'iframe',
 *          it returns the original response mode. If the UX mode is 'redirect', it returns 'query'.
 *          If the UX mode is 'windoid', it returns 'web_message'.
 */
function adjustResponseMode(
  responseMode: string | undefined,
  uxMode?: UxModeType,
) {
  if (uxMode === 'redirect') {
    // In a redirect flow, we need to use query response mode to signal the BE to
    // redirect the user back to the redirect URI with the authorization code
    // rather than emitting a postmessage to the parent window.
    return 'query';
  }

  if (uxMode === 'windoid') {
    return 'web_message';
  }

  return responseMode;
}

/**
 * Adjusts the analytics context based on the provided UX mode.
 * This is a hotfix to map 'loginWithShop' to 'loginWithShopClassicCustomerAccounts'
 * when uxMode is 'redirect' to improve user experience.
 *
 * @param analyticsContext - The initial analytics context.
 * @param uxMode - The UX mode which determines how the analytics context should be adjusted.
 * @returns The adjusted analytics context based on the UX mode.
 */
function adjustAnalyticsContext(
  analyticsContext: string | undefined,
  uxMode?: UxModeType,
) {
  if (uxMode === 'redirect' && analyticsContext === 'loginWithShop') {
    return 'loginWithShopClassicCustomerAccounts';
  }

  return analyticsContext;
}

type BuildPreAuthUrlParams = Pick<
  BuildAuthorizeUrlParams,
  | 'analyticsTraceId'
  | 'clientId'
  | 'flow'
  | 'flowVersion'
  | 'locale'
  | 'storefrontDomain'
>;

export function buildPreAuthUrl({
  analyticsTraceId,
  clientId,
  flow,
  flowVersion,
  locale,
  storefrontDomain,
}: BuildPreAuthUrlParams) {
  /* eslint-disable @typescript-eslint/naming-convention */
  const params = new URLSearchParams({
    analytics_trace_id: analyticsTraceId,
    client_id: clientId,
    flow,
    flow_version: flowVersion,
    locale,
    target_origin: isoWindow.location.origin,
    storefront_domain: storefrontDomain,
  } as Record<string, string>);
  /* eslint-enable @typescript-eslint/naming-convention */

  const path = '/accounts/pre_auth';

  return `${PAY_AUTH_DOMAIN}${path}?${params}`;
}
