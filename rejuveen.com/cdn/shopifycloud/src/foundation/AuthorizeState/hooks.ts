import {useContext} from 'preact/hooks';

import {AuthorizeStateContext} from './context';

export const useAuthorizeState = () => useContext(AuthorizeStateContext);
