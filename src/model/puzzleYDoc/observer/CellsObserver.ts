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
  UpdatePropertyDispatch
} from 'yjs-normalized';
import { PuzzleRootObserver } from './PuzzleRootObserver';

export class CellsObserver extends PuzzleRootObserver<ICell> {
  protected rootDispatcher: (payload: RootDispatch<ICell>) => void =
    payload => {
      store.dispatch(setCells(payload));
      this._onChange();
    };
  protected addDispatcher: (payload: AddDispatch<ICell>) => void = payload => {
    store.dispatch(addCell(payload));
    this._onChange();
  };
  protected deleteDispatcher: (payload: DeleteDispatch) => void = payload => {
    store.dispatch(deleteCell(payload));
    this._onChange();
  };
  protected updatePropertyDispatcher: (
    payload: UpdatePropertyDispatch
  ) => void = payload => {
    store.dispatch(updateCellProperty(payload));
    this._onChange();
  };
  protected allIdsDispatcher: (payload: AllIdsDispatch) => void = payload => {
    store.dispatch(updateCellsAllIds(payload));
    this._onChange();
  };
}
