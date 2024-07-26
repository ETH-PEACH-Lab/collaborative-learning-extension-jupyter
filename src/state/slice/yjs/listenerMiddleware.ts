import { createListenerMiddleware } from '@reduxjs/toolkit';
import { deleteField } from './fieldSlice';
import { removeKernelExecutionResult, removeKernelTestResult } from '../app';

export const fieldDeletionMiddleware = createListenerMiddleware();
fieldDeletionMiddleware.startListening({
  actionCreator: deleteField,
  effect: (action, listenerApi) => {
    const id = action.payload.id;
    listenerApi.dispatch(removeKernelTestResult(id));
    listenerApi.dispatch(removeKernelExecutionResult(id));
  }
});
