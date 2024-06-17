import { ICodeCell, ICodeField } from '../../../../../../types';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectCell } from '../../../../../../state/slice/yjs/cellsSlice';
import { RootState } from '../../../../../../state/store';
import { selectField } from '../../../../../../state/slice/yjs/fieldSlice';
import {
  DocModelContext,
  IDocModelContext
} from '../../../../../context/docModelContext';
import { Coding } from '../../../../../../ui';
type CodeCellSolutionCodeProps = {
  cellId: string;
  isInstructor: boolean;
};
export function CodeCellSolutionCode({
  cellId,
  isInstructor
}: CodeCellSolutionCodeProps) {
  const { changeField } = useContext(DocModelContext) as IDocModelContext;

  const solutionCode = useSelector((state: RootState) =>
    selectField(state, (selectCell(state, cellId) as ICodeCell).solutionCodeId)
  ) as ICodeField;

  if (solutionCode === undefined || !isInstructor) {
    return <></>;
  }
  return (
    <Coding.SolutionCode
      language={solutionCode.language}
      src={solutionCode.src}
      onChange={value => changeField({ ...solutionCode, src: value })}
      readonly={false}
    />
  );
}
