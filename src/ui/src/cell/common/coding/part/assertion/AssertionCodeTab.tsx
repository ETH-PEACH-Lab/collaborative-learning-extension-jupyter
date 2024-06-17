import React from 'react';
import { Code, CodeProps, Tab, TabProps } from '../../../../../common';
import { AssertionCodeName, AssertionCodeNameProps } from './AssertionCodeName';
import { KernelOutputContainerProps } from '../../../../../kernel';
import { AssertionCodeOutput } from './AssertionCodeOutput';

type AssertionCodeTabProps = TabProps & { success?: boolean };
export const AssertionCodeTab: React.FC<AssertionCodeTabProps> & {
  CodeName: React.FC<AssertionCodeNameProps>;
  Code: React.FC<CodeProps>;
  Output: React.FC<KernelOutputContainerProps>;
} = (props: AssertionCodeTabProps) => {
  return (
    <Tab
      {...props}
      className={
        (props.success !== undefined
          ? !props.success
            ? 'bg-error/50 '
            : 'bg-success/50 '
          : '') + props.className
      }
      classNameContent="mt-4"
    >
      {props.children}
    </Tab>
  );
};
AssertionCodeTab.Code = Code;
AssertionCodeTab.CodeName = AssertionCodeName;
AssertionCodeTab.Output = AssertionCodeOutput;
