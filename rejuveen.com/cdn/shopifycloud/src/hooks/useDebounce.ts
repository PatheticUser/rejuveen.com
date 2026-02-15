import {useRef, useCallback} from 'preact/hooks';

/**
 * Debounces a function call. Stores the timer in a ref to preserve it across re-renders.
 */
export function useDebouncedCallback<T extends any[]>(
  callback: (...args: T) => any,
  delay = 200,
  runImmediately = false,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback(
    (...args: T) => {
      const fn = (...args: T) => {
        timerRef.current = undefined;

        if (!runImmediately) {
          callbackRef.current?.(...args);
        }
      };

      const shouldRunImmediately = runImmediately && !timerRef.current;

      if (typeof timerRef.current === 'number') {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(fn, delay, ...args);

      if (shouldRunImmediately) {
        callbackRef.current?.(...args);
      }
    },
    [delay, runImmediately],
  );
}
