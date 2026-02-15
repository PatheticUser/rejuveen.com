import {useEffect, useRef} from 'preact/hooks';

/**
 * Returns the previous value of a prop or state.
 *
 * Could be used for debugging to check why an effect re-ran or to trigger side effects when a value changes.
 * @param value - The value to track
 * @returns The previous value
 * @example
 * ```tsx
 * const prevEmail = usePrevious(email);
 *
 * useEffect(() => {
 *  if (prevEmail !== email) {
 * 	  console.log('Email changed from', prevEmail, 'to', email);
 *   }
 * }, [email]);
 * ```
 */
export function usePrevious<T>(value: T) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
