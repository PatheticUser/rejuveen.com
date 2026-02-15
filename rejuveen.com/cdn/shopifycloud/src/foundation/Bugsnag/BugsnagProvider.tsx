import type {FunctionComponent} from 'preact';
import type {PropsWithChildren} from 'preact/compat';
import {useMemo} from 'preact/hooks';

import {useRootProvider} from '../RootProvider/hooks';

import {Bugsnag} from './Bugsnag';
import {BugsnagContext} from './context';

export const BugsnagProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const {featureName: feature} = useRootProvider();

  const value = useMemo(() => {
    if (!feature) {
      // eslint-disable-next-line no-process-env
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn?.('BugsnagProvider created without a feature name.');
      }
    }

    const {client, leaveBreadcrumb, notify} = new Bugsnag(feature);

    return {
      client,
      leaveBreadcrumb,
      notify,
    };
  }, [feature]);

  return (
    <BugsnagContext.Provider value={value}>{children}</BugsnagContext.Provider>
  );
};
