import React from 'react';
import { Indicator, MarkdownEditor } from '../../../common';

type TextResponseInstructorProps = {
  src: string;
  onChange: (value: string) => void;
};
export const TextResponseInstructor: React.FC<TextResponseInstructorProps> = ({
  src,
  onChange
}: TextResponseInstructorProps) => {
  return (
    <Indicator label="Solution">
      <MarkdownEditor src={src} onChange={onChange}></MarkdownEditor>
    </Indicator>
  );
};
