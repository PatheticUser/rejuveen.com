import {isoDocument} from './document';

export function getFeatures(): Record<string, any> {
  const featuresTag = isoDocument.querySelector(
    'script#shop-js-features',
  )?.innerHTML;

  if (featuresTag) {
    return JSON.parse(featuresTag);
  } else {
    return {};
  }
}
