import React from 'react';
import { SVG } from '../../icon';

export type BaseButtonProps = {
  label?: string;
  className?: string;
  icon?: string;
  disabled?: boolean;
  hide?: boolean;
  hoverHint?: string;
  hoverHintDown?: boolean;
  onClick: () => void;
};
export const BaseButton: React.FC<BaseButtonProps> = ({
  label,
  className,
  icon,
  hide,
  disabled = false,
  hoverHint,
  hoverHintDown,
  onClick
}: BaseButtonProps) => {
  return hide ? (
    <></>
  ) : (
    <button
      onClick={onClick}
      className={
        'group/btn btn btn-light rounded-none btn-sm hover:border-base-300 hover:bg-base-300 ' +
        className
      }
      disabled={disabled}
    >
      {label ? (icon ? label + ' ' : label) : ''} {icon && <SVG icon={icon} />}
      {hoverHint && (
        <span
          className={
            'group-hover/btn:opacity-100 absolute opacity-0 text-xs bg-base-100 p-1 transition-opacity ease-in-out border-base-200 border min-w-max ' +
            'group-hover/btn:delay-300 group-hover/btn:z-50 -z-50 select-none ' +
            (hoverHintDown ? 'top-[100%] ' : 'bottom-[100%]')
          }
        >
          {hoverHint}
        </span>
      )}
    </button>
  );
};
