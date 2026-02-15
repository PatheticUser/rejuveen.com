export function debounce<TParams extends any[]>(
  originalFunction: (...params: TParams) => void,
  delay: number,
  runImmediately = false,
): (...args: TParams) => void {
  let timer: NodeJS.Timeout | undefined;

  return function (this: any, ...args: TParams) {
    const callback = () => {
      timer = undefined;

      if (!runImmediately) {
        originalFunction.apply(this, args);
      }
    };

    const shouldRunImmediately = runImmediately && !timer;

    if (typeof timer === 'number') {
      clearTimeout(timer);
    }

    timer = setTimeout(callback, delay);

    if (shouldRunImmediately) {
      originalFunction.apply(this, args);
    }
  };
}
