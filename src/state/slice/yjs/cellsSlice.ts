import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ICell } from '../../../types';
import { ByIdState, INormalizedState } from 'yjs-normalized';

const initialState: INormalizedState<ICell> = {
  byId: {},
  allIds: []
};
const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    addCell(state, action: PayloadAction<ICell>) {
      state.byId[action.payload.id] = action.payload;
      state.allIds.push(action.payload.id);
    },
    deleteCell(state, action: PayloadAction<string>) {
      delete state.byId[action.payload];
      state.allIds = state.allIds.filter(id => id !== action.payload);
    },
    setCells(state, action: PayloadAction<INormalizedState<ICell>>) {
      state.byId = action.payload.byId;
      state.allIds = action.payload.allIds;
    },
    updateCellProperty(
      state,
      action: PayloadAction<{ id: string; key: string; value: any }>
    ) {
      state.byId[action.payload.id][action.payload.key as keyof ICell] =
        action.payload.value;
    },
    updateCellsAllIds(state, action: PayloadAction<string[]>) {
      state.allIds = action.payload;
    }
  }
});

export const {
  addCell,
  deleteCell,
  setCells,
  updateCellProperty,
  updateCellsAllIds
} = cellsSlice.actions;

export const selectCellIds: (state: RootState) => string[] = (
  state: RootState
) => state.cells.allIds;

const selectById = (state: RootState) =>
  (state.cells as INormalizedState<ICell>).byId;

// New selector with memoization
export const selectCell = createSelector(
  [selectById, (_: RootState, cellId: string) => cellId],
  (byId: ByIdState<ICell>, cellId: string) => byId[cellId]
);
export default cellsSlice.reducer;
