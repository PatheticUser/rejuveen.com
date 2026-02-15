import {v4 as uuid} from 'uuid';

import type {Toast, ToastData} from '~/types/toast';
import {getStorageItem, setStorageItem} from '~/utils/storage';
import {isoWindow} from '~/utils/window';

const STORAGE_KEY = 'signInWithShop';

export function getToastFromStorage(key: string): Toast | null {
  try {
    return JSON.parse(
      getStorageItem(`${STORAGE_KEY}:${key}`, {
        session: true,
      }) as string,
    ) as Toast;
  } catch {
    return null;
  }
}

export function buildToast(toast: ToastData): Toast {
  return {
    ...toast,
    id: uuid(),
  };
}

export function setToastInStorage(key: string, value: ToastData | null): void {
  let toast = value;
  if (value) {
    toast = buildToast(value);
  }

  setStorageItem(`${STORAGE_KEY}:${key}`, JSON.stringify(toast), {
    session: true,
  });
}

export function displayToast(value: ToastData): void {
  isoWindow?.Shopify?.SignInWithShop?.renderToast?.(buildToast(value));
}
