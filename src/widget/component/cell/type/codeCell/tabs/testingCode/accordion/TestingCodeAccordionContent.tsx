import React, { useContext } from 'react';
import {
  ICodeField,
  ITestCodeField
} from '../../../../../../../../types/schemaTypes';
import { PuzzleCodeFieldComponent } from '../../../../../../fields/CodeFieldComponent';
import KernelOutputContainerComponent from '../../../../../../output/KernelOutputContainerConmponent';
import {
  IUserRoleContext,
  UserRoleContext
} from '../../../../../../../context/userRoleContext';
import useKernel from '../../../hooks/useKernel';
import KernelExecuteTestButton from '../../../button/KernelExecuteTestButton';
import KernelVerifyTestButton from '../../../button/KernelVerifyTestButton';

type TestingCodeAccordionContentProps = {
  cellId: string;
  testingCode: ITestCodeField;
  startingCode: ICodeField;
  solutionCode: ICodeField;
  changeSrc: (src: string) => void;
  changeName: (src: string) => void;
};
export default function TestingCodeAccordionContent(
  props: TestingCodeAccordionContentProps
) {
  const { identity } = useContext(UserRoleContext) as IUserRoleContext;
  const { createKernelExecution, createKernelTestVerification } = useKernel();
  return (
    <div
      id={'collapse-' + props.testingCode.id}
      className="accordion-collapse collapse"
      data-bs-parent={'#test-code-accordion-' + props.cellId}
    >
      <div className="accordion-body">
        {!props.testingCode.verified && (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Testname"
              aria-label="Name"
              value={props.testingCode.name}
              onChange={event => {
                props.changeName(event.target.value);
              }}
            />
          </div>
        )}
        <PuzzleCodeFieldComponent
          field={props.testingCode}
          readonly={
            props.testingCode.verified ||
            props.testingCode.createdBy !== identity?.username
          }
          onChange={props.changeSrc}
        ></PuzzleCodeFieldComponent>
        <div className="puzzle-field--code-actions">
          {props.testingCode.name !== '' &&
            !props.testingCode.verified &&
            props.testingCode.createdBy === identity?.username && (
              <KernelVerifyTestButton
                input={createKernelTestVerification(
                  props.testingCode.id,
                  props.cellId,
                  props.startingCode,
                  props.solutionCode,
                  props.testingCode
                )}
              ></KernelVerifyTestButton>
            )}
          {props.testingCode.verified && (
            <KernelExecuteTestButton
              input={createKernelExecution(
                props.testingCode.id,
                props.startingCode,
                props.solutionCode,
                props.testingCode
              )}
            ></KernelExecuteTestButton>
          )}
        </div>
        <KernelOutputContainerComponent
          id={props.testingCode.id}
          disableNoOutput={true}
        ></KernelOutputContainerComponent>
      </div>
    </div>
  );
}
