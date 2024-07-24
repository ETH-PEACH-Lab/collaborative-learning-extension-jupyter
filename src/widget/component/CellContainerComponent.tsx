import React from 'react';
import { CellComponent } from './cell/CellComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { selectCellIds } from '../../state/slice/yjs/cellsSlice';
import { NoVisibleCellsHintComponent } from './NoVisibleCellsHintComponent';

type CellContainerComponentProps = {
  docId: string;
};
export const CellContainerComponent: React.FC<CellContainerComponentProps> = ({
  docId
}: CellContainerComponentProps) => {
  const cellIds = useSelector((state: RootState) => selectCellIds(state));
  return (
    <>
      {cellIds?.map((id, index) => (
        <CellComponent
          cellId={id}
          index={index}
          key={id}
          docId={docId}
        ></CellComponent>
      ))}
      <NoVisibleCellsHintComponent
        amountOfCells={cellIds.length}
        docId={docId}
      ></NoVisibleCellsHintComponent>
    </>
  );
};
