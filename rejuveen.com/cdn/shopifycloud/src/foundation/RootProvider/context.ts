import {createContext} from 'preact';

import type {RootProviderContext} from './types';

export const RootContext = createContext<RootProviderContext>({
  devMode: false,
  element: null,
  instanceId: '',
});
