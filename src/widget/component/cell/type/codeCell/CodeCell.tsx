import React from 'react';
import { ICodeCell } from '../../../../../types/schemaTypes';
import { CodeCellTabsContainer } from './tabs/CodeCellTabsContainer';

type CodeCellProps = {
  cell: ICodeCell;
};

export default function CodeCell(props: CodeCellProps) {
  return <CodeCellTabsContainer cell={props.cell}></CodeCellTabsContainer>;
}
