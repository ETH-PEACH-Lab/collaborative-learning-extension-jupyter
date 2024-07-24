import React from 'react';
import { Code, CodingIndicator } from '../../../common';
export type CodeElementProps = {
  className?: string;
  label?: string;
  src: string;
  language: string;
  readonly?: boolean;
  onChange: (value: string) => void;
  children?: React.ReactNode;
};
export const CodeElement: React.FC<CodeElementProps> = (
  props: CodeElementProps
) => {
  return (
    <>
      <CodingIndicator label={props.label} className={props.className}>
        <Code {...props}></Code>
        {props.children}
      </CodingIndicator>
    </>
  );
};
