import type {ComponentChildren} from 'preact';
import {useEffect, useLayoutEffect, useRef, useState} from 'preact/hooks';

import {useShopLogin} from '~/foundation/ShopLogin/useShopLogin';
import {classNames} from '~/utils/css';

import {FooterPolicy} from './FooterPolicy';
import {LoginButton} from './LoginButton';

export interface CardContentProps {
  onClick: () => void;
  children: ComponentChildren;
}

export function CardContent({children, onClick}: CardContentProps) {
  const cardContentContainerRef = useRef<HTMLDivElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const {state} = useShopLogin();
  const [cardContentHeight, setCardContentHeight] = useState<
    number | undefined
  >(undefined);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousPresentationMode = useRef(state.localPresentationMode);

  useLayoutEffect(() => {
    const element = cardContentRef.current;
    if (!element || state.localPresentationMode !== 'card') return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry) {
        setCardContentHeight((entry.target as HTMLElement).offsetHeight);
      }
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [state.localPresentationMode, state.footerPolicy]);

  useEffect(() => {
    const cardContent = cardContentContainerRef.current;
    if (!cardContent) return;

    const handleTransitionStart = (event: TransitionEvent) => {
      if (event.propertyName === 'opacity') {
        setIsTransitioning(true);
      }
    };

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === 'opacity') {
        setIsTransitioning(false);
        if (
          previousPresentationMode.current === 'button' &&
          state.localPresentationMode === 'card'
        ) {
          loginButtonRef.current?.focus();
        }
      }
    };

    cardContent.addEventListener('transitionstart', handleTransitionStart);
    cardContent.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      cardContent?.removeEventListener(
        'transitionstart',
        handleTransitionStart,
      );
      cardContent?.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [state.localPresentationMode]);

  const wrapperHeight =
    state.localPresentationMode === 'button' ? 0 : cardContentHeight;

  return (
    <div
      className={classNames(
        'relative block transition-all ease-out motion-reduce_transition-none',
        // Because we're animating to a larger visual, we carry that "weight" with a longer duration
        state.localPresentationMode === 'button'
          ? 'invisible opacity-0 duration-300'
          : 'opacity-100 duration-400',
        isTransitioning && 'overflow-hidden',
      )}
      data-testid="card-content"
      ref={cardContentContainerRef}
      style={{
        height: wrapperHeight === undefined ? 'auto' : `${wrapperHeight}px`,
      }}
    >
      <div
        className="relative flex w-full flex-col space-y-3 pt-3"
        ref={cardContentRef}
      >
        <LoginButton onClick={onClick} ref={loginButtonRef}>
          {children}
        </LoginButton>
        <FooterPolicy />
      </div>
    </div>
  );
}
