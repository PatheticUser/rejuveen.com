import type {FunctionComponent, PropsWithChildren} from 'preact/compat';
import {useCallback, useMemo, useReducer} from 'preact/compat';

import {useBugsnag} from '~/foundation/Bugsnag/hooks';
import {useMonorail} from '~/foundation/Monorail/hooks';

import {AuthorizeStateContext} from './context';
import {reducer} from './reducer';
import type {AuthorizeStateChange, AuthorizeStateReducer} from './types';

export const AuthorizeStateProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const {leaveBreadcrumb, notify} = useBugsnag();
  const {trackModalStateChange} = useMonorail();
  const processModalStateChange = useCallback(
    ({action, previousState, state}: AuthorizeStateChange) => {
      const visibilityChanged =
        previousState.modalVisible !== state.modalVisible;
      const currentState = state.modalVisible ? 'shown' : 'hidden';

      if (action.type === 'loaded') {
        trackModalStateChange({
          currentState: 'loaded',
          reason: 'event_loaded',
        });
        leaveBreadcrumb('iframe loaded', {}, 'state');
      }

      if (visibilityChanged) {
        switch (action.type) {
          case 'loaded':
            trackModalStateChange({
              currentState,
              reason: 'event_loaded_with_auto_open',
            });
            break;
          case 'windoidOpened':
            trackModalStateChange({
              currentState,
              dismissMethod: 'windoid_continue',
              reason: 'event_windoid_opened',
            });
            break;
          case 'showModal':
            trackModalStateChange({
              currentState,
              reason: action.reason,
            });
            break;
          case 'hideModal':
            trackModalStateChange({
              currentState,
              dismissMethod: action.dismissMethod,
              reason: action.reason,
            });
            break;
          case 'reset':
            trackModalStateChange({
              currentState,
              reason: 'event_restarted',
            });
            break;
          default:
            notify(
              new Error(
                `Could not determine state change reason for action: ${action}`,
              ),
            );
        }
      }
    },
    [leaveBreadcrumb, notify, trackModalStateChange],
  );

  const reducerWithEventing: AuthorizeStateReducer = useCallback(
    (state, action) => {
      const nextState = reducer(state, action);

      processModalStateChange({action, previousState: state, state: nextState});

      return nextState;
    },
    [processModalStateChange],
  );

  const [state, dispatch] = useReducer(reducerWithEventing, {
    loaded: false,
    modalDismissible: false,
    modalForceHidden: false,
    modalVisible: false,
    uiRendered: false,
  });

  const value = useMemo(() => {
    const {
      loaded,
      modalDismissible,
      modalForceHidden,
      modalVisible,
      uiRendered,
    } = state;

    return {
      dispatch,
      loaded,
      modalDismissible,
      modalForceHidden,
      modalVisible,
      uiRendered,
    };
  }, [dispatch, state]);

  return (
    <AuthorizeStateContext.Provider value={value}>
      {children}
    </AuthorizeStateContext.Provider>
  );
};
