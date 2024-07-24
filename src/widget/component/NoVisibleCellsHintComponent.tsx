import React from 'react';
import { ContentBody, Feedback } from '../../ui';
import { useSelector } from 'react-redux';
import { RootState, selectGroups, selectVisibleCellExists } from '../../state';
type NoVisibleCellsHintProps = {
  docId: string;
  amountOfCells: number;
};
export const NoVisibleCellsHintComponent: React.FC<NoVisibleCellsHintProps> = ({
  docId,
  amountOfCells
}) => {
  const visibleCellsExists = useSelector((state: RootState) =>
    selectVisibleCellExists(state, docId)
  );
  const isInstructor = useSelector((state: RootState) =>
    selectGroups(state)
  ).includes('instructors');
  return (
    !visibleCellsExists && (
      <ContentBody className="animate-fadein">
        {isInstructor && amountOfCells === 0 && (
          <Feedback feedbackAsMarkdown="Please add new exercises to continue" />
        )}
        {!isInstructor && (
          <Feedback feedbackAsMarkdown="No exercises available yet. Please wait for the instructor to add exercises." />
        )}
      </ContentBody>
    )
  );
};
