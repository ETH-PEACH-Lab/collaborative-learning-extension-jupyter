import React from 'react';
import {
  ITextResponseAnswer,
  TextResponseComponent,
  adjustableHeightCodeOptions,
  readonlyAdjustableHeightCodeOptions
} from 'react-quiz-ui';
import { MarkdownConfig, SubmitButton } from '../../../common';
type TextResponseStudentProps = {
  options: {
    showSolution?: boolean;
    submitted?: boolean;
  };
  answer: string;
  solution: string;

  onAnswerChanges: (answer: ITextResponseAnswer) => void;
  setSubmit: (submitted: boolean) => void;
};
export const TextResponseStudent: React.FC<TextResponseStudentProps> = ({
  options,
  answer,
  solution,
  setSubmit,
  onAnswerChanges
}: TextResponseStudentProps) => {
  const codeConfigOptions = options.submitted
    ? readonlyAdjustableHeightCodeOptions
    : adjustableHeightCodeOptions;
  return (
    <>
      <TextResponseComponent
        exerciseObject={{
          solution: solution,
          metadata: {
            showSolution: options.showSolution && options.submitted,
            markdownEditorConfig: {
              jupyter: true,
              markdownConfig: MarkdownConfig,
              codeConfig: { options: codeConfigOptions }
            }
          }
        }}
        initialAnswer={{ answer: { src: answer } }}
        onAnswerChanges={onAnswerChanges}
      ></TextResponseComponent>
      <SubmitButton
        className="mt-2"
        finalized={options.showSolution}
        showBadgeOnSubmitted={true}
        submitted={options.submitted}
        onSubmit={() => setSubmit(true)}
        onUndo={() => setSubmit(false)}
      />
    </>
  );
};
