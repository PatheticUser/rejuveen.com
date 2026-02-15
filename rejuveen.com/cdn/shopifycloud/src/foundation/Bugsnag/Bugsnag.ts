import {BugsnagLight} from '@shopify/bugsnag-light-core';
import type {
  BreadcrumbMetadata,
  BreadcrumbType,
  BugsnagEvent,
  BugsnagException,
  BugsnagLightParams,
  Metadata,
  NotifyOptions,
  ReleaseStage,
} from '@shopify/bugsnag-light-core';

import {isoDocument} from '~/utils/document';
import {isoNavigator} from '~/utils/navigator';
import {isoWindow} from '~/utils/window';

import config from '../../config';
import {SendImmediatelyOpenTelemetryClient} from '../OpenTelemetry/SendImmediatelyOpenTelemetryClient';
import {createExporter} from '../OpenTelemetry/utils';

export const MONORAIL_NETWORK_ERROR_BACKPRESSURE_MARKER =
  'Backpressure applied';
export const MONORAIL_NETWORK_ERROR_MARKER =
  'A network failure may have prevented the request from completing';

export const UNACTIONABLE_NETWORK_ERRORS = [
  // Safari
  'Load failed',
  // Chrome
  'Failed to fetch',
  // Firefox
  'when attempting to fetch resource',
];

export const DYNAMIC_IMPORT_ERRORS = [
  // Chrome/Firefox
  'Failed to fetch dynamically imported module',
  // Safari/WebViews
  'Importing a module script failed',
];

export const SANDBOXED_COOKIE_ERROR_MARKER =
  "Failed to read the 'cookie' property from 'Document'";
export const SANDBOXED_MESSAGE_MARKER = 'sandboxed';
export const CROSS_ORIGIN_FRAME_ERROR_MARKER = 'Blocked a frame with origin';
export const CROSS_ORIGIN_FRAME_ACCESS_MARKER =
  'from accessing a cross-origin frame';

const SHOP_PAY_PAYMENT_REQUEST_FEATURE_ALLOWLIST = new Set([
  'ShopPayPaymentRequest',
  'ShopPayPaymentRequestButton',
  'ShopPayPaymentRequestLogin',
]);

/**
 * List of broad error classes that are a result of monkey-patching, outdated browsers, etc.
 * Do not include expected runtime errors, but do include errors that would have been caught by CI.
 */
export const UNACTIONABLE_ERROR_CLASSES = [
  'NotFoundError',
  'NotSupportedError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
];

// eslint-disable-next-line no-process-env
const isDevelopment = process.env.NODE_ENV === 'development';

type NetworkErrorType = 'NetworkError' | 'DynamicImportError';

interface CreateBugsnagParamsProps {
  metadata: Metadata;
  onNetworkError: (errorType?: NetworkErrorType) => void;
}

/**
 * Copied from https://github.com/Shopify/pos-next-react-native/pull/34603/files#diff-b88d5908387525f48fcb3c152c2d3b91f9075d0f448f9b649a1b64cb09c225aaR169
 * The emitted error is at https://github.com/Shopify/monorail/blob/09fc3e83557e6517c7ec97d1ee1e0e37b3c79ada/lang/typescript/src/producers/producer-errors.ts#L41
 */
const _isMonorailNetworkError = (errorMessage: string | undefined): boolean => {
  return Boolean(
    errorMessage?.includes(MONORAIL_NETWORK_ERROR_MARKER) ||
      errorMessage?.includes(MONORAIL_NETWORK_ERROR_BACKPRESSURE_MARKER),
  );
};

const isIgnorable = (
  exception: BugsnagException,
  feature?: string,
): boolean => {
  const {errorClass, message} = exception;

  // This is a non-actionable error that happens when trying to read cookies from a sandboxed
  // webview environment (eg Instagram) and should not be reported to Bugsnag.
  const isSandboxedCookieError =
    errorClass === 'SecurityError' &&
    message?.includes(SANDBOXED_COOKIE_ERROR_MARKER) &&
    message?.includes(SANDBOXED_MESSAGE_MARKER);
  const isCrossOriginFrameAccessError =
    errorClass === 'SecurityError' &&
    message?.includes(CROSS_ORIGIN_FRAME_ERROR_MARKER) &&
    message?.includes(CROSS_ORIGIN_FRAME_ACCESS_MARKER);
  const isShopPayPaymentRequestFeature =
    typeof feature === 'string' &&
    SHOP_PAY_PAYMENT_REQUEST_FEATURE_ALLOWLIST.has(feature);

  // Ignore errors not related to the SDK
  const isInProject = exception.stacktrace.some((st) => st.inProject);

  return Boolean(
    !isInProject ||
      isSandboxedCookieError ||
      // We don't control the consumers of these features, so this class of error
      // is not actionable in ShopPayPaymentRequest contexts.
      (isCrossOriginFrameAccessError && isShopPayPaymentRequestFeature),
  );
};

const isUnactionable = (exception: BugsnagException): boolean => {
  return UNACTIONABLE_ERROR_CLASSES.includes(exception.errorClass);
};

