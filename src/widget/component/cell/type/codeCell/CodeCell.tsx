import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, selectGroups } from '../../../../../state';
import { Coding } from '../../../../../ui';
import {
  CodeCellAssertionCode,
  CodeCellConfiguration,
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
  const [selectedCodeIndex, setSelectedCodeIndex] = useState('');
  return (
    <Coding>
      {isInstructor && (
        <CodeCellConfiguration cellId={cellId}></CodeCellConfiguration>
      )}
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
        onCodeTabChange={setSelectedCodeIndex}
      ></CodeCellSolutionCode>
      <CodeCellAssertionCode
        cellId={cellId}
        isInstructor={isInstructor}
        instructorCodeId={selectedCodeIndex}
      ></CodeCellAssertionCode>
      <CodeCellToolbar cellId={cellId} isInstructor={isInstructor} />
    </Coding>
  );
}
