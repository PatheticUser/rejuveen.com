import type {OpenTelemetryClient} from '@shopify/opentelemetry-mini-client-private';
import {createContext} from 'preact';

import type {HistogramOptions, MetricOptions, OpentelCallback} from './types';

export interface OpenTelemetryContextValue {
  recordCounter: OpentelCallback<MetricOptions>;
  recordGauge: OpentelCallback<MetricOptions>;
  recordHistogram: OpentelCallback<HistogramOptions>;
  log: OpenTelemetryClient['log'];
  client: OpenTelemetryClient | undefined;
}

export const DEFAULT_CONTEXT_VALUE: OpenTelemetryContextValue = {
  log: () => {
    throw new Error('Invalid attempt to call log outside of context.');
  },
  recordCounter: () => {
    throw new Error(
      'Invalid attempt to call recordCounter outside of context.',
    );
  },
  recordGauge: () => {
    throw new Error('Invalid attempt to call recordGauge outside of context.');
  },
  recordHistogram: () => {
    throw new Error(
      'Invalid attempt to call recordHistogram outside of context.',
    );
  },
  client: undefined,
};

export const OpenTelemetryContext = createContext<OpenTelemetryContextValue>(
  DEFAULT_CONTEXT_VALUE,
);
