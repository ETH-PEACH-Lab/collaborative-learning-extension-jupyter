import { useContext } from 'react';
import React from 'react';
import { runIcon } from '@jupyterlab/ui-components';
import {
  IKernelContext,
  KernelContext
} from '../../../../../context/kernelContext';
import { IKernelExecution } from '../../../../../../types/kernelTypes';
import KernelButton from '../../../../util/KernelButtonComponent';

type KernelExecuteTestButtonProps = {
  input: IKernelExecution[];
  additionalLabel?: string;
};
export default function KernelExecuteTestButton(
  props: KernelExecuteTestButtonProps
) {
  const { executeTest } = useContext(KernelContext) as IKernelContext;

  return (
    <KernelButton
      icon={runIcon}
      execute={executeTest}
      additionalLabel={props.additionalLabel}
      input={props.input}
    ></KernelButton>
  );
}
