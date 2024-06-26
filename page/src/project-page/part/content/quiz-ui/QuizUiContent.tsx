import React from 'react';
import { QuizUiContentMultipleChoice } from './QuizUiContentMultipleChoice';
import { QuizUiContentCoding } from './QuizUiContentCoding';
import { QuizUiContentTextResponse } from './QuizUiContentTextResponse';

export const QuizUiContent: React.FC = () => {
  return (
    <>
      <p>
        Our jupyter notebook extension supports three types of exercises:
        Coding, Multiple Choice and Text Response. We bundled the UI components
        into a separate library to make them reusable.
      </p>

      <QuizUiContentCoding />
      <QuizUiContentMultipleChoice />
      <QuizUiContentTextResponse />
      <p>
        {' '}
        Visit{' '}
        <a
          className="underline text-blue-400"
          href="https://eth-peach-lab.github.io/react-quiz-ui"
        >
          StoryBook
        </a>{' '}
        for more visual examples
      </p>
    </>
  );
};
