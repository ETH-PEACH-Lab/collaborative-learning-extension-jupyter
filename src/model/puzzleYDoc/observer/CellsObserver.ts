import {
  addCell,
  deleteCell,
  setCells,
  updateCellProperty,
  updateCellsAllIds
} from '../../../state/slice/yjs/cellsSlice';
import { store } from '../../../state/store';
import { ICell } from '../../../types';
import { INormalizedState, RootObserver } from 'yjs-normalized';

export class CellsObserver extends RootObserver<ICell> {
  protected rootDispatcher: (payload: INormalizedState<ICell>) => void =
    payload => {
      store.dispatch(setCells(payload));
    };
  protected addDispatcher: (payload: ICell) => void = payload => {
    store.dispatch(addCell(payload));
  };
  protected deleteDispatcher: (payload: string) => void = payload => {
    store.dispatch(deleteCell(payload));
  };
  protected updatePropertyDispatcher: (payload: {
    id: string;
    key: string;
    value: any;
  }) => void = payload => {
    store.dispatch(updateCellProperty(payload));
  };
  protected allIdsDispatcher: (payload: string[]) => void = payload => {
    store.dispatch(updateCellsAllIds(payload));
  };
}
