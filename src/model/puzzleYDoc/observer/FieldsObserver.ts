import {
  AddDispatch,
  AllIdsDispatch,
  DeleteDispatch,
  RootDispatch,
  RootObserver,
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

export class FieldsObserver extends RootObserver<IField> {
  protected rootDispatcher: (payload: RootDispatch<IField>) => void =
    payload => {
      store.dispatch(setFields(payload));
    };
  protected addDispatcher: (payload: AddDispatch<IField>) => void = payload => {
    store.dispatch(addField(payload));
  };
  protected deleteDispatcher: (payload: DeleteDispatch) => void = payload => {
    store.dispatch(deleteField(payload));
  };
  protected updatePropertyDispatcher: (
    payload: UpdatePropertyDispatch
  ) => void = payload => {
    store.dispatch(updateFieldProperty(payload));
  };
  protected allIdsDispatcher: (payload: AllIdsDispatch) => void = payload => {
    store.dispatch(updateFieldsAllIds(payload));
  };
}
