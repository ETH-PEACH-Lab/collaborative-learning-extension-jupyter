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
      const { referenceId } = action.payload;

      state.byId = {
        ...state.byId,
        [referenceId]: action.payload
      };

      if (!state.allIds.includes(referenceId)) {
        state.allIds = [...state.allIds, referenceId];
      }
    },
    removeKernelExecutionResult(state, action: PayloadAction<string>) {
      const idToRemove = action.payload;

      if (state.byId[idToRemove]) {
        const restById = { ...state.byId };
        delete restById[idToRemove];
        state.byId = restById;

        state.allIds = state.allIds.filter(id => id !== idToRemove);
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
