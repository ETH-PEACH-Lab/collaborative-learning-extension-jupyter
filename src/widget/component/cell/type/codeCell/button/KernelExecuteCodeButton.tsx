import { useContext } from 'react';
import React from 'react';
import { runIcon } from '@jupyterlab/ui-components';
import {
  IKernelContext,
  KernelContext
} from '../../../../../context/kernelContext';
import { IKernelExecution } from '../../../../../../types/kernelTypes';
import KernelButton from '../../../../util/KernelButtonComponent';

type KernelExecuteCodeButtonProps = {
  input: IKernelExecution[];
  additionalLabel?: string;
};
export default function KernelExecuteCodeButton(
  props: KernelExecuteCodeButtonProps
) {
  const { executeCode } = useContext(KernelContext) as IKernelContext;

  return (
    <KernelButton
      icon={runIcon}
      execute={executeCode}
      additionalLabel={props.additionalLabel}
      input={props.input}
    ></KernelButton>
  );
}
