import type {Transform} from '../types/transform';

export const string: Transform<string> = {
  stringify: (value) => value,
  parse: (value) => {
    if (value) {
      return value;
    }
  },
};
