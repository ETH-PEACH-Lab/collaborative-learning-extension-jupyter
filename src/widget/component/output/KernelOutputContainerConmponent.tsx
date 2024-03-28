import { UseSignal } from '@jupyterlab/ui-components';
import { useContext } from 'react';
import { IKernelOutput } from '../../../types/kernelTypes';
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

  const shouldUpdateOutput = (_: any, output: IKernelOutput) => {
    return output.referenceId === props.id;
  };
  return (
    <>
      <UseSignal
        signal={kernelOutputSignal}
        initialArgs={undefined}
        shouldUpdate={shouldUpdateOutput}
      >
        {(_: any, output: IKernelOutput | undefined) => {
          if (output === undefined) {
            return <></>;
          }
          return (
            <div className="puzzle-field--code-output">
              <KernelOutputComponent
                output={output}
                disableNoOutput={props.disableNoOutput}
              ></KernelOutputComponent>
            </div>
          );
        }}
      </UseSignal>
    </>
  );
}
