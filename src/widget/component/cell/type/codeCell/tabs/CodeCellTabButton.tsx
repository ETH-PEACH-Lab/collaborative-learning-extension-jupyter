import React from 'react';
import { Tab } from './types';
import useTabPermissions from '../hooks/useTabPermissions';
interface ICodeCellTabButtonProps extends Tab {
  checked?: boolean;
  cellId: string;
}
export default function CodeCellTabButton(props: ICodeCellTabButtonProps) {
  const { permitted } = useTabPermissions(props.cellId);

  if (!permitted(props)) {
    return <></>;
  }

  return (
    <input
      type="radio"
      name={props.cellId + '-' + props.name}
      role="tab"
      className="tab"
      style={{ width: 'max-content' }}
      aria-label={props.label}
      defaultChecked={props.checked}
    />
  );
}
