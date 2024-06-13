import {
  deleteIcon,
  moveDownIcon,
  moveUpIcon
} from '@jupyterlab/ui-components';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState, selectCell, selectUserRole } from '../../../state';
import { DocModelContext, IDocModelContext } from '../../context';
import { Toolbar, ToolbarButton, ToolbarToggle } from '../../../ui';

type CellToolbarComponentProps = {
  index: number;
  cellId: string;
};
export function CellToolbarComponent(props: CellToolbarComponentProps) {
  const isInstructor =
    useSelector((state: RootState) => selectUserRole(state)) === 'instructor';
  const allIdsLength = useSelector(
    (state: RootState) => state.cells.allIds.length
  );
  const cell = useSelector((state: RootState) =>
    selectCell(state, props.cellId)
  );
  const { deleteCell, swapCellPosition, changeCell } = useContext(
    DocModelContext
  ) as IDocModelContext;
  return (
    <>
      {isInstructor && (
        <>
          <Toolbar showOnHover={true}>
            <ToolbarToggle
              checked={cell.showSolution}
              onChange={checked =>
                changeCell({ ...cell, showSolution: checked })
              }
              label="Show Solution"
            />
            <ToolbarToggle
              checked={cell.visible}
              onChange={checked => changeCell({ ...cell, visible: checked })}
              label="Visibility"
            />
            <ToolbarButton
              disabled={props.index === 0}
              icon={moveUpIcon.svgstr}
              onClick={() => {
                const newPos = props.index - 1;
                swapCellPosition(props.index, newPos);
              }}
            />
            <ToolbarButton
              disabled={allIdsLength - 1 === props.index}
              icon={moveDownIcon.svgstr}
              onClick={() => {
                const newPos = props.index + 1;
                swapCellPosition(props.index, newPos);
              }}
            />
            <ToolbarButton
              icon={deleteIcon.svgstr}
              onClick={() => {
                deleteCell(props.cellId);
              }}
            />
          </Toolbar>
        </>
      )}
    </>
  );
}
