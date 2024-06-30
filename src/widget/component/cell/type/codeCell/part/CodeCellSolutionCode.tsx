import { ICodeCell, ICodeField } from '../../../../../../types';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectCell } from '../../../../../../state/slice/yjs/cellsSlice';
import { RootState } from '../../../../../../state/store';
import { selectField } from '../../../../../../state/slice/yjs/fieldSlice';
import {
  DocModelContext,
  IDocModelContext
} from '../../../../../context/docModelContext';
import { Coding, StudentSelection } from '../../../../../../ui';
import { CodeCellSolutionStudentTab } from './CodeCellSolutionStudentTab';
type CodeCellSolutionCodeProps = {
  cellId: string;
  isInstructor: boolean;
  onCodeTabChange: (tab: number) => void;
};
export function CodeCellSolutionCode({
  cellId,
  isInstructor,
  onCodeTabChange
}: CodeCellSolutionCodeProps) {
  const { changeField } = useContext(DocModelContext) as IDocModelContext;
  const studentSolutionIds = useSelector(
    (state: RootState) => selectCell(state, cellId).studentSolutionIds
  );
  const solutionCode = useSelector((state: RootState) =>
    selectField(state, (selectCell(state, cellId) as ICodeCell).solutionCodeId)
  ) as ICodeField;

  if (solutionCode === undefined || !isInstructor) {
    return <></>;
  }
  const StudentCodeTabs = [];
  StudentCodeTabs.push(
    <StudentSelection.HomeTab label="Solution">
      <div className="mt-4">
        <Coding.SolutionCode
          language={solutionCode.language}
          src={solutionCode.src}
          onChange={value => changeField({ ...solutionCode, src: value })}
          readonly={false}
        />
      </div>
    </StudentSelection.HomeTab>
  );
  StudentCodeTabs.push(
    ...studentSolutionIds.map(id => {
      return <CodeCellSolutionStudentTab studentSolutionId={id} />;
    })
  );
  return (
    <div className="mt-4">
      <StudentSelection onTabChange={onCodeTabChange}>
        {StudentCodeTabs}
      </StudentSelection>
    </div>
  );
}
