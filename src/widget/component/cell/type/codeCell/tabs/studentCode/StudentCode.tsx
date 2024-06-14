import {
  ICodeCell,
  ICodeField,
  ICodeSolution
} from '../../../../../../../types';
import React, { useContext } from 'react';
import useKernel from '../../hooks/useKernel';
import KernelExecuteCodeButton from '../../button/KernelExecuteCodeButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../state/store';
import {
  selectField,
  selectStudentSolutionField
} from '../../../../../../../state/slice/yjs/fieldSlice';
import { selectCell } from '../../../../../../../state/slice/yjs/cellsSlice';
import { DocModelContext, IDocModelContext } from '../../../../../../context';
import {
  CodingComponent,
  ICodingAnswer,
  readonlyAdjustableHeightCodeOptions
} from 'react-quiz-ui';
import { selectKernelExecutionResult } from '../../../../../../../state';
import {
  KernelOutputContainer,
  KernelOutputObject,
  RightAlignedToolbar
} from '../../../../../../../ui';
type StudentCodeProps = {
  cellId: string;
};
export function StudentCode(props: StudentCodeProps) {
  const { createKernelExecution } = useKernel();
  const { addStudentSolutionField, changeField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  const startingCode = useSelector((state: RootState) =>
    selectField(
      state,
      (selectCell(state, props.cellId) as ICodeCell).startingCodeId
    )
  ) as ICodeField;

  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const studentCode = useSelector((state: RootState) =>
    selectStudentSolutionField(state, props.cellId, username)
  ) as ICodeSolution;
  const setStudentSolution = (answer: ICodingAnswer) =>
    changeField({ ...studentCode, src: answer.answer.src });
  if (studentCode === undefined || startingCode === undefined) {
    if (startingCode !== undefined) {
      addStudentSolutionField(props.cellId, 'code-solution');
    }
    return <></>;
  }
  const execution = useSelector((state: RootState) =>
    selectKernelExecutionResult(state, studentCode.id)
  );
  return (
    <div className="puzzle-field puzzle-field--code">
      <CodingComponent
        exerciseObject={{
          startingCode: startingCode,
          metadata: {
            startingCodeConfig: {
              options: readonlyAdjustableHeightCodeOptions
            }
          }
        }}
        initialAnswer={{ answer: studentCode }}
        onAnswerChanges={setStudentSolution}
      ></CodingComponent>
      <RightAlignedToolbar>
        <KernelExecuteCodeButton
          input={createKernelExecution(startingCode.id, startingCode)}
        ></KernelExecuteCodeButton>
      </RightAlignedToolbar>
      <KernelOutputContainer
        objects={
          execution
            ? execution.outputs.map(o => {
                return {
                  output: o.output,
                  type: o.type
                } satisfies KernelOutputObject;
              })
            : []
        }
      ></KernelOutputContainer>
    </div>
  );
}
