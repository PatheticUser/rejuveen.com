import type {RefCallback} from 'preact';
import {forwardRef} from 'preact/compat';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'preact/hooks';

import {isUsefulError} from '~/components/AuthorizeIframe/utils';
import {Spinner} from '~/components/Spinner';
import {useBugsnag} from '~/foundation/Bugsnag/hooks';
import {useOpenTelemetry} from '~/foundation/OpenTelemetry/hooks';
import {useShopLogin} from '~/foundation/ShopLogin/useShopLogin';
import {useAuthorizeEventListener} from '~/hooks/useAuthorizeEventListener';
import {useDispatchEvent} from '~/hooks/useDispatchEvent';
import {useLoadTimeout} from '~/hooks/useLoadTimeout';
import type {PayEvents} from '~/types/event';
import type {IframeElement, IframePostMessageOptions} from '~/types/iframe';
import {AbstractShopJSError} from '~/utils/errors';
import {postMessage} from '~/utils/postMessage';
import {updateIframeSrc} from '~/utils/updateIframeSrc';

import {AnimatedShopLogo} from './AnimatedShopLogo';

export interface LoginIframeProps {
  src: string;
  storefrontOrigin?: string;
}

type LoginIframeElement = Omit<IframeElement, 'close' | 'open'>;

export const LoginIframe = forwardRef<LoginIframeElement, LoginIframeProps>(
  ({src, storefrontOrigin}, ref) => {
    const {leaveBreadcrumb, notify} = useBugsnag();
    const dispatchEvent = useDispatchEvent();
    const {clearLoadTimeout, initLoadTimeout} = useLoadTimeout();
    const {recordCounter} = useOpenTelemetry();
    const {dispatch, state} = useShopLogin();
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    const {loaded, localPresentationMode, processing} = state;

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

    const reloadIframe = useCallback(() => {
      updateIframeSrc({iframe: iframeRef.current, src});
    }, [src]);

    const {destroy, waitForMessage} = useAuthorizeEventListener({
      includeCore: true,
      onError: (event) => {
        const {message, code} = event;
        if (isUsefulError(code, message)) {
          leaveBreadcrumb('shop login iframe error', {code, message}, 'state');
          notify(new AbstractShopJSError(message, 'ShopLoginIframeError'));
        } else {
          recordCounter('shop_js_handle_silent_error', {
            attributes: {
              errorCode: code,
            },
          });
          leaveBreadcrumb('silent error', {code}, 'state');
        }

        clearLoadTimeout();
      },
      onLoaded: ({consented, footerPolicy, loginHintMatch, userFound}) => {
        clearLoadTimeout();
        dispatch({
          payload: {
            consented,
            footerPolicy,
            loginHintMatch,
            userFound,
          },
          type: 'iframeLoaded',
        });
      },
      onResizeIframe: (event) => {
        if (iframeRef.current) {
          iframeRef.current.style.maxHeight = `${event.height}px`;
        }
      },
      onShopUserMatched: ({userCookieExists}) => {
        dispatch({
          payload: {userCookieExists},
          type: 'userMatched',
        });
      },
      onShopUserNotMatched: () => {
        dispatchEvent('lookup_end');
        dispatchEvent('shop_user_not_matched');
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
      async (event: PayEvents, options?: IframePostMessageOptions) => {
        const afterLoaded = Boolean(options?.afterLoaded);

        if (afterLoaded && !loaded) {
          await waitForMessage('loaded');
        }

        postMessage({contentWindow: iframeRef.current?.contentWindow, event});
      },
      [loaded, waitForMessage],
    );

    useImperativeHandle(ref, () => {
      return {
        iframeRef,
        postMessage: postMessageHelper,
        reload: reloadIframe,
        waitForMessage,
      };
    }, [postMessageHelper, reloadIframe, waitForMessage]);

    useEffect(() => {
      initLoadTimeout();
      leaveBreadcrumb('Iframe url updated', {src}, 'state');
    }, [initLoadTimeout, leaveBreadcrumb, src]);

    useEffect(() => {
      updateIframeSrc({iframe: iframeRef.current, src});
    }, [src]);

    const wrapperVisible = useMemo(() => {
      if (localPresentationMode === 'button' && processing) {
        return false;
      }

      return true;
    }, [localPresentationMode, processing]);

    return (
      <div className="pointer-events-none flex w-full flex-grow flex-row items-center justify-start gap-x-1 overflow-hidden">
        <div
          className="relative block min-w-0 flex-grow overflow-hidden opacity-100 data-hidden_opacity-0"
          data-testid="recognition-iframe-wrapper"
          data-visible={wrapperVisible}
        >
          <div
            className="group flex w-full items-center gap-2 opacity-100 data-hidden_absolute data-hidden_inset-0 data-hidden_opacity-0"
            data-testid="recognition-iframe-skeleton"
            data-visible={!loaded}
          >
            <div className="size-8 animate-pulse rounded-max bg-grayscale-l2 ring-1 ring-inset ring-black/5 group-data-hidden_animate-none motion-reduce_animate-none" />
            <div className="flex flex-col">
              <div className="my-0.5 h-[14px] w-16 animate-pulse rounded-sm bg-grayscale-l2 group-data-hidden_animate-none motion-reduce_animate-none" />
              <div className="my-px h-3 w-37 animate-pulse rounded-sm bg-grayscale-l2 group-data-hidden_animate-none motion-reduce_animate-none" />
            </div>
          </div>

          <iframe
            className="relative z-40 max-h-8 w-full overflow-hidden border-none opacity-100 data-hidden_absolute data-hidden_inset-0 data-hidden_opacity-0"
            data-testid="recognition-iframe"
            data-visible={loaded}
            ref={callbackRef}
            scrolling="no"
            tabIndex={0}
          />

          <div
            className="absolute inset-y-0 right-0 z-50 w-1 bg-gradient-to-r from-transparent to-white opacity-100 data-hidden_opacity-0"
            data-visible={state.localPresentationMode === 'button'}
          />
        </div>
        {localPresentationMode === 'button' && (
          <Spinner color="purple" processing={processing} />
        )}
        <AnimatedShopLogo />
      </div>
    );
  },
);

LoginIframe.displayName = 'LoginIframe';
