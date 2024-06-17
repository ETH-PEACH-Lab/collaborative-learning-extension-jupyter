import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IKernelTestResult } from '../../../types';
import { RootState } from '../../store';
import { INormalizedState } from 'yjs-normalized';

const initialState: INormalizedState<IKernelTestResult> = {
  byId: {},
  allIds: []
};

const kernelTestResultSlice = createSlice({
  name: 'kernelTestResult',
  initialState,
  reducers: {
    setKernelTestResult(state, action: PayloadAction<IKernelTestResult>) {
      state.byId[action.payload.referenceId] = action.payload;
      state.allIds.push(action.payload.referenceId);
    },
    removeKernelTestResult(state, action: PayloadAction<string>) {
      if (state.byId[action.payload]) {
        delete state.byId[action.payload];
        state.allIds = state.allIds.filter(id => id !== action.payload);
      }
    }
  }
});
export const { setKernelTestResult, removeKernelTestResult } =
  kernelTestResultSlice.actions;

export const selectKernelTestResult = (
  state: RootState,
  referenceId: string
): IKernelTestResult | undefined => state.kernelTestResult.byId[referenceId];

export default kernelTestResultSlice.reducer;
