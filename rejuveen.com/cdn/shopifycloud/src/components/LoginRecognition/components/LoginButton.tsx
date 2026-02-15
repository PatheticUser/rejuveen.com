import type {ComponentChildren} from 'preact';
import {forwardRef} from 'preact/compat';

import {BrandedButton} from '~/components/BrandedButton';
import {Spinner} from '~/components/Spinner';
import {useShopLogin} from '~/foundation/ShopLogin/useShopLogin';
import {classNames} from '~/utils/css';

export interface LoginButtonProps {
  children?: ComponentChildren;
  onClick?: () => void;
  visible?: boolean;
}

export const LoginButton = forwardRef<HTMLButtonElement, LoginButtonProps>(
  ({children, onClick, visible = true}, ref) => {
    const {state} = useShopLogin();

    return (
      <div
        className={classNames('relative', !visible && 'invisible hidden')}
        data-testid="login-button-container"
      >
        <BrandedButton
          buttonClassName={classNames(
            state.parentTheme === 'dark' && 'shadow-sm',
            state.processing && 'pointer-events-none',
          )}
          className="p-shop-login"
          data-testid="login-button"
          bordered={state.parentTheme === 'dark'}
          fullWidth
          onClick={() => {
            if (state.processing) return;
            onClick?.();
          }}
          ref={ref}
        >
          {children}
        </BrandedButton>

        <Spinner
          className="bg-purple-primary"
          color="white"
          processing={state.processing}
        />
      </div>
    );
  },
);

LoginButton.displayName = 'LoginButton';
