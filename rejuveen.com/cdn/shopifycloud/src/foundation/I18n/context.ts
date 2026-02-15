import {createContext} from 'preact';

import type {I18nProviderValue} from './types';

export const SUPPORTED_LOCALES = [
  'en',
  'bg-BG',
  'cs',
  'da',
  'de',
  'el',
  'es',
  'fi',
  'fr',
  'hi',
  'hr-HR',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'lt-LT',
  'ms',
  'nb',
  'nl',
  'pl',
  'pt-BR',
  'pt-PT',
  'ro-RO',
  'ru',
  'sk-SK',
  'sl-SI',
  'sv',
  'th',
  'tr',
  'vi',
  'zh-CN',
  'zh-TW',
] as const;

const DEFAULT_CONTEXT_VALUE: I18nProviderValue = {
  loading: undefined,
  locale: 'en',
  translations: undefined,
};

export const I18nContext = createContext<I18nProviderValue>(
  DEFAULT_CONTEXT_VALUE,
);
