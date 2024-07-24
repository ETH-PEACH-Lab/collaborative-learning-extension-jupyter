import React, { useState } from 'react';
import {
  CodingComponent,
  ICodingAnswer,
  MarkdownComponent,
  adjustableHeightCodeOptions,
  readonlyAdjustableHeightCodeOptions,
  DiffCodeComponent
} from 'react-quiz-ui';

export const QuizUiContentCoding: React.FC = () => {
  const [answer, setAnswer] = useState<string>('# Your code here');
  return (
    <>
      <h3 className="text-center mt-4">Coding exercise / diff view</h3>
      <p>
        The coding component encapsulates the Monaco code editor and allows to
        include a starting code snippet. In addition, the library provides a
        diff view, which enables students to compare their code with the master
        solution.
      </p>
      <div className="m-4">
        <MarkdownComponent src="**Example**: In this exercise, you will write a Python function to compute the multiplication of two given non-negative integer."></MarkdownComponent>
      </div>
      <div className="mt-4">
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
              src: 'def multiplication(n,m):'
            }
          }}
        ></CodingComponent>
      </div>
      <div className="mt-4">
        <p>Diff view:</p>
        <div className="ml-4">
          <DiffCodeComponent
            language="python"
            original="def multiplication(n,m):
  # Your code here
    return n * m;"
            config={{
              options: readonlyAdjustableHeightCodeOptions,
              theme: 'diff-theme'
            }}
            modified="def multiplication(n,m):
  # Your code here
    return m * n;"
          ></DiffCodeComponent>
        </div>
      </div>
    </>
  );
};
