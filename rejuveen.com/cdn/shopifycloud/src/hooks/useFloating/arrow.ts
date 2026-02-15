import type {Middleware, Padding} from '@floating-ui/dom';
import {arrow as arrowCore} from '@floating-ui/dom';
import type {MutableRefObject} from 'preact/compat';

export interface ArrowOptions {
  element: MutableRefObject<Element | null> | Element | null;
  padding?: Padding;
}

export const arrow = (options: ArrowOptions): Middleware => {
  function isRef(value: unknown): value is React.MutableRefObject<unknown> {
    return {}.hasOwnProperty.call(value, 'current');
  }

  return {
    name: 'arrow',
    options,
    fn(state) {
      const {element, padding} = options;

      if (element && isRef(element)) {
        if (element.current != null) {
          return arrowCore({element: element.current, padding}).fn(state);
        }

        return {};
      }

      if (element) {
        return arrowCore({element, padding}).fn(state);
      }

      return {};
    },
  };
};
