import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, selectCell } from '../../../../../../state';
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
  const assertionCodesIds = useSelector(
    (state: RootState) =>
      (selectCell(state, cellId) as ICodeCell).testingCodeIds
  ) as string[];
  const AssertionCodeTabs = assertionCodesIds.map(assertionCodeId => {
    return <CodeCellAssertionTab assertionCodeId={assertionCodeId} />;
  });

  return (
    <AssertionCode onTabChange={onTabChange} isInstructor={isInstructor}>
      {AssertionCodeTabs}
    </AssertionCode>
  );
};
