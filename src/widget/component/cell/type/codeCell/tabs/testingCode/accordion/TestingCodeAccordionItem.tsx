import React, { useContext } from 'react';
import TestingCodeAccordionHeader from './TestingCodeAccordionHeader';
import TestingCodeAccordionContent from './TestingCodeAccordionContent';
import {
  DocModelContext,
  IDocModelContext
} from '../../../../../../../context/docModelContext';
import { RootState, selectField } from '../../../../../../../../state';
import { useSelector } from 'react-redux';
import { ITestCodeField } from '../../../../../../../../types';

type TestingCodeAccordionItemProps = {
  name: string;
  startingCodeId: string;
  solutionCodeId: string;
  testingCodeId: string;
};
export default function TestingCodeAccordionItem(
  props: TestingCodeAccordionItemProps
) {
  const { changeField } = useContext(DocModelContext) as IDocModelContext;

  const testingCode = useSelector((state: RootState) =>
    selectField(state, props.testingCodeId)
  ) as ITestCodeField;

  const username = useSelector((state: RootState) => state.user.identity);

  const setName = (name: string) => changeField({ ...testingCode, name: name });
  const setSrc = (src: string) => changeField({ ...testingCode, src: src });
  return testingCode.verified ||
    testingCode.createdBy === username?.username ? (
    <div className="collapse collapse-arrow mb-2">
      <TestingCodeAccordionHeader
        name={props.name}
        testingCode={testingCode}
      ></TestingCodeAccordionHeader>
      <TestingCodeAccordionContent
        solutionCodeId={props.solutionCodeId}
        testingCode={testingCode}
        startingCodeId={props.startingCodeId}
        cellId={props.name}
        changeName={setName}
        changeSrc={setSrc}
      ></TestingCodeAccordionContent>
    </div>
  ) : (
    <></>
  );
}
