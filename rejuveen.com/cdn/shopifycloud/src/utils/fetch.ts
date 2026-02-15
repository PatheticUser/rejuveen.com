interface RetryConfig {
  maxRetries?: number;
  retryDelay?: number;
  signal?: AbortSignal;
}

const abortError = new Error('Operation aborted');

/**
 * Calls `fetch` with retry logic. The signature of this function matches the
 * signature of the native `fetch` function so it can be used as a drop-in, except
 * it adds a third optional parameter for the retry config.
 *
 * @param url - The URL to fetch.
 * @param options - Fetch options. Pass empty object if you want to use the default
 * fetch options and override the default retry config.
 * @param retryConfig - The retry config.
 * @returns
 */
export async function fetchWithRetry(
  url: RequestInfo,
  options: RequestInit = {},
  {maxRetries = 3, retryDelay = 1000, signal}: RetryConfig = {},
): Promise<Response> {
  try {
    if (signal?.aborted) return Promise.reject(abortError);
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (signal?.aborted) return Promise.reject(abortError);

    if (maxRetries - 1 > 0) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      if (signal?.aborted) return Promise.reject(abortError);
      return fetchWithRetry(url, options, {
        maxRetries: maxRetries - 1,
        retryDelay,
        signal,
      });
    } else {
      throw error;
    }
  }
}
