import React, { useContext } from 'react';
import { UseSignal } from '@jupyterlab/apputils';
import { IDocModelContext, DocModelContext } from '../context/docModelContext';
import { CellComponent } from './cell/CellComponent';
import { ICell } from '../../types/schemaTypes';

type CellContainerComponentProps = {
  cells: ICell[] | undefined;
};
export function CellContainerComponent(props: CellContainerComponentProps) {
  const { cellSignal } = useContext(DocModelContext) as IDocModelContext;
  const cellComponents = props.cells?.map(element => {
    const shouldUpdateCell = (_: any, cell: ICell) => {
      return cell.id === element.id;
    };
    return (
      <UseSignal
        signal={cellSignal}
        shouldUpdate={shouldUpdateCell}
        initialArgs={element}
        key={element.id}
      >
        {(_, cell) => <CellComponent cell={cell as ICell}></CellComponent>}
      </UseSignal>
    );
  });
  return <>{cellComponents}</>;
}
