import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, selectUserRole } from '../../../../../state';
import TextCellStudentComponent from './student/TextCellStudentComponent';
import TextCellInstructorComponent from './instructor/TextCellInstructorComponent';
type TextCellProps = {
  cellId: string;
};
const TextCell = (props: TextCellProps) => {
  const isInstructor =
    useSelector((state: RootState) => selectUserRole(state)) === 'instructor';

  return (
    <>
      {!isInstructor ? (
        <TextCellStudentComponent
          cellId={props.cellId}
        ></TextCellStudentComponent>
      ) : (
        <TextCellInstructorComponent
          cellId={props.cellId}
        ></TextCellInstructorComponent>
      )}
    </>
  );
};

export default TextCell;
