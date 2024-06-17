import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IKernelExecutionResult } from '../../../types';
import { RootState } from '../../store';
import { INormalizedState } from 'yjs-normalized';

const initialState: INormalizedState<IKernelExecutionResult> = {
  byId: {},
  allIds: []
};

const kernelExecutionResultSlice = createSlice({
  name: 'kernelExecutionResult',
  initialState,
  reducers: {
    setKernelExecutionResult(
      state,
      action: PayloadAction<IKernelExecutionResult>
    ) {
      state.byId[action.payload.referenceId] = action.payload;
      if (state.allIds.find(id => id !== action.payload.referenceId)) {
        state.allIds.push(action.payload.referenceId);
      }
    },
    removeKernelExecutionResult(state, action: PayloadAction<string>) {
      if (state.byId[action.payload]) {
        delete state.byId[action.payload];
        state.allIds = state.allIds.filter(id => id !== action.payload);
      }
    }
  }
});
export const { setKernelExecutionResult, removeKernelExecutionResult } =
  kernelExecutionResultSlice.actions;

export const selectKernelExecutionResult: (
  state: RootState,
  referenceId: string
) => IKernelExecutionResult | undefined = (
  state: RootState,
  referenceId: string
) => state.kernelExecutionResult.byId[referenceId];

export default kernelExecutionResultSlice.reducer;
