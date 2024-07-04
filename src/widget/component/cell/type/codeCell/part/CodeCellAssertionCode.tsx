import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  RootState,
  selectCell,
  selectVerifiedTestFieldsIds,
  store
} from '../../../../../../state';
import { ICodeCell } from '../../../../../../types';
import { AssertionCode } from '../../../../../../ui';
import { CodeCellAssertionTab } from './assertion/CodeCellAssertionTab';
type CodeCellAssertionCodeProps = {
  cellId: string;
  isInstructor: boolean;
  onTabChange: (tabIndex: number) => void;
};
export const CodeCellAssertionCode: React.FC<CodeCellAssertionCodeProps> = ({
  cellId,
  isInstructor,
  onTabChange
}: CodeCellAssertionCodeProps) => {
  const [onlyFaulty, setOnlyFaulty] = useState(false);
  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const assertionCodesIds = useSelector((state: RootState) =>
    selectVerifiedTestFieldsIds(state, cellId, username)
  );
  const metadata = useSelector(
    (state: RootState) => (selectCell(state, cellId) as ICodeCell).metadata
  );
  const AssertionCodeTabs = assertionCodesIds.map(assertionCodeId => {
    return store.getState().kernelTestResult.byId[assertionCodeId]?.result &&
      onlyFaulty ? (
      <></>
    ) : (
      <CodeCellAssertionTab assertionCodeId={assertionCodeId} />
    );
  });

  return metadata.testingMode === 'no-tests' ? (
    <></>
  ) : (
    <>
      <AssertionCode
        onTabChange={onTabChange}
        isInstructor={isInstructor}
        onlyFaulty={onlyFaulty}
        setOnlyFaulty={setOnlyFaulty}
      >
        {AssertionCodeTabs}
      </AssertionCode>
    </>
  );
};
