import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  RootState,
  selectCell,
  selectFields,
  selectStudentSolutionField
} from '../../../../../../state';
import {
  IMultipleChoiceCell,
  IMultipleChoiceSolution
} from '../../../../../../types';
import { IMultipleChoiceAnswer, IMultipleChoiceItem } from 'react-quiz-ui';
import { DocModelContext, IDocModelContext } from '../../../../../context';
import { MultipleChoiceStudent } from '../../../../../../ui';

type MultipleChoiceStudentComponentProps = {
  cellId: string;
};
export const MultipleChoiceStudentComponent = (
  props: MultipleChoiceStudentComponentProps
) => {
  const { changeField, addStudentSolutionField } = useContext(
    DocModelContext
  ) as IDocModelContext;
  const username = useSelector(
    (state: RootState) => state.user.identity?.username
  ) as string;
  const studentSelection = useSelector((state: RootState) =>
    selectStudentSolutionField(state, props.cellId, username)
  ) as IMultipleChoiceSolution;

  const setStudentSolution = (answer: IMultipleChoiceAnswer) =>
    changeField({ ...studentSelection, src: answer.answer });
  const cell = useSelector((state: RootState) =>
    selectCell(state, props.cellId)
  ) as IMultipleChoiceCell;
  const items = useSelector((state: RootState) =>
    selectFields(state, cell.options)
  ) as IMultipleChoiceItem[];

  if (studentSelection === undefined) {
    addStudentSolutionField(props.cellId, 'multiple-choice-solution');
    return <></>;
  }
  return (
    <MultipleChoiceStudent
      answer={studentSelection.src}
      onAnswerChanges={setStudentSolution}
      items={items}
      options={{
        multi: cell.multi,
        random: cell.random,
        showSolution: cell.showSolution,
        submitted: studentSelection.submitted
      }}
      setSubmit={submitted => changeField({ ...studentSelection, submitted })}
      solutionOptions={cell.solutionOptions}
    />
  );
};
