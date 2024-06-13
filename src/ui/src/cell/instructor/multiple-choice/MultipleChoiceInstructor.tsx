import React from 'react';
import { BaseButton, RightAlignedToolbar } from '../../../common';
import { addIcon } from '@jupyterlab/ui-components';

type MultipleChoiceInstructorProps = {
  children: React.ReactNode;
  addMultipleChoiceOption: () => void;
};
export const MultipleChoiceInstructor: React.FC<
  MultipleChoiceInstructorProps
> = ({ children, addMultipleChoiceOption }: MultipleChoiceInstructorProps) => {
  return (
    <>
      {children}
      <RightAlignedToolbar className="mt-2">
        <BaseButton icon={addIcon.svgstr} onClick={addMultipleChoiceOption} />
      </RightAlignedToolbar>
    </>
  );
};
