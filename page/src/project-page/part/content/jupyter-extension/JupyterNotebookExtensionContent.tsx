import React from 'react';
import { MultipleChoiceExample } from './MultipleChoiceExample';
import { CodingExample } from './CodingExample';
export const JupyterNotebookExtensionContent: React.FC = () => {
  return (
    <>
      <p>
        Instructors are able to create programming exercises, multiple-choice
        questionnaires, and text-response questionnaires. They can spontaneously
        modify them during class. Any modifications to an existing exercise or
        the creation of a new one are (eventually) synced to the students.
        Furthermore, instructors can monitor the progress of the class in
        real-time and provide feedback to the students.
      </p>
      <MultipleChoiceExample />
      <h3 className="text-center mt-4">Live Peer Testing</h3>
      <p className=" mt-4">
        Live Peer Testing is an approach that allows students and instructors to
        collaboratively write and share tests in real time to assess the
        correctness of the code. Students can easily add and customize test
        cases, while instructors control their availability and may require
        valid tests before coding begins. Students can verify tests against a
        master solution provided by the instructor, ensuring they pass
        meaningful criteria. Verified test cases are added to a shared library,
        allowing all students to test their code against a comprehensive set of
        cases.
      </p>
      <CodingExample />
      <p className="mt-4">
        Note: Buttons related to code execution are disabled. To see the
        extension in action, start a Binder environment{' '}
        <a
          href="https://mybinder.org/v2/gh/ETH-PEACH-Lab/collaborative-learning-extension-jupyter/main?urlpath=lab"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
    </>
  );
};
