import { User } from '@jupyterlab/services';
export type UserRole = 'instructor' | 'student';
export type UserInformation = {
  userRole: UserRole;
  identity: User.IIdentity | null;
};
