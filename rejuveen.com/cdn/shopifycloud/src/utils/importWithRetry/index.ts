import {extractUrlFromError, isGenericModuleError, retryImport} from './utils';

interface RetryConfig {
  maxRetries?: number;
  retryDelay?: number;
  signal?: AbortSignal;
}

/**
 * Retries a dynamic import on network failure.
 *
 * This function handles two types of network errors:
 * 1. Chrome/Firefox: "Failed to fetch dynamically imported module: <url>"
 *    - Extracts URL from error and retries with cache-busting timestamp
 * 2. Safari/WebViews: "Importing a module script failed"
 *    - Retries using the original importer (no URL available for cache busting)
 *
 * Non-network errors are not retried to preserve the original error in Observe.
 * See mermaid diagram in ./docs.md for more details.
 */
export async function importWithRetry<T>(
  importer: () => Promise<T>,
  {maxRetries = 3, retryDelay = 1000, signal}: RetryConfig = {},
): Promise<T | undefined> {
  const executeWithRetry = async (
    retryCount: number,
    retryImportPath?: string,
  ): Promise<T | undefined> => {
    if (signal?.aborted) return undefined;

    try {
      // If we have a retry path (from a previous Chrome/Firefox error), use it
      if (retryImportPath) {
        return await retryImport(retryImportPath);
      }
      return await importer();
    } catch (error) {
      if (!(error instanceof Error) || signal?.aborted) {
        return undefined;
      }

      if (retryCount >= maxRetries - 1) {
        throw error;
      }

      // Try to extract URL from Chrome/Firefox error message
      const url = extractUrlFromError(error);

      if (url) {
        // Chrome/Firefox: retry with cache-busting timestamp
        url.searchParams.set('t', `${Date.now()}`);

        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        if (signal?.aborted) return undefined;

        return executeWithRetry(retryCount + 1, url.href);
      }

      if (isGenericModuleError(error)) {
        // Generic module error (e.g., Safari/WebViews): retry original importer
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        if (signal?.aborted) return undefined;

        return executeWithRetry(retryCount + 1);
      }

      throw error;
    }
  };

  return executeWithRetry(0);
}
