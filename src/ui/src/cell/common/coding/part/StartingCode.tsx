import React from 'react';
import { CodeElement, CodeElementProps } from '../CodeElement';

export const StartingCode: React.FC<CodeElementProps> = (
  props: CodeElementProps
) => {
  return (
    <CodeElement
      {...props}
      label={!props.readonly ? 'Starting Code' : undefined}
    />
  );
};
