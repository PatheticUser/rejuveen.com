import {isIosSafari} from './browser';
import {isoDocument} from './document';

export function unzoomIos() {
  if (!isIosSafari()) return;

  const elementId = 'shop-pay-safari-unzoom';

  const existingElement = isoDocument.getElementById(elementId);
  if (existingElement) return existingElement.focus();

  const input = isoDocument.createElement('input');
  input.id = elementId;
  input.style.fontSize = '16px';
  input.style.width = '1px';
  input.style.height = '1px';
  input.style.position = 'fixed';
  input.style.bottom = '-1000px';
  input.style.right = '-1000px';
  input.style.transform = 'translate(1000px, 1000px)';
  input.setAttribute('aria-hidden', 'true');

  isoDocument.body.appendChild(input);
  input.focus({preventScroll: true});
}
