import React from 'react';
import {
  AssertionCodeName,
  AssertionCodeNameProps
} from './name/AssertionCodeName';
import {
  AssertionCodeContent,
  AssertionCodeContentProps
} from './content/AssertionCodeContent';

export type AssertionCollapseProps = {
  children: React.ReactNode;
  tabIndex: number;
};
export const AssertionCodeCollapse: React.FC<AssertionCollapseProps> & {
  Name: React.FC<AssertionCodeNameProps>;
  Content: React.FC<AssertionCodeContentProps>;
} = ({ children, tabIndex }: AssertionCollapseProps) => {
  return (
    <div
      tabIndex={tabIndex}
      className={
        'collapse collapse-arrow border-base-300 rounded-none border-[1px] animate-fadein'
      }
    >
      <input type="radio" name="my-accordion-4" />
      {children}
    </div>
  );
};

AssertionCodeCollapse.Name = AssertionCodeName;
AssertionCodeCollapse.Content = AssertionCodeContent;
