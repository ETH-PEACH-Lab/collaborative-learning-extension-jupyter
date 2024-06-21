import React, { useState } from 'react';
import {
  CodingComponent,
  ICodingAnswer,
  MarkdownComponent,
  adjustableHeightCodeOptions,
  readonlyAdjustableHeightCodeOptions
} from 'react-quiz-ui';

export const QuizUiContentCoding: React.FC = () => {
  const [answer, setAnswer] = useState<string>('# Your code here');
  return (
    <>
      <h3 className="text-center mt-2">Coding exercise</h3>
      <p>
        The coding component encapsulates the Monaco code editor and allows to
        include a starting code snippet.
      </p>
      <div className="mt-4">
        <MarkdownComponent src="**Example**: In this exercise, you will write a Python function to compute the factorial of a given non-negative integer."></MarkdownComponent>
      </div>
      <div className="mt-2">
        <CodingComponent
          onAnswerChanges={(answer: ICodingAnswer) => {
            setAnswer(answer.answer.src);
          }}
          initialAnswer={{ answer: { language: 'python', src: answer } }}
          exerciseObject={{
            metadata: {
              startingCodeConfig: {
                options: readonlyAdjustableHeightCodeOptions
              },
              answerCodeConfig: { options: adjustableHeightCodeOptions }
            },
            startingCode: {
              language: 'python',
              src: 'def factorial(n):'
            }
          }}
        ></CodingComponent>
      </div>
    </>
  );
};
