import React, { useContext } from 'react';
import {
  Code,
  CompilingKernelOutputContainer,
  Indicator,
  MarkdownEditor,
  StudentSelection,
  TabsManageableProps
} from '../../../../../../ui';
import { DocModelContext, IDocModelContext } from '../../../../../context';
import {
  RootState,
  selectField,
  selectKernelExecutionResult
} from '../../../../../../state';
import { useSelector } from 'react-redux';
import { ICodeSolution } from '../../../../../../types';
type CodeCellSolutionStudentTabProps = {
  cellId: string;
  studentSolutionId: string;
  isCompiling: boolean;
} & TabsManageableProps;
export const CodeCellSolutionStudentTab: React.FC<
  CodeCellSolutionStudentTabProps
> = (props: CodeCellSolutionStudentTabProps) => {
  const { changeField } = useContext(DocModelContext) as IDocModelContext;
  const studentSolutionField = useSelector((state: RootState) =>
    selectField(state, props.studentSolutionId)
  ) as ICodeSolution;
  const kernelOutputs = useSelector((state: RootState) =>
    selectKernelExecutionResult(state, studentSolutionField.id)
  );
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
        <CompilingKernelOutputContainer
          isCompiling={props.isCompiling}
          objects={kernelOutputs?.outputs ?? []}
          className="animate-fadein mt-2"
          classNameCompilingHint="absolute top-0 right-0 mr-4"
        ></CompilingKernelOutputContainer>
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
