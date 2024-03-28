import { UseSignal } from '@jupyterlab/ui-components';
import React, { useContext } from 'react';
import { IKernelTestResult } from '../../../../../../../../types/kernelTypes';
import { ITestCodeField } from '../../../../../../../../types/schemaTypes';
import {
  IKernelContext,
  KernelContext
} from '../../../../../../../context/kernelContext';
type TestingCodeAccordionHeaderProps = {
  testingCode: ITestCodeField;
};
export default function TestingCodeAccordionHeader(
  props: TestingCodeAccordionHeaderProps
) {
  const { testResultSignal } = useContext(KernelContext) as IKernelContext;

  return (
    <h2
      className="accordion-header"
      id={'accordion-header-' + props.testingCode.id}
    >
      <UseSignal
        signal={testResultSignal}
        initialArgs={undefined}
        shouldUpdate={(_: any, output: IKernelTestResult) =>
          output.referenceId === props.testingCode.id
        }
      >
        {(_: any, output: IKernelTestResult | undefined) => (
          <button
            className={
              'accordion-button collapsed ' +
              (output !== undefined && output?.result ? 'bg-success' : '') +
              (output !== undefined && !output?.result ? 'bg-danger' : '')
            }
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={'#collapse-' + props.testingCode.id}
            aria-expanded="false"
            aria-controls={'collapse-' + props.testingCode.id}
          >
            {props.testingCode.name === ''
              ? 'New Test'
              : props.testingCode.name}
          </button>
        )}
      </UseSignal>
    </h2>
  );
}
