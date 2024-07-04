import {
  deleteIcon,
  moveDownIcon,
  moveUpIcon
} from '@jupyterlab/ui-components';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState, selectCell, selectGroups } from '../../../state';
import { DocModelContext, IDocModelContext } from '../../context';
import { Toolbar, ToolbarButton, ToolbarToggle } from '../../../ui';
import { ICell, InstructorsGroupName } from '../../../types';

type CellToolbarComponentProps = {
  index: number;
  cellId: string;
};
export function CellToolbarComponent(props: CellToolbarComponentProps) {
  const isInstructor = useSelector((state: RootState) =>
    selectGroups(state)
  ).includes(InstructorsGroupName);
  const allIdsLength = useSelector(
    (state: RootState) => state.cells.allIds.length
  );
  const cell = useSelector((state: RootState) =>
    selectCell(state, props.cellId)
  ) as ICell;
  const { deleteCell, swapCellPosition, changeCell } = useContext(
    DocModelContext
  ) as IDocModelContext;
  return (
    <>
      {isInstructor && (
        <>
          <Toolbar showOnHover={true}>
            <ToolbarToggle
              checked={cell.metadata.showSolution}
              onChange={checked =>
                changeCell({
                  ...cell,
                  metadata: { ...cell.metadata, showSolution: checked }
                })
              }
              label="Show Solution"
            />
            <ToolbarToggle
              checked={cell.metadata.visible}
              onChange={checked =>
                changeCell({
                  ...cell,
                  metadata: { ...cell.metadata, visible: checked }
                })
              }
              label="Visibility"
            />
            <ToolbarButton
              disabled={props.index === 0}
              icon={moveUpIcon.svgstr}
              onClick={() => {
                const newPos = props.index - 1;
                swapCellPosition(props.index, newPos);
              }}
              hoverHint="Move up"
              hoverHintDown
            />
            <ToolbarButton
              disabled={allIdsLength - 1 === props.index}
              icon={moveDownIcon.svgstr}
              onClick={() => {
                const newPos = props.index + 1;
                swapCellPosition(props.index, newPos);
              }}
              hoverHint="Move down"
              hoverHintDown
            />
            <ToolbarButton
              icon={deleteIcon.svgstr}
              onClick={() => {
                deleteCell(props.cellId);
              }}
              hoverHint="Delete"
              hoverHintDown
            />
          </Toolbar>
        </>
      )}
    </>
  );
}
