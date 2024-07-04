import React from 'react';
import { Toolbar, ToolbarButton } from '../../../common';
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
      <Toolbar className="mt-4" showOnHover={false}>
        <ToolbarButton
          icon={addIcon.svgstr}
          onClick={addMultipleChoiceOption}
          hoverHint="Add Item"
        />
      </Toolbar>
    </>
  );
};
