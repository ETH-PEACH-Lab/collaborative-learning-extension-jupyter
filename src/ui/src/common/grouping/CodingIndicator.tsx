import React from 'react';
import { ContentBody } from '../content';
type CodingIndicatorProps = {
  label?: string;
  children: React.ReactNode;
};
export const CodingIndicator: React.FC<CodingIndicatorProps> = ({
  label,
  children
}: CodingIndicatorProps) => {
  return label ? (
    <div className="indicator w-full pb-1">
      <span className="indicator-item indicator-center badge">{label}</span>
      <ContentBody>{children}</ContentBody>
    </div>
  ) : (
    <ContentBody>{children}</ContentBody>
  );
};
