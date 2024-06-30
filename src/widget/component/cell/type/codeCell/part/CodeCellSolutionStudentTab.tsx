import React, { useContext } from 'react';
import {
  Code,
  Indicator,
  MarkdownEditor,
  StudentSelection,
  TabsManageableProps
} from '../../../../../../ui';
import { DocModelContext, IDocModelContext } from '../../../../../context';
import { RootState, selectField } from '../../../../../../state';
import { useSelector } from 'react-redux';
import { ICodeSolution } from '../../../../../../types';
type CodeCellSolutionStudentTabProps = {
  studentSolutionId: string;
} & TabsManageableProps;
export const CodeCellSolutionStudentTab: React.FC<
  CodeCellSolutionStudentTabProps
> = (props: CodeCellSolutionStudentTabProps) => {
  const { changeField } = useContext(DocModelContext) as IDocModelContext;
  const studentSolutionField = useSelector((state: RootState) =>
    selectField(state, props.studentSolutionId)
  ) as ICodeSolution;
  return (
    <StudentSelection.Tab
      {...props}
      label={studentSolutionField.createdBy as string}
      submitted={studentSolutionField.submitted}
    >
      <Indicator label="Student answer" className="mt-4">
        <Code
          readonly={true}
          language={studentSolutionField.language}
          src={studentSolutionField.src}
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
