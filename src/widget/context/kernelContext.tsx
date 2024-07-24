import { createContext, useCallback } from 'react';
import {
  IKernelAssertionExecution,
  IKernelExecution
} from '../../types/app/kernel.types';
import React from 'react';
import { KernelMessengerService } from '../kernel/KernelMessengerService';
import { ISessionContext } from '@jupyterlab/apputils';
type KernelContextProviderProps = {
  children: React.ReactNode;
  kernelMessengerService: KernelMessengerService;
  session: ISessionContext;
};
export const KernelContext = createContext<IKernelContext | null>(null);
export const KernelContextProvider = ({
  children,
  kernelMessengerService,
  session
}: KernelContextProviderProps) => {
  const value = {
    executeTest: useCallback(
      (execution: IKernelAssertionExecution) =>
        kernelMessengerService.executeTest(execution, session),
      [kernelMessengerService, session]
    ),
    executeCode: useCallback(
      (execution: IKernelExecution) =>
        kernelMessengerService.executeCode(execution, session),
      [kernelMessengerService, session]
    ),
    verifyTest: useCallback(
      (execution: IKernelAssertionExecution) =>
        kernelMessengerService.verifyTest(execution, session),
      [kernelMessengerService, session]
    )
  };
  return (
    <KernelContext.Provider value={value}>{children}</KernelContext.Provider>
  );
};
export interface IKernelContext {
  executeTest: (execution: IKernelAssertionExecution) => void;
  executeCode: (execution: IKernelExecution) => void;
  verifyTest: (execution: IKernelAssertionExecution) => void;
}
