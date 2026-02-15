import {classNames} from '~/utils/css';

export interface SpinnerProps {
  className?: string;
  color: 'purple' | 'white';
  processing?: boolean;
}

export function Spinner({className, color, processing = false}: SpinnerProps) {
  return (
    <div
      className={classNames(
        'pointer-events-none absolute inset-0 z-50 flex items-center justify-center rounded-login-button opacity-100 data-hidden_opacity-0',
        className,
      )}
      data-testid="shop-login-spinner"
      data-visible={processing}
    >
      <svg
        className={classNames(
          color === 'purple' ? 'text-purple-primary' : 'text-white',
        )}
        data-testid="shop-login-spinner-svg"
        fill="none"
        height={16}
        viewBox="0 0 52 58"
        width={16}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="animate-reveal will-change-transform stroke-dasharray-reveal stroke-dashoffset-reveal"
          d="M3 13C5 11.75 10.4968 6.92307 21.5 6.4999C34.5 5.99993 42 13 45 23C48.3 34 42.9211 48.1335 30.5 51C17.5 54 6.6 46 6 37C5.46667 29 10.5 25 14 23"
          stroke="currentColor"
          strokeWidth={14}
        />
      </svg>
    </div>
  );
}
