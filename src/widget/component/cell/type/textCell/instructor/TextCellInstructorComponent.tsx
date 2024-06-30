import React, { useContext } from 'react';
import { DocModelContext, IDocModelContext } from '../../../../../context';
import { useSelector } from 'react-redux';
import { RootState, selectCell, selectField } from '../../../../../../state';
import { IMarkdownField, ITextCell } from '../../../../../../types';
import {
  Indicator,
  MarkdownEditor,
  StudentSelection
} from '../../../../../../ui';
import { TextCellStudentSelectionTab } from './TextCellStudentSelectionTab';

type TextCellInstructorComponentProps = {
  cellId: string;
};
const TextCellInstructorComponent = (
  props: TextCellInstructorComponentProps
) => {
  const { changeField } = useContext(DocModelContext) as IDocModelContext;
  const cell = useSelector((state: RootState) =>
    selectCell(state, props.cellId)
  ) as ITextCell;
  const solutionTextField = useSelector((state: RootState) =>
    selectField(state, cell.solutionId)
  ) as IMarkdownField;

  if (solutionTextField === undefined) {
    return <></>;
  }
  const SolutionTab = (
    <StudentSelection.HomeTab label="Solution" key={-1}>
      <Indicator className="mt-4" label="Solution">
        <MarkdownEditor
          src={solutionTextField.src}
          onChange={value => changeField({ ...solutionTextField, src: value })}
        />
      </Indicator>
    </StudentSelection.HomeTab>
  );
  const StudentTabs = [SolutionTab];
  StudentTabs.push(
    ...cell.studentSolutionIds.map((id, index) => {
      return <TextCellStudentSelectionTab key={index} studentSolutionId={id} />;
    })
  );
  return (
    <>
      <StudentSelection>{StudentTabs}</StudentSelection>
    </>
  );
};

export default TextCellInstructorComponent;
