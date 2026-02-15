import {useCallback} from 'preact/hooks';

import {useBugsnag} from '~/foundation/Bugsnag/hooks';
import {useRootProvider} from '~/foundation/RootProvider/hooks';

export function useDispatchEvent() {
  const {notify} = useBugsnag();
  const {element} = useRootProvider();

  const dispatchEvent = useCallback(
    (title: string, data?: any, bubbles = false) => {
      if (!element) {
        notify(
          new Error(
            'dispatchEvent called without a reference to the custom element.',
          ),
        );
        return;
      }

      element.dispatchEvent(
        new CustomEvent(title, {
          bubbles,
          cancelable: false,
          composed: true,
          detail: data,
        }),
      );
    },
    [element, notify],
  );

  return dispatchEvent;
}
