import {
  ICodeField,
  ITestCodeField
} from '../../../../../../../types/schemaTypes';
import React, { useContext } from 'react';
import {
  DocModelContext,
  IDocModelContext
} from '../../../../../../context/docModelContext';
import { LabIcon, addIcon } from '@jupyterlab/ui-components';
import useKernel from '../../hooks/useKernel';
import TestingCodeAccordionContainer from './accordion/TestingCodeAccordionContainer';
import UseMultiFieldSignal from '../../../../../../signal/UseMultiFieldSignal';
import UseArrayFieldSignal from '../../../../../../signal/UseArrayFieldSignal';
import KernelExecuteTestButton from '../../button/KernelExecuteTestButton';

type TestingCodeProps = {
  cellId: string;
  startingCode: ICodeField;
  solutionCode: ICodeField;
  testingCode: ITestCodeField[];
};
export function TestingCode(props: TestingCodeProps) {
  const { addTestCode } = useContext(DocModelContext) as IDocModelContext;
  const { createMultipleKernelExecution } = useKernel();
  return (
    <>
      <UseMultiFieldSignal fields={[props.solutionCode, props.startingCode]}>
        {([solutionCode, startingCode]) => (
          <UseArrayFieldSignal
            fields={props.testingCode}
            propertyName="testingCode"
          >
            {testingCode => (
              <>
                <TestingCodeAccordionContainer
                  cellId={props.cellId}
                  startingCode={startingCode}
                  solutionCode={solutionCode}
                  testingCode={testingCode}
                ></TestingCodeAccordionContainer>
                <div className="puzzle-field--code-actions">
                  <button
                    onClick={() => addTestCode(props.cellId)}
                    className="btn btn-light btn-sm"
                  >
                    <LabIcon.resolveReact icon={addIcon}></LabIcon.resolveReact>
                  </button>
                  <UseMultiFieldSignal fields={testingCode}>
                    {testingCodeArray => (
                      <>
                        {testingCodeArray.length && (
                          <KernelExecuteTestButton
                            input={createMultipleKernelExecution(
                              testingCodeArray,
                              startingCode,
                              solutionCode
                            )}
                            additionalLabel="All tests"
                          ></KernelExecuteTestButton>
                        )}
                      </>
                    )}
                  </UseMultiFieldSignal>
                </div>
              </>
            )}
          </UseArrayFieldSignal>
        )}
      </UseMultiFieldSignal>
    </>
  );
}
