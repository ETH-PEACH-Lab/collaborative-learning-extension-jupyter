import { useSelector } from 'react-redux';
import { RootState, selectIdentity, selectUserRole } from '../../../state';

export default function useRelevantSolutions(solutions: {
  [key: string]: string;
}) {
  const isInstructor =
    useSelector((state: RootState) => selectUserRole(state)) === 'instructor';
  const identity = useSelector((state: RootState) => selectIdentity(state));
  return Object.keys(solutions)
    .map(key => solutions[key])
    .filter(
      studentCode => identity?.username === studentCode || isInstructor
    ) as string[];
}
