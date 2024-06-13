import React from 'react';
import { RootState, selectUserRole } from '../../../../../state';
import { useSelector } from 'react-redux';
import MultipleChoiceInstructorComponent from './instructor/MultipleChoiceInstructorComponent';
import { MultipleChoiceStudentComponent } from './student/MultipleChoiceStudentComponent';

type MultipleChoiceCellProps = {
  cellId: string;
};

export const MultipleChoiceCell = (props: MultipleChoiceCellProps) => {
  const isInstructor =
    useSelector((state: RootState) => selectUserRole(state)) === 'instructor';

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
