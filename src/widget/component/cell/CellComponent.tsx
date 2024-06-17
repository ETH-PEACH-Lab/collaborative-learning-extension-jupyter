import React from 'react';
import { CellMarkdownDescriptionComponent } from './CellMarkdownDescriptionComponent';
import { CellToolbarComponent } from './CellToolbarComponent';
import CodeCell from './type/codeCell/CodeCell';
import { useSelector } from 'react-redux';
import { selectCell } from '../../../state/slice/yjs/cellsSlice';
import { RootState } from '../../../state/store';
import { MultipleChoiceCell } from './type/multipleChoiceCell/MultipleChoiceCell';
import TextCell from './type/textCell/TextCell';
import { selectUserRole } from '../../../state';
import { Content, ContentBody } from '../../../ui';
type CellComponentProps = {
  cellId: string;
  index: number;
};

export function CellComponent(props: CellComponentProps) {
  const cellDescriptionId = useSelector(
    (state: RootState) => selectCell(state, props.cellId).descriptionId
  );
  const cellType = useSelector(
    (state: RootState) => selectCell(state, props.cellId).type
  );
  const cellVisibility = useSelector(
    (state: RootState) => selectCell(state, props.cellId).visible
  );
  const isInstructor =
    useSelector((state: RootState) => selectUserRole(state)) === 'instructor';
  return cellVisibility || isInstructor ? (
    <Content className="ml-2 mr-2" borderOnHover={true}>
      <CellToolbarComponent cellId={props.cellId} index={props.index} />
      <ContentBody>
        <div className="mb-2">
          <CellMarkdownDescriptionComponent fieldId={cellDescriptionId} />
        </div>

        {cellType === 'code-cell' && (
          <CodeCell cellId={props.cellId}></CodeCell>
        )}
        {cellType === 'multiple-choice-cell' && (
          <MultipleChoiceCell cellId={props.cellId}></MultipleChoiceCell>
        )}
        {cellType === 'text-cell' && (
          <TextCell cellId={props.cellId}></TextCell>
        )}
      </ContentBody>
    </Content>
  ) : (
    <></>
  );
}
