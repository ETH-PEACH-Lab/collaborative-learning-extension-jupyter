import React from 'react';
type ToolbarButtonProps = {
  icon: string;
  disabled?: boolean;
  hide?: boolean;
  onClick: () => void;
};
export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  hide = false,
  disabled = false,
  onClick
}: ToolbarButtonProps) => {
  return !hide ? (
    <button
      className="btn rounded-none btn-square btn-sm p-2"
      onClick={onClick}
      disabled={disabled}
    >
      {' '}
      <span dangerouslySetInnerHTML={{ __html: icon }}></span>
    </button>
  ) : (
    <></>
  );
};
