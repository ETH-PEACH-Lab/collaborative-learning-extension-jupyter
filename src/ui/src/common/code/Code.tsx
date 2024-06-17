import React from 'react';
import {
  CodeComponent,
  adjustableHeightCodeOptions,
  readonlyAdjustableHeightCodeOptions
} from 'react-quiz-ui';
export type CodeProps = {
  src: string;
  language: string;
  readonly?: boolean;
  onChange?: (code: string) => void;
};
export const Code: React.FC<CodeProps> = (props: CodeProps) => {
  return (
    <CodeComponent
      language={props.language}
      onCodeChange={props.onChange}
      src={props.src}
      config={{
        options: props.readonly
          ? readonlyAdjustableHeightCodeOptions
          : adjustableHeightCodeOptions
      }}
    />
  );
};
