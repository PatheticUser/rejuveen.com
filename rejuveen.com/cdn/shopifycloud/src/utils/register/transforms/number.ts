import type {Transform} from '../types/transform';

export const number: Transform<number> = {
  stringify: (value) => `${value}`,
  parse: (value) => {
    if (value) {
      return parseFloat(value);
    }
  },
};
