import { ICodeCell, ICodeField, ICodeSolution } from '../../../../../../types';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../state/store';
import {
  selectField,
  selectStudentSolutionField,
  selectTestFieldForUserExists
} from '../../../../../../state/slice/yjs/fieldSlice';
import { DocModelContext, IDocModelContext } from '../../../../../context';
import { Coding, Feedback } from '../../../../../../ui';
import { selectCell } from '../../../../../../state';
import { InstructorComment } from '../../../../../../ui/src/common/feedback/InstructorComment';
type CodeCellStudentCodeProps = {
  cellId: string;
  isInstructor: boolean;
};
export function CodeCellStudentCode({
  cellId,
  isInstructor
}: CodeCellStudentCodeProps) {
  const { addStudentSolutionField, changeField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  if (isInstructor) {
    return <></>;
  }
  const showSolution = useSelector(
    (state: RootState) => selectCell(state, cellId).metadata.showSolution
  );
  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const studentCode = useSelector((state: RootState) =>
    selectStudentSolutionField(state, cellId, username)
  ) as ICodeSolution;
  const solutionField = useSelector(
    (state: RootState) =>
      selectField(
        state,
        (selectCell(state, cellId) as ICodeCell).solutionCodeId
      ) as ICodeField
  );
  const testFieldForStudentExists = useSelector((state: RootState) =>
    selectTestFieldForUserExists(state, cellId, username)
  );
  const metadata = useSelector(
    (state: RootState) => (selectCell(state, cellId) as ICodeCell).metadata
  );
  if (studentCode === undefined) {
    addStudentSolutionField(cellId, 'code-solution');
    return <></>;
  }

  return (
    <>
      {metadata.testingMode === 'one-test-required' &&
      !testFieldForStudentExists &&
      !showSolution ? (
        <Feedback feedbackAsMarkdown="Please provide a verified test first before continuing coding" />
      ) : (
        <></>
      )}
      {showSolution ? (
        <>
          <div className="pl-4">
            <Coding.DiffCode
              originalLabel="Solution"
              modifiedLabel="Your Code"
              language={studentCode.language}
              original={solutionField.src}
              modified={studentCode.src}
            />
          </div>
          <InstructorComment comment={studentCode.comment} />
        </>
      ) : (
        <>
          {metadata.testingMode !== 'one-test-required' ||
          testFieldForStudentExists ? (
            <Coding.StudentCode
              language={studentCode.language}
              src={studentCode.src}
              readonly={
                (metadata.testingMode === 'one-test-required' &&
                  !testFieldForStudentExists) ||
                studentCode.submitted
              }
              onChange={value => changeField({ ...studentCode, src: value })}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
