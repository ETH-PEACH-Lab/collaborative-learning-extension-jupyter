import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Cell, ICodeCell, IField, ITestCodeField } from '../../../types';
import {
  AddDispatch,
  AllIdsDispatch,
  ByIdState,
  DeleteDispatch,
  INormalizedState,
  RootDispatch,
  UpdatePropertyDispatch
} from 'yjs-normalized';

const initialState: INormalizedState<Cell> = {
  byId: {},
  allIds: []
};
const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    addCell(state, action: PayloadAction<AddDispatch<Cell>>) {
      state.byId[action.payload.item.id] = action.payload.item;
      state.byId[action.payload.item.id].documentId =
        action.payload.documentIdentifier;
      state.allIds.push(action.payload.item.id);
    },
    deleteCell(state, action: PayloadAction<DeleteDispatch>) {
      delete state.byId[action.payload.id];
      state.allIds = state.allIds.filter(id => id !== action.payload.id);
    },
    setCells(state, action: PayloadAction<RootDispatch<Cell>>) {
      state.byId = action.payload.state.byId;
      action.payload.state.allIds.forEach(
        id => (state.byId[id].documentId = action.payload.documentIdentifier)
      );
      state.allIds = action.payload.state.allIds;
    },
    updateCellProperty(state, action: PayloadAction<UpdatePropertyDispatch>) {
      state.byId[action.payload.id][action.payload.key as keyof Cell] =
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
  (state.cells as INormalizedState<Cell>).byId;

export const selectCell = createSelector(
  [selectById, (_: RootState, cellId: string) => cellId],
  (byId: ByIdState<Cell>, cellId: string) => byId[cellId]
);

export const selectVerifiedTestFieldsIds = createSelector(
  [
    selectById,
    (state: RootState) => state.fields.byId,
    (_: RootState, cellId: string) => cellId,
    (_: RootState, __: string, username: string) => username
  ],
  (
    byCellId: ByIdState<Cell>,
    byFieldId: ByIdState<IField>,
    cellId: string,
    username: string
  ) =>
    (byCellId[cellId] as ICodeCell).testingCodeIds.filter(
      fieldId =>
        (byFieldId[fieldId] as ITestCodeField)?.verified ||
        byFieldId[fieldId]?.createdBy === username
    )
);
export default cellsSlice.reducer;
