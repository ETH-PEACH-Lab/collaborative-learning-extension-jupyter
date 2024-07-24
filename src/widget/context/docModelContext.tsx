import { createContext, useCallback } from 'react';
import React from 'react';
import { SolutionType, Cell, Field, ICell } from '../../types/';
import { PuzzleDocModel } from '../../model/puzzleYDoc/PuzzleDocModel';

type DocModelContextProviderProps = {
  children: React.ReactNode;
  model: PuzzleDocModel;
};
export const DocModelContext = createContext<IDocModelContext | null>(null);

export const DocModelContextProvider = ({
  children,
  model
}: DocModelContextProviderProps) => {
  const addTestCodeField = (cellId: string) =>
    model.addFieldToPropertyArray(cellId, 'testingCodeIds', 'test-code');

  const removeTestCodeField = (cellId: string, id: string) =>
    model.removeFieldFromPropertyArray(cellId, 'testingCodeIds', id);

  const addStudentSolutionField = (
    cellId: string,
    solutionType: SolutionType
  ) => {
    model.addFieldToPropertyArray(cellId, 'studentSolutionIds', solutionType);
  };
  const addMultipleChoiceOption = (cellId: string) => {
    model.addFieldToPropertyArray(cellId, 'options', 'multiple-choice-item');
  };
  const removeMultipleChoiceOption = (cellId: string, id: string) => {
    model.removeFieldFromPropertyArray(cellId, 'options', id);
  };
  const swapPositionOfMultipleChoiceOption = (
    cellId: string,
    fromIndex: number,
    toIndex: number
  ) => {
    model.swapInPropertyArray(cellId, 'options', fromIndex, toIndex);
  };
  const value = {
    changeField: useCallback(
      (field: Field) => model.changeField(field),
      [model]
    ),
    changeCell: useCallback((cell: ICell) => model.changeCell(cell), [model]),
    deleteCell: useCallback((id: string) => model.deleteCell(id), []),
    swapCellPosition: useCallback(
      (fromIndex: number, toIndex: number) =>
        model.swapCellPosition(fromIndex, toIndex),
      [model]
    ),
    addStudentSolutionField: useCallback(
      (cellId: string, solutionType: SolutionType) =>
        addStudentSolutionField(cellId, solutionType),
      [model]
    ),
    addTestCodeField: useCallback(
      (cellId: string) => addTestCodeField(cellId),
      [model]
    ),
    removeTestCodeField: useCallback(
      (cellId: string, id: string) => removeTestCodeField(cellId, id),
      [model]
    ),
    addMultipleChoiceOption: useCallback(
      (cellId: string) => addMultipleChoiceOption(cellId),
      [model]
    ),
    removeMultipleChoiceOption: useCallback(
      (cellId: string, id: string) => removeMultipleChoiceOption(cellId, id),
      [model]
    ),
    swapPositionOfMultipleChoiceOption: useCallback(
      (cellId: string, fromIndex: number, toIndex: number) =>
        swapPositionOfMultipleChoiceOption(cellId, fromIndex, toIndex),
      [model]
    )
  };
  return (
    <DocModelContext.Provider value={value}>
      {children}
    </DocModelContext.Provider>
  );
};

export interface IDocModelContext {
  changeCell: (cell: Cell) => void;
  deleteCell: (id: string) => void;
  swapCellPosition: (fromIndex: number, toIndex: number) => void;

  changeField: (field: Field) => void;

  addStudentSolutionField(cellId: string, solutionType: SolutionType): void;

  addTestCodeField: (cellId: string) => void;
  removeTestCodeField: (cellId: string, id: string) => void;

  addMultipleChoiceOption: (cellId: string) => void;
  removeMultipleChoiceOption: (cellId: string, id: string) => void;
  swapPositionOfMultipleChoiceOption: (
    cellId: string,
    fromIndex: number,
    toIndex: number
  ) => void;
}
