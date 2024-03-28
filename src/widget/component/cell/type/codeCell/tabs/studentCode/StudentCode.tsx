import { PuzzleCodeFieldComponent } from '../../../../../fields/CodeFieldComponent';
import KernelOutputContainerComponent from '../../../../../output/KernelOutputContainerConmponent';
import { ICodeField } from '../../../../../../../types/schemaTypes';
import React from 'react';
import useKernel from '../../hooks/useKernel';
import UseFieldSignal from '../../../../../../signal/UseFieldSignal';
import KernelExecuteCodeButton from '../../button/KernelExecuteCodeButton';
type StudentCodeProps = {
  startingCode: ICodeField;
  studentCode?: ICodeField;
};
export function StudentCode(props: StudentCodeProps) {
  const { createKernelExecution } = useKernel();
  return (
    <div className="puzzle-field puzzle-field--code">
      <UseFieldSignal field={props.startingCode}>
        {startingCode => (
          <>
            <PuzzleCodeFieldComponent
              field={startingCode}
              readonly={true}
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
