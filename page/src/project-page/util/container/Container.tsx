import React from 'react';
import { ContainerContent, ContainerContentProps } from './ContainerContent';
import { ContainerHeader, ContainerHeaderProps } from './ContainerHeader';

export type ContainerProps = {
  children?: React.ReactNode;
  grey?: boolean;
  containerSize: 'sm' | 'md' | 'lg';
};
export const Container: React.FC<ContainerProps> & {
  Content: React.FC<ContainerContentProps>;
  Header: React.FC<ContainerHeaderProps>;
} = ({ children, grey, containerSize }: ContainerProps) => {
  return (
    <div
      className={
        'mx-auto p-8  text-center ' + (grey ? 'bg-base-200' : 'bg-base-100')
      }
    >
      <div
        className={
          'container m-auto ' +
          (containerSize === 'sm' && 'max-w-4xl') +
          ' ' +
          (containerSize === 'md' && 'max-w-6xl') +
          ' ' +
          (containerSize === 'lg' && 'max-w-7xl')
        }
      >
        {children}
      </div>
    </div>
  );
};
Container.Header = ContainerHeader;
Container.Content = ContainerContent;
