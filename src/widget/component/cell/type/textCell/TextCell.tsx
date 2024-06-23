import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, selectGroups } from '../../../../../state';
import TextCellStudentComponent from './student/TextCellStudentComponent';
import TextCellInstructorComponent from './instructor/TextCellInstructorComponent';
import { InstructorsGroupName } from '../../../../../types';
type TextCellProps = {
  cellId: string;
};
const TextCell = (props: TextCellProps) => {
  const isInstructor = useSelector((state: RootState) =>
    selectGroups(state)
  ).includes(InstructorsGroupName);

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
