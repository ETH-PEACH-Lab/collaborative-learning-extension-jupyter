import React, { useRef } from 'react';
import {
  CodeComponent,
  adjustableHeightCodeOptions,
  readonlyAdjustableHeightCodeOptions
} from 'react-quiz-ui';
import { defineDiffTheme } from './DiffCode';
import { Monaco } from '@monaco-editor/react';
export type CodeProps = {
  src: string;
  language: string;
  readonly?: boolean;
  onChange?: (code: string) => void;
};
export const Code: React.FC<CodeProps> = (props: CodeProps) => {
  const m = useRef<Monaco | null>(null);
  return (
    <CodeComponent
      language={props.language}
      onCodeChange={props.onChange}
      src={props.src}
      config={{
        options: props.readonly
          ? readonlyAdjustableHeightCodeOptions
          : adjustableHeightCodeOptions,
        theme: 'diff-theme'
      }}
      beforeMount={monaco => {
        defineDiffTheme(monaco);
        m.current = monaco;
      }}
      onMount={_ => {
        m.current?.editor.setTheme('diff-theme');
      }}
    />
  );
};
