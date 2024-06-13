import {
  ICodeCell,
  ICodeField,
  ITestCodeField
} from '../../../../../../../types';
import React, { useContext } from 'react';
import {
  DocModelContext,
  IDocModelContext
} from '../../../../../../context/docModelContext';
import { LabIcon, addIcon } from '@jupyterlab/ui-components';
import useKernel from '../../hooks/useKernel';
import TestingCodeAccordionContainer from './accordion/TestingCodeAccordionContainer';
import KernelExecuteTestButton from '../../button/KernelExecuteTestButton';
import { useSelector } from 'react-redux';
import {
  RootState,
  selectCell,
  selectField,
  selectStudentSolutionField,
  selectUserRole
} from '../../../../../../../state';
import { createSelector } from '@reduxjs/toolkit';
import { RightAlignedToolbar } from '../../../../../../../ui';

type TestingCodeProps = {
  cellId: string;
};
export function TestingCode(props: TestingCodeProps) {
  const { addTestCodeField } = useContext(DocModelContext) as IDocModelContext;
  const { createMultipleKernelExecution } = useKernel();

  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const startingCode = useSelector((state: RootState) =>
    selectField(
      state,
      (selectCell(state, props.cellId) as ICodeCell).startingCodeId
    )
  ) as ICodeField;

  const solutionCode = useSelector((state: RootState) =>
    selectField(
      state,
      (selectCell(state, props.cellId) as ICodeCell).solutionCodeId
    )
  ) as ICodeField;
  const studentCode = useSelector((state: RootState) =>
    selectStudentSolutionField(state, props.cellId, username)
  ) as ICodeField;
  const selectTestingCode = createSelector(
    [selectCell, (state: RootState) => state, (_, cellId) => cellId],
    (cell, state) => {
      return (cell as ICodeCell).testingCodeIds.map(id =>
        selectField(state, id)
      );
    }
  );
  const testingCode = useSelector((state: RootState) =>
    selectTestingCode(state, props.cellId)
  ) as ITestCodeField[];
  const isInstructor = useSelector(
    (state: RootState) => selectUserRole(state) === 'instructor'
  );
  return (
    <>
      <TestingCodeAccordionContainer
        cellId={props.cellId}
      ></TestingCodeAccordionContainer>
      <RightAlignedToolbar>
        <button
          onClick={() => addTestCodeField(props.cellId)}
          className="btn btn-light btn-sm"
        >
          <LabIcon.resolveReact icon={addIcon}></LabIcon.resolveReact>
        </button>
        <KernelExecuteTestButton
          input={createMultipleKernelExecution(
            testingCode,
            startingCode,
            isInstructor ? solutionCode : studentCode
          )}
          additionalLabel="All tests"
        ></KernelExecuteTestButton>
      </RightAlignedToolbar>
    </>
  );
}
