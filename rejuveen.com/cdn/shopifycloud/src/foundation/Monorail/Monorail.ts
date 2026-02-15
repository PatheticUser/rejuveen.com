import {Monorail as MonorailProducer} from '@shopify/monorail';

import type {
  LoginWithShopSdkPageName,
  ShopModalState,
  TrackModalStateChangeParams,
} from '~/types/analytics';
import type {PostMessageEvent} from '~/types/event';
import {deepEqual} from '~/utils/deepEqual';
import {AbstractShopJSError} from '~/utils/errors';
import {isoWindow} from '~/utils/window';

import type {BugsnagNotifyCallback} from '../Bugsnag/types';
import type {MetricOptions, OpentelCallback} from '../OpenTelemetry/types';
import {groupOpentelError} from '../OpenTelemetry/utils';

import type {
  AnalyticsData,
  MonorailParams,
  ProduceMonorailEventParams,
  TrackPageImpressionParams,
  TrackPostMessageTransmissionParams,
  TrackUserActionParams,
} from './types';
import {
  getStorefrontAnalytics,
  getTrekkieAttributes,
  isUsefulError,
  getMonorailMiddleware,
} from './utils';

const DEFAULT_FLOW_VERSION = 'unspecified';

const middleware = getMonorailMiddleware();

/**
 * Add any event types that should be tracked in monorail and prometheus here
 */
const TRACKABLE_POST_MESSAGE_EVENT_TYPES = [
  'completed',
  'emailsubmitted',
  'namesubmitted',
  'sheetmodalclosed',
  'sheetmodalopened',
];

export const PRODUCER =
  // eslint-disable-next-line no-process-env
  process.env.NODE_ENV === 'production'
    ? MonorailProducer.createHttpProducer({
        production: true,
        middleware,
      })
    : MonorailProducer.createLogProducer({
        debugMode: true,
        middleware,
      });

function hasEmailPayload<T extends PostMessageEvent>(
  event: T,
): event is T & {email: string} {
  return 'email' in event;
}

export class Monorail {
  #analyticsData: AnalyticsData;

  private devMode: boolean;
  private featureInitializationEventAlreadyEmitted = false;
  private notify?: BugsnagNotifyCallback;
  private previousModalState?: ShopModalState | undefined;
  private recordCounter?: OpentelCallback<MetricOptions>;
  private trackedPageImpressions: Set<LoginWithShopSdkPageName> =
    new Set<LoginWithShopSdkPageName>();

  constructor({
    analyticsData,
    devMode = false,
    notify,
    recordCounter,
  }: MonorailParams) {
    this.#analyticsData = {
      ...analyticsData,
      flowVersion: analyticsData.flowVersion ?? DEFAULT_FLOW_VERSION,
    };

    this.devMode = devMode;

    this.notify = notify;
    this.recordCounter = recordCounter;

