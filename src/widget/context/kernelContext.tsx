import { createContext } from 'react';
import { IKernelExecution } from '../../types/app/kernel.types';
import React from 'react';
type KernelContextProviderProps = {
  children: React.ReactNode;
  executeTest: (execution: IKernelExecution) => void;
  executeCode: (execution: IKernelExecution) => void;
  verifyTest: (execution: IKernelExecution) => void;
};
export const KernelContext = createContext<IKernelContext | null>(null);
export const KernelContextProvider = (props: KernelContextProviderProps) => {
  return (
    <KernelContext.Provider value={{ ...props }}>
      {props.children}
    </KernelContext.Provider>
  );
};
export interface IKernelContext {
  executeTest: (execution: IKernelExecution) => void;
  executeCode: (execution: IKernelExecution) => void;
  verifyTest: (execution: IKernelExecution) => void;
}
