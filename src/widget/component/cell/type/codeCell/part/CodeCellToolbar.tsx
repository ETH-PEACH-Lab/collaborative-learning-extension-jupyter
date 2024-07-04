import React, { useContext } from 'react';
import {
  Coding,
  SubmitButton,
  ToolbarButton,
  runAllIcon
} from '../../../../../../ui';
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
  selectStudentSolutionField,
  selectUnverifiedTestFieldForUserExists
} from '../../../../../../state';
import {
  ICodeCell,
  ICodeSolution,
  ITestCodeField
} from '../../../../../../types';
import { useSelector } from 'react-redux';
type CodeCellToolbarProps = {
  cellId: string;
  isInstructor: boolean;
  codeIndex: number;
  assertionIndex: number;
};
export const CodeCellToolbar: React.FC<CodeCellToolbarProps> = ({
  cellId,
  isInstructor,
  assertionIndex,
  codeIndex
}: CodeCellToolbarProps) => {
  const { removeTestCodeField, addTestCodeField, changeField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  const { verifyTest, executeTest } = useContext(
    KernelContext
  ) as IKernelContext;
  const solutionCodeId = useSelector(
    (state: RootState) =>
      (selectCell(state, cellId) as ICodeCell).solutionCodeId
  ) as string;
  const studentSolutionIds = useSelector(
    (state: RootState) =>
      (selectCell(state, cellId) as ICodeCell).studentSolutionIds
  );
  const showSolution = useSelector(
    (state: RootState) => selectCell(state, cellId).metadata.showSolution
  );
  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const studentCodeId = useSelector((state: RootState) =>
    selectStudentSolutionField(state, cellId, username)
  )?.id as string;
  const studentCodeField = useSelector((state: RootState) =>
    selectField(state, studentCodeId)
  ) as ICodeSolution;
  const assertionCodesIds = useSelector(
    (state: RootState) =>
      (selectCell(state, cellId) as ICodeCell).testingCodeIds
  ) as string[];
  const assertionCode = useSelector((state: RootState) =>
    selectField(state, assertionCodesIds[assertionIndex])
  ) as ITestCodeField | undefined;
  const metadata = useSelector(
    (state: RootState) => (selectCell(state, cellId) as ICodeCell).metadata
  );
  const unverifiedTestFieldExists = useSelector((state: RootState) =>
    selectUnverifiedTestFieldForUserExists(state, cellId, username)
  );

  const instructorCodeId =
    codeIndex === 0 ? solutionCodeId : studentSolutionIds[codeIndex - 1];
  return (
    <>
      <Coding.Toolbar>
        {!isInstructor && (
          <SubmitButton
            showBadgeOnSubmitted={true}
            onSubmit={() =>
              changeField({ ...studentCodeField, submitted: true })
            }
            finalized={showSolution}
            submitted={studentCodeField.submitted}
          />
        )}
        {metadata.testingMode !== 'no-tests' && (
          <>
            <ToolbarButton
              disabled={
                unverifiedTestFieldExists ||
                showSolution ||
                (!isInstructor && studentCodeField.submitted)
              }
              hoverHint="Add test"
              icon={addIcon.svgstr}
              onClick={() => addTestCodeField(cellId)}
            />
            <ToolbarButton
              hide={assertionCode?.verified || assertionCodesIds.length === 0}
              hoverHint="Verify test"
              icon={checkIcon.svgstr}
              disabled={
                assertionCode?.name === undefined ||
                assertionCode.name === '' ||
                showSolution ||
                (!isInstructor && studentCodeField.submitted)
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
              hoverHint="Run all tests"
              hide={assertionCodesIds.length < 2}
              icon={runAllIcon.svgstr}
              onClick={() =>
                assertionCodesIds.forEach(assertionCodeId => {
                  executeTest({
                    cellId,
                    assertionCodeId,
                    codeBodyId: isInstructor ? instructorCodeId : studentCodeId
                  });
                })
              }
            />
            <ToolbarButton
              hoverHint="Run test"
              hide={!assertionCode?.verified || assertionCodesIds.length === 0}
              icon={runIcon.svgstr}
              onClick={() =>
                executeTest({
                  cellId,
                  assertionCodeId: assertionCodesIds[assertionIndex],
                  codeBodyId: isInstructor ? instructorCodeId : studentCodeId
                })
              }
            />
            <ToolbarButton
              hoverHint="Delete test"
              hide={
                (!isInstructor &&
                  assertionCode?.createdBy !== username &&
                  assertionCode?.verified) ||
                assertionCodesIds.length === 0
              }
              disabled={
                showSolution || (!isInstructor && studentCodeField.submitted)
              }
              icon={deleteIcon.svgstr}
              onClick={() =>
                removeTestCodeField(cellId, assertionCodesIds[assertionIndex])
              }
            />
          </>
        )}
      </Coding.Toolbar>
    </>
  );
};
