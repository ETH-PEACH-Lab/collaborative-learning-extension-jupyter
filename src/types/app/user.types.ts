import { User } from '@jupyterlab/services';
export const InstructorsGroupName = 'instructors';
export type UserInformation = {
  groups: string[];
  identity: User.IIdentity | null;
};
