import {OpenTelemetryClient} from '@shopify/opentelemetry-mini-client-private';

import type {
  CounterMetric,
  GaugeMetric,
  HistogramMetric,
  LogAttributes,
} from './types';

export class SendImmediatelyOpenTelemetryClient extends OpenTelemetryClient {
  counter(metric: CounterMetric) {
    super.counter(metric);
    this.exportMetrics();
  }

  gauge(metric: GaugeMetric) {
    super.gauge(metric);
    this.exportMetrics();
  }

  histogram(metric: HistogramMetric) {
    super.histogram(metric);
    this.exportMetrics();
  }

  log(log: LogAttributes) {
    super.log(log);
    this.exportLogs();
  }
}
