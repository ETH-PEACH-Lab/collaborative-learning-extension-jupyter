import React from 'react';
import { SVG } from '../../../icon';
type ToolbarButtonProps = {
  icon: string;
  label?: string;
  disabled?: boolean;
  hide?: boolean;
  hoverHint?: string;
  hoverHintDown?: boolean;
  onClick: () => void;
};
export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  hoverHint,
  hide = false,
  disabled = false,
  hoverHintDown = false,
  onClick
}: ToolbarButtonProps) => {
  const hasLabel = label !== undefined && label.length > 0;
  return !hide ? (
    <span className="relative">
      <button
        className={
          'btn btn-sm rounded-none peer/btn ' + (hasLabel ? '' : 'btn-square')
        }
        onClick={onClick}
        disabled={disabled}
      >
        {hasLabel && <span>{label}</span>}
        <SVG icon={icon} />
      </button>
      {hoverHint && (
        <span
          className={
            'peer-hover/btn:opacity-100 absolute m-auto opacity-0 translate-x-[calc(-50%-16px)] text-xs bg-base-100 p-1 transition-opacity ease-in-out border-base-200 border min-w-max ' +
            'peer-hover/btn:delay-300 peer-hover/btn:z-50 -z-50 select-none ' +
            (hoverHintDown
              ? 'top-0 translate-y-[34px] '
              : 'bottom-0 translate-y-[-34px]')
          }
        >
          {hoverHint}
        </span>
      )}
    </span>
  ) : (
    <></>
  );
};
