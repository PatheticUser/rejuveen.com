import {isoWindow} from '../window';

export const retryImport = (path: string) => {
  return import(path);
};

export const convertStringToUrl = (url: string) => {
  try {
    return new isoWindow.URL(url);
  } catch {
    return null;
  }
};

/**
 * Some browsers (Safari, WebViews) throw a generic module error without the URL.
 * These errors should be retried using the original importer function.
 */
export const isGenericModuleError = (error: Error) => {
  return error.message.includes('Importing a module script failed');
};

/**
 * Extracts the module URL from a Chrome/Firefox "Failed to fetch" error.
 * Returns null if the URL cannot be parsed.
 */
export const extractUrlFromError = (error: Error) => {
  const url = convertStringToUrl(
    error.message
      .replace('Failed to fetch dynamically imported module: ', '')
      .trim(),
  );
  return url;
};
