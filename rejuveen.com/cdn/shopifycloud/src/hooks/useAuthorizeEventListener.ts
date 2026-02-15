import type {MutableRef} from 'preact/hooks';
import {useCallback, useMemo} from 'preact/hooks';

import {
  CORE_AUTH_DOMAIN,
  PAY_AUTH_DOMAIN,
  PAY_AUTH_DOMAIN_ALT,
} from '~/constants/authorize';
import type {
  AuthorizeErrorEvent,
  AuthorizeLeadCaptureLoadedEvent,
  AuthorizeLoadedEvent,
  AuthorizeStepChangedEvent,
  AuthorizeUnloadedEvent,
  CompletedEvent,
  CustomFlowSideEffectEvent,
  MessageEventData,
  PopUpOpenedEvent,
  ResizeIframeEvent,
  ShopUserMatchedEvent,
  ShopUserNotMatchedEvent,
  UserVerifiedEvent,
  VerificationStepChangedEvent,
} from '~/types/event';
import {createCustomElement} from '~/utils/customElement';

import {useDispatchEvent} from './useDispatchEvent';
import {useEventListener} from './useEventListener';

export interface AuthorizeEventHandlers {
  onAuthorizeStepChanged?: (event: AuthorizeStepChangedEvent) => void;
  onClose?: () => void;
  onContinueToCheckout?: () => void;
  onComplete?: (event: CompletedEvent) => Promise<void>;
  onConfirmSuccess?: () => void;
  onCustomFlowSideEffect?: (event: CustomFlowSideEffectEvent) => void;
  onDiscountSaved?: () => void;
  onEmailChangeRequested?: () => void;
  onError?: (event: AuthorizeErrorEvent) => void;
  onLeadCaptureLoaded?: (event: AuthorizeLeadCaptureLoadedEvent) => void;
  onLoaded?: (event: AuthorizeLoadedEvent) => boolean | void;
  onUnloaded?: (event: AuthorizeUnloadedEvent) => void;
  onModalOpened?: () => void;
  onModalVisibleChange?: (visible: boolean) => void;
  onPopUpOpened?: (event: PopUpOpenedEvent) => void;
  onPrequalError?: () => void;
  onPrequalMissingInformation?: () => void;
  onPrequalReady?: () => void;
  onPrequalSuccess?: () => void;
  onProcessingStatusUpdated?: () => void;
  onResizeIframe?: (event: ResizeIframeEvent) => void;
  onRestarted?: () => void;
  onShopUserMatched?: (event: ShopUserMatchedEvent) => void;
  onShopUserNotMatched?: (event: ShopUserNotMatchedEvent) => void;
  onUserVerified?: (event: UserVerifiedEvent) => void;
  onVerificationStepChanged?: (event: VerificationStepChangedEvent) => void;
  onPromptChange?: () => void;
  onPromptContinue?: () => void;
}

interface UseAuthorizeEventListenerParams extends AuthorizeEventHandlers {
  includeCore?: boolean;
  source: MutableRef<HTMLIFrameElement | null>;
  storefrontOrigin?: string;
}

