import React from 'react';
import { CellComponent } from './cell/CellComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { selectCellIds } from '../../state/slice/yjs/cellsSlice';

export function CellContainerComponent() {
  const cellIds = useSelector((state: RootState) => selectCellIds(state));
  return (
    <>
      {cellIds?.map((id, index) => (
        <CellComponent cellId={id} index={index}></CellComponent>
      ))}
    </>
  );
}
