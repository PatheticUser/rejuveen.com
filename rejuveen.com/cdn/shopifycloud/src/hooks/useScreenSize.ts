import {isoWindow} from '~/utils/window';

const MOBILE_MAX_WIDTH = 448;

const sizes = {
  mobile: [`max-width: ${MOBILE_MAX_WIDTH}px`],
  tablet: [
    `min-width: ${MOBILE_MAX_WIDTH + 1}px`,
    'max-width: 1000px',
    'max-height: 920px',
  ],
};

export function useScreenSize() {
  const isMobile = sizes.mobile.every(
    (size) => isoWindow.matchMedia(`(${size})`).matches,
  );

  const isTablet =
    !isMobile &&
    sizes.tablet.every((size) => isoWindow.matchMedia(`(${size})`).matches);

  const isDesktop = !isMobile && !isTablet;

  return {isMobile, isTablet, isDesktop};
}
