import React from 'react';
export type ContainerHeaderProps = {
  children?: React.ReactNode;
};
export const ContainerHeader: React.FC<ContainerHeaderProps> = ({
  children
}: ContainerHeaderProps) => {
  return <h2>{children}</h2>;
};
