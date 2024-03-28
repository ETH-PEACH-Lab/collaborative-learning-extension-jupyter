import React from 'react';
import { Tab } from './types';
import useTabPermisions from '../hooks/useTabPermissions';

interface ICodeCellTabProps extends Tab {
  cellId: string;
  index: number;
  activeIndex: number;
  handleTabClick: (index: number) => void;
}
export default function CodeCellTabButton(props: ICodeCellTabProps) {
  const { permitted } = useTabPermisions();

  if (!permitted(props)) {
    return <></>;
  }

  return (
    <li className="nav-item" role="presentation">
      <button
        className={
          'nav-link ' + (props.activeIndex === props.index ? 'active' : '')
        }
        id={props.id + '-' + props.cellId}
        data-bs-toggle="tab"
        data-bs-target={'#' + props.targetIdentifier + '-' + props.id}
        type="button"
        role="tab"
        aria-controls={props.targetIdentifier + '-' + props.cellId}
        aria-selected="true"
        onClick={() => props.handleTabClick(props.index)}
      >
        {props.name}
      </button>
    </li>
  );
}
