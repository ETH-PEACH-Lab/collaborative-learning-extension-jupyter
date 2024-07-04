import React from 'react';
import { Content, ContentBody } from '../content';
type IndicatorProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  toolbar?: React.ReactNode;
};
export const Indicator = ({
  label,
  className,
  children,
  toolbar
}: IndicatorProps) => {
  return label ? (
    <Content className={'indicator w-full pb-3 grid ' + className}>
      {toolbar}
      {label && (
        <div className="indicator-item indicator-center badge text-center">
          {label}
        </div>
      )}

      <ContentBody className="pt-3">{children}</ContentBody>
    </Content>
  ) : (
    <ContentBody className={className}>
      {toolbar}
      {children}
    </ContentBody>
  );
};
