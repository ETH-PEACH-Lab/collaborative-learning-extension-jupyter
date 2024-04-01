import { LabIcon } from '@jupyterlab/ui-components';
import React from 'react';

type BaseButtonProps = {
  additionalLabel?: string;
  icon: LabIcon;
  onClick: () => void;
};
export default function BaseButton(props: BaseButtonProps) {
  return (
    <button onClick={props.onClick} className="btn btn-light btn-sm">
      {props.additionalLabel ? props.additionalLabel + ' ' : ''}
      <LabIcon.resolveReact className="d-inline" icon={props.icon} />
    </button>
  );
}
