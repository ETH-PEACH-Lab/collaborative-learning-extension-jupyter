import React from 'react';
import { CellComponent } from './cell/CellComponent';
import { ICell } from '../../types/schemaTypes';
import UseFieldSignal from '../signal/UseFieldSignal';

type CellContainerComponentProps = {
  cells: ICell[] | undefined;
};
export function CellContainerComponent(props: CellContainerComponentProps) {
  const cellComponents = props.cells?.map(element => {
    return (
      <UseFieldSignal
        field={element}
      >
        {cell => <CellComponent cell={cell as ICell}></CellComponent>}
      </UseFieldSignal>
    );
  });
  return <>{cellComponents}</>;
}