export function useAuthorizeEventListener({
  includeCore,
  source,
  storefrontOrigin,
  ...rest
}: UseAuthorizeEventListenerParams) {
  const dispatchEvent = useDispatchEvent();

  const handler = useCallback(
    async (event: MessageEventData) => {
      const {
        onAuthorizeStepChanged,
        onClose,
        onComplete,
        onConfirmSuccess,
        onContinueToCheckout,
        onCustomFlowSideEffect,
        onDiscountSaved,
        onEmailChangeRequested,
        onError,
        onLeadCaptureLoaded,
        onLoaded,
        onModalOpened,
        onPopUpOpened,
        onPrequalError,
        onPrequalMissingInformation,
        onPrequalReady,
        onPrequalSuccess,
        onProcessingStatusUpdated,
        onPromptChange,
        onPromptContinue,
        onResizeIframe,
        onRestarted,
        onShopUserMatched,
        onShopUserNotMatched,
        onUnloaded,
        onUserVerified,
        onVerificationStepChanged,
      } = rest;

      switch (event.type) {
        case 'authorize_step_changed':
          onAuthorizeStepChanged?.(event);
          break;
        case 'close':
        case 'close_requested':
          onClose?.();
          break;
        case 'completed': {
          const {avatar, email, givenName, loggedIn, shouldFinalizeLogin} =
            event;

          if (onComplete) {
            await onComplete(event);
          }

          dispatchEvent('completed', event);

          /**
           * Any successful sign in that is capable of opening a storefront session should also dispatch a
           * storefront:signincompleted event, including the user's avatar.
           *
           * Storefront themes depend on this event in order to render the shop user's avatar without requiring
           * a full page refresh.
           */
          if (loggedIn && shouldFinalizeLogin) {
            dispatchEvent(
              'storefront:signincompleted',
              {
                avatar: (() => {
                  const avatarElement = createCustomElement('shop-user-avatar');
                  const initial = givenName?.[0] || email?.[0] || '';

                  avatarElement.setAttribute('src', avatar || '');
                  avatarElement.setAttribute('initial', initial);

                  return avatarElement;
                })(),
              },
              true,
            );
          }
          break;
        }
        case 'confirm_success':
          onConfirmSuccess?.();
          break;
        case 'continue_to_checkout':
          onContinueToCheckout?.();
          break;
        case 'custom_flow_side_effect':
          onCustomFlowSideEffect?.(event);
          break;
        case 'discount_saved':
          onDiscountSaved?.();
          break;
        case 'email_change_requested':
          onEmailChangeRequested?.();
          break;
        case 'error':
          onError?.(event);
          dispatchEvent('error', {
            code: event.code,
            message: event.message,
            email: event.email,
          });
          break;
        case 'loaded':
          dispatchEvent('loaded', event);

          if ('loginTitle' in event) {
            onLeadCaptureLoaded?.(event);
          } else {
            onLoaded?.(event);
          }
          break;
        case 'unloaded':
          onUnloaded?.(event);
          break;
        case 'modalopened':
          onModalOpened?.();
          break;
        case 'pop_up_opened':
          onPopUpOpened?.(event);
          dispatchEvent('popuploading', event);
          break;
        case 'processing_status_updated':
          onProcessingStatusUpdated?.();
          break;
        case 'prequal_error':
          onPrequalError?.();
          break;
        case 'prequal_missing_information':
          onPrequalMissingInformation?.();
          break;
        case 'prequal_ready':
          onPrequalReady?.();
          break;
        case 'prequal_success':
          onPrequalSuccess?.();
          break;
        case 'resize_iframe':
          onResizeIframe?.(event);
          break;
        case 'restarted':
          onRestarted?.();
          dispatchEvent('restarted');
          break;
        case 'shop_user_matched':
          onShopUserMatched?.(event);
          break;
        case 'shop_user_not_matched':
          onShopUserNotMatched?.(event);
          break;
        case 'user_verified':
          onUserVerified?.(event);
          break;
        case 'verification_step_changed':
          onVerificationStepChanged?.(event);
          break;
        case 'prompt_change':
          onPromptChange?.();
          break;
        case 'prompt_continue':
          onPromptContinue?.();
          break;
      }
    },
    [dispatchEvent, rest],
  );

  const allowedOrigins = useMemo(
    () => [
      PAY_AUTH_DOMAIN,
      PAY_AUTH_DOMAIN_ALT,
      ...(includeCore ? [CORE_AUTH_DOMAIN] : []),
      ...(storefrontOrigin ? [storefrontOrigin] : []),
    ],
    [includeCore, storefrontOrigin],
  );

  const eventListenerData = useEventListener({
    allowedOrigins,
    handler,
    source,
  });

  return eventListenerData;
}
