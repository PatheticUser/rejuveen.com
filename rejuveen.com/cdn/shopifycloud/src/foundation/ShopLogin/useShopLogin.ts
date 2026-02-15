import {useContext} from 'preact/hooks';

import {ShopLoginContext} from './context';
import type {ShopLoginContextValue} from './types';

export function useShopLogin(): ShopLoginContextValue {
  const context = useContext(ShopLoginContext);

  if (!context) {
    throw new Error('useShopLogin must be used within a ShopLoginProvider');
  }

  return context;
}
