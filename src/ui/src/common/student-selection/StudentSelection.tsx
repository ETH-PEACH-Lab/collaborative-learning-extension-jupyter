import React from 'react';
import { Tab, TabProps, Tabs, TabsProps } from '../tabs';
import {
  StudentSelectionTab,
  StudentSelectionTabProps
} from './StudentSelectionTab';

type StudentSelectionProps = TabsProps;
export const StudentSelection: React.FC<StudentSelectionProps> & {
  Tab: React.FC<StudentSelectionTabProps>;
  HomeTab: React.FC<TabProps>;
} = (props: StudentSelectionProps) => {
  return <Tabs {...props}>{props.children}</Tabs>;
};

StudentSelection.Tab = StudentSelectionTab;
StudentSelection.HomeTab = Tab;
