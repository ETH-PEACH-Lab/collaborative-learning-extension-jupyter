import { useSelector } from 'react-redux';
import { ITestCodeField } from '../../../../../../types';
import { RootState, selectIdentity } from '../../../../../../state';
export default function useRelevantTests(tests: ITestCodeField[]) {
  const identity = useSelector((state: RootState) => selectIdentity(state));

  return tests.filter(
    testField =>
      testField.verified || testField.createdBy === identity?.username
  );
}
