const FOCUSABLE_SELECTOR = `
  a[href],
  area[href],
  input:not([type="hidden"]):not([disabled]):not([tabindex="-1"]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]):not([tabindex="-1"]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls]`;

export function getActiveElement() {}
export function findFirstFocusableNode(
  element: HTMLElement,
): HTMLElement | null {
  return element.querySelector(FOCUSABLE_SELECTOR);
}

export function findLastFocusableNode(element: HTMLElement) {
  const allFocusable = element.querySelectorAll(FOCUSABLE_SELECTOR);
  return allFocusable[allFocusable.length - 1] as HTMLElement | null;
}
