import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ICell } from '../../../types';
import {
  AddDispatch,
  AllIdsDispatch,
  ByIdState,
  DeleteDispatch,
  INormalizedState,
  RootDispatch,
  UpdatePropertyDispatch
} from 'yjs-normalized';

const initialState: INormalizedState<ICell> = {
  byId: {},
  allIds: []
};
const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    addCell(state, action: PayloadAction<AddDispatch<ICell>>) {
      state.byId[action.payload.item.id] = action.payload.item;
      state.byId[action.payload.item.id].documentId =
        action.payload.documentIdentifier;
      state.allIds.push(action.payload.item.id);
    },
    deleteCell(state, action: PayloadAction<DeleteDispatch>) {
      delete state.byId[action.payload.id];
      state.allIds = state.allIds.filter(id => id !== action.payload.id);
    },
    setCells(state, action: PayloadAction<RootDispatch<ICell>>) {
      state.byId = action.payload.state.byId;
      action.payload.state.allIds.forEach(
        id => (state.byId[id].documentId = action.payload.documentIdentifier)
      );
      state.allIds = action.payload.state.allIds;
    },
    updateCellProperty(state, action: PayloadAction<UpdatePropertyDispatch>) {
      state.byId[action.payload.id][action.payload.key as keyof ICell] =
        action.payload.value;
    },
    updateCellsAllIds(state, action: PayloadAction<AllIdsDispatch>) {
      state.allIds = action.payload.ids;
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

export const selectCellIds: (state: RootState, docId: string) => string[] =
  createSelector(
    [
      (state: RootState, _: string) => state,
      (_: RootState, docId: string) => docId
    ],
    (state: RootState, docId: string) =>
      state.cells.allIds.filter(id => state.cells.byId[id].documentId === docId)
  );

const selectById = (state: RootState) =>
  (state.cells as INormalizedState<ICell>).byId;

export const selectCell = createSelector(
  [selectById, (_: RootState, cellId: string) => cellId],
  (byId: ByIdState<ICell>, cellId: string) => byId[cellId]
);
export default cellsSlice.reducer;
