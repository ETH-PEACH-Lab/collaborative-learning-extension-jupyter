import React from 'react';
import { ReactSVG } from 'react-svg';

type BaseButtonProps = {
  label?: string;
  className?: string;
  icon?: string;
  disabled?: boolean;
  onClick: () => void;
};
export const BaseButton: React.FC<BaseButtonProps> = ({
  label,
  className,
  icon,
  disabled = false,
  onClick
}: BaseButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={'btn btn-light btn-sm ' + className}
      disabled={disabled}
    >
      {label ? (icon ? label + ' ' : label) : ''}{' '}
      {icon && <ReactSVG src={icon}></ReactSVG>}
    </button>
  );
};
