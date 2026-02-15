import {useCallback, useRef} from 'preact/hooks';

import {useDispatchEvent} from './useDispatchEvent';

export const TIMEOUT_ERROR = {
  code: 'temporarily_unavailable',
  message: 'Shop login is temporarily unavailable',
};

export const LOAD_TIMEOUT_MS = 10000;

export function useLoadTimeout() {
  const dispatchEvent = useDispatchEvent();
  const loadTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLoadTimeout = useCallback(() => {
    if (!loadTimeout.current) {
      return;
    }

    clearTimeout(loadTimeout.current);
    loadTimeout.current = null;
  }, []);

  const initLoadTimeout = useCallback(() => {
    clearLoadTimeout();
    loadTimeout.current = setTimeout(() => {
      dispatchEvent('error', {
        message: TIMEOUT_ERROR.message,
        code: TIMEOUT_ERROR.code,
      });
      // eslint-disable-next-line no-warning-comments
      // TODO: replace this bugsnag notify with a Observe-able event
      // Bugsnag.notify(
      //   new PayTimeoutError(`Pay failed to load within ${LOAD_TIMEOUT_MS}ms.`),
      //   {component: this.#component, src: this.iframe?.getAttribute('src')},
      // );
      clearLoadTimeout();
    }, LOAD_TIMEOUT_MS);
  }, [clearLoadTimeout, dispatchEvent]);

  return {initLoadTimeout, clearLoadTimeout};
}
