import { INormalizedState, RootObserver } from 'yjs-normalized';
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
  protected rootDispatcher: (payload: INormalizedState<IField>) => void =
    payload => {
      store.dispatch(setFields(payload));
    };
  protected addDispatcher: (payload: IField) => void = payload => {
    store.dispatch(addField(payload));
  };
  protected deleteDispatcher: (payload: string) => void = payload => {
    store.dispatch(deleteField(payload));
  };
  protected updatePropertyDispatcher: (payload: {
    id: string;
    key: string;
    value: any;
  }) => void = payload => {
    store.dispatch(updateFieldProperty(payload));
  };
  protected allIdsDispatcher: (payload: string[]) => void = payload => {
    store.dispatch(updateFieldsAllIds(payload));
  };
}
