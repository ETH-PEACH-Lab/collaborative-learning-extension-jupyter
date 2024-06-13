import React from 'react';
import { RightAlignedToolbar } from '../../toolbar';
type ToolbarProps = {
  children: React.ReactNode;
  showOnHover?: boolean;
  absolute?: boolean;
  className?: string;
};
export const Toolbar: React.FC<ToolbarProps> = ({
  children,
  className,
  showOnHover = true,
  absolute = false
}: ToolbarProps) => {
  return (
    <RightAlignedToolbar className={className}>
      <div
        className={
          (showOnHover
            ? 'transition ease-in-out duration-200 opacity-0 group-hover:opacity-100 '
            : '') + (absolute ? 'absolute top-0 right-0 z-10' : 'inline-flex')
        }
      >
        {!absolute ? children : <div className="inline-flex"> {children} </div>}
      </div>
    </RightAlignedToolbar>
  );
};
