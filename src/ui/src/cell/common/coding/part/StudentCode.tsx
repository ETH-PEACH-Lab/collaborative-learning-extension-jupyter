import React from 'react';
import { CodeElement, CodeElementProps } from '../CodeElement';

export const StudentCode: React.FC<CodeElementProps> = (
  props: CodeElementProps
) => {
  return <CodeElement {...props} />;
};
