import React, { useState } from 'react';
import {
  ITextResponseAnswer,
  MarkdownComponent,
  TextResponseComponent
} from 'react-quiz-ui';

export const QuizUiContentTextResponse: React.FC = () => {
  const [answer, setAnswer] = useState<string>('');
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [jupyter, setJupyter] = useState<boolean>(true);
  const [tabs, setTabs] = useState<boolean>(false);
  const [splitMode, setSplitMode] = useState<boolean>(false);
  return (
    <>
      <h3 className="text-center mt-2">Text response exercise</h3>
      <p>
        The text response component integrates both the Monaco code editor and a
        markdown renderer. It offers various editing modes, including
        tab-separated source and rendered markdown, Jupyter notebook mode, and
        vertical/horizontal split view.
      </p>
      <div className="mt-4">
        <MarkdownComponent src="**Example**: What is the importance of consistency in interface design?"></MarkdownComponent>
      </div>
      <div className="mt-2">
        <TextResponseComponent
          initialAnswer={{ answer: { src: answer } }}
          onAnswerChanges={(answer: ITextResponseAnswer) =>
            setAnswer(answer.answer.src)
          }
          exerciseObject={{
            metadata: {
              showSolution: showSolution,
              markdownEditorConfig: {
                jupyter: jupyter,
                tabs: tabs,
                alignVertical: splitMode
              }
            },
            solution:
              'Consistency in interface design is crucial because it helps users develop a ' +
              'predictable mental model of how the system works, reducing the learning curve and minimizing errors. ' +
              'When design elements such as buttons, icons, and navigation patterns are consistent across the interface, ' +
              'users can easily transfer their knowledge from one part of the system to another, leading to a more intuitive ' +
              'and efficient user experience.'
          }}
        ></TextResponseComponent>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <select
          className="select text-left select-bordered"
          onChange={event => {
            if (event.target.value == 'jupyter') {
              setJupyter(true);
              setTabs(false);
              setSplitMode(false);
            }
            if (event.target.value == 'tabs') {
              setJupyter(false);
              setTabs(true);
              setSplitMode(false);
            }
            if (event.target.value == 'splitMode') {
              setJupyter(false);
              setTabs(false);
              setSplitMode(true);
            }
          }}
        >
          <option value="jupyter" disabled={jupyter} selected>
            Jupyter mode
          </option>
          <option value="tabs" disabled={tabs}>
            Tabs mode
          </option>
          <option value="splitMode" disabled={splitMode}>
            Split mode
          </option>
        </select>
        <button
          className={'btn btn-sm self-center'}
          onClick={() => setShowSolution(!showSolution)}
        >
          {showSolution ? 'Hide' : 'Show'} Solution
        </button>
      </div>
    </>
  );
};
