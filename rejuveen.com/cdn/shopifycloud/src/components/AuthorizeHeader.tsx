import type {ComponentChildren} from 'preact';

import {useI18n} from '~/foundation/I18n/hooks';
import type {ShopModalHiddenDismissMethod} from '~/types/analytics';
import {classNames} from '~/utils/css';

import {CloseIcon} from './CloseIcon';

interface AuthorizeHeaderProps {
  className?: string;
  headerTitle?: string;
  headerLogo?: ComponentChildren;
  onDismiss: (dismissMethod: ShopModalHiddenDismissMethod) => void;
}

export const AuthorizeHeader = ({
  className,
  headerTitle,
  headerLogo,
  onDismiss,
}: AuthorizeHeaderProps) => {
  const {translate} = useI18n();

  const hasHeaderTitle = Boolean(headerTitle);
  const headerVariant = hasHeaderTitle ? 'with-title' : 'default';

  const headerClassName = classNames(
    'flex w-full items-center p-4 pb-2',
    headerLogo ? 'justify-between' : 'justify-end',
    hasHeaderTitle &&
      'mb-5 gap-x-4 border-b border-solid border-grayscale-l2l px-5 pb-4',
    className,
  );

  return (
    <div
      className={headerClassName}
      data-testid="authorize-modal-header"
      data-variant={headerVariant}
    >
      {headerLogo}
      {hasHeaderTitle && (
        <div className="flex-1 font-sans text-body-large">{headerTitle}</div>
      )}
      <button
        aria-label={
          translate('button.close', {
            defaultValue: 'Close',
          }) as string
        }
        className="group relative z-50 flex size-6 cursor-pointer rounded-max"
        data-testid="authorize-modal-close-button"
        onClick={() => onDismiss('close_button')}
        type="button"
      >
        <CloseIcon className="size-6 text-grayscale-l4 transition-colors group-hover_text-grayscale-l2l" />
        <div className="absolute inset-05 -z-10 rounded-max bg-grayscale-primary-light" />
      </button>
    </div>
  );
};
