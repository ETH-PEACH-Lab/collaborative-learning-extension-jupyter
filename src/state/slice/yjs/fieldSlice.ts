import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import {
  Field,
  ICell,
  ICodeCell,
  IField,
  ITestCodeField
} from '../../../types';
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
      const { id } = action.payload.item;
      state.byId = { ...state.byId, [id]: { ...action.payload.item } };
      if (!state.allIds.includes(id)) {
        state.allIds = [...state.allIds, id];
      }
    },
    deleteField(state, action: PayloadAction<DeleteDispatch>) {
      const { id } = action.payload;
      const restById = { ...state.byId };
      delete restById[id];
      state.byId = restById;
      state.allIds = state.allIds.filter(existingId => existingId !== id);
      removeKernelExecutionResult(id);
    },
    setFields(state, action: PayloadAction<RootDispatch<IField>>) {
      state.byId = { ...state.byId, ...action.payload.state.byId };
      state.allIds = Array.from(
        new Set([...state.allIds, ...action.payload.state.allIds])
      );
    },
    updateFieldProperty(state, action: PayloadAction<UpdatePropertyDispatch>) {
      const { id, key, value } = action.payload;
      if (state.byId[id]) {
        state.byId = {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            [key as keyof Field]: value
          }
        };
      }
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
export const selectTestFieldForUserExists = createSelector(
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
    (byCellId[cellId] as ICodeCell).testingCodeIds.filter(
      fieldId =>
        (byFieldId[fieldId] as ITestCodeField).createdBy === username &&
        (byFieldId[fieldId] as ITestCodeField).verified
    ).length > 0
);
export const selectUnverifiedTestFieldForUserExists = createSelector(
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
    (byCellId[cellId] as ICodeCell).testingCodeIds.filter(
      fieldId =>
        (byFieldId[fieldId] as ITestCodeField)?.createdBy === username &&
        !(byFieldId[fieldId] as ITestCodeField)?.verified
    ).length !== 0
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
