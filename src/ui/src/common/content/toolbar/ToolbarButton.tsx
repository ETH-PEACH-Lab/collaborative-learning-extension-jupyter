import React from 'react';
type ToolbarButtonProps = {
  icon: string;
  label?: string;
  disabled?: boolean;
  hide?: boolean;
  onClick: () => void;
};
export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  hide = false,
  disabled = false,
  onClick
}: ToolbarButtonProps) => {
  const hasLabel = label !== undefined && label.length > 0;
  return !hide ? (
    <button
      className={'btn btn-sm rounded-none ' + (hasLabel ? '' : 'btn-square')}
      onClick={onClick}
      disabled={disabled}
    >
      {hasLabel && <span>{label}</span>}

      <span dangerouslySetInnerHTML={{ __html: icon }}></span>
    </button>
  ) : (
    <></>
  );
};
