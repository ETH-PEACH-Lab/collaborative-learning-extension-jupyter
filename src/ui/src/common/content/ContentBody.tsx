import React from 'react';

type ContentBodyProps = {
  children: React.ReactNode;
};
export const ContentBody: React.FC<ContentBodyProps> = ({
  children
}: ContentBodyProps) => {
  return <div className="pl-4 pr-4 pt-1 pb-1 w-full">{children}</div>;
};
