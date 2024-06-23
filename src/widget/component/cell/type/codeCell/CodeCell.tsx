import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, selectGroups } from '../../../../../state';
import { Coding } from '../../../../../ui';
import {
  CodeCellAssertionCode,
  CodeCellSolutionCode,
  CodeCellStartingCode,
  CodeCellStudentCode,
  CodeCellToolbar
} from './part';
import { InstructorsGroupName } from '../../../../../types';
type CodeCellProps = {
  cellId: string;
};

export default function CodeCell({ cellId }: CodeCellProps) {
  const isInstructor = useSelector((state: RootState) =>
    selectGroups(state)
  ).includes(InstructorsGroupName);
  const [assertionCodeIndex, setAssertionCodeIndex] = React.useState(0);

  return (
    <Coding>
      <CodeCellStartingCode
        cellId={cellId}
        isInstructor={isInstructor}
      ></CodeCellStartingCode>
      <CodeCellStudentCode
        cellId={cellId}
        isInstructor={isInstructor}
      ></CodeCellStudentCode>
      <CodeCellSolutionCode
        cellId={cellId}
        isInstructor={isInstructor}
      ></CodeCellSolutionCode>
      <CodeCellAssertionCode
        cellId={cellId}
        isInstructor={isInstructor}
        onTabChange={index => setAssertionCodeIndex(index)}
      ></CodeCellAssertionCode>
      <CodeCellToolbar
        cellId={cellId}
        isInstructor={isInstructor}
        assertionIndex={assertionCodeIndex}
      />
    </Coding>
  );
}
