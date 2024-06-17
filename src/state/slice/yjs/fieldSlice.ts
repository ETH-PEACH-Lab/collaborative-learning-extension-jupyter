import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { ICell, IField } from '../../../types';
import { RootState } from '../../store';
import { removeKernelExecutionResult } from '../app';
import {
  AddDispatch,
  AllIdsDispatch,
  ByIdState,
  DeleteDispatch,
  INormalizedState,
  RootDispatch,
  UpdatePropertyDispatch
} from 'yjs-normalized';

const initialState: INormalizedState<IField> = { byId: {}, allIds: [] };

const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    addField(state, action: PayloadAction<AddDispatch<IField>>) {
      state.byId[action.payload.item.id] = action.payload.item;
      state.allIds.push(action.payload.item.id);
    },
    deleteField(state, action: PayloadAction<DeleteDispatch>) {
      delete state.byId[action.payload.id];
      state.allIds = state.allIds.filter(id => id !== action.payload.id);
      removeKernelExecutionResult(action.payload.id);
    },
    updateFieldProperty(state, action: PayloadAction<UpdatePropertyDispatch>) {
      state.byId[action.payload.id][action.payload.key as keyof IField] =
        action.payload.value;
    },
    setFields(state, action: PayloadAction<RootDispatch<IField>>) {
      state.byId = action.payload.state.byId;
      state.allIds = action.payload.state.allIds;
    },
    updateFieldsAllIds(state, action: PayloadAction<AllIdsDispatch>) {
      state.allIds = action.payload.ids;
    }
  }
});
export const {
  addField,
  deleteField,
  updateFieldProperty,
  setFields,
  updateFieldsAllIds
} = fieldsSlice.actions;

const selectById = (state: RootState) => state.fields.byId;

export const selectField = createSelector(
  [selectById, (_: RootState, fieldId: string) => fieldId],
  (byId: ByIdState<IField>, fieldId: string) => byId[fieldId]
);
export const selectFields = createSelector(
  [selectById, (_: RootState, fieldIds: string[]) => fieldIds],
  (byId: ByIdState<IField>, fieldIds: string[]) => fieldIds.map(id => byId[id])
);
export const selectStudentSolutionField = createSelector(
  [
    (state: RootState) => state.cells.byId,
    selectById,
    (_: RootState, cellId: string, __: string) => cellId,
    (_: RootState, __: string, username: string) => username
  ],
  (
    byCellId: ByIdState<ICell>,
    byFieldId: ByIdState<IField>,
    cellId: string,
    username: string
  ) =>
    byCellId[cellId].studentSolutionIds
      .filter(fieldId => byFieldId[fieldId]?.createdBy === username)
      .map(fieldId => byFieldId[fieldId])
      .find(field => field)
);
export default fieldsSlice.reducer;
