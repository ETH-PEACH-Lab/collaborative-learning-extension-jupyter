import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { selectField } from '../../../state/slice/yjs/fieldSlice';
import {
  DocModelContext,
  IDocModelContext
} from '../../context/docModelContext';
import { IMarkdownField, InstructorsGroupName } from '../../../types';
import { CellDescription } from '../../../ui';
import { selectGroups } from '../../../state';
type CellMarkdownDescriptionComponentProps = {
  fieldId: string;
};
export function CellMarkdownDescriptionComponent({
  fieldId
}: CellMarkdownDescriptionComponentProps) {
  const field = useSelector((state: RootState) =>
    selectField(state, fieldId)
  ) as IMarkdownField;
  const isInstructor = useSelector((state: RootState) =>
    selectGroups(state)
  ).includes(InstructorsGroupName);

  const { changeField } = useContext(DocModelContext) as IDocModelContext;

  const onChange = (src: string) => {
    changeField({ ...field, src: src });
  };
  if (field === undefined) {
    return <></>;
  }
  return (
    <CellDescription
      isInstructor={isInstructor}
      onChange={onChange}
      src={field.src}
    />
  );
}
