import type {ComponentChildren} from 'preact';
import type {HTMLAttributes} from 'preact/compat';
import {forwardRef, useLayoutEffect, useRef} from 'preact/compat';

import {findFirstFocusableNode, findLastFocusableNode} from '~/utils/focus';

interface FocusLockProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section';
  children: ComponentChildren;
  disabled?: boolean;
}

export const FocusLock = forwardRef<HTMLElement, FocusLockProps>(
  (
    {as: Component = 'div', children, disabled = false, ...wrapperProps},
    forwardedRef,
  ) => {
    const rootRef = useRef<HTMLElement | null>(null);
    const startRef = useRef<HTMLDivElement | null>(null);
    const endRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
      // Do not change focus if the trap is disabled
      if (disabled) return;

      // Focus on the root node
      rootRef.current?.focus();
    }, [disabled]);

    const moveFocus = (focusFirst: boolean) => {
      const rootNode = rootRef.current;
      if (!rootNode || disabled) return;

      const focusableElement =
        (focusFirst
          ? findFirstFocusableNode(rootNode)
          : findLastFocusableNode(rootNode)) || rootNode;
      focusableElement.focus();
    };

    const updateRefs = (node: HTMLElement | null) => {
      rootRef.current = node;

      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const focusGuardTabIndex = disabled ? -1 : 0;
    const focusGuardClassName =
      'absolute -m-px h-px w-px overflow-hidden whitespace-nowrap p-0';

    return (
      <>
        {/* Focus trap start */}
        <div
          className={focusGuardClassName}
          ref={startRef}
          onFocus={() => moveFocus(false)}
          tabIndex={focusGuardTabIndex}
        />
        {/* Ensure provided wrapper has tabIndex set, and we have a ref for DOM manipulations */}
        <Component {...wrapperProps} ref={updateRefs} tabIndex={-1}>
          {children}
        </Component>
        {/* Focus trap end */}
        <div
          className={focusGuardClassName}
          ref={endRef}
          onFocus={() => moveFocus(true)}
          tabIndex={focusGuardTabIndex}
        />
      </>
    );
  },
);
