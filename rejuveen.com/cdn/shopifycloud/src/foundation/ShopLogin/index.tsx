import type {ComponentChildren} from 'preact';
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'preact/hooks';

import {useMonorail} from '~/foundation/Monorail/hooks';
import {useOpenTelemetry} from '~/foundation/OpenTelemetry/hooks';
import {useDispatchEvent} from '~/hooks/useDispatchEvent';
import type {LoginWithShopSdkUserAction} from '~/types/analytics';

import {ShopLoginContext} from './context';
import {createInitialState, shopLoginReducer} from './reducer';
import type {ShopLoginFlowVersion, ShopLoginState} from './types';
import type {ShopLoginAction, ShopLoginActionInput} from './types/action';
import type {PresentationMode, TextVariant} from './types/state';
import {getLocalPresentationMode} from './utils/getLocalPresentationMode';

interface ProcessSideEffectsProps {
  action: ShopLoginAction;
  previousState: ShopLoginState;
  state: ShopLoginState;
}

export interface ShopLoginProviderProps {
  children: ComponentChildren;
  presentationMode?: PresentationMode;
  flowVersion?: string;
  textVariant?: TextVariant;
}

type TrackPresentationModeChangeReason =
  | 'dismissed'
  | 'email_matched'
  | 'user_not_recognized'
  | 'user_recognized';

export interface TrackPresentationModeChangeProps {
  currentMode: PresentationMode;
  previousMode: PresentationMode;
  reason: TrackPresentationModeChangeReason;
}

const mapToSupportedFlowVersion = (value?: string): ShopLoginFlowVersion => {
  switch (value) {
    case 'account_menu':
    case 'customer_accounts':
    case 'email_capture':
    case 'phone_capture':
      return value;
    case undefined:
      return 'unspecified';
    default:
      return '0';
  }
};

export function ShopLoginProvider({
  children,
  presentationMode = 'button',
  flowVersion: flowVersionProp,
  textVariant,
}: ShopLoginProviderProps) {
  const dispatchEvent = useDispatchEvent();
  const {
    analyticsData,
    produceMonorailEvent,
    trackUserAction: trackUserActionMonorail,
  } = useMonorail();
  const {log, recordCounter, recordHistogram} = useOpenTelemetry();

  const initializedTracked = useRef<boolean>(false);
  const loadedTracked = useRef<boolean>(false);

  const flowVersion = useMemo(
    () => mapToSupportedFlowVersion(flowVersionProp),
    [flowVersionProp],
  );

  const trackPresentationModeChange = useCallback(
    (props: TrackPresentationModeChangeProps) => {
      const {analyticsTraceId, flowVersion} = analyticsData;

      produceMonorailEvent({
        event: {
          schemaId: 'shop_identity_presentation_mode_change/1.0',
          payload: {
            analyticsTraceId,
            flowVersion,
            ...props,
          },
        },
      });
    },
    [analyticsData, produceMonorailEvent],
  );

  const processSideEffects = useCallback(
    ({action, previousState, state}: ProcessSideEffectsProps) => {
      switch (action.type) {
        case 'iframeLoaded': {
          dispatchEvent('loaded', {
            presentation: state.localPresentationMode,
            userFound: action.payload.userFound,
          });

          // Break out of the side effect processing if we've already tracked an event for this action.
          if (loadedTracked.current) {
            break;
          }

          const cardToButton =
            previousState.localPresentationMode === 'card' &&
            state.localPresentationMode === 'button' &&
            !action.payload.userFound;

          const toRecognizedButton =
            previousState.localPresentationMode === 'button' &&
            state.localPresentationMode === 'button' &&
            action.payload.userFound;

          /**
           * We might not've emitted an event for the following:
           * - button->button with userNotFound
           * - card->card with userFound
           *
           * However, we do not intend to track those events as the presentation mode did not change for the user.
           */
          loadedTracked.current = true;

          if (state.mountedTimestamp) {
            recordHistogram('shop_js_iframe_load_duration', {
              attributes: {
                flowVersion,
              },
              value: Date.now() - state.mountedTimestamp,
            });
          } else {
            log({
              body: 'ShopLogin: No mounted timestamp was found when tracking iframe load duration',
              attributes: {
                flowVersion,
              },
            });
          }

          if (cardToButton) {
            trackPresentationModeChange({
              currentMode: 'button',
              previousMode: 'card',
              reason: 'user_not_recognized',
            });
            break;
          }

          if (toRecognizedButton) {
            trackPresentationModeChange({
              currentMode: 'button',
              previousMode: 'button',
              reason: 'user_recognized',
            });
            break;
          }

          break;
        }

        case 'userMatched':
          dispatchEvent('shop_user_matched', {
            presentation: state.localPresentationMode,
          });
          dispatchEvent('lookup_end');
          trackPresentationModeChange({
            currentMode: 'card',
            previousMode: 'button',
            reason: 'email_matched',
          });
          break;

        case 'dismiss': {
          // Guard against invalid dismiss invocations.
          if (
            previousState.localPresentationMode === 'card' &&
            state.localPresentationMode === 'button'
          ) {
            trackPresentationModeChange({
              currentMode: 'button',
              previousMode: 'card',
              reason: 'dismissed',
            });
          }
          break;
        }

        default:
          break;
      }
    },
    [
      dispatchEvent,
      flowVersion,
      log,
      recordHistogram,
      trackPresentationModeChange,
    ],
  );

  const reducerWithDispatchedEventing = useCallback(
    (state: ShopLoginState, action: ShopLoginActionInput): ShopLoginState => {
      // Create a copy of the current state to use as the previous state.
      const previousState = {...state};

      if (action.type === 'iframeLoaded') {
        const presentation = getLocalPresentationMode({
          dismissed: state.dismissed,
          originalPresentationMode: presentationMode,
          userRecognized: action.payload.userFound,
        });

        const enhancedAction: ShopLoginAction = {
          ...action,
          payload: {
            ...action.payload,
            presentation,
          },
        };

        const nextState = shopLoginReducer(state, enhancedAction);
        processSideEffects({
          action: enhancedAction,
          previousState,
          state: nextState,
        });
        return nextState;
      }

      const nextState = shopLoginReducer(state, action);
      processSideEffects({action, previousState, state: nextState});
      return nextState;
    },
    [presentationMode, processSideEffects],
  );

  const [state, dispatch] = useReducer(
    reducerWithDispatchedEventing,
    createInitialState({presentationMode, textVariant}),
  );

  useEffect(() => {
    if (initializedTracked.current) {
      return;
    }

    initializedTracked.current = true;
    recordCounter('shop_js_feature_initialized', {
      attributes: {
        flowVersion,
      },
    });
  }, [flowVersion, recordCounter]);

  const trackUserAction = useCallback(
    (userAction: LoginWithShopSdkUserAction) => {
      trackUserActionMonorail({userAction});
      recordCounter('shop_js_user_action', {
        attributes: {
          action: userAction,
          flowVersion,
        },
      });
    },
    [flowVersion, recordCounter, trackUserActionMonorail],
  );

  const value = useMemo(
    () => ({
      dispatch,
      flowVersion,
      state,
      trackUserAction,
    }),
    [dispatch, flowVersion, state, trackUserAction],
  );

  return (
    <ShopLoginContext.Provider value={value}>
      {children}
    </ShopLoginContext.Provider>
  );
}
