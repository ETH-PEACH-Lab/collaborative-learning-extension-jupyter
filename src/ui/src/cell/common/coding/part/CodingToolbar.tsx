import React from 'react';
import { ContentBody, Toolbar } from '../../../../common';

export type CodingToolbarProps = {
  children: React.ReactNode;
};
export const CodingToolbar: React.FC<CodingToolbarProps> = ({
  children
}: CodingToolbarProps) => {
  return (
    <ContentBody>
      <Toolbar showOnHover={false} className="mb-4">
        {children}
      </Toolbar>
    </ContentBody>
  );
};
