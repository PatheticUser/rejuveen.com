import {v4 as uuidv4} from 'uuid';

import {toSnakeCase} from './casing';

type ErrorName =
  | 'AbortSignalReceivedError'
  | 'AuthorizeError'
  | 'CheckoutUrlParseError'
  | 'CustomElementMethodListenerError'
  | 'DeprecatedAttributeError'
  | 'FetchAuthorizationTokenError'
  | 'FetchCartError'
  | 'FetchFedCMPCallbackError'
  | 'FetchFedCMProviderError'
  | 'FetchTransactionUrlError'
  | 'HandledTranslationFetchError'
  | 'InitCustomerAccountsError'
  | 'MonorailProducerError'
  | 'MissingTranslationError'
  | 'MonorailLogicError'
  | 'ParseTransactionUrlError'
  | 'ShopLoginIframeError'
  | 'TranslationFetchError'
  | 'UnhandledError';

export class AbstractShopJSError extends Error {
  public code: string;

  constructor(
    message: string,
    public name: ErrorName,
    public analyticsTraceId: string = uuidv4(),
  ) {
    super(message);
    const code = toSnakeCase(name);
    this.analyticsTraceId = analyticsTraceId;
    this.code = code;
    this.name = name;
  }
}
