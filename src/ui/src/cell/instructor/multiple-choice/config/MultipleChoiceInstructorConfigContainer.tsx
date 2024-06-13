import React, { ReactElement } from 'react';
import { MultipleChoiceInstructorConfigItemProps } from './MultipleChoiceInstructorConfigItem';
import { Indicator } from '../../../../common';

type MultipleChoiceInstructorConfigContainerProps = {
  label: string;
  children:
    | ReactElement<MultipleChoiceInstructorConfigItemProps>[]
    | ReactElement<MultipleChoiceInstructorConfigItemProps>;
};
export const MultipleChoiceInstructorConfigContainer: React.FC<
  MultipleChoiceInstructorConfigContainerProps
> = ({
  children,
  label = 'Configuration'
}: MultipleChoiceInstructorConfigContainerProps) => {
  return <Indicator label={label}>{children}</Indicator>;
};
