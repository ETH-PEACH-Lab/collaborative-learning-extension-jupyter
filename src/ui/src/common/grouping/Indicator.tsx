import React from 'react';
import { Content, ContentBody } from '../content';
type IndicatorProps = {
  label?: string;
  children: React.ReactNode;
};
export const Indicator = ({ label, children }: IndicatorProps) => {
  return (
    <Content className="indicator w-full pt-3 pb-3">
      {label && (
        <div className="indicator-item indicator-center badge text-center">
          {label}
        </div>
      )}
      <ContentBody>{children}</ContentBody>
    </Content>
  );
};
