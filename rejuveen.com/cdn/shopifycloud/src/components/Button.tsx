import type {ComponentChildren} from 'preact';
import {forwardRef, type ButtonHTMLAttributes} from 'preact/compat';

import {classNames} from '~/utils/css';

export interface ButtonProps extends ButtonHTMLAttributes {
  children: ComponentChildren;
  disableTransition?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({children, className, disableTransition = false, ...props}, ref) => {
    return (
      <button
        {...props}
        className={classNames(
          'relative m-0 flex w-auto items-center overflow-visible rounded-login-button bg-purple-primary p-0 hover_enabled_bg-purple-d0 focus_enabled_outline-none focus_enabled_ring focus_enabled_ring-purple-l1 focus-visible_enabled_outline-none focus-visible_enabled_ring focus-visible_enabled_ring-purple-l1 disabled_opacity-50',
          !disableTransition && 'transition-all',
          className,
        )}
        ref={ref}
        type="button"
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
