import React from 'react';
import { Tab } from './types';
import useTabPermisions from '../hooks/useTabPermissions';

interface ICodeCellTabContentProps extends Tab {
  cellId: string;
  index: number;
  children: JSX.Element;
  activeIndex: number;
}

export default function CodeCellTabContent(props: ICodeCellTabContentProps) {
  const { permitted } = useTabPermisions();

  if (!permitted(props) || props.index !== props.activeIndex) {
    return <></>;
  }
  return (
    <div
      className={'tab-pane fade active show'}
      id={props.targetIdentifier + '-' + props.cellId}
      role="tabpanel"
      aria-labelledby={props.id + '-' + props.cellId}
    >
      {props.children}
    </div>
  );
}
