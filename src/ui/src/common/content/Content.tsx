import React from 'react';
type CellProps = {
  className?: string;
  borderOnHover?: boolean;
  children: React.ReactNode;
};
export const Content: React.FC<CellProps> = ({
  borderOnHover = false,
  children,
  className
}: CellProps) => {
  return (
    <div
      className={
        'relative transition-all ease-in-out duration-300 group mt-2 ' +
        className +
        (borderOnHover
          ? ' focus-within:border-solid hover:border-solid hover:focus-within:border-base-300 focus-within:border-base-300 ' +
            ' hover:border-base-200 border-2 border-base-100'
          : ' border-solid border-base-200 border-2')
      }
      style={{ minHeight: '24px' }}
    >
      {children}
    </div>
  );
};
