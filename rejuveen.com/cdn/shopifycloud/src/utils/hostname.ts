import {isoWindow} from '~/utils/window';

export const getHostname = (storeUrl?: string) => {
  const domain = storeUrl || isoWindow.location.origin;
  try {
    return new isoWindow.URL(domain).hostname;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[Shop Pay] Store URL (${domain}) is not valid`, error);
    return null;
  }
};
