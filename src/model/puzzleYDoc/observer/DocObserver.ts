import * as Y from 'yjs';
import { PuzzleDocChange } from '../PuzzleYDoc';
import { JSONExt } from '@lumino/coreutils';
import { ICell, IField } from '../../../types/schemaTypes';
import { YMap } from 'yjs/dist/src/internals';
import IDocObserver from './IDocObsever';
import DocObserverRegisterService, {
  ArrayFieldObserver,
  FieldObserver
} from './DocObserverRegisterService';

export default class DocObserver implements IDocObserver {
  dispose() {
    this._cells?.unobserveDeep(this._cellsObserver);
  }

  constructor(
    cells: Y.Array<Y.Map<any>>,
    emitChange: (change: PuzzleDocChange) => void,
    cellsChange: (data: ICell[]) => PuzzleDocChange
  ) {
    this._cells = cells;
    this._cells.observeDeep(this._cellsObserver);
    this._emitChange = emitChange;
    this._cellsChange = cellsChange;
  }

  private _cellsObserver = (events: Y.YEvent<any>[]): void => {
    events.forEach(event => {
      if (event.path.length === 0 && this._cellsChange) {
        this._establishObservers(event.target);
        const array = JSONExt.deepCopy(event.target.toJSON());
        this._emitChange(this._cellsChange(array));
      }
    });
  };
  private _yArrayFieldObserver = (
    events: Y.YEvent<any>[],
    arrayChange: (data: any[]) => PuzzleDocChange,
    arrayFieldChange: (data: IField) => PuzzleDocChange
  ): void => {
    events.forEach(event => {
      if (event.path.length === 0) {
        this._emitChange(
          arrayChange(JSONExt.deepCopy(event.currentTarget.toJSON()))
        );
      } else if (event.path.length === 1) {
        this._emitChange(
          arrayFieldChange(JSONExt.deepCopy(event.target.toJSON()))
        );
      }
    });
  };
  private _fieldObserver = (
    event: Y.YMapEvent<any>,
    change: (data: IField) => PuzzleDocChange
  ): void => {
    this._emitChange(change(JSONExt.deepCopy(event.currentTarget.toJSON())));
  };
  private _establishObservers = (cells: Y.Array<YMap<any>>) => {
    cells.forEach(cell => {
      [...cell.keys()].forEach(cellKey => {
        if (
          DocObserverRegisterService.instance.cellArrayFieldObservers.has(
            cellKey
          ) &&
          cell.has(cellKey)
        ) {
          const yArray = cell.get(cellKey) as Y.Array<Y.Map<any>>;
          const arrayObserver =
            DocObserverRegisterService.instance.cellArrayFieldObservers.get(
              cellKey
            ) as ArrayFieldObserver;
          yArray.observeDeep(events =>
            this._yArrayFieldObserver(
              events,
              arrayObserver?.arrayChange,
              arrayObserver?.arrayFieldChange
            )
          );
        }
        if (
          DocObserverRegisterService.instance.cellFieldObservers.has(cellKey) &&
          cell.has(cellKey)
        ) {
          const yMap = cell.get(cellKey) as Y.Map<any>;
          const fieldObserver =
            DocObserverRegisterService.instance.cellFieldObservers.get(
              cellKey
            ) as FieldObserver;
          yMap.observe(event =>
            this._fieldObserver(event, fieldObserver.fieldChange)
          );
        }
      });
    });
  };
  private _cellsChange: (data: ICell[]) => PuzzleDocChange;
  private _emitChange: (change: PuzzleDocChange) => void;
  private _cells: Y.Array<Y.Map<any>>;
}
