import type {ComponentChildren, RefObject} from 'preact';
import type {Dispatch, StateUpdater} from 'preact/hooks';
import {useCallback, useEffect, useMemo, useRef, useState} from 'preact/hooks';

import {useAuthorizeState} from '~/foundation/AuthorizeState/hooks';
import {useElementEventListener} from '~/hooks/useElementEventListener';
import type {ShopModalHiddenDismissMethod} from '~/types/analytics';
import {classNames} from '~/utils/css';
import {isoDocument} from '~/utils/document';
import {isoWindow} from '~/utils/window';

import {AuthorizeHeader} from './AuthorizeHeader';
import {FocusLock} from './FocusLock';

export const INLINE_OTP_EXPERIMENT_HANDLE =
  'e_db171811ef21b52a48282dfe9378529b' as const;

interface InlineProps {
  anchorTo?: string | RefObject<HTMLElement>;
  children?: ComponentChildren;
  headerLogo?: ComponentChildren;
  headerTitle?: string;
  hideHeader?: boolean;
  inlineTitle?: string;
  onDismiss: (dismissMethod: ShopModalHiddenDismissMethod) => void;
  visible?: boolean;
}

export const Inline = ({
  anchorTo,
  children,
  headerLogo,
  headerTitle,
  hideHeader = false,
  inlineTitle = 'Sign in with Shop',
  onDismiss,
  visible = true,
}: InlineProps) => {
  const {dispatch, modalDismissible} = useAuthorizeState();

  const inlineRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [emailInput, setEmailInput] = useState<HTMLElement | null>(null);
  const [emailInputContainer, setEmailInputContainer] =
    useState<HTMLElement | null>(null);

  const [inlineOpened, setInlineOpened] = useState(false);
  const [shimmering, setShimmering] = useState(false);
  const [inlineHeight, setInlineHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [emailInputContainerHeight, setEmailInputContainerHeight] = useState(0);

  useEffect(() => {
    if (!visible) {
      setInlineOpened(false);
      return;
    }

    const handleTransitionEnd = () => setInlineOpened(true);
    const inlineElement = inlineRef.current;

    // Update the inlineOpened state after the component has finished transitioning.
    // This ensures that the component completes the transition before attempting to set focus in the FocusLock component.
    // This ensures the transition plays smoothly.
    inlineElement?.addEventListener('transitionend', handleTransitionEnd, {
      once: true,
    });

    return () => {
      inlineElement?.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        dispatch({type: 'modalDismissible'});
        // 400 is the duration of the transition
      }, 400);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [dispatch, visible]);

  // Locate the email input field in the DOM
  useEffect(() => {
    if (!anchorTo) return;

    let emailInput: HTMLElement | null;

    if (typeof anchorTo === 'string') {
      emailInput = isoDocument.querySelector(anchorTo);
    } else {
      emailInput = anchorTo.current;
    }

    const emailInputContainer = emailInput?.closest(
      '[id="contact-information-text-field-container"]',
    ) as HTMLElement | null;

    setEmailInput(emailInput);
    setEmailInputContainer(emailInputContainer);
  }, [anchorTo]);

  // Show/hide the email input depending on visible state
  useEffect(() => {
    if (!emailInputContainer) return;
    if (shimmering) return;

    emailInputContainer.style.setProperty('opacity', visible ? '0' : '1');

    return () => {
      emailInputContainer.style.removeProperty('opacity');
    };
  }, [emailInputContainer, shimmering, visible]);

  // Apply shimmer effect to email input
  useShopUserMatchedShimmerEffect({
    emailInputElement: emailInput,
    setShimmering,
    visible,
  });

  // Calculate height of email input and inline container
  const {
    emailInputResizeObserver,
    containerResizeObserver,
    inlineResizeObserver,
  } = useMemo(() => {
    if (typeof isoWindow === 'undefined' || !isoWindow.ResizeObserver) {
      return {
        emailInputResizeObserver: undefined,
        containerResizeObserver: undefined,
        inlineResizeObserver: undefined,
      };
    }

    return {
      emailInputResizeObserver: new ResizeObserver(([entry]) => {
        const height = entry.contentRect.height;
        setEmailInputContainerHeight(height);
      }),
      containerResizeObserver: new ResizeObserver(([entry]) => {
        const height = entry.contentRect.height;
        setContainerHeight(height);
      }),
      inlineResizeObserver: new ResizeObserver(([entry]) => {
        const height = entry.contentRect.height;
        setInlineHeight(height);
      }),
    };
  }, []);

  useResizeObserver({
    resizeObserver: emailInputResizeObserver,
    elementRef: emailInputContainer,
    setHeight: setEmailInputContainerHeight,
  });
  useResizeObserver({
    resizeObserver: containerResizeObserver,
    elementRef: containerRef.current,
    setHeight: setContainerHeight,
  });
  useResizeObserver({
    resizeObserver: inlineResizeObserver,
    elementRef: inlineRef.current,
    setHeight: setInlineHeight,
  });

  const handleDismiss = useCallback(
    (dismissMethod: ShopModalHiddenDismissMethod) => {
      if (!modalDismissible) return;
      onDismiss(dismissMethod);
    },
    [modalDismissible, onDismiss],
  );

  const showInline = visible && !shimmering;

  const containerClassName = classNames(
    'overflow-hidden transition-[height] duration-400 ease-cubic-modal will-change-transform [interpolate-size:allow-keywords] motion-reduce_duration-0',
    showInline ? 'h-auto' : 'h-0',
  );

  // Tailwind CSS does not support dynamic class values at runtime, so we need to use inline styles
  const containerStyle = {
    // Anchor to top of the email input field
    transform: `translateY(${-emailInputContainerHeight}px)`,

    // [interpolate-size:allow-keywords] is only supported in newer versions of Chrome, so can't rely on [h-0 -> h-auto] transition
    // To support other browsers, we'll calculate the height of the inline content and animate to that value
    height: showInline ? `${inlineHeight}px` : '0px',

    // Since we anchored to top of email input field, we need to offset the bottom margin to prevent dead space gap left by the translationY
    // Wait until height of inline container is greater than the email input field to prevent jumpy animation when expanding
    marginBottom:
      containerHeight >= 2 * emailInputContainerHeight
        ? `-${emailInputContainerHeight}px`
        : 0,
  };

  const inlineContentClassName = classNames(
    'overflow-hidden border border-solid border-grayscale-l2l bg-white opacity-0 transition-opacity duration-400 ease-cubic-modal will-change-transform motion-reduce_duration-0',
    !hideHeader && 'rounded-sm',
    showInline ? 'opacity-100' : 'opacity-0',
  );

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      style={containerStyle}
    >
      <FocusLock
        as="section"
        disabled={!inlineOpened}
        aria-modal="true"
        aria-hidden={!visible}
        aria-label={inlineTitle}
        className="focus_outline-none focus_outline-0"
        data-testid="authorize-inline"
        data-visible={visible}
        part="inline-authorize"
        ref={(ref: HTMLElement | null) => {
          inlineRef.current = ref;
        }}
        role="dialog"
      >
        <div className={inlineContentClassName}>
          {!hideHeader && (
            <AuthorizeHeader
              aria-hidden={!visible}
              className="aria-hidden_opacity-0"
              headerTitle={headerTitle}
              headerLogo={headerLogo}
              onDismiss={handleDismiss}
            />
          )}
          {children}
        </div>
      </FocusLock>
    </div>
  );
};

