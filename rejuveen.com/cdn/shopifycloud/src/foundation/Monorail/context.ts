import {createContext} from 'preact';

import type {
  TrackModalStateChangeParams,
  TrekkieAttributes,
  TrekkieDefaultAttribute,
} from '~/types/analytics';

import type {
  AnalyticsData,
  ProduceMonorailEventParams,
  TrackPageImpressionParams,
  TrackPostMessageTransmissionParams,
  TrackUserActionParams,
} from './types';

export interface MonorailContextValue {
  analyticsData: Readonly<AnalyticsData>;
  getTrekkieAttributes: (
    ...attributes: TrekkieDefaultAttribute[]
  ) => Promise<TrekkieAttributes>;
  produceMonorailEvent: (params: ProduceMonorailEventParams) => void;
  trackPageImpression: (params: TrackPageImpressionParams) => Promise<void>;
  trackModalStateChange: (params: TrackModalStateChangeParams) => void;
  trackUserAction: (params: TrackUserActionParams) => void;
  trackPostMessageTransmission: (
    params: TrackPostMessageTransmissionParams,
  ) => void;
}

export const DEFAULT_CONTEXT_VALUE: MonorailContextValue = {
  analyticsData: {
    // This is purely to satisfy TypeScript, but we will never have an empty string analyticsTraceId
    analyticsTraceId: '',
  },
  getTrekkieAttributes: async () => Promise.resolve({} as TrekkieAttributes),
  produceMonorailEvent: () => {
    throw new Error(
      'Invalid attempt to call produceMonorailEvent outside of context.',
    );
  },
  trackModalStateChange: () => {
    throw new Error(
      'Invalid attempt to call trackModalStateChange outside of context.',
    );
  },
  trackPageImpression: async () => {
    throw new Error(
      'Invalid attempt to call trackPageImpression outside of context.',
    );
  },
  trackUserAction: () => {
    throw new Error(
      'Invalid attempt to call trackUserAction outside of context.',
    );
  },
  trackPostMessageTransmission: () => {
    throw new Error(
      'Invalid attempt to call trackPostMessageTransmission outside of context.',
    );
  },
};

export const MonorailContext = createContext<MonorailContextValue>(
  DEFAULT_CONTEXT_VALUE,
);
