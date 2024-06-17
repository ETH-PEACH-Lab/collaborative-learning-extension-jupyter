import { ICodeSolution } from '../../../../../../types';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../state/store';
import { selectStudentSolutionField } from '../../../../../../state/slice/yjs/fieldSlice';
import { DocModelContext, IDocModelContext } from '../../../../../context';
import { Coding } from '../../../../../../ui';
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
  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const studentCode = useSelector((state: RootState) =>
    selectStudentSolutionField(state, cellId, username)
  ) as ICodeSolution;
  if (studentCode === undefined) {
    addStudentSolutionField(cellId, 'code-solution');
    return <></>;
  }
  return (
    <Coding.StudentCode
      language={studentCode.language}
      src={studentCode.src}
      onChange={value => changeField({ ...studentCode, src: value })}
    />
  );
}
