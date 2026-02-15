import {isoWindow} from '~/utils/window';

import type {ShopLoginState} from './types';
import type {ShopLoginAction} from './types/action';
import type {PresentationMode, TextVariant} from './types/state';

export const initialState: ShopLoginState = {
  consented: false,
  cookied: false,
  dismissed: false,
  footerPolicy: undefined,
  loaded: false,
  localPresentationMode: 'button',
  loginHint: undefined,
  matched: false,
  mountedTimestamp: undefined,
  parentTheme: 'light',
  processing: false,
  textVariant: undefined,
};

interface CreateInitialStateProps {
  presentationMode?: PresentationMode;
  textVariant?: TextVariant;
}

export function createInitialState({
  presentationMode = 'button',
  textVariant,
}: CreateInitialStateProps): ShopLoginState {
  let loginHint: string | undefined;

  try {
    const currentURL = new URL(isoWindow.location.href);
    loginHint = currentURL.searchParams.get('login_hint') ?? undefined;
  } catch {
    loginHint = undefined;
  }
  return {
    ...initialState,
    localPresentationMode: presentationMode,
    loginHint,
    textVariant,
  };
}

export function shopLoginReducer(
  state: ShopLoginState,
  action: ShopLoginAction,
): ShopLoginState {
  switch (action.type) {
    case 'dismiss':
      return {
        ...state,
        dismissed: true,
        localPresentationMode: 'button',
      };

    case 'iframeLoaded':
      return {
        ...state,
        consented: Boolean(action.payload.consented),
        cookied: action.payload.userFound,
        footerPolicy: action.payload.footerPolicy,
        loaded: true,
        localPresentationMode: action.payload.presentation,
        matched: Boolean(action.payload.loginHintMatch),
      };

    case 'mounted':
      return {
        ...state,
        mountedTimestamp: Date.now(),
      };

    case 'resetState':
      return initialState;

    case 'setLocalPresentationMode':
      return {
        ...state,
        localPresentationMode: action.payload,
      };

    case 'setParentTheme':
      return {
        ...state,
        parentTheme: action.payload.parentTheme,
      };

    case 'setProcessing':
      return {
        ...state,
        processing: action.payload,
      };

    case 'userMatched':
      return {
        ...state,
        cookied: action.payload.userCookieExists,
        localPresentationMode: action.payload.userCookieExists
          ? 'button'
          : 'card',
        loginHint: undefined,
        matched: true,
      };

    default:
      return state;
  }
}
