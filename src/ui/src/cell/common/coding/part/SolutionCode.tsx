import React from 'react';
import { CodeElement, CodeElementProps } from '../CodeElement';

export const SolutionCode: React.FC<CodeElementProps> = (
  props: CodeElementProps
) => {
  return <CodeElement {...props} label="Solution Code" />;
};
