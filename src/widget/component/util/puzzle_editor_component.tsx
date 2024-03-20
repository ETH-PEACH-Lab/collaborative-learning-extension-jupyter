import { Editor } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import React from 'react';

type PuzzleEditorComponentProps = {
  language: string;
  code: string;
  readonly?: boolean;
  onCodeChange: (value: string) => void;
};

export function PuzzleEditorComponent(props: PuzzleEditorComponentProps) {
  const onCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      props.onCodeChange(value);
    }
  };
  const onEditorMount = (editor: editor.IStandaloneCodeEditor) => {
    editor.onDidContentSizeChange(() => updateEditorHeight(editor));
    updateEditorHeight(editor);
  };
  const updateEditorHeight = (editor: editor.IStandaloneCodeEditor) => {
    if (editor !== null) {
      const container = editor.getDomNode();
      if (!container) {
        return;
      }
      const contentHeight = Math.min(1000, editor.getContentHeight());
      container.style.width = '100%';
      container.style.height = `${contentHeight}px`;
      editor.layout({
        width: container.getBoundingClientRect().width,
        height: contentHeight
      });
    }
  };
  return (
    <Editor
      height={'auto'}
      options={{
        quickSuggestions: {
          other: 'inline',
          comments: true,
          strings: true
        },
        cursorBlinking: 'smooth',
        wrappingStrategy: 'advanced',
        wordWrap: 'on',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        overviewRulerLanes: 0,
        readOnly: props.readonly
      }}
      theme="light"
      value={props?.code}
      language={props.language}
      onChange={onCodeChange}
      onMount={onEditorMount}
    />
  );
}
