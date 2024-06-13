import { createContext } from 'react';
import React from 'react';
import { IField, FieldType, SolutionType, ICell } from '../../types/';

type DocModelContextProviderProps = {
  children: React.ReactNode;
  changeCell: (cell: ICell) => void;
  changeField: (field: IField) => void;
  deleteCell: (id: string) => void;

  addFieldToPropertyArray: (
    cellId: string,
    propertyName: string,
    fieldType: FieldType
  ) => void;
  removeFieldFromPropertyArray: (
    cellId: string,
    propertyName: string,
    fieldId: string
  ) => void;
  swapCellPosition: (fromIndex: number, toIndex: number) => void;
  swapInPropertyArray: (
    cellId: string,
    propertyName: string,
    fromIndex: number,
    toIndex: number
  ) => void;
};
export const DocModelContext = createContext<IDocModelContext | null>(null);

export const DocModelContextProvider = (
  props: DocModelContextProviderProps
) => {
  const addTestCodeField = (cellId: string) =>
    props.addFieldToPropertyArray(cellId, 'testingCodeIds', 'test-code');

  const removeTestCodeField = (cellId: string, id: string) =>
    props.removeFieldFromPropertyArray(cellId, 'testingCodeIds', id);

  const addStudentSolutionField = (
    cellId: string,
    solutionType: SolutionType
  ) => {
    props.addFieldToPropertyArray(cellId, 'studentSolutionIds', solutionType);
  };
  const addMultipleChoiceOption = (cellId: string) => {
    props.addFieldToPropertyArray(cellId, 'options', 'multiple-choice-item');
  };
  const removeMultipleChoiceOption = (cellId: string, id: string) => {
    props.removeFieldFromPropertyArray(cellId, 'options', id);
  };
  const swapPositionOfMultipleChoiceOption = (
    cellId: string,
    fromIndex: number,
    toIndex: number
  ) => {
    props.swapInPropertyArray(cellId, 'options', fromIndex, toIndex);
  };
  return (
    <DocModelContext.Provider
      value={{
        ...props,
        addStudentSolutionField,
        addTestCodeField,
        removeTestCodeField,
        addMultipleChoiceOption,
        removeMultipleChoiceOption,
        swapPositionOfMultipleChoiceOption
      }}
    >
      {props.children}
    </DocModelContext.Provider>
  );
};

export interface IDocModelContext {
  changeCell: (cell: ICell) => void;
  deleteCell: (id: string) => void;
  swapCellPosition: (fromIndex: number, toIndex: number) => void;

  changeField: (field: IField) => void;

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
