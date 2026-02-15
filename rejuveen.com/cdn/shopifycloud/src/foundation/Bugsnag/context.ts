import {createContext} from 'preact';

import type {BugsnagContextValue} from './types';

export const BugsnagContext = createContext<BugsnagContextValue>({
  client: undefined,
  leaveBreadcrumb: () => {
    throw new Error(
      'Invalid attempt to call leaveBreadcrumb outside of context.',
    );
  },
  notify: () => {
    throw new Error('Invalid attempt to call notify outside of context.');
  },
});
