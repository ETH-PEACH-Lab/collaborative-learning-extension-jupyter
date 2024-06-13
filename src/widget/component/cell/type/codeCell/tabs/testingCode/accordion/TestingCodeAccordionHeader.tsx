import React from 'react';
import { ITestCodeField } from '../../../../../../../../types';
import { useSelector } from 'react-redux';
import {
  RootState,
  selectKernelTestResult
} from '../../../../../../../../state';
type TestingCodeAccordionHeaderProps = {
  name: string;
  testingCode: ITestCodeField;
};
export default function TestingCodeAccordionHeader(
  props: TestingCodeAccordionHeaderProps
) {
  const testResult = useSelector((state: RootState) =>
    selectKernelTestResult(state, props.testingCode.id)
  );
  return (
    <>
      <input type="radio" name="my-accordion-3" />
      <div
        className={
          'collapse-title text-xl font-medium ' +
          (testResult === undefined
            ? 'bg-base-200'
            : testResult?.result
              ? 'bg-success'
              : 'bg-error')
        }
      >
        {props.testingCode.name === '' ? 'New Test' : props.testingCode.name}
      </div>
    </>
  );
}
