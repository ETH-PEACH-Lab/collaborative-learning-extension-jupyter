import React from 'react';
import { Code, CodeProps } from '../../../../../../common';
type AssertionCodeEditorProps = CodeProps;
export const AssertionCodeEditor: React.FC<AssertionCodeEditorProps> = (
  props: AssertionCodeEditorProps
) => {
  return <Code {...props} className={props.className + ' mt-4'} />;
};
