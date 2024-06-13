import React from 'react';
import { CodeComponent } from 'react-quiz-ui';
import { CodingIndicator } from '../../../common';
type CodeElement = {
  label?: string;
  code: string;
  language: string;
  onCodeChange: (value: string) => void;
};
export const CodeElement: React.FC<CodeElement> = ({
  label,
  code,
  language,
  onCodeChange
}: CodeElement) => {
  return (
    <>
      <CodingIndicator label={label}>
        <CodeComponent
          language={language}
          src={code}
          onCodeChange={onCodeChange}
        />
      </CodingIndicator>
    </>
  );
};
