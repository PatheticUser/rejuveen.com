import type {Side} from '@floating-ui/dom';
import {autoUpdate, flip, offset, shift} from '@floating-ui/dom';
import type {ComponentChildren, RefObject} from 'preact';
import {createPortal} from 'preact/compat';
import {useCallback, useEffect, useMemo, useRef, useState} from 'preact/hooks';

import {useAuthorizeState} from '~/foundation/AuthorizeState/hooks';
import {useRootProvider} from '~/foundation/RootProvider/hooks';
import {useFloating} from '~/hooks/useFloating';
import {arrow} from '~/hooks/useFloating/arrow';
import {useScreenSize} from '~/hooks/useScreenSize';
import type {ShopModalHiddenDismissMethod} from '~/types/analytics';
import type {ModalType} from '~/types/modal';
import type {PortalProviderVariant} from '~/types/portalProvider';
import {isIntersectionObserverSupported} from '~/utils/browser';
import {classNames} from '~/utils/css';
import {isoDocument} from '~/utils/document';
import {isoWindow} from '~/utils/window';

import {AuthorizeHeader} from './AuthorizeHeader';
import {FocusLock} from './FocusLock';
import {PortalProvider} from './PortalProvider';

interface ModalProps {
  anchorTo?: string | RefObject<HTMLElement>;
  children?: ComponentChildren;
  disableMinWidth?: boolean;
  headerLogo?: ComponentChildren;
  headerTitle?: string;
  hideHeader?: boolean;
  key?: string;
  modalTitle?: string;
  onDismiss: (dismissMethod: ShopModalHiddenDismissMethod) => void;
  onModalInViewport?: () => void;
  popupDisabled?: boolean;
  type?: ModalType;
  variant: PortalProviderVariant;
  visible?: boolean;
}

type Offset<T extends Side> = T extends 'bottom'
  ? {
      bottom?: never;
      left?: number | string;
      right?: never;
      top?: number | string;
    }
  : T extends 'left'
    ? {
        bottom?: never;
        left?: never;
        right?: number | string;
        top?: number | string;
      }
    : T extends 'right'
      ? {
          bottom?: never;
          left?: number | string;
          right?: never;
          top?: number | string;
        }
      : {
          bottom?: number | string;
          left?: number | string;
          right?: never;
          top?: never;
        };

type OffsetRecord = {
  [K in Side]: Offset<K>;
};

/**
 * This array is used to determine the order in which the modal should attempt to be placed.
 * The first placement in the array is the default placement. If the modal cannot be placed
 * in the default position, it will attempt to place it in the next position in the array.
 */
const MODAL_PLACEMENT_PRIORITIES: Side[] = ['right', 'left', 'bottom', 'top'];

