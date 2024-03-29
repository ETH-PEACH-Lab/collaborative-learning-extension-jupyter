import { ISignal } from '@lumino/signaling';
import { createContext } from 'react';
import React from 'react';
import {
  ICell,
  IField,
  ICodeField,
  IMarkdownField,
  ITestCodeField,
  FieldProperty,
  ArrayFieldProperty,
  IArrayFieldSignaling
} from '../../types/schemaTypes';

type DocModelContextProviderProps = {
  children: React.ReactNode;
  cellSignal: ISignal<any, ICell>;
  fieldSignal: ISignal<any, IField>;
  arrayFieldSignal: ISignal<any, IArrayFieldSignaling>;

  setField: (
    cellId: string,
    propertyName: FieldProperty,
    field: IField
  ) => void;

  deleteCell: (c: ICell) => void;

  setArrayField: (
    cellId: string,
    propertyName: ArrayFieldProperty,
    field: ITestCodeField
  ) => void;
  addTestCode: (cellId: string) => void;
};
export const DocModelContext = createContext<IDocModelContext | null>(null);
const shouldUpdateField = (id: string) => {
  return (_: any, field: IField) => {
    return field.id === id;
  };
};
const shouldUpdateArrayField = (parentId:string, propertyName: ArrayFieldProperty) => {
  return (_: any, arrayFieldSignaling: IArrayFieldSignaling) => {
    return arrayFieldSignaling.propertyName === propertyName && arrayFieldSignaling.parentId === parentId;
  };
};
export const DocModelContextProvider = (
  props: DocModelContextProviderProps
) => {
  const setDescriptionField = (cellId: string, field: IMarkdownField) =>
    props.setField(cellId, 'description', field);
  const setSolutionCodeField = (cellId: string, field: ICodeField) =>
    props.setField(cellId, 'solutionCode', field);
  const setStartingCodeField = (cellId: string, field: ICodeField) =>
    props.setField(cellId, 'startingCode', field);
  const setTestCodeField = (cellId: string, field: ITestCodeField) =>
    props.setArrayField(cellId, 'testingCode', field);

  return (
    <DocModelContext.Provider
      value={{
        ...props,
        shouldUpdateField,
        setDescriptionField,
        setSolutionCodeField,
        setStartingCodeField,
        setTestCodeField,
        shouldUpdateArrayField
      }}
    >
      {props.children}
    </DocModelContext.Provider>
  );
};

export interface IDocModelContext {
  cellSignal: ISignal<any, ICell>;
  fieldSignal: ISignal<any, IField>;
  arrayFieldSignal: ISignal<any, IArrayFieldSignaling>;
  shouldUpdateArrayField: (
    parentId:string,
    propertyName: ArrayFieldProperty
  ) => (_: any, arrayFieldSignaling: IArrayFieldSignaling) => boolean;
  shouldUpdateField: (id: string) => (_: any, field: IField) => boolean;

  setStartingCodeField: (cellId: string, field: ICodeField) => void;
  setSolutionCodeField: (cellId: string, field: ICodeField) => void;
  setDescriptionField: (cellId: string, field: IMarkdownField) => void;

  deleteCell: (c: ICell) => void;

  setTestCodeField: (cellId: string, field: ITestCodeField) => void;
  addTestCode: (cellId: string) => void;
}
