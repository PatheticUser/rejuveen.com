import {createContext} from 'preact';

import type {ShopLoginContextValue} from './types';

export const ShopLoginContext = createContext<ShopLoginContextValue | null>(
  null,
);