    this.clearTrackedPageImpressions =
      this.clearTrackedPageImpressions.bind(this);
    this.produceMonorailEvent = this.produceMonorailEvent.bind(this);
    this.trackFeatureInitialization =
      this.trackFeatureInitialization.bind(this);
    this.trackModalStateChange = this.trackModalStateChange.bind(this);
    this.trackPageImpression = this.trackPageImpression.bind(this);
    this.trackUserAction = this.trackUserAction.bind(this);
    this.trackPostMessageTransmission =
      this.trackPostMessageTransmission.bind(this);
  }

  get analyticsData() {
    return this.#analyticsData;
  }

  set analyticsData(data: AnalyticsData) {
    const updated = {
      ...this.#analyticsData,
      ...data,
    };

    if (deepEqual(updated, this.#analyticsData)) {
      return;
    }

    this.#analyticsData = updated;
  }

  clearTrackedPageImpressions() {
    this.trackedPageImpressions.clear();
  }

  produceMonorailEvent({
    event,
    onError,
    trekkieAttributes,
  }: ProduceMonorailEventParams) {
    if (this.devMode) {
      return;
    }

    if (trekkieAttributes && !Object.keys(trekkieAttributes).length) {
      // If trekkie attributes are provided but the object is empty then we don't want to send the event
      // since we know it will not have a valid schema
      onError?.({message: 'trekkie attributes are empty'});
      return;
    }

    event.payload = Object.assign(event.payload, trekkieAttributes);

    PRODUCER.produce(event).catch((error) => {
      onError?.(error);

      if (isUsefulError(error)) {
        const caughtError =
          error instanceof Error
            ? error
            : new AbstractShopJSError(String(error), 'MonorailProducerError');

        this.notify?.(caughtError);

        if (this.recordCounter) {
          const opentelError = groupOpentelError(caughtError);

          this.recordCounter('shop_js_monorail_producer_error', {
            attributes: {
              error: opentelError,
            },
          });
        }
      }
    });
  }

  async trackFeatureInitialization() {
    const {
      analyticsTraceId,
      apiKey,
      checkoutToken,
      flow,
      flowVersion = DEFAULT_FLOW_VERSION,
      shopId,
      source = 'unspecified',
      uxMode,
    } = this.analyticsData;

    if (!flow) {
      return;
    }

    if (this.featureInitializationEventAlreadyEmitted) {
      this.notify?.(
        new AbstractShopJSError(
          `Feature Initialize Event already emitted once for the feature ${flow}`,
          'MonorailLogicError',
          analyticsTraceId,
        ),
      );
    }

    const storefrontAnalytics = getStorefrontAnalytics();
    const storefrontPageType = storefrontAnalytics?.pageType ?? '';
    const trekkieAttributes = await getTrekkieAttributes(
      'customerId',
      'isPersistentCookie',
      'path',
      'uniqToken',
      'visitToken',
    );

    const payload = {
      ...(apiKey && {apiKey}),
      ...(checkoutToken && {checkoutToken}),
      ...(shopId && {shopId}),
      ...trekkieAttributes,
      analyticsTraceId,
      flow,
      flowVersion,
      sdkVersion: '__buildVersionBeta',
      shopPermanentDomain: isoWindow.Shopify?.shop ?? '',
      source,
      storefrontPageType,
      uxMode,
    };
    this.featureInitializationEventAlreadyEmitted = true;
    this.produceMonorailEvent({
      event: {
        schemaId: 'shopify_pay_login_with_shop_sdk_feature_initialize/1.1',
        payload,
      },
    });
  }

  trackModalStateChange({
    currentState,
    dismissMethod,
    reason,
  }: TrackModalStateChangeParams) {
    const {
      analyticsTraceId,
      checkoutToken,
      flow,
      flowVersion = 'unspecified',
    } = this.analyticsData;

    if (!flow) {
      return;
    }

    this.produceMonorailEvent({
      event: {
        schemaId: 'shop_identity_modal_state_change/1.4',
        payload: {
          analyticsTraceId,
          checkoutToken,
          currentState,
          dismissMethod,
          flow,
          flowVersion,
          previousState: this.previousModalState,
          reason,
          zoom: `${isoWindow.visualViewport?.scale}`,
        },
      },
    });

    this.previousModalState = currentState;
  }

  async trackPageImpression({
    allowDuplicates = false,
    analyticsTraceId = this.analyticsData.analyticsTraceId,
    flow = this.analyticsData.flow,
    page,
    shopAccountUuid,
  }: TrackPageImpressionParams) {
    if (!allowDuplicates && this.trackedPageImpressions.has(page)) {
      return;
    }

    const {
      apiKey,
      checkoutToken,
      flowVersion = DEFAULT_FLOW_VERSION,
    } = this.analyticsData;

    if (!flow) {
      return;
    }

    this.trackedPageImpressions.add(page);

    const storefrontAnalytics = getStorefrontAnalytics();
    const storefrontPageType = storefrontAnalytics?.pageType ?? '';
    const trekkieAttributes = await getTrekkieAttributes(
      'customerId',
      'isPersistentCookie',
      'path',
      'uniqToken',
      'visitToken',
    );

    const payload = {
      ...(apiKey && {apiKey}),
      ...(checkoutToken && {checkoutToken}),
      ...(shopAccountUuid && {shopAccountUuid}),
      ...trekkieAttributes,
      analyticsTraceId,
      flow,
      flowVersion,
      pageName: page,
      sdkVersion: '__buildVersionBeta',
      shopPermanentDomain: isoWindow.Shopify?.shop ?? '',
      storefrontPageType,
    };

    this.produceMonorailEvent({
      event: {
        payload,
        schemaId: 'shopify_pay_login_with_shop_sdk_page_impressions/3.3',
      },
      onError: () => {
        this.trackedPageImpressions.delete(page);
      },
      trekkieAttributes,
    });
  }

  trackUserAction({userAction}: TrackUserActionParams) {
    const {
      analyticsTraceId,
      apiKey,
      checkoutToken,
      checkoutVersion,
      flow,
      flowVersion = DEFAULT_FLOW_VERSION,
      shopId,
    } = this.analyticsData;

    if (!flow) {
      return;
    }

    const payload = {
      ...(apiKey && {apiKey}),
      ...(checkoutToken && {checkoutToken}),
      ...(checkoutVersion && {checkoutVersion}),
      ...(shopId && {shopId}),
      analyticsTraceId,
      flow,
      flowVersion,
      sdkVersion: '__buildVersionBeta',
      shopPermanentDomain: isoWindow.Shopify?.shop ?? '',
      userAction,
    };

    this.produceMonorailEvent({
      event: {
        schemaId: 'shopify_pay_login_with_shop_sdk_user_actions/2.2',
        payload,
      },
    });
  }

  trackPostMessageTransmission({
    direction,
    event,
  }: TrackPostMessageTransmissionParams) {
    const eventType = event.type;

    if (!TRACKABLE_POST_MESSAGE_EVENT_TYPES.includes(eventType)) {
      return;
    }

    const timestamp = Date.now();
    const messageId = event.messageId;
    const {analyticsTraceId, checkoutToken, shopPermanentDomain} =
      this.analyticsData;
    const email = hasEmailPayload(event) ? event.email : undefined;

    const attributes = {
      eventType,
      direction,
      actor: 'shop-js',
    };

    this.recordCounter?.('shop_js_post_message_transmission', {attributes});

    this.produceMonorailEvent({
      event: {
        schemaId: 'shop_identity_post_message_transmission/1.0',
        payload: {
          messageId,
          messageDirection: direction,
          actor: 'shop-js',
          payloadType: eventType,
          clientTimestampMs: timestamp,
          analyticsTraceId,
          checkoutToken,
          shopifyDomain: shopPermanentDomain,
          email,
        },
      },
    });
  }
}
