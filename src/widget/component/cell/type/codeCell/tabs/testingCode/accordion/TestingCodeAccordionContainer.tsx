import React from 'react';
import {
  ICodeField,
  ITestCodeField
} from '../../../../../../../../types/schemaTypes';
import useRelevantTests from '../../../hooks/useRelevantTests';
import TestingCodeAccordionItem from './TestingCodeAccordionItem';
import UseFieldSignal from '../../../../../../../signal/UseFieldSignal';

type TestingCodeAccordionContainerProps = {
  cellId: string;
  testingCode: ITestCodeField[];
  startingCode: ICodeField;
  solutionCode: ICodeField;
};
export default function TestingCodeAccordionContainer(
  props: TestingCodeAccordionContainerProps
) {
  const relevantTests = useRelevantTests(props.testingCode);
  return (
    <div className="accordion" id={'test-code-accordion-' + props.cellId}>
      {relevantTests.map(relevantTest => (
        <UseFieldSignal field={relevantTest}>
          {testCodeField => (
            <TestingCodeAccordionItem
              cellId={props.cellId}
              testingCode={testCodeField}
              solutionCode={props.solutionCode}
              startingCode={props.startingCode}
            ></TestingCodeAccordionItem>
          )}
        </UseFieldSignal>
      ))}
    </div>
  );
}
