import type {Transform} from '../types/transform';

export const fn: Transform<(...args: unknown[]) => unknown> = {
  stringify: (value) => {
    if (typeof value === 'function') {
      return value.name.replace('bound ', '');
    }

    if (typeof value === 'string') {
      return value.replace('bound ', '');
    }

    return value;
  },
  parse: (value, _attribute, element) => {
    if (!value) {
      return null;
    }

    const scopedFn = (() => {
      if (typeof window !== 'undefined') {
        return (window as any)[value];
      }

      if (typeof global !== 'undefined') {
        return (global as any)[value];
      }
    })();

    return typeof scopedFn === 'function' ? scopedFn.bind(element) : undefined;
  },
};
