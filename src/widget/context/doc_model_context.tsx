import { ISignal } from '@lumino/signaling';
import { createContext } from 'react';
import React from 'react';
import { Cell, Field, ICodeField } from '../../types/cell_types';
import { KernelOutput } from '../../types/output_types';
type DocModelContextProviderProps = {
  children: React.ReactNode;
  cellSignal: ISignal<any, Cell>;
  fieldSignal: ISignal<any, Field>;
  fieldOutputSignal: ISignal<any, KernelOutput>;

  executeCell: (c: ICodeField) => void;
  changeCell: (c: Cell) => void;
  deleteCell: (c: Cell) => void;
};
export const DocModelContext = createContext<IDocModelContext | null>(null);
export const DocModelContextProvider = (
  props: DocModelContextProviderProps
) => {
  return (
    <DocModelContext.Provider
      value={{
        cellSignal: props.cellSignal,
        fieldSignal: props.fieldSignal,
        fieldOutputSignal: props.fieldOutputSignal,
        executeCell: props.executeCell,
        changeCell: props.changeCell,
        deleteCell: props.deleteCell
      }}
    >
      {props.children}
    </DocModelContext.Provider>
  );
};

export interface IDocModelContext {
  cellSignal: ISignal<any, Cell>;
  fieldSignal: ISignal<any, Field>;
  fieldOutputSignal: ISignal<any, KernelOutput>;
  executeCell: (c: ICodeField) => void;
  changeCell: (c: Cell) => void;
  deleteCell: (c: Cell) => void;
}
