import React from 'react';
import {
  KernelOutputContainer,
  KernelOutputContainerProps
} from '../../../../../../kernel';
import { CodeProps } from '../../../../../../common';
import { AssertionCodeEditor } from './AssertionCodeEditor';
export type AssertionCodeContentProps = {
  children: React.ReactNode;
};
export const AssertionCodeContent: React.FC<AssertionCodeContentProps> & {
  Output: React.FC<KernelOutputContainerProps>;
  Code: React.FC<CodeProps>;
} = ({ children }) => {
  return (
    <div className="collapse-content border-t-[1px] border-base-300">
      {children}
    </div>
  );
};

AssertionCodeContent.Output = KernelOutputContainer;
AssertionCodeContent.Code = AssertionCodeEditor;
