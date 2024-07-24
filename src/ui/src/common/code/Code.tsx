import React, { useRef } from 'react';
import {
  CodeComponent,
  adjustableHeightCodeOptions,
  readonlyAdjustableHeightCodeOptions
} from 'react-quiz-ui';
import { defineDiffTheme } from './DiffCode';
import { Monaco } from '@monaco-editor/react';
export type CodeProps = {
  referenceId?: string;
  src: string;
  language: string;
  readonly?: boolean;
  border?: boolean;
  className?: string;
  onChange?: (code: string, referenceId?: string) => void;
};
export const Code: React.FC<CodeProps> = (props: CodeProps) => {
  const m = useRef<Monaco | null>(null);
  return (
    <div
      className={
        (props.border ? 'border-b-2 border-solid border-base-200 ' : ' ') +
        props.className
      }
    >
      <CodeComponent
        referenceId={props.referenceId}
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
    </div>
  );
};
