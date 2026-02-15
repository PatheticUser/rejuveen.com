import {isoDocument} from './document';
import {isoWindow} from './window';

interface CreateElementLocatorParams<T extends Element> {
  /** Called when an element is added to the DOM */
  onElementFound: (element: T) => void;
  /** Any valid CSS selector */
  selector: string;
}

export function createElementLocator<T extends Element = Element>({
  onElementFound,
  selector,
}: CreateElementLocatorParams<T>): MutationObserver {
  const instances = new WeakSet<T>();

  const observer = new MutationObserver((mutations) => {
    let hasNewNodes = false;

    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        hasNewNodes = true;
        break;
      }
    }

    if (hasNewNodes) {
      locateElements();
    }
  });

  function locateElements() {
    isoDocument.querySelectorAll<T>(selector).forEach((element) => {
      if (!instances.has(element)) {
        onElementFound(element);
        instances.add(element);
      }
    });
  }

  async function locateAndObserveElements() {
    await waitForDOM();
    locateElements();

    observer.observe(isoDocument.body || isoDocument.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  locateAndObserveElements();

  return observer;
}

interface CreateElementVisibilityObserverParams<T extends Element> {
  /** Callback run when the element is visible and opacity, or parent element's opacity, is **not** 1. */
  onFallback: (el: T) => void;
  /** Callback run when the element is visible and opacity, or parent element's opacity, is 1. */
  onVisible: (el: T) => void;
}

export function createElementVisibilityObserver<T extends Element = Element>({
  onFallback,
  onVisible,
}: CreateElementVisibilityObserverParams<T>): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const {isIntersecting, target} = entry;

        if (isIntersecting) {
          if (isVisible(target)) {
            onVisible(target as T);
          } else {
            onFallback(target as T);
          }

          observer.unobserve(target);
        }
      }
    },
    {
      threshold: 1,
    },
  );

  function isVisible(element: Element): boolean {
    let currentElement: Element | null = element;

    while (currentElement) {
      // Intersection observer does not respect opacity
      if (!['', '1'].includes(getComputedStyle(currentElement).opacity)) {
        return false;
      }

      currentElement = currentElement.parentElement;
    }

    return true;
  }

  return observer;
}

function waitForDOM(): Promise<void> {
  if (isoDocument.body) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    isoWindow.addEventListener('DOMContentLoaded', () => resolve());
  });
}
