import React, { useContext } from 'react';
import { Coding, ToolbarButton, runAllIcon } from '../../../../../../ui';
import {
  addIcon,
  checkIcon,
  deleteIcon,
  runIcon
} from '@jupyterlab/ui-components';
import {
  DocModelContext,
  IDocModelContext,
  IKernelContext,
  KernelContext
} from '../../../../../context';
import {
  RootState,
  selectCell,
  selectField,
  selectStudentSolutionField
} from '../../../../../../state';
import { ICodeCell, ITestCodeField } from '../../../../../../types';
import { useSelector } from 'react-redux';
type CodeCellToolbarProps = {
  cellId: string;
  isInstructor: boolean;
  assertionIndex: number;
};
export const CodeCellToolbar: React.FC<CodeCellToolbarProps> = ({
  cellId,
  isInstructor,
  assertionIndex
}: CodeCellToolbarProps) => {
  const { removeTestCodeField, addTestCodeField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  const { verifyTest, executeTest } = useContext(
    KernelContext
  ) as IKernelContext;
  const solutionCodeId = useSelector(
    (state: RootState) => selectCell(state, cellId).solutionCodeId
  ) as string;
  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const studentCodeId = useSelector((state: RootState) =>
    selectStudentSolutionField(state, cellId, username)
  )?.id as string;
  const assertionCodesIds = useSelector(
    (state: RootState) =>
      (selectCell(state, cellId) as ICodeCell).testingCodeIds
  ) as string[];
  const assertionCode = useSelector((state: RootState) =>
    selectField(state, assertionCodesIds[assertionIndex])
  ) as ITestCodeField | undefined;
  return (
    <Coding.Toolbar>
      <ToolbarButton
        icon={addIcon.svgstr}
        onClick={() => addTestCodeField(cellId)}
      />
      <ToolbarButton
        hide={assertionCode?.verified}
        icon={checkIcon.svgstr}
        disabled={
          assertionCode?.name === undefined || assertionCode.name === ''
        }
        onClick={() =>
          verifyTest({
            cellId,
            assertionCodeId: assertionCodesIds[assertionIndex],
            codeBodyId: solutionCodeId
          })
        }
      />
      <ToolbarButton
        hide={assertionCodesIds.length < 2}
        icon={runAllIcon.svgstr}
        onClick={() =>
          assertionCodesIds.forEach(assertionCodeId => {
            executeTest({
              cellId,
              assertionCodeId,
              codeBodyId: isInstructor ? solutionCodeId : studentCodeId
            });
          })
        }
      />
      <ToolbarButton
        hide={!assertionCode?.verified}
        icon={runIcon.svgstr}
        onClick={() =>
          executeTest({
            cellId,
            assertionCodeId: assertionCodesIds[assertionIndex],
            codeBodyId: isInstructor ? solutionCodeId : studentCodeId
          })
        }
      />
      <ToolbarButton
        hide={
          !isInstructor &&
          assertionCode?.createdBy !== username &&
          assertionCode?.verified
        }
        icon={deleteIcon.svgstr}
        onClick={() =>
          removeTestCodeField(cellId, assertionCodesIds[assertionIndex])
        }
      />
    </Coding.Toolbar>
  );
};
