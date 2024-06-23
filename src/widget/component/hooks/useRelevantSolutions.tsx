import { useSelector } from 'react-redux';
import { RootState, selectGroups, selectIdentity } from '../../../state';
import { InstructorsGroupName } from '../../../types';

export default function useRelevantSolutions(solutions: {
  [key: string]: string;
}) {
  const isInstructor = useSelector((state: RootState) =>
    selectGroups(state)
  ).includes(InstructorsGroupName);
  const identity = useSelector((state: RootState) => selectIdentity(state));
  return Object.keys(solutions)
    .map(key => solutions[key])
    .filter(
      studentCode => identity?.username === studentCode || isInstructor
    ) as string[];
}
