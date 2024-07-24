import React from 'react';
import { BaseButton } from '../../../common';
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
      <div className="flex justify-around">
        <BaseButton
          onClick={addMultipleChoiceOption}
          label="Add Option"
          icon={addIcon.svgstr}
          className="my-4"
        ></BaseButton>
      </div>
    </>
  );
};
