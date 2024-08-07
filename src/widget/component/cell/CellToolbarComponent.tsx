import {
  deleteIcon,
  moveDownIcon,
  moveUpIcon
} from '@jupyterlab/ui-components';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  RootState,
  selectCell,
  selectCellsWithDocId,
  selectGroups
} from '../../../state';
import { DocModelContext, IDocModelContext } from '../../context';
import { Toolbar, ToolbarButton } from '../../../ui';
import { ICell, InstructorsGroupName } from '../../../types';
import { showIcon } from '../../../ui/src/icon/showIcon';
import { hideIcon } from '../../../ui/src/icon/hideIcon';

type CellToolbarComponentProps = {
  index: number;
  cellId: string;
  documentId: string;
};
export function CellToolbarComponent({
  cellId,
  documentId,
  index
}: CellToolbarComponentProps) {
  const isInstructor = useSelector((state: RootState) =>
    selectGroups(state)
  ).includes(InstructorsGroupName);
  const allIdsLength = useSelector(
    (state: RootState) => selectCellsWithDocId(state, documentId).length
  );
  const cell = useSelector((state: RootState) =>
    selectCell(state, cellId)
  ) as ICell;
  const { deleteCell, swapCellPosition, changeCell } = useContext(
    DocModelContext
  ) as IDocModelContext;
  return (
    <>
      {isInstructor && (
        <>
          <Toolbar showOnHover={true}>
            <ToolbarButton
              onClick={() =>
                changeCell({
                  ...cell,
                  metadata: {
                    ...cell.metadata,
                    visible: !cell.metadata.visible
                  }
                })
              }
              icon={cell.metadata.visible ? hideIcon.svgstr : showIcon.svgstr}
              label={(cell.metadata.visible ? 'Hide' : 'Show') + ' Exercise'}
            />
            <ToolbarButton
              onClick={() =>
                changeCell({
                  ...cell,
                  metadata: {
                    ...cell.metadata,
                    showSolution: !cell.metadata.showSolution
                  }
                })
              }
              icon={
                cell.metadata.showSolution ? hideIcon.svgstr : showIcon.svgstr
              }
              label={
                (cell.metadata.showSolution ? 'Hide' : 'Show') + ' Solution'
              }
            />

            <ToolbarButton
              disabled={index === 0}
              icon={moveUpIcon.svgstr}
              onClick={() => {
                const newPos = index - 1;
                swapCellPosition(index, newPos);
              }}
              hoverHint="Move up"
              hoverHintDown
            />
            <ToolbarButton
              disabled={allIdsLength - 1 === index}
              icon={moveDownIcon.svgstr}
              onClick={() => {
                const newPos = index + 1;
                swapCellPosition(index, newPos);
              }}
              hoverHint="Move down"
              hoverHintDown
            />
            <ToolbarButton
              icon={deleteIcon.svgstr}
              onClick={() => {
                deleteCell(cellId);
              }}
              className="fill-svg-within-red"
              hoverHint="Delete"
              hoverHintDown
            />
          </Toolbar>
        </>
      )}
    </>
  );
}
