import React from 'react';
import { RootState, selectGroups } from '../../../../../state';
import { useSelector } from 'react-redux';
import MultipleChoiceInstructorComponent from './instructor/MultipleChoiceInstructorComponent';
import { MultipleChoiceStudentComponent } from './student/MultipleChoiceStudentComponent';
import { InstructorsGroupName } from '../../../../../types';

type MultipleChoiceCellProps = {
  cellId: string;
};

export const MultipleChoiceCell = (props: MultipleChoiceCellProps) => {
  const isInstructor = useSelector((state: RootState) =>
    selectGroups(state)
  ).includes(InstructorsGroupName);

  return (
    <>
      {!isInstructor ? (
        <MultipleChoiceStudentComponent
          cellId={props.cellId}
        ></MultipleChoiceStudentComponent>
      ) : (
        <MultipleChoiceInstructorComponent
          cellId={props.cellId}
        ></MultipleChoiceInstructorComponent>
      )}
    </>
  );
};
