import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ICodeCell, ICodeField } from '../../../../../../types';
import { selectField } from '../../../../../../state/slice/yjs/fieldSlice';
import { RootState } from '../../../../../../state/store';
import { selectCell } from '../../../../../../state/slice/yjs/cellsSlice';
import {
  DocModelContext,
  IDocModelContext
} from '../../../../../context/docModelContext';
import { Coding } from '../../../../../../ui';

type CodeCellStartingCodeProps = {
  cellId: string;
  isInstructor: boolean;
};
export function CodeCellStartingCode({
  cellId,
  isInstructor
}: CodeCellStartingCodeProps) {
  const { changeField } = useContext(DocModelContext) as IDocModelContext;

  const startingCode = useSelector((state: RootState) =>
    selectField(state, (selectCell(state, cellId) as ICodeCell).startingCodeId)
  ) as ICodeField;

  if (startingCode === undefined) {
    return <></>;
  }
  return (
    <Coding.StartingCode
      language={startingCode.language}
      src={startingCode.src}
      onChange={value => changeField({ ...startingCode, src: value })}
      readonly={!isInstructor}
    />
  );
}
