import React, { ReactElement } from 'react';

import {
  AssertionCodeCollapse,
  AssertionCollapseProps
} from './assertion/AssertionCodeCollapse';
export type AssertionCodeProps = {
  children:
    | ReactElement<AssertionCollapseProps>
    | ReactElement<AssertionCollapseProps>[];
};
export const AssertionCode: React.FC<AssertionCodeProps> & {
  Collapse: React.FC<AssertionCollapseProps>;
} = ({ children }: AssertionCodeProps) => {
  return (
    <div className="join join-vertical w-full rounded-none">{children}</div>
  );
};

AssertionCode.Collapse = AssertionCodeCollapse;
