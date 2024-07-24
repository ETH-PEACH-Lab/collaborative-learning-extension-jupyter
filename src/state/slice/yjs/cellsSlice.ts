import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Cell, ICell, ICodeCell, IField, ITestCodeField } from '../../../types';
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
      const { id } = action.payload.item;
      state.byId = {
        ...state.byId,
        [id]: {
          ...action.payload.item,
          documentId: action.payload.documentIdentifier
        }
      };
      if (!state.allIds.includes(id)) {
        state.allIds = [...state.allIds, id];
      }
    },
    deleteCell(state, action: PayloadAction<DeleteDispatch>) {
      const { id } = action.payload;
      const restById = { ...state.byId };
      delete restById[id];
      state.byId = restById;
      state.allIds = state.allIds.filter(existingId => existingId !== id);
    },
    setCells(state, action: PayloadAction<RootDispatch<Cell>>) {
      const newById = { ...state.byId, ...action.payload.state.byId };
      const newAllIds = Array.from(
        new Set([...state.allIds, ...action.payload.state.allIds])
      );

      Object.keys(action.payload.state.byId).forEach(id => {
        newById[id].documentId = action.payload.documentIdentifier;
      });

      state.byId = newById;
      state.allIds = newAllIds;
    },
    updateCellProperty(state, action: PayloadAction<UpdatePropertyDispatch>) {
      const { id, key, value } = action.payload;
      if (state.byId[id]) {
        state.byId = {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            [key as keyof Cell]: value
          }
        };
      }
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

export const selectCellIds = (state: RootState) => state.cells.allIds;

const selectById = (state: RootState) =>
  (state.cells as INormalizedState<Cell>).byId;

export const selectCell = createSelector(
  [selectById, (_: RootState, cellId: string) => cellId],
  (byId: ByIdState<Cell>, cellId: string) => byId[cellId]
);

export const selectVisibleCellExists = createSelector(
  [
    (state: RootState) => state.cells.allIds,
    (state: RootState, _: string) => state.cells.byId,
    (_: RootState, docId: string) => docId
  ],
  (allIds: string[], byId: ByIdState<ICell>, docId: string) =>
    allIds.some(
      id => byId[id].metadata.visible && byId[id].documentId === docId
    )
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
    (byCellId[cellId] as ICodeCell).testingCodeIds
      .filter(
        fieldId =>
          (byFieldId[fieldId] as ITestCodeField)?.verified ||
          byFieldId[fieldId]?.createdBy === username
      )
      .sort(a =>
        !(byFieldId[a] as ITestCodeField).verified &&
        byFieldId[a].createdBy === username
          ? -1
          : 1
      )
);
export default cellsSlice.reducer;
