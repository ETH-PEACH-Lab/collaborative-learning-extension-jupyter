import React, { useContext } from 'react';
import {
  Indicator,
  Markdown,
  MarkdownEditor,
  StudentSelection,
  TabsManageableProps
} from '../../../../../../ui';
import { DocModelContext, IDocModelContext } from '../../../../../context';
import { RootState, selectField } from '../../../../../../state';
import { useSelector } from 'react-redux';
import { ITextSolution } from '../../../../../../types';
type TextCellStudentSelectionTabProps = {
  studentSolutionId: string;
} & TabsManageableProps;
export const TextCellStudentSelectionTab: React.FC<
  TextCellStudentSelectionTabProps
> = (props: TextCellStudentSelectionTabProps) => {
  const { changeField } = useContext(DocModelContext) as IDocModelContext;
  const studentSolutionField = useSelector((state: RootState) =>
    selectField(state, props.studentSolutionId)
  ) as ITextSolution;
  return (
    <StudentSelection.Tab
      {...props}
      label={studentSolutionField.createdBy as string}
      submitted={studentSolutionField.submitted}
    >
      <Indicator label="Student answer" className="mt-4">
        <Markdown
          src={
            !studentSolutionField.src || studentSolutionField.src === ''
              ? 'No response'
              : studentSolutionField.src
          }
        />
      </Indicator>
      <Indicator label="Your comment">
        <MarkdownEditor
          src={studentSolutionField.comment}
          onChange={value => {
            const newStudentSolutionField = {
              ...studentSolutionField,
              comment: value
            };
            changeField(newStudentSolutionField);
          }}
        />
      </Indicator>
    </StudentSelection.Tab>
  );
};