export const Modal = ({
  anchorTo,
  children,
  headerLogo,
  headerTitle,
  hideHeader = false,
  disableMinWidth = false,
  key,
  modalTitle = 'Sign in with Shop',
  onDismiss,
  onModalInViewport,
  popupDisabled,
  type,
  variant,
  visible,
}: ModalProps) => {
  const {dispatch, modalDismissible} = useAuthorizeState();
  const anchorObserverRef = useRef<IntersectionObserver | null>(null);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const modalObserverRef = useRef<IntersectionObserver | null>(null);
  const modalRef = useRef<HTMLElement | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const {instanceId} = useRootProvider();
  const initialDocumentOverflowValue = useRef<string | null>(null);

  // If changing placement or fallbackPlacements, floatingArrow may need to be updated.
  const {floatingStyles, middlewareData, refs, update} = useFloating({
    middleware: [
      flip({
        crossAxis: false,
        fallbackPlacements: MODAL_PLACEMENT_PRIORITIES.slice(1),
      }),
      shift({
        padding: 30,
      }),
      offset(30),
      arrow({
        element: arrowRef,
        padding: 28,
      }),
    ],
    placement: MODAL_PLACEMENT_PRIORITIES[0],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (anchorTo) {
      let element: HTMLElement | null;
      if (typeof anchorTo === 'string') {
        // Attempt to locate the element within the DOM
        element = isoDocument.querySelector(anchorTo);
      } else {
        element = anchorTo.current;
      }

      setAnchorElement(element);
      refs.setReference(element);
      update();
    }
  }, [anchorTo, refs, update]);

  if (initialDocumentOverflowValue.current === null) {
    initialDocumentOverflowValue.current =
      isoDocument.documentElement.style.overflow;
  }

  if (!modalObserverRef.current && isIntersectionObserverSupported()) {
    modalObserverRef.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const bounds = entry.boundingClientRect;

        if (bounds.top < 0) {
          isoWindow.scrollTo({
            top: 0,
            left: 0,
          });
        }

        if (entry.isIntersecting) {
          onModalInViewport?.();
        }
      }
    });
  }

  if (!anchorObserverRef.current && isIntersectionObserverSupported()) {
    anchorObserverRef.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const bounds = entry.boundingClientRect;

        if (bounds.top < 0) {
          isoWindow.scrollTo({
            top: 0,
            left: 0,
          });
        }

        if (!entry.isIntersecting && (entry.target as HTMLElement).offsetTop) {
          // Get the height of the modal and divide it in half. Use that (plus 30px padding outside) as the
          // scroll position to ensure the modal is centered with the anchor element.
          const anchorHeight = anchorElement?.offsetHeight || 0;
          const modalHeight = modalRef.current?.offsetHeight || 0;
          const modalOffset = modalHeight / 2;
          const padding = 30;
          const offset = anchorHeight + modalOffset + padding;

          isoWindow.scrollTo({
            // 60 is used as a buffer to keep the modal from sticking to the top of the screen.
            // We add that value to the height of the anchor element to ensure that the anchor is fully visible.
            top: (entry.target as HTMLElement).offsetTop - offset,
          });
        }
      }
    });
  }

  // Disconnect observers when we unmount.
  useEffect(() => {
    return () => {
      if (modalObserverRef.current) {
        modalObserverRef.current.disconnect();
      }

      if (anchorObserverRef.current) {
        anchorObserverRef.current.disconnect();
      }
    };
  }, []);

  const {isDesktop} = useScreenSize();

  const positioning: 'center' | 'dynamic' = useMemo(() => {
    if (anchorElement && !popupDisabled && isDesktop) {
      return 'dynamic';
    }

    return 'center';
  }, [anchorElement, isDesktop, popupDisabled]);

  useEffect(() => {
    const documentElement = isoDocument.documentElement;
    const initialOverflow = documentElement?.style.overflow;

    /**
     * Reset document overflow value if the modal is unmounted, just in case
     * the modal was removed without the onDismiss callback being called.
     * */
    return () => {
      if (initialOverflow && documentElement) {
        documentElement.style.overflow = initialOverflow;
      } else {
        documentElement.style.removeProperty('overflow');
      }
    };
  }, []);

  const handleDismiss = useCallback(
    (dismissMethod: ShopModalHiddenDismissMethod) => {
      if (!modalDismissible) {
        return;
      }

      onDismiss(dismissMethod);

      isoDocument.documentElement.style.overflow =
        initialDocumentOverflowValue.current || '';
    },
    [modalDismissible, onDismiss],
  );

  useEffect(() => {
    function downHandler({key}: KeyboardEvent) {
      if (key === 'Escape' || key === 'Esc') {
        handleDismiss('keyboard');
      }
    }

    isoWindow.addEventListener('keydown', downHandler);

    return () => {
      isoWindow.removeEventListener('keydown', downHandler);
    };
  }, [handleDismiss]);

  useEffect(() => {
    if (visible) {
      // Lock the page behind the overlay to prevent scrolling so our
      // modal doesn't become detached from the anchor element.
      isoDocument.documentElement.style.overflow = 'hidden';

      if (modalObserverRef.current && modalRef.current) {
        modalObserverRef.current.observe(modalRef.current);
      }

      if (anchorObserverRef.current && anchorElement) {
        anchorObserverRef.current.observe(anchorElement);
      }
    } else {
      if (modalObserverRef.current && modalRef.current) {
        modalObserverRef.current.unobserve(modalRef.current);
      }

      if (anchorObserverRef.current && anchorElement) {
        anchorObserverRef.current.unobserve(anchorElement);
      }

      isoDocument.documentElement.style.overflow =
        initialDocumentOverflowValue.current || '';
    }
  }, [anchorElement, handleDismiss, visible]);

  useEffect(() => {
    if (!visible) {
      setModalOpened(false);
      return;
    }

    const handleTransitionEnd = () => {
      setModalOpened(true);
    };

    /**
     * Update the modalOpened state after the modal has finished transitioning.
     * This ensures that the modal completes the transition before attempting to set focus in the FocusLock component.
     * This ensures the transition plays smoothly.
     */
    modalRef.current?.addEventListener('transitionend', handleTransitionEnd, {
      once: true,
    });

    return () => {
      modalRef.current?.removeEventListener(
        'transitionend',
        handleTransitionEnd,
      );
    };
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        dispatch({type: 'modalDismissible'});
        // 400 is the duration of the modal transition
      }, 400);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [dispatch, visible]);

  const backgroundClassName = classNames(
    'fixed inset-0 z-10 bg-overlay transition-opacity duration-400 ease-cubic-modal motion-reduce_duration-0',
    visible ? 'opacity-100' : 'opacity-0',
  );

  const containerClassName = classNames(
    'fixed inset-0 z-max overflow-hidden',
    positioning === 'center' && 'flex items-center justify-center',
    visible ? 'visible' : 'pointer-events-none invisible',
  );

  const modalMinWidthClass = type === 'wide' ? 'min-w-100' : 'min-w-85';
  // Only add max-width constraint for checkoutModal variant to fix width issue
  let modalMaxWidthClass = '';
  if (variant === 'checkoutModal') {
    modalMaxWidthClass =
      type === 'wide' ? 'max-w-100 sm_max-w-none' : 'max-w-85 sm_max-w-none';
  }
  const modalClassName = classNames(
    'relative z-50 bg-white transition duration-400 ease-cubic-modal will-change-transform focus_outline-none focus_outline-0 motion-reduce_duration-0 sm_absolute sm_inset-x-0 sm_bottom-0 sm_top-auto sm_rounded-b-none',
    visible ? 'opacity-100 sm_translate-y-0' : 'opacity-0 sm_translate-y-full',
    positioning === 'dynamic' && visible ? 'scale-100' : '',
    positioning === 'dynamic' && !visible ? 'scale-0 sm_scale-100' : '',
    !disableMinWidth && modalMinWidthClass,
    modalMaxWidthClass,
    !hideHeader && 'rounded-xxl',
    // On mobile devices, set this to the full browser height (not the full viewport height)
    // This keeps the modal from being hidden by the URL bar on Android Chrome.
    // Docs: https://developer.chrome.com/blog/url-bar-resizing
    !isDesktop && 'max-h-full',
  );

  // A mobile-specific style to ensure the modal height reflects the "safe" area, minus insets.
  const maxSafeHeightStyle = useMemo(() => {
    if (isDesktop) {
      return {};
    }

    let maxHeight =
      'calc(100vh - env(safe-area-inset-bottom, 0) - env(safe-area-inset-top, 0))';

    // Fallback that addresses some wonky scrolling on older IOS Safari versions.
    if ('webkitTouchCallout' in isoDocument.documentElement.style) {
      maxHeight = '-webkit-fill-available';
    }

    return {
      maxHeight,
    };
  }, [isDesktop]);

  const modalContentClassName = classNames(
    'relative flex flex-col sm_rounded-b-none',
  );

  const modalChildrenClassName = classNames(
    'flex-1 overflow-y-auto',
    isDesktop && 'rounded-xxl',
  );

  /**
   * Positions the arrow based on the modal position fallbacks.
   *
   * Options:
   * - 1: Modal not anchored. Early return.
   * - 2: Modal anchored right. Arrow uses the top offset to continue pointing to the anchor,
   * even if the input is not vertically centered in the viewport.
   * - 3: Modal anchored top. Arrow at the bottom.
   * - 4: Modal anchored bottom. Arrow at the top.
   */
  const floatingArrow = useMemo(() => {
    if (positioning === 'center') {
      return null;
    }

    const offsets: OffsetRecord = {
      right: {
        top: middlewareData.arrow?.y,
        left: middlewareData.arrow?.x || '-10px',
      },
      left: {
        top: middlewareData.arrow?.y,
        right: middlewareData.arrow?.x || '-10px',
      },
      bottom: {
        top: '-10px',
        left: middlewareData.arrow?.x || '-10px',
      },
      top: {
        bottom: '-10px',
        left: middlewareData.arrow?.x || '-10px',
      },
    };

    /**
     * If there are 3 overflows, then the last placement is used.
     * If there are 2 overflows, then the third placement is used.
     * If there is 1 overflow, then the second placement is used.
     * If there is no overflows, then the first/main placement is used.
     */
    const direction =
      MODAL_PLACEMENT_PRIORITIES[middlewareData.flip?.overflows?.length || 0];

    const style = offsets[direction];

    const arrowClassname = classNames(
      'absolute z-30 block size-6 rotate-45 rounded-xs duration-400 ease-cubic-modal sm_hidden',
      direction === 'top' ? 'bg-grayscale-l4' : 'bg-white',
    );

    return (
      <div
        className={arrowClassname}
        data-testid="authorize-modal-arrow"
        ref={arrowRef}
        style={style}
      />
    );
  }, [
    middlewareData.arrow?.x,
    middlewareData.arrow?.y,
    middlewareData.flip?.overflows,
    positioning,
  ]);

  const modalStyleValue =
    positioning === 'dynamic' ? floatingStyles : undefined;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const ariaHiddenProps = visible ? {} : {'aria-hidden': true};

  return createPortal(
    <PortalProvider
      instanceId={instanceId}
      key={key}
      type="modal"
      variant={variant}
    >
      <div
        className={containerClassName}
        data-testid="authorize-modal-container"
        data-variant={type}
      >
        <div
          {...ariaHiddenProps}
          className={backgroundClassName}
          data-testid="authorize-modal-overlay"
          onClick={() => handleDismiss('overlay')}
        />

        <FocusLock
          as="section"
          disabled={!modalOpened}
          aria-modal="true"
          {...ariaHiddenProps}
          aria-label={modalTitle}
          className={modalClassName}
          data-testid="authorize-modal"
          data-visible={visible}
          part="modal"
          ref={(ref: HTMLElement | null) => {
            modalRef.current = ref;
            if (anchorElement) {
              refs.setFloating(ref);
              update();
            }
          }}
          role="dialog"
          style={modalStyleValue}
        >
          <div
            data-testid="authorize-modal-content"
            className={modalContentClassName}
            style={maxSafeHeightStyle}
          >
            {!hideHeader && (
              <AuthorizeHeader
                headerTitle={headerTitle}
                headerLogo={headerLogo}
                onDismiss={handleDismiss}
              />
            )}
            <div className={modalChildrenClassName}>{children}</div>
          </div>
          {floatingArrow}
        </FocusLock>
      </div>
    </PortalProvider>,
    isoDocument.body,
  );
};
