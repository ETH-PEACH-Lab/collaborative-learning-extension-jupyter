import { useContext } from 'react';
import { ITestCodeField } from '../../../../../../types/schemaTypes';
import {
  IUserRoleContext,
  UserRoleContext
} from '../../../../../context/userRoleContext';

export default function useRelevantTests(tests: ITestCodeField[]) {
  const { identity } = useContext(UserRoleContext) as IUserRoleContext;
  return tests.filter(
    testField =>
      testField.verified || testField.createdBy === identity?.username
  );
}
