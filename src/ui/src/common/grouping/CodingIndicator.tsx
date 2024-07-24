import React from 'react';
import { Content, ContentBody } from '../content';
type CodingIndicatorProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
};
export const CodingIndicator: React.FC<CodingIndicatorProps> = ({
  label,
  className,
  children
}: CodingIndicatorProps) => {
  return label ? (
    <Content className={'indicator w-full pb-1 '}>
      <span className="indicator-item indicator-center badge">{label}</span>
      <ContentBody className={className}>{children}</ContentBody>
    </Content>
  ) : (
    <ContentBody className={className}>{children}</ContentBody>
  );
};
