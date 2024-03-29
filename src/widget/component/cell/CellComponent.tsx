import React, { useContext } from 'react';
import { PuzzleMarkDownFieldComponent } from '../fields/MarkDownFieldComponent';
import { ICell, ICodeCell } from '../../../types/schemaTypes';
import { CellSettingsComponent } from './CellSettingsComponent';
import {
  IDocModelContext,
  DocModelContext
} from '../../context/docModelContext';
import CodeCell from './type/codeCell/CodeCell';
import UseFieldSignal from '../../signal/UseFieldSignal';
type CellComponentProps = {
  cell: ICell;
};

export function CellComponent(props: CellComponentProps) {
  const { setDescriptionField, deleteCell } = useContext(
    DocModelContext
  ) as IDocModelContext;
  return (
    <div className="card puzzle-cell">
      <div className="card-body">
        <div className="puzzle-field">
          <UseFieldSignal field={props.cell.description}>
            {markdownField => {
              const onChange = (src: string) =>
                setDescriptionField(props.cell.id, {
                  ...props.cell.description,
                  src: src
                });
              return (
                <PuzzleMarkDownFieldComponent
                  field={markdownField}
                  onChange={onChange}
                  instructorOnly={true}
                />
              );
            }}
          </UseFieldSignal>
        </div>
        {props.cell.type === 'code-cell' && (
          <CodeCell cell={props.cell as ICodeCell}></CodeCell>
        )}
      </div>
      <div className="card-footer puzzle-card-footer">
        <CellSettingsComponent onDelete={() => deleteCell(props.cell)} />
      </div>
    </div>
  );
}
