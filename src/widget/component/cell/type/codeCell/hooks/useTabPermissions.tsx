import { useSelector } from 'react-redux';
import { Tab } from '../tabs/types';
import { RootState, selectCell, selectUserRole } from '../../../../../../state';

export default function useTabPermissions(cellId: string) {
  const isInstructor =
    useSelector((state: RootState) => selectUserRole(state)) === 'instructor';
  const showSolution = useSelector(
    (state: RootState) => selectCell(state, cellId).showSolution
  );

  const instructorOnly = (tab: Tab) =>
    (tab.instructorOnly && isInstructor) || !tab.instructorOnly;
  const studentOnly = (tab: Tab) =>
    (tab.studentOnly && !isInstructor) || !tab.studentOnly;
  const whenShowSolutionOnly = (tab: Tab) =>
    tab.whenShowSolutionOnly && showSolution;

  const permitted = (tab: Tab) =>
    (instructorOnly(tab) || whenShowSolutionOnly(tab)) && studentOnly(tab);
  return { permitted };
}
