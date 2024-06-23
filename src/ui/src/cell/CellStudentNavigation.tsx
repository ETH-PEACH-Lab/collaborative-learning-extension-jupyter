import { User } from '@jupyterlab/services';
import { Tab, Tabs } from '../common';
import React from 'react';

export type CellStudentNavigationProps = {
  onUserNavigate: (userName: string) => void;
  users: User.IIdentity[];
};
export const CellStudentNavigation: React.FC<CellStudentNavigationProps> = ({
  onUserNavigate,
  users
}: CellStudentNavigationProps) => {
  return (
    <Tabs onTabChange={index => onUserNavigate(users[index].username)}>
      {users.map(user => {
        return <Tab label={user.name}>{user.name}</Tab>;
      })}
    </Tabs>
  );
};
