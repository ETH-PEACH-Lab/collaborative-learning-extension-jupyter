import React, { useContext } from 'react';
import { PuzzleMarkDownFieldComponent } from './fields/puzzle_markdown_field_component';
import {
  Cell,
  Field,
  ICodeField,
  IMarkdownField
} from '../../../types/cell_types';
import { PuzzleCodeFieldComponent } from './fields/puzzle_code_field_component';
import { PuzzleCellSettingsComponent } from './puzzle_cell_settings_compontent';
import {
  IUserRoleContext,
  UserRoleContext
} from '../../context/user_role_context';
import { UseSignal } from '@jupyterlab/ui-components';
import {
  IDocModelContext,
  DocModelContext
} from '../../context/doc_model_context';
type CellComponentProps = {
  cell: Cell;
};

export function PuzzleCellComponent(props: CellComponentProps) {
  const { fieldSignal, changeCell, deleteCell } = useContext(
    DocModelContext
  ) as IDocModelContext;
  const { isInstructor } = useContext(UserRoleContext) as IUserRoleContext;

  const shouldUpdateDescriptionField = (_: any, field: Field) => {
    return field.id === props.cell.description.id;
  };
  return (
    <div className="card puzzle-cell">
      <div className="card-body">
        <UseSignal
          signal={fieldSignal}
          initialArgs={props.cell.description}
          shouldUpdate={shouldUpdateDescriptionField}
          key={props.cell.description.id}
        >
          {(_, field) => (
            <PuzzleMarkDownFieldComponent
              field={field as IMarkdownField}
              onChange={(markdownField: IMarkdownField) => {
                props.cell.description.src = markdownField.src;
                changeCell(props.cell);
              }}
            />
          )}
        </UseSignal>
        <b>Starting Code:</b>
        <PuzzleCodeFieldComponent
          field={props.cell.startingCode}
          onChange={(codeField: ICodeField) => {
            props.cell.startingCode.src = codeField.src;
            changeCell(props.cell);
          }}
          readonly={!isInstructor}
        />
      </div>
      <div className="card-footer puzzle-card-footer">
        <PuzzleCellSettingsComponent onDelete={() => deleteCell(props.cell)} />
      </div>
    </div>
  );
}
