import type {ComponentChildren} from 'preact';
import {useEffect, useErrorBoundary} from 'preact/hooks';

import {useBugsnag} from '~/foundation/Bugsnag/hooks';
import {AbstractShopJSError} from '~/utils/errors';

interface ErrorBoundaryProps {
  children: ComponentChildren;
}

export default function ErrorBoundary({children}: ErrorBoundaryProps) {
  const [error] = useErrorBoundary();
  const {notify} = useBugsnag();

  useEffect(() => {
    if (!error) return;

    notify(
      error instanceof Error
        ? error
        : new AbstractShopJSError(error, 'UnhandledError'),
      {context: 'Error in Preact tree'},
    );
  }, [error, notify]);

  return <>{children}</>;
}
