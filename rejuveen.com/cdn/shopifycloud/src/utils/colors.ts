import {isoDocument} from './document';
import {isoWindow} from './window';

type RGB = [red: number, green: number, blue: number];

export function calculateContrast(color1: string, color2: string) {
  const color1Rgb = color1.startsWith('#')
    ? hexToRGB(color1)
    : stringToRGB(color1);
  const color2Rgb = color2.startsWith('#')
    ? hexToRGB(color2)
    : stringToRGB(color2);
  return contrast(color1Rgb, color2Rgb);
}

function* climbDomTree(base: ShadowRoot | Element): Generator<Element> {
  let current: ShadowRoot | Element | null = base;

  while (current) {
    if (current.parentElement) {
      current = current.parentElement;
    } else if (current instanceof ShadowRoot) {
      current = current.host;
    } else if (current instanceof Element) {
      const root = current.getRootNode();
      if (root instanceof ShadowRoot) {
        current = root.host;
      } else {
        break;
      }
    } else {
      break;
    }

    yield current;

    if (current === isoDocument.body) {
      break;
    }
  }
}

export function contrast(rgb1: number[], rgb2: number[]): number {
  const lum1 = luminance(rgb1);
  const lum2 = luminance(rgb2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

export function hexToRGB(hex: string): RGB {
  let red = 0;
  let green = 0;
  let blue = 0;

  // 3 digits
  if (hex.length === 4) {
    red = Number(`0x${hex[1]}${hex[1]}`);
    green = Number(`0x${hex[2]}${hex[2]}`);
    blue = Number(`0x${hex[3]}${hex[3]}`);

    // 6 digits
  } else if (hex.length === 7) {
    red = Number(`0x${hex[1]}${hex[2]}`);
    green = Number(`0x${hex[3]}${hex[4]}`);
    blue = Number(`0x${hex[5]}${hex[6]}`);
  }

  return [red, green, blue];
}

export function inferBackgroundColor(
  mainElement: HTMLElement | null | undefined,
) {
  if (!mainElement) {
    return '#ffffff';
  }
  // --color-background is used widely in themes to set the background color
  const backgroundColor = isoWindow
    .getComputedStyle(mainElement)
    .getPropertyValue('--color-background')
    ?.trim();

  if (backgroundColor) {
    return backgroundColor;
  }

  // climb the DOM tree to detect the background color
  for (const element of climbDomTree(mainElement)) {
    const backgroundColor = isoWindow
      .getComputedStyle(element)
      .getPropertyValue('background-color');
    if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
      return backgroundColor;
    }
  }

  // default to white
  return '#ffffff';
}

function luminance(value: number[]): number {
  const luminancePerColor = [value[0], value[1], value[2]].map(
    function (color) {
      const colorRatio = color / 255;

      return colorRatio <= 0.03928
        ? colorRatio / 12.92
        : ((colorRatio + 0.055) / 1.055) ** 2.4;
    },
  );

  return (
    luminancePerColor[0] * 0.2126 +
    luminancePerColor[1] * 0.7152 +
    luminancePerColor[2] * 0.0722
  );
}

export function stringToRGB(rgbString: string): RGB {
  const rgbValues = rgbString.match(/\d+/g) || [];
  const [red = 0, green = 0, blue = 0] = rgbValues.map((value: string) =>
    Number(value),
  );
  return [red, green, blue];
}

// much of the code below is based on https://stackoverflow.com/a/56678483/65387
// and the gist mentioned in the answer https://gist.github.com/mnpenner/70ab4f0836bbee548c71947021f93607

/**
 * Converts sRGB gamma-encoded color channel to linear light intensity.
 * This inverse gamma correction is necessary because sRGB values are
 * encoded nonlinearly to match how displays output light.
 */
function sRGBtoLin(colorChannel: number) {
  // 0.04045 is the sRGB threshold between linear and gamma-encoded segments
  // Values below this use the linear formula to avoid precision issues near black
  if (colorChannel <= 0.04045) {
    // 12.92 is the sRGB standard's linear segment slope
    return colorChannel / 12.92;
  }

  // For values above threshold, apply inverse gamma transformation
  // 0.055 and 1.055 are sRGB standard constants for gamma decoding
  // 2.4 is the approximate gamma exponent used in sRGB
  return ((colorChannel + 0.055) / 1.055) ** 2.4;
}

/**
 * Converts linear RGB to relative luminance (Y) using BT.709 coefficients.
 * These coefficients reflect human eye sensitivity to different wavelengths of light.
 */
function rgbToY(rgb: RGB) {
  return (
    // BT.709 standard coefficients based on human eye sensitivity:
    // Red coefficient - moderate sensitivity
    0.2126 * sRGBtoLin(rgb[0]) +
    // Green coefficient - highest sensitivity (human eyes are most sensitive to green)
    0.7152 * sRGBtoLin(rgb[1]) +
    // Blue coefficient - lowest sensitivity
    0.0722 * sRGBtoLin(rgb[2])
  );
}

/**
 * Converts CIE luminance (Y) to perceptual lightness (L*) using CIELAB color space.
 * This transformation accounts for the nonlinear way humans perceive brightness.
 */
function luminanceToLightness(luminance: number) {
  // 216/24389 ≈ 0.008856 is the CIE standard threshold (ε)
  // Below this threshold, use linear scaling to avoid numerical instability near black
  if (luminance <= 216 / 24389) {
    // 24389/27 ≈ 903.3 is the CIE standard linear coefficient (κ)
    // This scales the linear segment to match the power function at the threshold
    return luminance * (24389 / 27);
  }

  // Above threshold, apply cube root transformation to model human perception
  // The cube root (1/3 exponent) approximates how humans perceive surface brightness
  const luminanceCubeRoot = luminance ** (1 / 3);

  // Convert to CIELAB L* (lightness) using CIE 1976 formula
  // L* = 116 * ∛(Y/Yn) - 16
  // 116 and 16 are CIE standard scaling constants that map the result to 0-100 range
  // where L* = 0 is black, L* = 50 is perceptual middle gray, and L* = 100 is white
  return luminanceCubeRoot * 116 - 16;
}

export function isDarkColor(color: string): boolean {
  let rgb: RGB | undefined;

  if (color.startsWith('#')) {
    rgb = hexToRGB(color);
  }

  if (color.startsWith('rgb(')) {
    rgb = stringToRGB(color);
  }

  if (!rgb) {
    return false;
  }

  const redRatio = rgb[0] / 255;
  const greenRatio = rgb[1] / 255;
  const blueRatio = rgb[2] / 255;

  const lightness = luminanceToLightness(
    rgbToY([redRatio, greenRatio, blueRatio]),
  );

  return lightness < 50;
}
