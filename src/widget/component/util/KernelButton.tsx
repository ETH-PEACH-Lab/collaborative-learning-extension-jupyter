import { LabIcon } from '@jupyterlab/ui-components';
import React, { useMemo } from 'react';
import { IKernelExecution } from '../../../types/kernelTypes';
import BaseButton from './BaseButton';
type KernelButtonProps = {
  input: IKernelExecution[];
  additionalLabel?: string;
  execute: (execution: IKernelExecution) => void;
  icon: LabIcon;
};
export default function KernelButton(props: KernelButtonProps) {
  const onExecute = useMemo(
    () => () => {
      props.input.forEach(execution => {
        props.execute(execution);
      });
    },
    [props.input, props.execute]
  );
  return (
    <BaseButton
      additionalLabel={props.additionalLabel}
      icon={props.icon}
      onClick={onExecute}
    ></BaseButton>
  );
}
