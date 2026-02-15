import type {RefCallback, RefObject} from 'preact';
import {forwardRef} from 'preact/compat';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'preact/hooks';

import {useAuthorizeState} from '~/foundation/AuthorizeState/hooks';
import {useBugsnag} from '~/foundation/Bugsnag/hooks';
import {useMonorail} from '~/foundation/Monorail/hooks';
import {useOpenTelemetry} from '~/foundation/OpenTelemetry/hooks';
import type {AuthorizeEventHandlers} from '~/hooks/useAuthorizeEventListener';
import {useAuthorizeEventListener} from '~/hooks/useAuthorizeEventListener';
import {useDispatchEvent} from '~/hooks/useDispatchEvent';
import {useLoadTimeout} from '~/hooks/useLoadTimeout';
import {usePrevious} from '~/hooks/usePrevious';
import type {
  ShopModalShownReason,
  ShopModalHiddenDismissMethod,
} from '~/types/analytics';
import type {PayEvents} from '~/types/event';
import type {
  IframeElement,
  IframeElementCloseParams,
  IframePostMessageOptions,
} from '~/types/iframe';
import type {ModalType} from '~/types/modal';
import type {PortalProviderVariant} from '~/types/portalProvider';
import {debounce} from '~/utils/debounce';
import {isoDocument} from '~/utils/document';
import {AbstractShopJSError} from '~/utils/errors';
import {postMessage} from '~/utils/postMessage';
import {updateIframeSrc} from '~/utils/updateIframeSrc';

import {Inline} from '../Inline';
import {Modal} from '../Modal';
import {ShopAppIcon} from '../ShopAppIcon';
import {ShopIcon} from '../ShopIcon';

import {LoadingSkeleton} from './LoadingSkeleton';
import {isUsefulError} from './utils';

export interface AuthorizeIframeProps extends AuthorizeEventHandlers {
  activator?: RefObject<HTMLElement>;
  allowAttribute?: string;
  anchorTo?: string;
  autoOpen?: boolean;
  disableDefaultIframeResizing?: boolean;
  insideModal?: boolean;
  keepModalOpen?: boolean;
  modalHeaderTitle?: string;
  modalHeaderVisible?: boolean;
  proxy: boolean;
  renderInline?: boolean;
  sandbox?: boolean;
  scrolling?: 'no';
  src: string;
  storefrontOrigin?: string;
  modalType?: ModalType;
  variant: PortalProviderVariant;
}

