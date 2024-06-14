import React from 'react';

type ContentBodyProps = {
  children: React.ReactNode;
  className?: string;
};
export const ContentBody: React.FC<ContentBodyProps> = ({
  className,
  children
}: ContentBodyProps) => {
  return (
    <div className={'pl-4 pr-4 pt-1 pb-1 w-full ' + className}>{children}</div>
  );
};
