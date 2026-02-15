import type {JSX} from 'preact';

type Falsy = boolean | undefined | null;
export type PreactClassName = string | JSX.HTMLAttributes['className'];

export function classNames(...classes: (PreactClassName | Falsy)[]): string {
  return classes
    .map((className) => {
      if (typeof className === 'object' && typeof className?.value === 'string')
        return className.value;

      return className;
    })
    .filter((className) => typeof className === 'string')
    .join(' ');
}
