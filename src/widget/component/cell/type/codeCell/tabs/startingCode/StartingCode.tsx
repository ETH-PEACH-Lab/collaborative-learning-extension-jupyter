import { PuzzleCodeFieldComponent } from '../../../../../fields/CodeFieldComponent';
import KernelOutputContainerComponent from '../../../../../output/KernelOutputContainerConmponent';
import { ICodeField } from '../../../../../../../types/schemaTypes';
import React, { useContext } from 'react';
import useKernel from '../../hooks/useKernel';
import UseFieldSignal from '../../../../../../signal/UseFieldSignal';
import {
  DocModelContext,
  IDocModelContext
} from '../../../../../../context/docModelContext';
import KernelExecuteCodeButton from '../../button/KernelExecuteCodeButton';
type StartingCodeProps = {
  cellId: string;
  startingCode: ICodeField;
};
export function StartingCode(props: StartingCodeProps) {
  const { createKernelExecution } = useKernel();
  const { setStartingCodeField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  const setStartingCode = (value: string) =>
    setStartingCodeField(props.cellId, { ...props.startingCode, src: value });
  return (
    <div className="puzzle-field puzzle-field--code">
      <UseFieldSignal field={props.startingCode}>
        {startingCode => (
          <>
            <PuzzleCodeFieldComponent
              field={startingCode}
              onChange={setStartingCode}
            ></PuzzleCodeFieldComponent>
            <div className="puzzle-field--code-actions">
              <KernelExecuteCodeButton
                input={createKernelExecution(startingCode.id, startingCode)}
              ></KernelExecuteCodeButton>
            </div>
            <KernelOutputContainerComponent
              id={startingCode.id}
            ></KernelOutputContainerComponent>
          </>
        )}
      </UseFieldSignal>
    </div>
  );
}
