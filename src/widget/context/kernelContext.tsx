import { ISignal } from '@lumino/signaling';
import { createContext } from 'react';
import {
  IKernelExecution,
  IKernelOutput,
  IKernelTestResult,
  IKernelTestVerification
} from '../../types/kernelTypes';
import React from 'react';
type KernelContextProviderProps = {
  children: React.ReactNode;
  kernelOutputSignal: ISignal<any, IKernelOutput>;
  testResultSignal: ISignal<any, IKernelTestResult>;

  executeTest: (execution: IKernelExecution) => void;
  executeCode: (execution: IKernelExecution) => void;
  verifyTest: (execution: IKernelTestVerification) => void;
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
  kernelOutputSignal: ISignal<any, IKernelOutput>;
  testResultSignal: ISignal<any, IKernelTestResult>;

  executeTest: (execution: IKernelExecution) => void;
  executeCode: (execution: IKernelExecution) => void;
  verifyTest: (execution: IKernelTestVerification) => void;
}
