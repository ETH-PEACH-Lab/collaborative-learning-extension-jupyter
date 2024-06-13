import React from 'react';
import { ICodeCell } from '../../../../../../../../types';
import TestingCodeAccordionItem from './TestingCodeAccordionItem';
import { useSelector } from 'react-redux';
import { RootState, selectCell } from '../../../../../../../../state';

type TestingCodeAccordionContainerProps = {
  cellId: string;
};
export default function TestingCodeAccordionContainer(
  props: TestingCodeAccordionContainerProps
) {
  const testingCodeIds = useSelector(
    (state: RootState) =>
      (selectCell(state, props.cellId) as ICodeCell).testingCodeIds
  );
  const solutionCodeId = useSelector(
    (state: RootState) =>
      (selectCell(state, props.cellId) as ICodeCell).solutionCodeId
  );
  const startingCodeId = useSelector(
    (state: RootState) =>
      (selectCell(state, props.cellId) as ICodeCell).startingCodeId
  );
  return (
    <div className="accordion">
      {testingCodeIds.map(testId => (
        <TestingCodeAccordionItem
          name={props.cellId}
          testingCodeId={testId}
          solutionCodeId={solutionCodeId}
          startingCodeId={startingCodeId}
        ></TestingCodeAccordionItem>
      ))}
    </div>
  );
}
