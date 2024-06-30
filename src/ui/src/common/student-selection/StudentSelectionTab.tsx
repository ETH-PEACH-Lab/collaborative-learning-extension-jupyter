import React from 'react';
import { Tab, TabProps } from '../tabs';
export type StudentSelectionTabProps = {
  submitted: boolean;
} & TabProps;
export const StudentSelectionTab: React.FC<StudentSelectionTabProps> = (
  props: StudentSelectionTabProps
) => {
  return (
    <Tab
      {...props}
      className={props.className + ' ' + (props.submitted ? 'bg-success' : '')}
    >
      {props.children}
    </Tab>
  );
};
