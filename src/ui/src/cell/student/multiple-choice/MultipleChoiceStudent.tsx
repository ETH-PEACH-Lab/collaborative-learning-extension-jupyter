import React from 'react';
import {
  IMultipleChoiceAnswer,
  IMultipleChoiceItem,
  MultipleChoiceComponent
} from 'react-quiz-ui';
import { MarkdownConfig, SubmitButton } from '../../../common';

type MultipleChoiceStudentProps = {
  options: {
    multi?: boolean;
    random?: boolean;
    showSolution?: boolean;
    submitted?: boolean;
    distributionPerItem: number[];
  };
  items: IMultipleChoiceItem[];
  solutionOptions: string[];
  answer: string[];
  onAnswerChanges: (answer: IMultipleChoiceAnswer) => void;
  setSubmit: (submitted: boolean) => void;
};
export const MultipleChoiceStudent: React.FC<MultipleChoiceStudentProps> = ({
  options,
  items,
  solutionOptions,
  answer,
  onAnswerChanges,
  setSubmit
}: MultipleChoiceStudentProps) => {
  return (
    <>
      <MultipleChoiceComponent
        exerciseObject={{
          items: items,
          correctAnswers: solutionOptions,
          metadata: {
            multi: options.multi,
            disabled: options.submitted || options.showSolution,
            showEvaluation: options.showSolution,
            distribution: {
              show: options.showSolution,
              perItem: options.distributionPerItem
            },
            random: options.random,
            markdownConfig: MarkdownConfig,
            multipleChoiceItemColoring: {}
          }
        }}
        onAnswerChanges={onAnswerChanges}
        initialAnswer={{ answer: answer }}
      ></MultipleChoiceComponent>
      <SubmitButton
        className="mt-4"
        finalized={options.showSolution}
        showBadgeOnSubmitted={true}
        submitted={options.submitted}
        onSubmit={() => setSubmit(true)}
      />
    </>
  );
};
