import React, { useContext } from 'react';
import { DocModelContext, IDocModelContext } from '../../../../../context';
import { useSelector } from 'react-redux';
import {
  RootState,
  selectCell,
  selectField,
  selectStudentSolutionField
} from '../../../../../../state';
import { ITextResponseAnswer } from 'react-quiz-ui';
import {
  IMarkdownField,
  ITextCell,
  ITextSolution
} from '../../../../../../types';
import { TextResponseStudent } from '../../../../../../ui';

type TextCellStudentComponentProps = {
  cellId: string;
};
const TextCellStudentComponent = (props: TextCellStudentComponentProps) => {
  const { addStudentSolutionField, changeField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const studentSolution = useSelector((state: RootState) =>
    selectStudentSolutionField(state, props.cellId, username)
  ) as ITextSolution;
  const showSolution = useSelector(
    (state: RootState) => selectCell(state, props.cellId).showSolution
  );
  const solutionField = useSelector((state: RootState) =>
    selectField(
      state,
      (selectCell(state, props.cellId) as ITextCell).solutionId
    )
  ) as IMarkdownField;
  const setStudentSolution = (answer: ITextResponseAnswer) =>
    changeField({ ...studentSolution, src: answer.answer.src });

  if (studentSolution === undefined) {
    addStudentSolutionField(props.cellId, 'text-solution');
    return <></>;
  }
  return (
    <TextResponseStudent
      answer={studentSolution.src}
      onAnswerChanges={setStudentSolution}
      options={{
        showSolution: showSolution,
        submitted: studentSolution.submitted
      }}
      setSubmit={(submitted: boolean) =>
        changeField({ ...studentSolution, submitted })
      }
      solution={solutionField.src}
    ></TextResponseStudent>
  );
};

export default TextCellStudentComponent;
