import React, { useState } from 'react';
import {
  IMultipleChoiceAnswer,
  MarkdownComponent,
  MultipleChoiceComponent
} from 'react-quiz-ui';

export const QuizUiContentMultipleChoice: React.FC = () => {
  const [answer, setAnswer] = useState<Array<string>>([]);
  const [showEvaluation, setEvaluation] = useState<boolean>(false);
  const [randomizedOrder, setRandomizedOrder] = useState<boolean>(false);
  const [multi, setMulti] = useState<boolean>(false);
  return (
    <>
      <h3 className="text-center mt-2">Multiple Choice exercise</h3>
      The multiple choice exercises includes key features such as randomizing
      the order of questions, disabling user input, and showing evaluations for
      immediate feedback. It supports both radio buttons for single-answer
      questions and checkboxes for multiple-answer questions, catering to
      various question types.
      <div className="mt-4">
        <MarkdownComponent src="**Example**: Which of the following are primary goals of Human-Computer Interaction (HCI)?"></MarkdownComponent>
      </div>
      <div className="mt-2">
        <MultipleChoiceComponent
          exerciseObject={{
            correctAnswers: ['item-1'],
            items: [
              { id: 'item-1', src: 'Minimizing user errors' },
              { id: 'item-2', src: 'Reducing maintenance overhead' },
              { id: 'item-3', src: 'Enhancing data encryption' }
            ],
            metadata: {
              multi: multi,
              showEvaluation: showEvaluation,
              random: randomizedOrder
            }
          }}
          initialAnswer={{ answer: answer }}
          onAnswerChanges={(answer: IMultipleChoiceAnswer) =>
            setAnswer(answer.answer)
          }
        ></MultipleChoiceComponent>
      </div>
      <div className="flex justify-end gap-2">
        <button className={'btn btn-sm '} onClick={() => setMulti(!multi)}>
          {multi ? 'Single' : 'Multiple'}-Select
        </button>
        <button
          className={'btn btn-sm '}
          onClick={() => setRandomizedOrder(!randomizedOrder)}
        >
          {randomizedOrder ? 'Strict' : 'Randomized'} Order
        </button>
        <button
          className={'btn btn-sm '}
          onClick={() => setEvaluation(!showEvaluation)}
        >
          {showEvaluation ? 'Hide' : 'Show'} Result
        </button>
      </div>
    </>
  );
};
