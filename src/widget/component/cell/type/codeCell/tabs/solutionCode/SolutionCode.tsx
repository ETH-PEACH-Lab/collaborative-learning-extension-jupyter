import { ICodeCell, ICodeField } from '../../../../../../../types';
import React, { useContext } from 'react';
import useKernel from '../../hooks/useKernel';
import KernelExecuteCodeButton from '../../button/KernelExecuteCodeButton';
import { useSelector } from 'react-redux';
import { selectCell } from '../../../../../../../state/slice/yjs/cellsSlice';
import { RootState } from '../../../../../../../state/store';
import { selectField } from '../../../../../../../state/slice/yjs/fieldSlice';
import {
  DocModelContext,
  IDocModelContext
} from '../../../../../../context/docModelContext';
import {
  CodingComponent,
  readonlyAdjustableHeightCodeOptions,
  adjustableHeightCodeOptions,
  ICodingAnswer
} from 'react-quiz-ui';
import {
  selectKernelExecutionResult,
  selectUserRole
} from '../../../../../../../state';
import {
  KernelOutputContainer,
  KernelOutputObject,
  RightAlignedToolbar
} from '../../../../../../../ui';
type SolutionCodeProps = {
  cellId: string;
};
export function SolutionCode(props: SolutionCodeProps) {
  const { createKernelExecution } = useKernel();
  const { changeField } = useContext(DocModelContext) as IDocModelContext;
  const isInstructor =
    useSelector((state: RootState) => selectUserRole(state)) === 'instructor';
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

  const setSolutionCode = (value: ICodingAnswer) => {
    changeField({ ...solutionCode, src: value.answer.src });
  };
  const execution = useSelector((state: RootState) =>
    selectKernelExecutionResult(state, solutionCode.id)
  );
  if (startingCode === undefined || solutionCode === undefined) {
    return <></>;
  }
  return (
    <>
      <CodingComponent
        exerciseObject={{
          startingCode: startingCode,
          metadata: {
            startingCodeConfig: {
              options: readonlyAdjustableHeightCodeOptions
            },
            answerCodeConfig: {
              options: isInstructor
                ? adjustableHeightCodeOptions
                : readonlyAdjustableHeightCodeOptions
            }
          }
        }}
        onAnswerChanges={setSolutionCode}
        initialAnswer={{ answer: { ...solutionCode } }}
      ></CodingComponent>
      <RightAlignedToolbar>
        <KernelExecuteCodeButton
          input={createKernelExecution(
            solutionCode.id,
            startingCode,
            solutionCode
          )}
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
    </>
  );
}
