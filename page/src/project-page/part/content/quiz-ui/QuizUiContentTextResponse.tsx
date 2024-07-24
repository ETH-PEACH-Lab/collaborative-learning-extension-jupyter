import React, { useState } from 'react';
import {
  ITextResponseAnswer,
  MarkdownComponent,
  TextResponseComponent
} from 'react-quiz-ui';

export const QuizUiContentTextResponse: React.FC = () => {
  const [answer, setAnswer] = useState<string>('');
  const [jupyter, setJupyter] = useState<boolean>(true);
  const [tabs, setTabs] = useState<boolean>(false);
  const [splitMode, setSplitMode] = useState<boolean>(false);
  return (
    <>
      <h3 className="text-center mt-4">Text response exercise</h3>
      <p>
        The text response component integrates both the Monaco code editor and a
        markdown renderer. It offers various editing modes, including
        tab-separated source and rendered markdown, Jupyter notebook mode, and
        vertical/horizontal split view.
      </p>
      <div className="mt-4">
        <MarkdownComponent src="**Example**: What is the importance of consistency in interface design?"></MarkdownComponent>
      </div>
      <div className="mt-4">
        <TextResponseComponent
          initialAnswer={{ answer: { src: answer } }}
          onAnswerChanges={(answer: ITextResponseAnswer) =>
            setAnswer(answer.answer.src)
          }
          exerciseObject={{
            metadata: {
              markdownEditorConfig: {
                jupyter: jupyter,
                tabs: tabs,
                alignVertical: splitMode,
                codeConfig: {
                  theme: 'diff-theme'
                }
              }
            }
          }}
        ></TextResponseComponent>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <select
          defaultValue={'jupyter'}
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
          <option value="jupyter" disabled={jupyter}>
            Jupyter mode
          </option>
          <option value="tabs" disabled={tabs}>
            Tabs mode
          </option>
          <option value="splitMode" disabled={splitMode}>
            Split mode
          </option>
        </select>
      </div>
    </>
  );
};
