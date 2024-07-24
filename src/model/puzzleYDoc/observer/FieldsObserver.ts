import {
  AddDispatch,
  AllIdsDispatch,
  DeleteDispatch,
  RootDispatch,
  UpdatePropertyDispatch
} from 'yjs-normalized';
import {
  addField,
  deleteField,
  setFields,
  updateFieldProperty,
  updateFieldsAllIds
} from '../../../state/slice/yjs/fieldSlice';
import { store } from '../../../state/store';
import { IField } from '../../../types';
import { PuzzleRootObserver } from './PuzzleRootObserver';

export class FieldsObserver extends PuzzleRootObserver<IField> {
  protected rootDispatcher: (payload: RootDispatch<IField>) => void =
    payload => {
      store.dispatch(setFields(payload));
      this._onChange();
    };
  protected addDispatcher: (payload: AddDispatch<IField>) => void = payload => {
    store.dispatch(addField(payload));
    this._onChange();
  };
  protected deleteDispatcher: (payload: DeleteDispatch) => void = payload => {
    store.dispatch(deleteField(payload));
    this._onChange();
  };
  protected updatePropertyDispatcher: (
    payload: UpdatePropertyDispatch
  ) => void = payload => {
    store.dispatch(updateFieldProperty(payload));
    this._onChange();
  };
  protected allIdsDispatcher: (payload: AllIdsDispatch) => void = payload => {
    store.dispatch(updateFieldsAllIds(payload));
    this._onChange();
  };
}
