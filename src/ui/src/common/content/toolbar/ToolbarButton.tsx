import React from 'react';
import { ReactSVG } from 'react-svg';
type ToolbarButtonProps = {
  icon: string;
  label?: string;
  disabled?: boolean;
  hide?: boolean;
  hoverHint?: string;
  onClick: () => void;
};
export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  hoverHint,
  hide = false,
  disabled = false,
  onClick
}: ToolbarButtonProps) => {
  const hasLabel = label !== undefined && label.length > 0;
  return !hide ? (
    <button
      className={
        'btn btn-sm rounded-none group relative ' +
        (hasLabel ? '' : 'btn-square')
      }
      onClick={onClick}
      disabled={disabled}
    >
      {hasLabel && <span>{label}</span>}
      {hoverHint && (
        <span className="group-hover:opacity-100 opacity-0 absolute top-0 text-xs mt-[-30px] bg-base-100 p-1 transition-opacity ease-in-out border-base-200 border min-w-max">
          {hoverHint}
        </span>
      )}
      <ReactSVG src={icon}></ReactSVG>
    </button>
  ) : (
    <></>
  );
};
