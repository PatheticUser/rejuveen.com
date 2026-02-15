const documentWithDefaults = {
  activeElement: null,
  addEventListener: (() => {}) as Document['addEventListener'],
  appendChild: (() => {}) as Document['appendChild'],
  body: {} as Document['body'],
  cookie: '',
  createElement: (() => {}) as unknown as Document['createElement'],
  createTextNode: (() => {}) as any,
  documentElement: {
    clientHeight: 0,
    clientWidth: 0,
    lang: '',
    style: {
      overflow: '',
      removeProperty: () => {},
    },
  },
  getElementById: (() => null) as Document['getElementById'],
  head: {
    appendChild: (() => {}) as any,
  },
  location: undefined as unknown as Document['location'],
  querySelector: (() => {}) as Document['querySelector'],
  querySelectorAll: () => [],
  removeEventListener: (() => {}) as Document['removeEventListener'],
  styleSheets: {} as Document['styleSheets'],
};

export const isoDocument =
  typeof document === 'undefined' ? documentWithDefaults : document;
