import React from 'react';
import { CellComponent } from './cell/CellComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { selectCellIds } from '../../state/slice/yjs/cellsSlice';
type CellContainerComponentProps = {
  docId: string;
};
export const CellContainerComponent: React.FC<CellContainerComponentProps> = ({
  docId
}: CellContainerComponentProps) => {
  const cellIds = useSelector((state: RootState) =>
    selectCellIds(state, docId)
  );
  return (
    <>
      {cellIds?.map((id, index) => (
        <CellComponent cellId={id} index={index}></CellComponent>
      ))}
    </>
  );
};
