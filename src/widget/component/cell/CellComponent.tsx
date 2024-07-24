import React from 'react';
import { CellMarkdownDescriptionComponent } from './CellMarkdownDescriptionComponent';
import { CellToolbarComponent } from './CellToolbarComponent';
import CodeCell from './type/codeCell/CodeCell';
import { useSelector } from 'react-redux';
import { selectCell } from '../../../state/slice/yjs/cellsSlice';
import { RootState } from '../../../state/store';
import { MultipleChoiceCell } from './type/multipleChoiceCell/MultipleChoiceCell';
import TextCell from './type/textCell/TextCell';
import { Content, ContentBody } from '../../../ui';
import { selectGroups } from '../../../state';
import { InstructorsGroupName } from '../../../types';
type CellComponentProps = {
  cellId: string;
  index: number;
  docId: string;
};

export function CellComponent({ cellId, index, docId }: CellComponentProps) {
  const documentId = useSelector(
    (state: RootState) => selectCell(state, cellId).documentId
  );
  const cellDescriptionId = useSelector(
    (state: RootState) => selectCell(state, cellId).descriptionId
  );
  const cellType = useSelector(
    (state: RootState) => selectCell(state, cellId).type
  );
  const cellVisibility = useSelector(
    (state: RootState) => selectCell(state, cellId).metadata.visible
  );
  const isInstructor = useSelector((state: RootState) =>
    selectGroups(state)
  ).includes(InstructorsGroupName);
  return (cellVisibility || isInstructor) && documentId === docId ? (
    <Content className="ml-2 mr-2 animate-fadein" borderOnHover={true}>
      <CellToolbarComponent cellId={cellId} index={index} />
      <ContentBody>
        <div className="mb-2">
          <CellMarkdownDescriptionComponent fieldId={cellDescriptionId} />
        </div>

        {cellType === 'code-cell' && <CodeCell cellId={cellId}></CodeCell>}
        {cellType === 'multiple-choice-cell' && (
          <MultipleChoiceCell cellId={cellId}></MultipleChoiceCell>
        )}
        {cellType === 'text-cell' && <TextCell cellId={cellId}></TextCell>}
      </ContentBody>
    </Content>
  ) : (
    <></>
  );
}
