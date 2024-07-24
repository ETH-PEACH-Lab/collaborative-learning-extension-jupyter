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

  const studentSolutions = useSelector((state: RootState) =>
    selectFields(state, cell.studentSolutionIds)
  ) as IMultipleChoiceItem[];

  const studentSolutionDistribution = items.reduce<Record<string, number>>(
    (acc, option) => {
      const filteredStudentSolutions = studentSolutions.filter(
        solution => solution.src.length > 0
      );
      acc[option.id] =
        (100 *
          filteredStudentSolutions.filter(solution =>
            solution.src.includes(option.id)
          ).length) /
        (filteredStudentSolutions.length === 0
          ? 1
          : filteredStudentSolutions.length);
      return acc;
    },
    {}
  );

  if (studentSelection === undefined) {
    addStudentSolutionField(props.cellId, 'multiple-choice-solution');
    return <></>;
  }

  return (
    <>
      <MultipleChoiceStudent
        answer={studentSelection.src}
        onAnswerChanges={answer => {
          if (studentSelection.src !== answer.answer) {
            setStudentSolution(answer);
          }
        }}
        items={items}
        options={{
          multi: cell.metadata.multi,
          random: cell.metadata.random,
          showSolution: cell.metadata.showSolution,
          submitted: studentSelection.submitted,
          distributionPerItem: studentSolutionDistribution
        }}
        setSubmit={submitted => changeField({ ...studentSelection, submitted })}
        solutionOptions={cell.solutionOptions}
      />
    </>
  );
};
