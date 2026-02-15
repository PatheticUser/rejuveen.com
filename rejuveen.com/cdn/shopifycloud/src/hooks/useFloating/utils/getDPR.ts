import {isoWindow} from '~/utils/window';

export function getDPR(element: Element): number {
  const win = element.ownerDocument.defaultView || isoWindow;
  return win.devicePixelRatio || 1;
}
