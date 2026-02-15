import {forwardRef} from 'preact/compat';

import {classNames} from '~/utils/css';

import {Button} from './Button';
import type {ButtonProps} from './Button';

interface BrandedButtonProps extends ButtonProps {
  bordered?: boolean;
  buttonClassName?: string;
  fullWidth?: boolean;
}

export const BrandedButton = forwardRef<HTMLButtonElement, BrandedButtonProps>(
  (
    {bordered, buttonClassName, children, className, fullWidth, ...props},
    ref,
  ) => {
    return (
      <Button
        {...props}
        className={classNames(
          'm-auto',
          bordered ? 'border border-solid border-white/20' : 'border-none',
          fullWidth ? 'w-full justify-center' : undefined,
          buttonClassName,
        )}
        ref={ref}
      >
        <span
          className={classNames(
            'mx-auto flex cursor-pointer items-center justify-center gap-text-icon whitespace-nowrap p-shop-button font-sans text-branded-button text-white',
            className,
          )}
        >
          {children}
        </span>
      </Button>
    );
  },
);

BrandedButton.displayName = 'BrandedButton';
