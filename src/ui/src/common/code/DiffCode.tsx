import { Monaco } from '@monaco-editor/react';
import React, { useRef } from 'react';

import {
  DiffCodeComponent,
  readonlyAdjustableHeightCodeOptions
} from 'react-quiz-ui';
export type DiffCodeProps = {
  originalLabel: string;
  modifiedLabel: string;
  original: string;
  modified: string;
  language: string;
};

export const DiffCode: React.FC<DiffCodeProps> = ({
  language,
  modified,
  original,
  modifiedLabel,
  originalLabel
}: DiffCodeProps) => {
  const m = useRef<Monaco | null>(null);
  return (
    <div className="pl-[16px]">
      <div className="ml-[32px] flex flex-row justify-around">
        <span className="text">{originalLabel}</span>
        <span className="text">{modifiedLabel}</span>
      </div>
      <DiffCodeComponent
        language={language}
        original={original}
        modified={modified}
        config={{
          options: {
            ...readonlyAdjustableHeightCodeOptions,
            diffCodeLens: false
          },
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

export const defineDiffTheme = (monaco: Monaco) => {
  const inserted = '#C6D5D0';
  const removed = '#DFE0E4';
  const opacityText = '66';
  const opacityLine = '66';
  monaco.editor.defineTheme('diff-theme', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'diffEditor.insertedTextBackground': inserted + opacityText,
      'diffEditor.removedTextBackground': removed + opacityText,
      'diffEditor.insertedLineBackground': inserted + opacityLine,
      'diffEditor.removedLineBackground': removed + opacityLine,

      'diffEditorGutter.insertedLineBackground': inserted,
      'diffEditorGutter.removedLineBackground': removed,

      'diffEditorOverview.insertedForeground': inserted,
      'diffEditorOverview.removedForeground': removed
    }
  });
};
