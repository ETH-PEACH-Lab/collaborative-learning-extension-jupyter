import React from 'react';
import { Code, CodingIndicator } from '../../../common';
export type CodeElementProps = {
  label?: string;
  src: string;
  language: string;
  readonly?: boolean;
  onChange: (value: string) => void;
};
export const CodeElement: React.FC<CodeElementProps> = (
  props: CodeElementProps
) => {
  return (
    <>
      <CodingIndicator label={props.label}>
        <Code {...props}></Code>
      </CodingIndicator>
    </>
  );
};
