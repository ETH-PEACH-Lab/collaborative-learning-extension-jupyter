import React from 'react';
import {
  ITextResponseAnswer,
  TextResponseComponent,
  adjustableHeightCodeOptions,
  readonlyAdjustableHeightCodeOptions
} from 'react-quiz-ui';
import {
  Feedback,
  MarkdownConfig,
  SubmitButton,
  Toolbar
} from '../../../common';
import { InstructorComment } from '../../../common/feedback/InstructorComment';
type TextResponseStudentProps = {
  options: {
    showSolution?: boolean;
    submitted?: boolean;
  };
  answer: string;
  solution: string;
  comment?: string;

  onAnswerChanges: (answer: ITextResponseAnswer) => void;
  setSubmit: (submitted: boolean) => void;
};
export const TextResponseStudent: React.FC<TextResponseStudentProps> = ({
  options,
  answer,
  comment,
  solution,
  setSubmit,
  onAnswerChanges
}: TextResponseStudentProps) => {
  const codeConfigOptions =
    options.submitted || options.showSolution
      ? readonlyAdjustableHeightCodeOptions
      : adjustableHeightCodeOptions;
  return (
    <>
      <TextResponseComponent
        exerciseObject={{
          metadata: {
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
      {options.showSolution && (
        <Feedback
          feedbackAsMarkdown={'Solution: ' + solution}
          className="mt-4"
        />
      )}
      {options.showSolution && <InstructorComment comment={comment} />}
      <Toolbar className="my-4" showOnHover={false}>
        <SubmitButton
          finalized={options.showSolution}
          showBadgeOnSubmitted={true}
          submitted={options.submitted}
          onSubmit={() => setSubmit(true)}
        />
      </Toolbar>
    </>
  );
};
