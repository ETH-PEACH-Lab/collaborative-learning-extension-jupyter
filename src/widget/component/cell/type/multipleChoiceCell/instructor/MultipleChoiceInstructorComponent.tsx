import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState, selectCell, selectFields } from '../../../../../../state';
import { IMultipleChoiceCell } from '../../../../../../types';
import { DocModelContext, IDocModelContext } from '../../../../../context';
import { IMultipleChoiceItem } from 'react-quiz-ui';
import {
  MultipleChoiceInstructor,
  MultipleChoiceInstructorConfigContainer,
  MultipleChoiceInstructorConfigItem,
  MultipleChoiceInstructorItem
} from '../../../../../../ui';

type MultipleChoiceInstructorComponentProps = {
  cellId: string;
};
export default function MultipleChoiceInstructorComponent(
  props: MultipleChoiceInstructorComponentProps
) {
  const {
    addMultipleChoiceOption,
    changeCell,
    changeField,
    removeMultipleChoiceOption,
    swapPositionOfMultipleChoiceOption
  } = useContext(DocModelContext) as IDocModelContext;

  const cell = useSelector((state: RootState) =>
    selectCell(state, props.cellId)
  ) as IMultipleChoiceCell;
  const options = useSelector((state: RootState) =>
    selectFields(state, cell.options)
  ) as IMultipleChoiceItem[];

  const studentSolutions = useSelector((state: RootState) =>
    selectFields(state, cell.studentSolutionIds)
  ) as IMultipleChoiceItem[];

  const studentSolutionDistribution = options.map(option => {
    return (
      (100 *
        studentSolutions.filter(
          solution =>
            solution.src.length > 0 && solution.src.includes(option.id)
        ).length) /
      (studentSolutions.length === 0 ? 1 : studentSolutions.length)
    );
  });
  const onCorrectAnswerChange = (optionId: string, correct: boolean) => {
    if (correct) {
      if (cell.multi) {
        changeCell({
          ...cell,
          solutionOptions: [...cell.solutionOptions, optionId]
        });
      } else {
        changeCell({ ...cell, solutionOptions: [optionId] });
      }
    } else {
      changeCell({
        ...cell,
        solutionOptions: cell.solutionOptions.filter(id => id !== optionId)
      });
    }
  };
  const Items = options.map((option, index) => (
    <MultipleChoiceInstructorItem
      content={option.src}
      index={index}
      selected={cell.solutionOptions.includes(option.id)}
      parentId={props.cellId}
      maxIndex={cell.options.length - 1}
      onItemContentChange={value => changeField({ ...option, src: value })}
      optionId={option.id}
      onSelectionChange={onCorrectAnswerChange}
      studentDistribution={studentSolutionDistribution[index]}
      options={{ multi: cell.multi, randomOrder: cell.random }}
      remove={() => removeMultipleChoiceOption(props.cellId, option.id)}
      swapPosition={(from, to) =>
        swapPositionOfMultipleChoiceOption(props.cellId, from, to)
      }
    ></MultipleChoiceInstructorItem>
  ));

  return (
    <MultipleChoiceInstructor
      addMultipleChoiceOption={() => addMultipleChoiceOption(props.cellId)}
    >
      <MultipleChoiceInstructorConfigContainer label="Configuration">
        <MultipleChoiceInstructorConfigItem
          label="Multi Selection"
          onChange={value => changeCell({ ...cell, multi: value })}
          value={cell.multi}
        />
        <MultipleChoiceInstructorConfigItem
          label="Random Order"
          onChange={value => changeCell({ ...cell, random: value })}
          value={cell.random}
        />
      </MultipleChoiceInstructorConfigContainer>
      {Items}
    </MultipleChoiceInstructor>
  );
}
