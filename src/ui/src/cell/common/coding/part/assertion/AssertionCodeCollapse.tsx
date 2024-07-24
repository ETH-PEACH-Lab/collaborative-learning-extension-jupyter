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
  id: string;
  children: React.ReactNode;
  tabIndex: number;
  className?: string;
  onActive?: () => void;
  checked?: boolean;
};
export const AssertionCodeCollapse: React.FC<AssertionCollapseProps> & {
  Name: React.FC<AssertionCodeNameProps>;
  Content: React.FC<AssertionCodeContentProps>;
} = ({
  id,
  children,
  tabIndex,
  className,
  onActive,
  checked
}: AssertionCollapseProps) => {
  return (
    <div
      tabIndex={tabIndex}
      className={
        'collapse collapse-arrow border-base-300 rounded-none border-[1px] animate-fadein ' +
        className
      }
    >
      <input
        type="radio"
        name={id + '-assertion-collapse'}
        onChange={e => e.currentTarget.checked && onActive && onActive()}
        checked={checked}
      />
      {children}
    </div>
  );
};

AssertionCodeCollapse.Name = AssertionCodeName;
AssertionCodeCollapse.Content = AssertionCodeContent;
