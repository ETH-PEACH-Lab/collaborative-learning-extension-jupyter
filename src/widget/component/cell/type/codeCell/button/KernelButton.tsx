import { LabIcon } from '@jupyterlab/ui-components';
import React, { useMemo } from 'react';
import { IKernelExecution } from '../../../../../../types';
import { BaseButton } from '../../../../../../ui';
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
      label={props.additionalLabel}
      icon={props.icon.svgstr}
      onClick={onExecute}
    ></BaseButton>
  );
}
