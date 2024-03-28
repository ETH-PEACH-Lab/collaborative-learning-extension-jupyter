import { LabIcon } from '@jupyterlab/ui-components';
import React from 'react';
import { IKernelExecution } from '../../../types/kernelTypes';
type KernelButtonProps = {
  input: IKernelExecution[];
  additionalLabel?: string;
  execute: (execution: IKernelExecution) => void;
  icon: LabIcon;
};
export default function KernelButton(props: KernelButtonProps) {
  const onExecute = () => {
    props.input.forEach(execution => {
      props.execute(execution);
    });
  };
  return (
    <button onClick={onExecute} className="btn btn-light btn-sm">
      {props.additionalLabel}{' '}
      <LabIcon.resolveReact className="d-inline" icon={props.icon} />
    </button>
  );
}
