import { Editor } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import React from 'react';

type EditorComponentProps = {
  language: string;
  code: string;
  readonly?: boolean;
  onCodeChange: (value: string) => void;
  noLineNumbers?: boolean;
};

export function EditorComponent(props: EditorComponentProps) {
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
      const model = editor.getModel();
      if (!container || !model) {
        return;
      }
      const contentHeight = Math.min(500, model.getLineCount() * 19);
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
        lineNumbers: props.noLineNumbers ? (number: number) => ' ' : 'on',
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
