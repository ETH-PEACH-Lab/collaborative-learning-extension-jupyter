import React from 'react';
export type ContainerContentProps = {
  children?: React.ReactNode;
};
export const ContainerContent: React.FC<ContainerContentProps> = ({
  children
}: ContainerContentProps) => {
  return <div className="mt-2 text-left">{children}</div>;
};
