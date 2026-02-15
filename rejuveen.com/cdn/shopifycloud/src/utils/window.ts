const windowWithDefaultValues = {
  addEventListener: (() => {}) as Window['addEventListener'],
  analytics: {},
  btoa: (() => '') as Window['btoa'],
  clearTimeout: (() => {}) as Window['clearTimeout'],
  CSS: {
    supports: (_property: string, _value: string) => false,
  } as CSSStyleDeclaration & {
    supports: (_property: string, _value: string) => boolean;
  },
  customElements: {},
  devicePixelRatio: 1,
  getComputedStyle: ((_el: any) => ({})) as Window['getComputedStyle'],
  HTMLElement: {},
  innerHeight: 0,
  innerWidth: 0,
  localStorage: {
    getItem() {
      throw new Error('localStorage is not available');
    },
    setItem() {
      throw new Error('localStorage is not available');
    },
    removeItem() {
      throw new Error('localStorage is not available');
    },
  },
  sessionStorage: {
    getItem() {
      throw new Error('sessionStorage is not available');
    },
    setItem() {
      throw new Error('sessionStorage is not available');
    },
    removeItem() {
      throw new Error('sessionStorage is not available');
    },
  },
  location: {
    assign: () => {},
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    search: '',
  },
  matchMedia: () => ({
    matches: false,
  }),
  open: (() => {}) as Window['open'],
  PublicKeyCredential: {
    isConditionalMediationAvailable(): Promise<boolean> {
      return Promise.resolve(false);
    },
  },
  removeEventListener: (() => {}) as Window['removeEventListener'],
  ResizeObserver: undefined,
  screen: {
    availWidth: 0,
    height: 0,
    orientation: {
      type: '',
    },
    width: 0,
  },
  screenLeft: 0,
  screenTop: 0,
  screenX: 0,
  screenY: 0,
  scrollTo: (() => {}) as Window['scrollTo'],
  setTimeout: (() => 0) as Window['setTimeout'],
  Shopify: {},
  ShopifyAnalytics: {},
  top: {
    addEventListener: (() => {}) as Window['addEventListener'],
    removeEventListener: (() => {}) as Window['removeEventListener'],
  },
  trekkie: {},
  URL,
  visualViewport: {} as Window['visualViewport'],
};

export const isoWindow =
  typeof window === 'undefined' ? windowWithDefaultValues : window;
