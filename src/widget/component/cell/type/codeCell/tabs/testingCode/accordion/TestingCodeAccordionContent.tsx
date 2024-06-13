import React, { useContext } from 'react';
import { ICodeField, ITestCodeField } from '../../../../../../../../types';
import useKernel from '../../../hooks/useKernel';
import KernelExecuteTestButton from '../../../button/KernelExecuteTestButton';
import KernelVerifyTestButton from '../../../button/KernelVerifyTestButton';
import { deleteIcon } from '@jupyterlab/ui-components';
import {
  DocModelContext,
  IDocModelContext
} from '../../../../../../../context/docModelContext';
import { useSelector } from 'react-redux';
import {
  RootState,
  selectField,
  selectIdentity,
  selectKernelExecutionResult,
  selectStudentSolutionField,
  selectUserRole
} from '../../../../../../../../state';
import {
  AssertionCodeName,
  BaseButton,
  Code,
  KernelOutputContainer,
  KernelOutputObject,
  RightAlignedToolbar
} from '../../../../../../../../ui';

type TestingCodeAccordionContentProps = {
  cellId: string;
  testingCode: ITestCodeField;
  startingCodeId: string;
  solutionCodeId: string;
  changeSrc: (src: string) => void;
  changeName: (src: string) => void;
};
export default function TestingCodeAccordionContent(
  props: TestingCodeAccordionContentProps
) {
  const { removeTestCodeField, changeField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  const isInstructor =
    useSelector((state: RootState) => selectUserRole(state)) === 'instructor';
  const identity = useSelector((state: RootState) => selectIdentity(state));
  const { createKernelExecution, createKernelTestVerification } = useKernel();

  const startingCode = useSelector((state: RootState) =>
    selectField(state, props.startingCodeId)
  ) as ICodeField;
  const studentCode = useSelector((state: RootState) =>
    selectStudentSolutionField(
      state,
      props.cellId,
      identity?.username as string
    )
  ) as ICodeField;
  const solutionCode = useSelector((state: RootState) =>
    selectField(state, props.solutionCodeId)
  ) as ICodeField;

  const object = useSelector((state: RootState) =>
    selectKernelExecutionResult(state, props.testingCode.id)
  );
  return (
    <div className="collapse-content bg-base-200 pt-4">
      {!props.testingCode.verified && (
        <AssertionCodeName
          name={props.testingCode.name}
          onNameChange={name => changeField({ ...props.testingCode, name })}
        />
      )}
      <Code
        src={props.testingCode.src}
        language={props.testingCode.language}
        readonly={
          props.testingCode.verified ||
          props.testingCode.createdBy !== identity?.username
        }
        onChange={props.changeSrc}
      ></Code>
      <KernelOutputContainer
        objects={
          object
            ? object.outputs.map(o => {
                return {
                  output: o.output,
                  type: o.type
                } satisfies KernelOutputObject;
              })
            : []
        }
      ></KernelOutputContainer>
      <RightAlignedToolbar>
        {props.testingCode.name !== '' &&
          !props.testingCode.verified &&
          props.testingCode.createdBy === identity?.username && (
            <KernelVerifyTestButton
              input={createKernelTestVerification(
                props.testingCode.id,
                props.cellId,
                startingCode,
                solutionCode,
                props.testingCode
              )}
            ></KernelVerifyTestButton>
          )}
        {props.testingCode.verified && (
          <KernelExecuteTestButton
            input={createKernelExecution(
              props.testingCode.id,
              startingCode,
              isInstructor ? solutionCode : studentCode,
              props.testingCode
            )}
          ></KernelExecuteTestButton>
        )}
        {(isInstructor || !props.testingCode.verified) && (
          <BaseButton
            className="btn-error"
            icon={deleteIcon.svgstr}
            onClick={() =>
              removeTestCodeField(props.cellId, props.testingCode.id)
            }
          ></BaseButton>
        )}
      </RightAlignedToolbar>
    </div>
  );
}
