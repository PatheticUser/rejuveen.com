import type {AuthorizeState, AuthorizeStateReducer} from './types';

export const reducer: AuthorizeStateReducer = (state, action) => {
  switch (action.type) {
    case 'hideModal':
      return {
        ...state,
        modalVisible: false,
      };

    case 'loaded': {
      const autoOpened =
        action.payload.autoOpen &&
        action.payload.sessionDetected &&
        !state.modalVisible;

      return {
        ...state,
        loaded: true,
        ...(autoOpened &&
          !state.modalForceHidden && {
            modalDismissible: false,
            modalVisible: true,
          }),
      };
    }
    case 'modalDismissible':
      return {
        ...state,
        modalDismissible: true,
      };

    case 'reset':
      return {
        ...initialState,
        modalForceHidden: state.modalForceHidden,
      };

    case 'uiRendered':
      return {
        ...state,
        uiRendered: true,
      };

    case 'showModal':
      // Modal can not be shown while force hidden is active, unless the user explicitly requested to show the modal
      if (state.modalForceHidden && action.reason !== 'user_button_clicked') {
        return state;
      }

      return {
        ...state,
        modalDismissible: false,
        // This allows a user to start interacting with the modal again after a direct user interaction.
        // e.g., action.reason === 'user_button_clicked'
        modalForceHidden: false,
        modalVisible: true,
      };

    case 'windoidClosed':
      return {
        ...state,
        modalForceHidden: false,
      };

    case 'windoidOpened':
      // When a windoid opens, we should close the modal, and prevent any other modals from opening
      // until the windoid is closed
      return {
        ...state,
        modalForceHidden: true,
        modalVisible: false,
      };

    default:
      return state;
  }
};

export const initialState: AuthorizeState = {
  loaded: false,
  uiRendered: false,
  modalDismissible: false,
  modalForceHidden: false,
  modalVisible: false,
};
