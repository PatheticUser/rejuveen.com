/**
 * For component/feature-specific monorail events, use the `useMonorail` hook in conjunction with
 * the `produceMonorailEvent` method. Feature-specific monorail eventing **should not** be handled by
 * the root-level provider + hook.
 *
 * If you have 2-3 features using a custom version of the `productMonorailEvent` method, consider
 * creating a custom hook to share that functionality across your features.
 */
import type {FunctionComponent} from 'preact';
import {useEffect, useMemo, useRef} from 'preact/hooks';

import {useRootProvider} from '~/foundation/RootProvider/hooks';
import {useDebouncedCallback} from '~/hooks/useDebounce';

import {useBugsnag} from '../Bugsnag/hooks';
import {useOpenTelemetry} from '../OpenTelemetry/hooks';

import {MonorailContext} from './context';
import {Monorail} from './Monorail';
import type {AnalyticsData, MonorailProviderProps} from './types';
import {getTrekkieAttributes} from './utils';

export const MonorailProvider: FunctionComponent<MonorailProviderProps> = ({
  analyticsContext = 'loginWithShop',
  apiKey,
  checkoutVersion,
  checkoutToken,
  children,
  flow,
  flowVersion,
  shopId = 0,
  shopPermanentDomain,
  source,
  uxMode,
}) => {
  const {notify} = useBugsnag();
  const {recordCounter} = useOpenTelemetry();
  const {devMode, instanceId} = useRootProvider();

  // Keep our initial monorail props in a ref
  const analyticsDataRef = useRef<AnalyticsData>({
    analyticsContext,
    analyticsTraceId: instanceId,
    apiKey,
    checkoutVersion,
    checkoutToken,
    flow,
    flowVersion,
    shopId,
    shopPermanentDomain,
    source,
    uxMode,
  });

  const monorail = useMemo(
    () =>
      new Monorail({
        analyticsData: analyticsDataRef.current,
        devMode,
        notify,
        recordCounter,
      }),
    [devMode, notify, recordCounter],
  );

  // Update our analytics props when they change
  monorail.analyticsData = {
    ...analyticsDataRef.current,
    analyticsTraceId: instanceId,
    analyticsContext,
    apiKey,
    checkoutVersion,
    checkoutToken,
    flow,
    flowVersion,
    shopId,
    shopPermanentDomain,
    source,
    uxMode,
  };

  useEffect(() => {
    return () => {
      monorail.clearTrackedPageImpressions();
    };
  }, [monorail]);

  const debouncedTrackFeatureInitialization = useDebouncedCallback(() => {
    monorail.trackFeatureInitialization();
  }, 100);

  useEffect(() => {
    debouncedTrackFeatureInitialization();
  }, [debouncedTrackFeatureInitialization]);

  const value = useMemo(() => {
    return {
      analyticsData: monorail.analyticsData,
      getTrekkieAttributes,
      produceMonorailEvent: monorail.produceMonorailEvent,
      trackModalStateChange: monorail.trackModalStateChange,
      trackPageImpression: monorail.trackPageImpression,
      trackUserAction: monorail.trackUserAction,
      trackPostMessageTransmission: monorail.trackPostMessageTransmission,
    };
  }, [
    monorail.analyticsData,
    monorail.produceMonorailEvent,
    monorail.trackModalStateChange,
    monorail.trackPageImpression,
    monorail.trackUserAction,
    monorail.trackPostMessageTransmission,
  ]);

  return (
    <MonorailContext.Provider value={value}>
      {children}
    </MonorailContext.Provider>
  );
};
