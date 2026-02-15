import {useEffect} from 'preact/hooks';

import {useI18nContext} from '~/foundation/I18n/hooks';
import {useRootProvider} from '~/foundation/RootProvider/hooks';

export function useElementEventListener(
  listeners: Record<string, (event: any) => Promise<void> | void>,
) {
  const {element} = useRootProvider();

  const {loading} = useI18nContext();
  useEffect(() => {
    if (!element || loading !== false) {
      return;
    }

    Object.entries(listeners).forEach(([event, handler]) => {
      element.addEventListener(event, handler);
    });

    element?._eventListenerReadyPromiseResolve();

    return () => {
      Object.entries(listeners).forEach(([event, handler]) => {
        element?.removeEventListener(event, handler);
      });
    };
  }, [element, loading, listeners]);
}
