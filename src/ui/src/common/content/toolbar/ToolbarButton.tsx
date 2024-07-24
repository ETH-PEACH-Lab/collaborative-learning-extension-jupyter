import React from 'react';
import { BaseButton, BaseButtonProps } from '../../button';
type ToolbarButtonProps = BaseButtonProps & {
  hide?: boolean;
};
export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  hoverHint,
  hide = false,
  disabled = false,
  hoverHintDown = false,
  className,
  onClick
}: ToolbarButtonProps) => {
  const hasLabel = label !== undefined && label.length > 0;
  return !hide ? (
    <span className="relative">
      <BaseButton
        className={(hasLabel ? '' : 'btn-square ') + (className ?? ' ')}
        onClick={onClick}
        disabled={disabled}
        icon={icon}
        label={label}
        hoverHint={hoverHint}
        hoverHintDown={hoverHintDown}
      />
    </span>
  ) : (
    <></>
  );
};
