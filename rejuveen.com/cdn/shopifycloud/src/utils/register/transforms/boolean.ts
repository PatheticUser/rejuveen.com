import type {Transform} from '../types/transform';

export const boolean: Transform<boolean> = {
  stringify: (value) => {
    if (value === '') {
      return 'true';
    }

    if (value) {
      return /^[ty1-9]/i.test(value).toString();
    }

    return 'false';
  },
  parse: (value, attribute, element) => {
    if (value === '') {
      return true;
    }

    if (value) {
      return /^[ty1-9]/i.test(value);
    }

    return element.hasAttribute(attribute) && value === null;
  },
};
