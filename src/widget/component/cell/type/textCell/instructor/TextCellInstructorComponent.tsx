import React, { useContext } from 'react';
import { DocModelContext, IDocModelContext } from '../../../../../context';
import { useSelector } from 'react-redux';
import { RootState, selectCell, selectField } from '../../../../../../state';
import { IMarkdownField, ITextCell } from '../../../../../../types';
import { TextResponseInstructor } from '../../../../../../ui';

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
  return (
    <TextResponseInstructor
      src={solutionTextField.src}
      onChange={value => changeField({ ...solutionTextField, src: value })}
    />
  );
};

export default TextCellInstructorComponent;
