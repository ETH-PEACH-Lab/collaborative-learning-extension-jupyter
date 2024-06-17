import React, { useContext } from 'react';
import { AssertionCodeTab } from '../../../../../../../ui';
import {
  RootState,
  selectField,
  selectKernelExecutionResult,
  selectKernelTestResult
} from '../../../../../../../state';
import { ITestCodeField } from '../../../../../../../types';
import { useSelector } from 'react-redux';
import { DocModelContext, IDocModelContext } from '../../../../../../context';
type CodeCellAssertionTabProps = {
  _id?: string;
  _index?: number;
  _isActive?: boolean;
  _setActiveTab?: (index: number) => void;
  assertionCodeId: string;
};
export const CodeCellAssertionTab: React.FC<CodeCellAssertionTabProps> = (
  props: CodeCellAssertionTabProps
) => {
  const { changeField } = useContext(DocModelContext) as IDocModelContext;
  const assertionCode = useSelector((state: RootState) =>
    selectField(state, props.assertionCodeId)
  ) as ITestCodeField | undefined;
  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const result = useSelector((state: RootState) =>
    selectKernelExecutionResult(state, props.assertionCodeId)
  );
  const success = useSelector((state: RootState) =>
    selectKernelTestResult(state, props.assertionCodeId)
  )?.result;
  if (!assertionCode?.verified && assertionCode?.createdBy !== username) {
    return <></>;
  }
  return (
    <AssertionCodeTab
      {...props}
      label={assertionCode.name ? assertionCode.name : 'New Test'}
      success={success}
    >
      {!assertionCode.verified && (
        <AssertionCodeTab.CodeName
          name={assertionCode.name}
          onNameChange={name => changeField({ ...assertionCode, name })}
        ></AssertionCodeTab.CodeName>
      )}
      <AssertionCodeTab.Code
        language={assertionCode.language}
        src={assertionCode.src}
        onChange={src => changeField({ ...assertionCode, src })}
        readonly={assertionCode.verified}
      />
      <AssertionCodeTab.Output
        objects={result?.outputs ? result?.outputs : []}
      />
    </AssertionCodeTab>
  );
};
