import {useContext} from 'preact/hooks';

import {RootContext} from './context';

export const useRootProvider = () => useContext(RootContext);
