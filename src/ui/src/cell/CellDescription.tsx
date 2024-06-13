import React from 'react';
import { Indicator, MarkdownEditor } from '../common';
import { MarkdownComponent } from 'react-quiz-ui';
type CellDescriptionProps = {
  isInstructor: boolean;
  src: string;
  onChange: (value: string) => void;
};
export const CellDescription: React.FC<CellDescriptionProps> = ({
  isInstructor,
  src,
  onChange
}: CellDescriptionProps) => {
  return (
    <>
      {isInstructor ? (
        <Indicator label="Exercise description">
          <MarkdownEditor src={src} onChange={onChange} />
        </Indicator>
      ) : (
        <MarkdownComponent src={src} />
      )}
    </>
  );
};