export const AuthorizeIframe = forwardRef<IframeElement, AuthorizeIframeProps>(
  (
    {
      activator,
      allowAttribute,
      anchorTo,
      autoOpen,
      disableDefaultIframeResizing = false,
      insideModal = true,
      keepModalOpen = false,
      modalHeaderTitle,
      modalHeaderVisible = true,
      onComplete,
      onCustomFlowSideEffect,
      onError,
      onLoaded,
      onModalVisibleChange,
      onResizeIframe,
      onPromptChange,
      onPromptContinue,
      proxy,
      renderInline = false,
      sandbox = false,
      scrolling,
      src,
      storefrontOrigin,
      modalType,
      variant,
    },
    ref,
  ) => {
    const {dispatch, loaded, modalVisible} = useAuthorizeState();
    const {leaveBreadcrumb, notify} = useBugsnag();
    const dispatchEvent = useDispatchEvent();
    const {clearLoadTimeout, initLoadTimeout} = useLoadTimeout();
    const {trackPageImpression, trackPostMessageTransmission} = useMonorail();
    const {recordCounter} = useOpenTelemetry();
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const prevModalVisible = usePrevious(modalVisible);

    const callbackRef: RefCallback<HTMLIFrameElement> = (ref) => {
      /**
       * When the user restarts, the render logic changes for our iframe and ref is set to null.
       * We want to prevent from overriding the ref and setting it to null here because it breaks
       * the postMessage logic.
       */
      if (!ref) {
        return;
      }

      iframeRef.current = ref;

      /**
       * Init iframe src if not set already. We need this because iframeRef.current is undefined on
       * initial render, therefore we're not guaranteeed to successfully set the iframe src via
       * iframeRef.
       */
      if (!ref.getAttribute('src')) {
        ref.setAttribute('src', src);
      }
    };

    const handleShowModal = useCallback(
      (reason: ShopModalShownReason) => {
        dispatch({type: 'showModal', reason});
      },
      [dispatch],
    );

    const handleDismissModal = useCallback(
      ({dismissMethod, reason}: IframeElementCloseParams) => {
        if (!modalVisible) {
          return;
        }

        dispatch({type: 'hideModal', reason, dismissMethod});

        // Focuses the activator after the modal closes.
        if (activator?.current && isRef(activator)) {
          activator.current.focus();
        }
      },
      [activator, dispatch, modalVisible],
    );

    useEffect(() => {
      function onClick() {
        handleShowModal('user_button_clicked');
      }

      const debouncedOnClick = debounce(onClick, 150, true);

      const internalActivatorRef = activator;

      if (internalActivatorRef?.current && isRef(internalActivatorRef)) {
        internalActivatorRef.current.addEventListener(
          'click',
          debouncedOnClick,
        );

        return () => {
          internalActivatorRef.current?.removeEventListener(
            'click',
            debouncedOnClick,
          );
        };
      }
    }, [activator, handleShowModal]);

    const reloadIframe = useCallback(() => {
      updateIframeSrc({iframe: iframeRef.current, src});
    }, [src]);

    const {destroy, waitForMessage} = useAuthorizeEventListener({
      includeCore: proxy,
      onClose: () =>
        handleDismissModal({
          dismissMethod: 'auto',
          reason: 'event_close_requested',
        }),
      onComplete: async (completedEvent) => {
        if (!keepModalOpen && insideModal) {
          handleDismissModal({
            dismissMethod: 'auto',
            reason: 'event_completed',
          });
        }
        await onComplete?.(completedEvent);
      },
      onCustomFlowSideEffect,
      onError: (event) => {
        const {message, code} = event;
        if (isUsefulError(code, message)) {
          leaveBreadcrumb('authorize error', {code, message}, 'state');
          notify(new AbstractShopJSError(message, 'AuthorizeError'));
        } else {
          recordCounter('shop_js_handle_silent_error', {
            attributes: {
              errorCode: code,
            },
          });
          leaveBreadcrumb('silent error', {code}, 'state');
        }

        clearLoadTimeout();
        onError?.(event);
      },
      onLoaded: (event) => {
        dispatch({
          type: 'loaded',
          payload: {
            autoOpen: Boolean(autoOpen),
            sessionDetected: event.userFound,
          },
        });
        onLoaded?.(event);
        clearLoadTimeout();
      },
      onUnloaded: () => {
        dispatch({
          type: 'reset',
        });
      },
      onResizeIframe: (event) => {
        if (!disableDefaultIframeResizing) {
          if (iframeRef.current) {
            iframeRef.current.style.height = `${event.height}px`;
          }
        }

        if (event.height > 0) {
          dispatch({type: 'uiRendered'});
        }
        onResizeIframe?.(event);
      },
      onShopUserMatched: () => {
        dispatchEvent('shopusermatched');
        leaveBreadcrumb('shop user matched', {}, 'state');
      },
      onShopUserNotMatched: ({apiError}) => {
        dispatchEvent('shopusernotmatched', apiError && {apiError});
        leaveBreadcrumb('shop user not matched', {}, 'state');
      },
      onPromptChange: () => {
        onPromptChange?.();
      },
      onPromptContinue: () => {
        onPromptContinue?.();
      },
      source: iframeRef,
      storefrontOrigin,
    });

    useEffect(() => {
      return () => {
        if (iframeRef.current) {
          destroy();
        }
      };
    }, [destroy]);

    const postMessageHelper = useCallback(
      async (
        event: PayEvents,
        {afterLoaded = false}: IframePostMessageOptions = {},
      ) => {
        if (afterLoaded && !loaded) {
          await waitForMessage('loaded');
        }

        postMessage({
          contentWindow: iframeRef.current?.contentWindow,
          event,
          onMessageSent: (event) =>
            trackPostMessageTransmission({direction: 'outgoing', event}),
        });
      },
      [loaded, trackPostMessageTransmission, waitForMessage],
    );

    useEffect(() => {
      // Do not run the effect if the modalVisible state has not changed
      // This helps us prevent sending duplicated events
      if (modalVisible === prevModalVisible) {
        return;
      }

      if (modalVisible) {
        try {
          postMessageHelper(
            {
              type: 'sheetmodalopened',
            },
            {
              afterLoaded: true,
            },
          );
          dispatchEvent('modalopened');
        } catch (error) {
          // Create an easily identifiable error message to help
          // debug issues with the CheckoutModal conversion drop
          notify(
            new Error(
              `Error before calling onModalVisibleChange(true): ${error}`,
            ),
          );
        }

        onModalVisibleChange?.(true);
        return;
      }

      postMessageHelper(
        {
          type: 'sheetmodalclosed',
        },
        {afterLoaded: true},
      );
      dispatchEvent('modalclosed');
      onModalVisibleChange?.(false);

      // Remove the 1password custom element from the DOM after the sheet modal is closed.
      isoDocument.querySelector('com-1password-notification')?.remove();
    }, [
      dispatchEvent,
      modalVisible,
      notify,
      onModalVisibleChange,
      postMessageHelper,
      prevModalVisible,
    ]);

    useImperativeHandle(ref, () => {
      return {
        close: handleDismissModal,
        iframeRef,
        open: handleShowModal,
        postMessage: postMessageHelper,
        reload: reloadIframe,
        waitForMessage,
      };
    }, [
      handleDismissModal,
      handleShowModal,
      postMessageHelper,
      reloadIframe,
      waitForMessage,
    ]);

    useEffect(() => {
      initLoadTimeout();
      leaveBreadcrumb('Iframe url updated', {src}, 'state');
    }, [initLoadTimeout, leaveBreadcrumb, src]);

    useEffect(() => {
      if (modalVisible) {
        trackPageImpression({page: 'AUTHORIZE_MODAL'});
      }
    }, [modalVisible, trackPageImpression]);

    useEffect(() => {
      updateIframeSrc({iframe: iframeRef.current, src});
    }, [src]);

    const handleModalInViewport = () => {
      trackPageImpression({
        page: 'AUTHORIZE_MODAL_IN_VIEWPORT',
        allowDuplicates: true,
      });
      leaveBreadcrumb('modal in viewport', {}, 'state');
    };

    const sandboxAllow = sandbox
      ? 'allow-top-navigation allow-scripts allow-same-origin allow-forms'
      : undefined;

    const iframeElement = (
      <iframe
        allow={allowAttribute || 'publickey-credentials-get *'}
        className="relative z-40 m-auto w-full border-none"
        ref={callbackRef}
        tabIndex={0}
        // this is technically deprecated, but it's the only thing that works on Chrome (otherwise, an unnecessary scrollbar will automatically appear when the content is an exact fit)
        scrolling={scrolling}
        data-testid="authorize-iframe"
        sandbox={sandboxAllow}
      />
    );

    const headerLogo = modalHeaderTitle ? (
      <ShopAppIcon className="size-8 text-purple-primary" />
    ) : (
      <ShopIcon className="h-4-5 text-purple-primary" />
    );

    if (renderInline) {
      return (
        <Inline
          anchorTo={anchorTo}
          headerLogo={headerLogo}
          headerTitle={modalHeaderTitle}
          hideHeader={!modalHeaderVisible}
          onDismiss={(dismissMethod: ShopModalHiddenDismissMethod) =>
            handleDismissModal({
              dismissMethod,
              reason: 'user_dismissed',
            })
          }
          visible={modalVisible}
        >
          <LoadingSkeleton>{iframeElement}</LoadingSkeleton>
        </Inline>
      );
    }

    if (insideModal) {
      return (
        <Modal
          anchorTo={anchorTo}
          headerLogo={headerLogo}
          headerTitle={modalHeaderTitle}
          hideHeader={!modalHeaderVisible}
          onDismiss={(dismissMethod: ShopModalHiddenDismissMethod) =>
            handleDismissModal({
              dismissMethod,
              reason: 'user_dismissed',
            })
          }
          onModalInViewport={handleModalInViewport}
          type={modalType}
          variant={variant}
          visible={modalVisible}
        >
          <LoadingSkeleton>{iframeElement}</LoadingSkeleton>
        </Modal>
      );
    }

    return iframeElement;
  },
);

AuthorizeIframe.displayName = 'AuthorizeIframe';

function isRef(ref: RefObject<HTMLElement>): ref is RefObject<HTMLElement> {
  return Object.prototype.hasOwnProperty.call(ref, 'current');
}
