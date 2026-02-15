import {isoDocument} from './document';
import {isoWindow} from './window';

// Save the HTMLElement when the module is loaded
// This is necessary because the global HTMLElement can be modified by polyfills
const OriginalHTMLElement = isoWindow.HTMLElement;

const withOriginalHTMLElement = <T>(callback: () => T): T => {
  // Save the modified HTMLElement
  const ModifiedHTMLElement = isoWindow.HTMLElement;

  // Restore the original HTMLElement before running the callback
  isoWindow.HTMLElement = OriginalHTMLElement;
  const result = callback();

  // Restore the modified HTMLElement
  isoWindow.HTMLElement = ModifiedHTMLElement;

  return result;
};

export const createCustomElement = (tag: string) => {
  return withOriginalHTMLElement(() => isoDocument.createElement(tag));
};

export const defineElement = (
  name: string,
  customElement: CustomElementConstructor,
) => {
  withOriginalHTMLElement(() => {
    customElements.define(name, customElement);
  });
};

export const reflectConstruct = (CustomElement: {
  (): any;
  prototype: any;
  observedAttributes: string[];
}) => {
  return withOriginalHTMLElement(() =>
    Reflect.construct(HTMLElement, [], CustomElement),
  );
};
