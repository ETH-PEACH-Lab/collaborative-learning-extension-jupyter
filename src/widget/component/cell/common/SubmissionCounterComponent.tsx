import React from 'react';
import { useSelector } from 'react-redux';
import {
  RootState,
  selectCell,
  selectGroups,
  selectNumberOfStudentSolutionSubmissions
} from '../../../../state';
import { SubmissionCounter } from '../../../../ui';
import { InstructorsGroupName } from '../../../../types';

type SubmissionCounterProps = {
  cellId: string;
};
export const SubmissionCounterComponent: React.FC<SubmissionCounterProps> = ({
  cellId
}) => {
  const studentSolutionIds = useSelector(
    (state: RootState) => selectCell(state, cellId).studentSolutionIds
  );
  const visible = useSelector(
    (state: RootState) => selectCell(state, cellId).metadata.visible
  );
  const totalSubmissions = useSelector((state: RootState) =>
    selectNumberOfStudentSolutionSubmissions(state, studentSolutionIds)
  );
  const isInstructor = useSelector((state: RootState) =>
    selectGroups(state)
  ).includes(InstructorsGroupName);
  return visible && isInstructor ? (
    <SubmissionCounter
      counter={totalSubmissions}
      total={studentSolutionIds.length}
    />
  ) : (
    <></>
  );
};
