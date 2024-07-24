import React, { useContext } from 'react';
import { Coding, SubmitButton } from '../../../../../../ui';
import { DocModelContext, IDocModelContext } from '../../../../../context';
import {
  RootState,
  selectCell,
  selectField,
  selectStudentSolutionField
} from '../../../../../../state';
import { ICodeSolution } from '../../../../../../types';
import { useSelector } from 'react-redux';
type CodeCellToolbarProps = {
  cellId: string;
  isInstructor: boolean;
};
export const CodeCellToolbar: React.FC<CodeCellToolbarProps> = ({
  cellId,
  isInstructor
}: CodeCellToolbarProps) => {
  const { changeField } = useContext(DocModelContext) as IDocModelContext;
  const showSolution = useSelector(
    (state: RootState) => selectCell(state, cellId).metadata.showSolution
  );
  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const studentCodeId = useSelector((state: RootState) =>
    selectStudentSolutionField(state, cellId, username)
  )?.id as string;
  const studentCodeField = useSelector((state: RootState) =>
    selectField(state, studentCodeId)
  ) as ICodeSolution;
  return (
    <>
      <Coding.Toolbar>
        {!isInstructor && (
          <SubmitButton
            showBadgeOnSubmitted={true}
            onSubmit={() =>
              changeField({ ...studentCodeField, submitted: true })
            }
            finalized={showSolution}
            submitted={studentCodeField.submitted}
          />
        )}
      </Coding.Toolbar>
    </>
  );
};
