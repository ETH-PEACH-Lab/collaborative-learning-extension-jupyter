import React from 'react';
import { EditorComponent } from '../util/EditorComponent';
import { ICodeField, ITestCodeField } from '../../../types/schemaTypes';

type CodeFieldComponentProps = {
  field: ICodeField | ITestCodeField;
  readonly?: boolean;
  onChange?: (code: string) => void;
};

export function PuzzleCodeFieldComponent(props: CodeFieldComponentProps) {
  return (
    <EditorComponent
      code={props.field.src}
      language={props.field.language}
      onCodeChange={props.onChange ?? ((_: string) => {})}
      readonly={props.readonly}
      noLineNumbers={props.readonly}
    />
  );
}
