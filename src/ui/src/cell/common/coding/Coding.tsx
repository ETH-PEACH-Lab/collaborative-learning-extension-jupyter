import React from 'react';
import {
  AssertionCode,
  AssertionCodeProps,
  CodingToolbar,
  CodingToolbarProps,
  StartingCode,
  StudentCode
} from './part';
import { CodeElementProps } from './CodeElement';
import { SolutionCode } from './part/SolutionCode';
type CodingProps = {
  children: React.ReactNode;
};
export const Coding: React.FC<CodingProps> & {
  StartingCode: React.FC<CodeElementProps>;
  SolutionCode: React.FC<CodeElementProps>;
  StudentCode: React.FC<CodeElementProps>;
  AssertionCode: React.FC<AssertionCodeProps>;
  Toolbar: React.FC<CodingToolbarProps>;
} = ({ children }: CodingProps) => {
  return <>{children}</>;
};

Coding.StartingCode = StartingCode;
Coding.SolutionCode = SolutionCode;
Coding.StudentCode = StudentCode;
Coding.AssertionCode = AssertionCode;
Coding.Toolbar = CodingToolbar;
