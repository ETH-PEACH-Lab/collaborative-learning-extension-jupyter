import React from 'react';
import { Tab } from './types';
import useTabPermissions from '../hooks/useTabPermissions';

interface ICodeCellTabContentProps extends Tab {
  children: JSX.Element;
  cellId: string;
}

export default function CodeCellTabContent(props: ICodeCellTabContentProps) {
  const { permitted } = useTabPermissions(props.cellId);
  if (!permitted(props)) {
    return <></>;
  }
  return (
    <div role="tabpanel" className="tab-content p-10">
      {props.children}
    </div>
  );
}
