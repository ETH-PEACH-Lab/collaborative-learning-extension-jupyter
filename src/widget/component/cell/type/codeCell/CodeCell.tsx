import React from 'react';
import { CodeCellTabsContainer } from './tabs/CodeCellTabsContainer';
import { useSelector } from 'react-redux';
import { RootState, selectUserRole } from '../../../../../state';
import { Indicator } from '../../../../../ui';
type CodeCellProps = {
  cellId: string;
};

export default function CodeCell(props: CodeCellProps) {
  const isInstructor =
    useSelector((state: RootState) => selectUserRole(state)) === 'instructor';

  return isInstructor ? (
    <Indicator label={'Coding Setup'}>
      <CodeCellTabsContainer {...props}></CodeCellTabsContainer>
    </Indicator>
  ) : (
    <CodeCellTabsContainer {...props}></CodeCellTabsContainer>
  );
}
