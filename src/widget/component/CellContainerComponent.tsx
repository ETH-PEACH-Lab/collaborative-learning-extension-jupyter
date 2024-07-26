import React from 'react';
import { CellComponent } from './cell/CellComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { NoVisibleCellsHintComponent } from './NoVisibleCellsHintComponent';
import { selectCellsWithDocId } from '../../state';

type CellContainerComponentProps = {
  docId: string;
};
export const CellContainerComponent: React.FC<CellContainerComponentProps> = ({
  docId
}: CellContainerComponentProps) => {
  const cellIds = useSelector((state: RootState) =>
    selectCellsWithDocId(state, docId)
  );
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
