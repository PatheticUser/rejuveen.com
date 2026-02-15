import type {MessageEventData} from '~/types/event';

import {isoDocument} from './document';
import {isoWindow} from './window';

// Source: http://www.xtf.dk/2011/08/center-new-popup-window-even-on.html

export type WindoidKey = 'SignInWithShop';

export const cleanEventListeners: {[key in WindoidKey]?: () => void} = {};

export const calculatePopupCenter = (
  windoidWidth: number,
  windoidHeight: number,
) => {
  const dualScreenLeft =
    isoWindow.screenLeft === undefined
      ? isoWindow.screenX
      : isoWindow.screenLeft;
  const dualScreenTop =
    isoWindow.screenTop === undefined ? isoWindow.screenY : isoWindow.screenTop;

  let width;
  if (isoWindow.innerWidth) {
    width = isoWindow.innerWidth;
  } else if (isoDocument.documentElement.clientWidth) {
    width = isoDocument.documentElement.clientWidth;
  } else {
    width = screen.width;
  }

  let height;
  if (isoWindow.innerHeight) {
    height = isoWindow.innerHeight;
  } else if (isoDocument.documentElement.clientHeight) {
    height = isoDocument.documentElement.clientHeight;
  } else {
    height = screen.height;
  }

  const systemZoom = Math.max(1, width / isoWindow.screen.availWidth);
  const left = (width - windoidWidth) / 2 / systemZoom + dualScreenLeft;
  const top = (height - windoidHeight) / 2 / systemZoom + dualScreenTop;

  return {
    height: windoidHeight / systemZoom,
    left,
    top,
    width: windoidWidth / systemZoom,
  };
};

const handlePageClose = (windoidRef: Window | null) => {
  windoidRef?.close();
};

export const openWindoid = (
  authorizeUrl: string,
  messageCallback: (payload: MessageEvent<MessageEventData>) => void,
  windoidKey: WindoidKey = 'SignInWithShop',
): Window | null => {
  const values = calculatePopupCenter(365, 554);

  cleanEventListeners[windoidKey]?.();

  const windoidRef = isoWindow.open(
    authorizeUrl,
    'SignInWithShop',
    `popup,width=${values.width},height=${values.height},top=${values.top},left=${values.left}`,
  );

  const handlePageCloseListener = () => handlePageClose(windoidRef);
  // emit windoid opened event
  messageCallback(new MessageEvent('message', {data: {type: 'windoidopened'}}));

  // emit windoid closed event
  const windoidClosedInterval = setInterval(() => {
    if (windoidRef?.closed) {
      messageCallback(
        new MessageEvent('message', {data: {type: 'windoidclosed'}}),
      );
      clearInterval(windoidClosedInterval);
    }
  }, 200);

  // This is to handle the case when the user closes the window or navigates to a different page
  ['beforeunload', 'unload', 'pagehide'].forEach((eventName) => {
    isoWindow.addEventListener(eventName, handlePageCloseListener, {
      once: true,
    });
  });

  isoWindow.addEventListener('message', messageCallback);

  cleanEventListeners[windoidKey] = () => {
    ['beforeunload', 'unload', 'pagehide'].forEach((eventName) => {
      isoWindow.removeEventListener(eventName, handlePageCloseListener);
    });
    isoWindow.removeEventListener('message', messageCallback);
    clearInterval(windoidClosedInterval);
  };

  return windoidRef;
};
