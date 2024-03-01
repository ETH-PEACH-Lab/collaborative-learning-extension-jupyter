import { Editor } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import React from 'react';

type PuzzleEditorComponentProps = {
  language: string;
  code: string;
  onCodeChange: (value: string) => void;
};

export class PuzzleEditorComponent extends React.Component<PuzzleEditorComponentProps> {
  private editor: editor.IStandaloneCodeEditor | null = null;
  render() {
    return (
      <Editor
        defaultLanguage={this.props?.language}
        height={'auto'}
        options={{
          wrappingStrategy: 'advanced',
          wordWrap: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          overviewRulerLanes: 0
        }}
        value={this.props?.code}
        onChange={this.onCodeChange.bind(this)}
        theme="vs-dark"
        onMount={this.onEditorMount.bind(this)}
      />
    );
  }
  onCodeChange(value: string | undefined) {
    if (value !== undefined) {
      this.props.onCodeChange(value);
    }
  }
  onEditorMount(editor: editor.IStandaloneCodeEditor) {
    this.editor = editor;
    editor.onDidContentSizeChange(this.updateEditorHeight.bind(this));
    this.updateEditorHeight();
  }
  updateEditorHeight(): void {
    if (this.editor !== null) {
      const container = this.editor.getDomNode();
      if (!container) {
        return;
      }
      const contentHeight = Math.min(1000, this.editor.getContentHeight());
      container.style.width = '100%';
      container.style.height = `${contentHeight}px`;
      this.editor.layout({
        width: container.getBoundingClientRect().width,
        height: contentHeight
      });
    }
  }
}
