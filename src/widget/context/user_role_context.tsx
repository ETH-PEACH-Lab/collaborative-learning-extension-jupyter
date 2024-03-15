import { createContext, useState } from 'react';
import React from 'react';
type UserRoleProviderProps = {
  children: React.ReactNode;
};
export const UserRoleContext = createContext<IUserRoleContext | null>(null);
export const UserRoleProvider = (props: UserRoleProviderProps) => {
  const [isInstructor, setIsInstructor] = useState<boolean>(false);
  const setInstructor = (state: boolean) => {
    setIsInstructor(state);
  };
  return (
    <UserRoleContext.Provider value={{ isInstructor, setInstructor }}>
      {props.children}
    </UserRoleContext.Provider>
  );
};

export interface IUserRoleContext {
  isInstructor: boolean;
  setInstructor: (state: boolean) => void;
}
