import {createContext} from 'preact';

import type {AuthorizeContextValue} from './types';

export const AuthorizeStateContext = createContext<AuthorizeContextValue>({
  dispatch: () => {
    throw new Error(
      'Invalid attempt to call dispatch outside of AuthorizeStateProvider',
    );
  },
  loaded: false,
  modalDismissible: false,
  modalForceHidden: false,
  modalVisible: false,
  uiRendered: false,
});
