import React from 'react';
type RightToolbarProps = {
  children: React.ReactNode;
  className?: string;
};
export const RightAlignedToolbar = (props: RightToolbarProps) => {
  return (
    <div className={'flex justify-end ' + props.className}>
      {props.children}
    </div>
  );
};
