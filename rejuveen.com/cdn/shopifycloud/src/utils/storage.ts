import {isoWindow} from './window';

function storageAvailable(session?: boolean) {
  const type = session ? 'sessionStorage' : 'localStorage';

  try {
    const storage = isoWindow[type];
    const testValue = '__storage_test__';
    storage.setItem(testValue, testValue);
    storage.removeItem(testValue);
    return true;
  } catch (_e) {
    return false;
  }
}

export function setStorageItem(
  name: string,
  value: string,
  {session}: {session?: boolean} = {},
): boolean {
  if (!storageAvailable(session)) {
    return false;
  }

  const storage = session ? 'sessionStorage' : 'localStorage';
  isoWindow[storage].setItem(name, value);
  return true;
}

export function getStorageItem(
  name: string,
  {session}: {session?: boolean} = {},
): string | null {
  if (!storageAvailable(session)) {
    return null;
  }

  const storage = session ? 'sessionStorage' : 'localStorage';
  return isoWindow[storage].getItem(name);
}

export function removeStorageItem(
  name: string,
  {session}: {session?: boolean} = {},
): boolean {
  if (!storageAvailable(session)) {
    return false;
  }

  const storage = session ? 'sessionStorage' : 'localStorage';
  isoWindow[storage].removeItem(name);
  return true;
}
