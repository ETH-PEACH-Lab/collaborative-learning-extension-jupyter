import { UseSignal } from '@jupyterlab/ui-components';
import { useContext } from 'react';
import { IKernelExecutionResult } from '../../../types/kernelTypes';
import React from 'react';
import { KernelOutputComponent } from './KernelOutputComponent';
import { IKernelContext, KernelContext } from '../../context/kernelContext';
type KernelOutputContainerComponentProps = {
  id: string;
  disableNoOutput?: boolean;
};
export default function KernelOutputContainerComponent(
  props: KernelOutputContainerComponentProps
) {
  const { kernelOutputSignal } = useContext(KernelContext) as IKernelContext;

  const shouldUpdateOutput = (_: any, output: IKernelExecutionResult) => {
    return output.referenceId === props.id;
  };
  return (
    <>
      <UseSignal
        signal={kernelOutputSignal}
        initialArgs={undefined}
        shouldUpdate={shouldUpdateOutput}
      >
        {(_: any, result: IKernelExecutionResult | undefined) => {
          if (result === undefined) {
            return <></>;
          }
          if (!result.outputs.length) {
            return (
              <div className="puzzle-field--code-output">
                <div className="alert alert-secondary">No output</div>
              </div>
            );
          }
          const outputComponents = result.outputs.map(output => (
            <KernelOutputComponent
              output={output}
              disableNoOutput={props.disableNoOutput}
            ></KernelOutputComponent>
          ));
          return (
            <div className="puzzle-field--code-output">{outputComponents}</div>
          );
        }}
      </UseSignal>
    </>
  );
}
