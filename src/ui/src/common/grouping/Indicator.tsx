import React from 'react';
import { Content, ContentBody } from '../content';
type IndicatorProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
};
export const Indicator = ({ label, className, children }: IndicatorProps) => {
  return label ? (
    <Content className={'indicator w-full pt-3 pb-3 ' + className}>
      {label && (
        <div className="indicator-item indicator-center badge text-center">
          {label}
        </div>
      )}
      <ContentBody>{children}</ContentBody>
    </Content>
  ) : (
    <ContentBody className={className}>{children}</ContentBody>
  );
};
