import React, { useContext } from 'react';
import {
  AssertionCodeCollapse,
  AssertionCodeContent,
  BaseButton
} from '../../../../../../../ui';
import {
  RootState,
  selectField,
  selectKernelExecutionResult,
  selectKernelTestResult
} from '../../../../../../../state';
import { ITestCodeField } from '../../../../../../../types';
import { useSelector } from 'react-redux';
import {
  DocModelContext,
  IDocModelContext,
  IKernelContext,
  KernelContext
} from '../../../../../../context';
import { checkIcon, deleteIcon, runIcon } from '@jupyterlab/ui-components';
export type CodeCellAssertionCollapseProps = {
  cellId: string;
  studentCodeId: string;
  solutionCodeId: string;
  instructorSelectedCodeId: string;
  assertionCodeId: string;
  isInstructor: boolean;
  tabIndex: number;
  activeTabIndex: number;
  onEnterDown: (tabIndex: number) => void;
  onActive: (tabIndex: number) => void;
};
export const CodeCellAssertionCollapse: React.FC<
  CodeCellAssertionCollapseProps
> = ({
  assertionCodeId,
  cellId,
  solutionCodeId,
  studentCodeId,
  instructorSelectedCodeId,
  isInstructor,
  tabIndex,
  activeTabIndex,
  onEnterDown,
  onActive
}: CodeCellAssertionCollapseProps) => {
  const { changeField, removeTestCodeField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  const { verifyTest, executeTest } = useContext(
    KernelContext
  ) as IKernelContext;

  const assertionCode = useSelector((state: RootState) =>
    selectField(state, assertionCodeId)
  ) as ITestCodeField | undefined;
  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const result = useSelector((state: RootState) =>
    selectKernelExecutionResult(state, assertionCodeId)
  );
  const success = useSelector((state: RootState) =>
    selectKernelTestResult(state, assertionCodeId)
  )?.result;
  if (!assertionCode?.verified && assertionCode?.createdBy !== username) {
    return <></>;
  }
  return (
    <AssertionCodeCollapse
      tabIndex={tabIndex}
      id={cellId}
      checked={activeTabIndex === tabIndex}
      onActive={() => onActive(tabIndex)}
    >
      <AssertionCodeCollapse.Name
        success={success}
        editing={!assertionCode.verified}
        name={assertionCode.name}
        onNameChange={name => changeField({ ...assertionCode, name })}
        onEnterDown={() => onEnterDown(tabIndex)}
      >
        <>
          <BaseButton
            hide={!assertionCode.verified}
            onClick={() =>
              executeTest({
                assertionCodeId: assertionCodeId,
                cellId: cellId,
                codeBodyId: isInstructor
                  ? instructorSelectedCodeId
                  : studentCodeId
              })
            }
            icon={runIcon.svgstr}
            label="Run"
          ></BaseButton>
          <BaseButton
            hide={assertionCode.verified}
            onClick={() =>
              verifyTest({
                assertionCodeId: assertionCodeId,
                cellId: cellId,
                codeBodyId: solutionCodeId
              })
            }
            icon={checkIcon.svgstr}
            label="Verify"
            disabled={!assertionCode.name || assertionCode.name === ''}
          />
          <BaseButton
            hide={assertionCode.verified && !isInstructor}
            onClick={() => removeTestCodeField(cellId, assertionCodeId)}
            icon={deleteIcon.svgstr}
            label="Delete"
          ></BaseButton>
        </>
      </AssertionCodeCollapse.Name>
      <AssertionCodeCollapse.Content>
        {tabIndex === activeTabIndex && (
          <>
            <AssertionCodeContent.Code
              src={assertionCode.src}
              language={assertionCode.language}
              readonly={assertionCode.verified}
              onChange={src => changeField({ ...assertionCode, src })}
              focused={!assertionCode.verified}
            />
            <AssertionCodeContent.Output
              objects={result?.outputs ? result?.outputs : []}
            />
          </>
        )}
      </AssertionCodeCollapse.Content>
    </AssertionCodeCollapse>
  );
};
