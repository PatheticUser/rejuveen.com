import type {ComponentChildren} from 'preact';
import type {HTMLAttributes} from 'preact/compat';
import {forwardRef} from 'preact/compat';
import type {MutableRef} from 'preact/hooks';
import {useEffect, useImperativeHandle, useRef} from 'preact/hooks';

import {useShopLogin} from '~/foundation/ShopLogin/useShopLogin';
import type {IframeElement} from '~/types/iframe';
import {classNames} from '~/utils/css';

import {CardContent} from './components/CardContent';
import {LoginIframe} from './components/LoginIframe';

export interface LoginRecognitionProps {
  children: ComponentChildren;
  iframeUrl: string;
  onClick: () => void;
  visible: boolean;
}

export interface LoginRecognitionRef {
  iframe: MutableRef<IframeElement | null>;
}

export const LoginRecognition = forwardRef<
  LoginRecognitionRef,
  LoginRecognitionProps
>(({children, iframeUrl, onClick, visible}, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<IframeElement | null>(null);
  const {state, flowVersion} = useShopLogin();

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && state.localPresentationMode === 'button') {
        onClick();
      }
    };

    cardRef.current?.addEventListener('keydown', keydownHandler);
    const cardRefCopy = cardRef.current;

    return () => {
      cardRefCopy?.removeEventListener('keydown', keydownHandler);
    };
  }, [onClick, state.localPresentationMode]);

  const extraAttributes: HTMLAttributes<HTMLDivElement> =
    state.localPresentationMode === 'button'
      ? {
          onClick,
          role: 'button',
          tabIndex: 0,
        }
      : {};

  useImperativeHandle(ref, () => {
    return {
      iframe: iframeRef,
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={classNames(
        'relative w-full select-none border transition-all duration-300 ease-out data-hidden_invisible data-hidden_hidden motion-reduce_transition-none',
        flowVersion !== 'account_menu' && 'backdrop-blur-xl',
        state.localPresentationMode === 'button'
          ? 'rounded-login-button bg-core-idp-social-logins focus-visible_outline-none focus-visible_ring focus-visible_ring-purple-l1'
          : 'rounded-login-card bg-white bg-opacity-5 shadow-card',
        state.localPresentationMode === 'button' &&
          !state.processing &&
          'cursor-pointer hover_opacity-80',
        state.parentTheme === 'dark'
          ? 'border-checkout-branded-dark'
          : 'border-checkout-branded',
      )}
      data-testid="login-recognition"
      data-visible={visible}
      {...extraAttributes}
      ref={cardRef}
    >
      <div
        className={classNames(
          'flex flex-col transition-all duration-300 ease-out',
          state.localPresentationMode === 'button' ? 'p-shop-login' : 'p-4',
        )}
        data-testid="login-recognition-content"
      >
        <LoginIframe ref={iframeRef} src={iframeUrl} />
        <CardContent onClick={onClick}>{children}</CardContent>
      </div>
    </div>
  );
});
