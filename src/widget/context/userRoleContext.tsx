import { User } from '@jupyterlab/services';
import { createContext, useState } from 'react';
import React from 'react';
type UserRoleProviderProps = {
  children: React.ReactNode;
  identity: User.IIdentity | null;
};
export const UserRoleContext = createContext<IUserRoleContext | null>(null);
export const UserRoleProvider = (props: UserRoleProviderProps) => {
  const [isInstructor, setIsInstructor] = useState<boolean>(false);
  const setInstructor = (state: boolean) => {
    setIsInstructor(state);
  };
  return (
    <UserRoleContext.Provider
      value={{ isInstructor, setInstructor, identity: props.identity }}
    >
      {props.children}
    </UserRoleContext.Provider>
  );
};

export interface IUserRoleContext {
  isInstructor: boolean;
  setInstructor: (state: boolean) => void;
  identity: User.IIdentity | null;
}
