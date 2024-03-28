import React, { useContext } from 'react';
import TestingCodeAccordionHeader from './TestingCodeAccordionHeader';
import TestingCodeAccordionContent from './TestingCodeAccordionContent';
import {
  ICodeField,
  ITestCodeField
} from '../../../../../../../../types/schemaTypes';
import {
  DocModelContext,
  IDocModelContext
} from '../../../../../../../context/docModelContext';

type TestingCodeAccordionItemProps = {
  cellId: string;
  testingCode: ITestCodeField;
  startingCode: ICodeField;
  solutionCode: ICodeField;
};
export default function TestingCodeAccordionItem(
  props: TestingCodeAccordionItemProps
) {
  const { setTestCodeField } = useContext(DocModelContext) as IDocModelContext;
  const setName = (name: string) =>
    setTestCodeField(props.cellId, { ...props.testingCode, name: name });
  const setSrc = (src: string) =>
    setTestCodeField(props.cellId, { ...props.testingCode, src: src });
  return (
    <div className="accordion-item">
      <TestingCodeAccordionHeader
        testingCode={props.testingCode}
      ></TestingCodeAccordionHeader>
      <TestingCodeAccordionContent
        {...props}
        changeName={setName}
        changeSrc={setSrc}
      ></TestingCodeAccordionContent>
    </div>
  );
}
