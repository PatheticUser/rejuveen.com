import {useContext} from 'preact/hooks';

import {BugsnagContext} from './context';

export const useBugsnag = () => {
  const context = useContext(BugsnagContext);

  if (!context) {
    throw new Error(
      'Invalid attempt to use useBugsnag outside of BugsnagProvider.',
    );
  }

  return context;
};
