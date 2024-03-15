import React, { useContext } from 'react';
import { UseSignal } from '@jupyterlab/apputils';
import { Cell } from '../../types/cell_types';
import { PuzzleCellComponent } from './cell/puzzle_cell_component';
import {
  IDocModelContext,
  DocModelContext
} from '../context/doc_model_context';

export type PuzzleCellContainerComponentProps = {
  cells: Cell[] | undefined;
};
export function PuzzleCellContainerComponent(
  props: PuzzleCellContainerComponentProps
) {
  const { cellSignal } = useContext(DocModelContext) as IDocModelContext;
  const cellComponents = props.cells?.map(element => {
    const shouldUpdateCell = (_: any, cell: Cell) => {
      return cell.id === element.id;
    };
    return (
      <UseSignal
        signal={cellSignal}
        shouldUpdate={shouldUpdateCell}
        initialArgs={element}
        key={element.id}
      >
        {(_, cell) => (
          <PuzzleCellComponent cell={cell as Cell}></PuzzleCellComponent>
        )}
      </UseSignal>
    );
  });
  return <>{cellComponents}</>;
}