const useResizeObserver = ({
  resizeObserver,
  elementRef,
  setHeight,
}: {
  resizeObserver: ResizeObserver | undefined;
  elementRef: HTMLElement | null;
  setHeight: Dispatch<StateUpdater<number>>;
}) => {
  useEffect(() => {
    if (!resizeObserver || !elementRef) return;

    resizeObserver.observe(elementRef);

    // Set initial height
    setHeight(elementRef.offsetHeight);

    return () => {
      resizeObserver.disconnect();
    };
  }, [elementRef, resizeObserver, setHeight]);
};

const useShopUserMatchedShimmerEffect = ({
  emailInputElement,
  setShimmering,
  visible,
}: {
  emailInputElement: HTMLElement | null;
  setShimmering: Dispatch<StateUpdater<boolean>>;
  visible: boolean;
}) => {
  // Inject shimmer keyframes animation
  useEffect(() => {
    const styleId = 'inline-authorize-shimmer-keyframes';
    if (isoDocument.getElementById(styleId)) return;

    const style = isoDocument.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes shimmer {
        0% {
          background-position-x: 100%;
        }
        100% {
          background-position-x: 0%;
        }
      }
    `;
    isoDocument.head.appendChild(style);

    return () => {
      const style = isoDocument.getElementById(styleId);
      style?.remove();
    };
  }, []);

  const applyShimmerEffect = useCallback(() => {
    if (!emailInputElement) return;
    setShimmering(true);

    emailInputElement.style.setProperty(
      'background-image',
      `
        linear-gradient(
          90deg,
          var(--x-default-color-text) 0%,
          var(--x-default-color-text) 35%,
          var(--x-default-color-accent) 48%,
          var(--x-default-color-accent) 52%,
          var(--x-default-color-text) 65%,
          var(--x-default-color-text) 100%
        )
      `,
    );
    emailInputElement.style.setProperty('background-size', '300% 100%');
    emailInputElement.style.setProperty('background-clip', 'text');
    emailInputElement.style.setProperty('background-color', 'transparent');
    emailInputElement.style.setProperty('color', 'transparent');
    emailInputElement.style.setProperty(
      'caret-color',
      'var(--x-default-color-text)',
    );
    emailInputElement.style.setProperty('animation', 'shimmer 3000ms ease-out');
  }, [emailInputElement, setShimmering]);

  const removeShimmerEffect = useCallback(() => {
    if (!emailInputElement) return;
    setShimmering(false);

    emailInputElement.style.removeProperty('background-image');
    emailInputElement.style.removeProperty('background-size');
    emailInputElement.style.removeProperty('background-clip');
    emailInputElement.style.removeProperty('background-color');
    emailInputElement.style.removeProperty('color');
    emailInputElement.style.removeProperty('caret-color');
    emailInputElement.style.removeProperty('animation');
  }, [emailInputElement, setShimmering]);

  // There's a weird bug where the shimmer effect is not applied if the email is entered via autocomplete
  // But once we start typing after an autocomplete, the shimmer effect is applied
  // So this is a workaround to force the email input field to re-render so that the shimmer effect is applied
  const forceBrowserRender = useCallback(() => {
    if (!emailInputElement) return;

    const input = emailInputElement as HTMLInputElement;
    const originalValue = input.value;
    input.value = `${originalValue} `;

    // eslint-disable-next-line no-void
    void input.offsetHeight;
    input.value = originalValue;
  }, [emailInputElement]);

  // Shimmer animation completion handler
  useEffect(() => {
    if (!emailInputElement) return;

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === 'shimmer') {
        removeShimmerEffect();
      }
    };

    emailInputElement.addEventListener('animationend', handleAnimationEnd);

    return () => {
      emailInputElement.removeEventListener('animationend', handleAnimationEnd);
      removeShimmerEffect();
    };
  }, [emailInputElement, removeShimmerEffect]);

  // Subscribe to shopUserMatched events
  useElementEventListener({
    shopusermatched: () => {
      // This prevents the inline from dismissing itself when the user chooses to send code via email, passkey, etc.
      if (visible) return;

      forceBrowserRender();
      applyShimmerEffect();
    },
    modalclosed: () => {
      removeShimmerEffect();
    },
  });
};
