import {
  addCell,
  deleteCell,
  setCells,
  updateCellProperty,
  updateCellsAllIds
} from '../../../state/slice/yjs/cellsSlice';
import { store } from '../../../state/store';
import { ICell } from '../../../types';
import {
  AddDispatch,
  AllIdsDispatch,
  DeleteDispatch,
  RootDispatch,
  RootObserver,
  UpdatePropertyDispatch
} from 'yjs-normalized';

export class CellsObserver extends RootObserver<ICell> {
  protected rootDispatcher: (payload: RootDispatch<ICell>) => void =
    payload => {
      store.dispatch(setCells(payload));
    };
  protected addDispatcher: (payload: AddDispatch<ICell>) => void = payload => {
    store.dispatch(addCell(payload));
  };
  protected deleteDispatcher: (payload: DeleteDispatch) => void = payload => {
    store.dispatch(deleteCell(payload));
  };
  protected updatePropertyDispatcher: (
    payload: UpdatePropertyDispatch
  ) => void = payload => {
    store.dispatch(updateCellProperty(payload));
  };
  protected allIdsDispatcher: (payload: AllIdsDispatch) => void = payload => {
    store.dispatch(updateCellsAllIds(payload));
  };
}
