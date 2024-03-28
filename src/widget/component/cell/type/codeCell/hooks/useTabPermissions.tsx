import { useContext } from 'react';
import { Tab } from '../tabs/types';
import {
  IUserRoleContext,
  UserRoleContext
} from '../../../../../context/userRoleContext';

export default function useTabPermisions() {
  const { isInstructor } = useContext(UserRoleContext) as IUserRoleContext;

  const instructorOnly = (tab: Tab) =>
    (tab.instructorOnly && isInstructor) || !tab.instructorOnly;
  const studentOnly = (tab: Tab) =>
    (tab.studentOnly && !isInstructor) || !tab.studentOnly;

  const permitted = (tab: Tab) => instructorOnly(tab) && studentOnly(tab);
  return { permitted };
}
