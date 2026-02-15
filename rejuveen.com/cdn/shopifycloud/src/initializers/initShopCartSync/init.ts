import '~/features/ShopCartSync/init';

import {defineInitFunction} from '~/utils/defineInitFunction';

import {initShopCartSync} from './initShopCartSync';

(() => defineInitFunction('initShopCartSync', initShopCartSync))();
