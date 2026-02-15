import type {
  ExportOptions,
  LogObject,
  MetricObject,
  OpenTelemetryExporter,
  OpenTelemetryLogsExporter,
  OpenTelemetryMetricsExporter,
} from '@shopify/opentelemetry-mini-client-private';
import {OpenTelemetryClientError} from '@shopify/opentelemetry-mini-client-private';

interface ExporterWithRetriesOptions {
  exporter: OpenTelemetryExporter;
  getKeepalive: () => boolean;
}

export class ExporterWithRetries
  implements OpenTelemetryMetricsExporter, OpenTelemetryLogsExporter
{
  #exporter: OpenTelemetryExporter;
  #getKeepalive: () => boolean;

  constructor({exporter, getKeepalive}: ExporterWithRetriesOptions) {
    this.#exporter = exporter;
    this.#getKeepalive = getKeepalive;
  }

  async exportMetrics(
    metrics: MetricObject[],
    options: ExportOptions,
  ): Promise<void> {
    try {
      await this.#exporter.exportMetrics(metrics, {
        ...options,
        keepalive: this.#getKeepalive(),
      });
    } catch (error) {
      if (error instanceof OpenTelemetryClientError) {
        const retryAfter = error.metadata?.retryAfter;

        if (retryAfter) {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              return this.exportMetrics(metrics, options).finally(resolve);
            }, retryAfter.seconds * 1_000);
          });

          return;
        }
      }

      throw error;
    }
  }

  async exportLogs(logs: LogObject[], options: ExportOptions): Promise<void> {
    try {
      await this.#exporter.exportLogs(logs, {
        ...options,
        keepalive: this.#getKeepalive(),
      });
    } catch (error) {
      if (error instanceof OpenTelemetryClientError) {
        const retryAfter = error.metadata?.retryAfter;

        if (retryAfter) {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              return this.exportLogs(logs, options).finally(resolve);
            }, retryAfter.seconds * 1_000);
          });

          return;
        }
      }

      throw error;
    }
  }
}
