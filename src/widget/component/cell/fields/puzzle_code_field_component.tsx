import React, { useContext, useRef } from 'react';
import { PuzzleEditorComponent } from '../../util/puzzle_editor_component';
import { Field, ICodeField } from '../../../../types/cell_types';
import { LabIcon, UseSignal, runIcon } from '@jupyterlab/ui-components';
import {
  DocModelContext,
  IDocModelContext
} from '../../../context/doc_model_context';
import { PuzzleCodeOutputFieldComponent } from './puzzle_code_output_field_component';
import { KernelOutput } from '../../../../types/output_types';

type PuzzleCodeFieldComponentProps = {
  field: ICodeField;
  readonly?: boolean;
  onChange: (c: ICodeField) => void;
};

export function PuzzleCodeFieldComponent(props: PuzzleCodeFieldComponentProps) {
  const { executeCell, fieldSignal, fieldOutputSignal } = useContext(
    DocModelContext
  ) as IDocModelContext;
  const outputs = useRef<KernelOutput[]>([]);

  const onExecute = () => {
    outputs.current = outputs.current.slice(0, outputs.current.length - 1);
    console.log('execute code');
    executeCell(props.field);
  };
  const onCodeChange = (value: string) => {
    props.field.src = value;
    props.onChange(props.field);
  };
  const shouldUpdateStartingCodeField = (_: any, field: Field) => {
    return field.id === props.field.id;
  };
  const shouldUpdateOutput = (_: any, output: KernelOutput) => {
    return output.fieldId === props.field.id;
  };
  outputs.current = outputs.current.slice(0, outputs.current.length - 1);
  return (
    <>
      <div className="puzzle-field puzzle-field--code">
        <UseSignal
          signal={fieldSignal}
          initialArgs={props.field}
          shouldUpdate={shouldUpdateStartingCodeField}
          key={props.field.id}
        >
          {(_, field) => (
            <PuzzleEditorComponent
              code={(field as ICodeField).src}
              language={(field as ICodeField).language}
              onCodeChange={onCodeChange}
              readonly={props.readonly}
            />
          )}
        </UseSignal>
        <div className="puzzle-field--code-actions">
          <button onClick={onExecute} className="btn btn-light btn-sm">
            <LabIcon.resolveReact icon={runIcon} />
          </button>
        </div>
      </div>
      <UseSignal
        signal={fieldOutputSignal}
        initialArgs={undefined}
        shouldUpdate={shouldUpdateOutput}
      >
        {(_: any, output: KernelOutput | undefined) => {
          if (output === undefined) {
            return <></>;
          }
          outputs.current.push(output);
          const outputEntityComponents = outputs.current.map(o => (
            <PuzzleCodeOutputFieldComponent
              output={o}
            ></PuzzleCodeOutputFieldComponent>
          ));
          return (
            <div className="puzzle-field--code-output">
              {outputEntityComponents}
            </div>
          );
        }}
      </UseSignal>
    </>
  );
}
