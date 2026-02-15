import type {OpenTelemetryClient} from '@shopify/opentelemetry-mini-client-private';
import type {PropsWithChildren} from 'preact/compat';
import {useCallback, useMemo} from 'preact/hooks';

import {useRootProvider} from '../RootProvider/hooks';

import {OpenTelemetryContext} from './context';
import {SendImmediatelyOpenTelemetryClient} from './SendImmediatelyOpenTelemetryClient';
import type {
  HistogramOptions,
  LogAttributes,
  MetricOptions,
  TelemetryMetricId,
} from './types';
import {createExporter} from './utils';

export function OpenTelemetryProvider({children}: PropsWithChildren) {
  const {featureName: feature} = useRootProvider();
  const client = useMemo<OpenTelemetryClient>(
    () =>
      new SendImmediatelyOpenTelemetryClient({
        exporter: createExporter(),
      }),
    [],
  );

  const log = useCallback(
    ({body, attributes}: LogAttributes) => {
      client.log({
        body,
        attributes: {
          beta: true,
          feature,
          ...attributes,
        },
      });
    },
    [client, feature],
  );

  const recordCounter = useCallback(
    (metricId: TelemetryMetricId, options: MetricOptions = {}) => {
      const {attributes, unit, value = 1} = options;
      client.counter({
        attributes: {
          beta: true,
          feature,
          ...attributes,
        },
        name: metricId,
        value,
        unit,
      });
    },
    [client, feature],
  );

  const recordGauge = useCallback(
    (metricId: TelemetryMetricId, options: MetricOptions = {}) => {
      const {attributes, unit, value = 1} = options;
      client.gauge({
        attributes: {
          beta: true,
          feature,
          ...attributes,
        },
        name: metricId,
        value,
        unit,
      });
    },
    [client, feature],
  );

  const recordHistogram = useCallback(
    (metricId: TelemetryMetricId, options: HistogramOptions = {}) => {
      const {attributes, unit, value = 1, bounds} = options;
      client.histogram({
        attributes: {
          beta: true,
          feature,
          ...attributes,
        },
        bounds,
        name: metricId,
        value,
        unit,
      });
    },
    [client, feature],
  );

  const value = useMemo(
    () => ({
      client,
      log,
      recordCounter,
      recordGauge,
      recordHistogram,
    }),
    [client, log, recordCounter, recordGauge, recordHistogram],
  );

  return (
    <OpenTelemetryContext.Provider value={value}>
      {children}
    </OpenTelemetryContext.Provider>
  );
}
