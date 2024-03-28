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
type SolutionCodeProps = {
  cellId: string;
  startingCode: ICodeField;
  solutionCode: ICodeField;
};
export function SolutionCode(props: SolutionCodeProps) {
  const { createKernelExecution } = useKernel();
  const { setSolutionCodeField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  const setSolutionCode = (value: string) =>
    setSolutionCodeField(props.cellId, { ...props.solutionCode, src: value });
  return (
    <div className="puzzle-field puzzle-field--code">
      <UseFieldSignal field={props.startingCode}>
        {startingCode => (
          <UseFieldSignal field={props.solutionCode}>
            {solutionCode => (
              <>
                <PuzzleCodeFieldComponent
                  field={startingCode}
                  readonly={true}
                ></PuzzleCodeFieldComponent>
                <PuzzleCodeFieldComponent
                  field={solutionCode}
                  onChange={setSolutionCode}
                  readonly={false}
                ></PuzzleCodeFieldComponent>
                <div className="puzzle-field--code-actions">
                  <KernelExecuteCodeButton
                    input={createKernelExecution(
                      solutionCode.id,
                      startingCode,
                      solutionCode
                    )}
                  ></KernelExecuteCodeButton>
                </div>
                <KernelOutputContainerComponent
                  id={solutionCode.id}
                ></KernelOutputContainerComponent>
              </>
            )}
          </UseFieldSignal>
        )}
      </UseFieldSignal>
    </div>
  );
}
