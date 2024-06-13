import React, { useContext } from 'react';
import useKernel from '../../hooks/useKernel';
import KernelExecuteCodeButton from '../../button/KernelExecuteCodeButton';
import { useSelector } from 'react-redux';
import { ICodeCell, ICodeField } from '../../../../../../../types';
import { selectField } from '../../../../../../../state/slice/yjs/fieldSlice';
import { RootState } from '../../../../../../../state/store';
import { selectCell } from '../../../../../../../state/slice/yjs/cellsSlice';
import {
  CodingComponent,
  ICodingAnswer,
  adjustableHeightCodeOptions
} from 'react-quiz-ui';
import {
  DocModelContext,
  IDocModelContext
} from '../../../../../../context/docModelContext';
import { selectKernelExecutionResult } from '../../../../../../../state';
import {
  KernelOutputContainer,
  KernelOutputObject,
  RightAlignedToolbar
} from '../../../../../../../ui';

type StartingCodeProps = {
  cellId: string;
};
export function StartingCode(props: StartingCodeProps) {
  const { createKernelExecution } = useKernel();
  const { changeField } = useContext(DocModelContext) as IDocModelContext;

  const startingCode = useSelector((state: RootState) =>
    selectField(
      state,
      (selectCell(state, props.cellId) as ICodeCell).startingCodeId
    )
  ) as ICodeField;

  const setStartingCode = (answer: ICodingAnswer) =>
    changeField({ ...startingCode, src: answer.answer.src });
  const execution = useSelector((state: RootState) =>
    selectKernelExecutionResult(state, startingCode.id)
  );
  if (startingCode === undefined) {
    return <></>;
  }
  return (
    <>
      <CodingComponent
        exerciseObject={{
          metadata: {
            answerCodeConfig: { options: adjustableHeightCodeOptions }
          }
        }}
        onAnswerChanges={setStartingCode}
        initialAnswer={{ answer: { ...startingCode } }}
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
    </>
  );
}