const isNetworkError = (exception: BugsnagException): boolean => {
  const {errorClass, message} = exception;

  return Boolean(
    errorClass === 'NetworkError' ||
      UNACTIONABLE_NETWORK_ERRORS.some((networkMessage) =>
        message?.includes(networkMessage),
      ) ||
      _isMonorailNetworkError(message),
  );
};

const isDynamicImportError = (exception: BugsnagException): boolean => {
  const {message} = exception;

  return Boolean(
    DYNAMIC_IMPORT_ERRORS.some((importErrorMessage) =>
      message?.includes(importErrorMessage),
    ),
  );
};

const handleCreateBugsnagParamsError = ({
  event,
  metadata,
  onNetworkError,
}: {
  event: BugsnagEvent;
  metadata: Metadata;
  onNetworkError: (errorType?: NetworkErrorType) => void;
}) => {
  const exception = event.exceptions[0];

  if (!exception) {
    return false;
  }

  const feature = metadata.custom?.feature;
  if (
    isIgnorable(exception, typeof feature === 'string' ? feature : undefined)
  ) {
    return false;
  }

  if (isUnactionable(exception)) {
    return false;
  }

  if (isDynamicImportError(exception)) {
    // Record dynamic import errors for Observe, but don't notify Bugsnag
    onNetworkError('DynamicImportError');
    return false;
  }

  if (isNetworkError(exception)) {
    // Record network errors for Observe, but don't notify Bugsnag
    onNetworkError();
    return false;
  }

  const featureAssets: Record<string, any[]> | undefined =
    isoWindow.Shopify?.featureAssets?.['shop-js'];

  const featureAssetsNonEmpty = Boolean(
    featureAssets && Object.keys(featureAssets).length > 0,
  );

  const shopJsUrls = (
    Array.from(
      isoDocument.querySelectorAll('script[src*="/shop-js/"]'),
    ) as HTMLScriptElement[]
  ).map((scriptTag) => scriptTag.src);

  event.device = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    locale: isoNavigator.userLanguage || isoNavigator.language,
    userAgent: isoNavigator.userAgent,
    orientation: isoWindow.screen?.orientation?.type,
    time: new Date().toISOString(),
  };

  /**
   * Includes metadata from:
   *  1) the event created by Bugsnag client
   *  2) the metadata passed to the Bugsnag constructor
   *  3) additional default metadata for all events
   */
  event.metaData = {
    ...event.metaData,
    ...metadata,
    custom: {
      ...event.metaData?.custom,
      ...metadata.custom,
      beta: true,
      // eslint-disable-next-line no-process-env
      bundleLocale: process.env.BUILD_LOCALE,
      compactUX: true,
      domain: isoWindow?.location?.hostname,
      shopJsUrls,
      shopJsFeatureAssetsExist: featureAssetsNonEmpty,
    },
  };

  event.request = {
    url: isoWindow.location.href,
  };
};

function createBugsnagParams({
  metadata,
  onNetworkError,
}: CreateBugsnagParamsProps): BugsnagLightParams {
  return {
    apiKey: config.bugsnagApiKey,
    appId: 'shop-js',
    appVersion: '__buildVersionBeta',
    onError: (event: BugsnagEvent) =>
      handleCreateBugsnagParamsError({
        event,
        metadata,
        onNetworkError,
      }),
    // eslint-disable-next-line no-process-env
    releaseStage: (process.env.NODE_ENV || 'production') as ReleaseStage,
    withSessionTracking: false,
  };
}

export class Bugsnag {
  readonly client: BugsnagLight;
  readonly feature: string;
  readonly opentelClient = new SendImmediatelyOpenTelemetryClient({
    exporter: createExporter(),
  });

  constructor(feature?: string) {
    const params = createBugsnagParams({
      metadata: {
        custom: {
          feature,
        },
      },
      onNetworkError: this.handleNetworkError.bind(this),
    });

    this.client = new BugsnagLight(params);
    this.feature = feature || '';
    this.leaveBreadcrumb = this.leaveBreadcrumb.bind(this);
    this.notify = this.notify.bind(this);
  }

  leaveBreadcrumb(
    name: string,
    metaData: BreadcrumbMetadata,
    type: BreadcrumbType,
  ) {
    if (!this.client) {
      // eslint-disable-next-line no-console
      console.log('Bugsnag.leaveBreadcrumb() called before client creation.');
      return;
    }

    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.log('[Bugsnag leaveBreadcrumb called]', name, metaData, type);
      return;
    }

    this.client.leaveBreadcrumb(name, metaData, type);
  }

  async notify(error: Error, options?: NotifyOptions) {
    if (!this.client) {
      // eslint-disable-next-line no-console
      console.warn?.('Bugsnag.notify() called before client creation.');
      return;
    }

    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.log('[Bugsnag notify called]', error);
      return;
    }

    this.client.notify(error, options);
  }

  handleNetworkError(errorType: NetworkErrorType = 'NetworkError') {
    this.opentelClient.counter({
      attributes: {
        feature: this.feature,
        error: errorType,
      },
      name: 'shop_js_network_error',
      value: 1,
    });
  }
}
