import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
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
      const { referenceId } = action.payload;
      state.byId = {
        ...state.byId,
        [referenceId]: action.payload
      };

      if (!state.allIds.includes(referenceId)) {
        state.allIds = [...state.allIds, referenceId];
      }
    },
    removeKernelTestResult(state, action: PayloadAction<string>) {
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
export const { setKernelTestResult, removeKernelTestResult } =
  kernelTestResultSlice.actions;

export const selectKernelTestResult = (
  state: RootState,
  referenceId: string
): IKernelTestResult | undefined => state.kernelTestResult.byId[referenceId];

export const selectNumberOfSuccessfulTests = createSelector(
  [(state: RootState) => state, (_: RootState, cellId: string) => cellId],
  (state: RootState, cellId: string) =>
    state.kernelTestResult.allIds
      .map(id => state.kernelTestResult.byId[id])
      .filter(result => result.cellId === cellId && result.result).length
);
export default kernelTestResultSlice.reducer;
