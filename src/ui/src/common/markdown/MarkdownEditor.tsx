import React from 'react';
import { ICodeConfig, MarkdownEditorComponent } from 'react-quiz-ui';
import { MarkdownConfig } from './MarkdownConfig';
type CommonMarkdownEditorComponentProps = {
  codeConfig?: ICodeConfig;
  src: string;
  onChange: (src: string) => void;
};
export const MarkdownEditor: React.FC<CommonMarkdownEditorComponentProps> = (
  props: CommonMarkdownEditorComponentProps
) => {
  return (
    <MarkdownEditorComponent
      config={{
        jupyter: true,
        markdownConfig: MarkdownConfig,
        codeConfig: props.codeConfig
      }}
      src={props.src}
      onChange={props.onChange}
    ></MarkdownEditorComponent>
  );
};
