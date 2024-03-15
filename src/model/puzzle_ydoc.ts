import { DocumentChange, YDocument } from '@jupyter/ydoc';
import { CellFactory } from '../cell_factory/cell_factory';
import * as Y from 'yjs';
import { Cell, Field } from '../types/cell_types';
import { JSONExt } from '@lumino/coreutils';

export type PuzzleDocChange = {
  fieldChange?: Field;
  cellChanges?: Cell;
  contentChange?: boolean;
} & DocumentChange;

export class PuzzleYDoc extends YDocument<PuzzleDocChange> {
  constructor() {
    super();
    this._cells = this.ydoc.getArray('cells');
    this._cells.observeDeep(this._cellsObserver);
  }

  readonly version: string = '1.0.0';
  /**
   * Dispose of the resources.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    super.dispose();
    this._cells.unobserveDeep(this._cellsObserver);
  }

  static create(): PuzzleYDoc {
    return new PuzzleYDoc();
  }
  getCells(): Cell[] {
    const cells = this._cells.map(cell => {
      return JSONExt.deepCopy(cell.toJSON()) as Cell;
    });
    return cells;
  }

  deleteCell(value: Cell): void {
    const yCellIndex = this._getCellIndexById(value.id);
    if (yCellIndex === undefined) {
      return;
    }
    this._cells.delete(yCellIndex, 1);
  }
  /**
   * Adds new data.
   *
   * @param value New object.
   */
  setCell(value: Cell): void {
    const yCell = this._getCellAsYMapById(value.id);
    if (yCell === undefined) {
      return;
    }
    this.transact(() => {
      Object.entries(value).forEach(v => {
        if (JSON.stringify(yCell.get(v[0])) !== JSON.stringify(v[1])) {
          if (typeof v[1] === 'object') {
            yCell.set(v[0], { ...v[1] });
          } else {
            yCell.set(v[0], v[1]);
          }
        }
      });
    });
  }
  addCell() {
    const cell = new Y.Map<any>(Object.entries(this._cellFactory.createCell()));
    this._cells.push([cell]);
  }

  setCells(cells: Cell[]): void {
    this.transact(() => {
      this._cells.delete(0, this._cells.length);
      const newYCells: Y.Map<any>[] = [];
      cells.forEach(cell => {
        newYCells.push(new Y.Map<any>(Object.entries(cell)));
      });
      this._cells.push(newYCells);
    });
  }

  addSolution(value:Cell):void{
    const yCell = this._getCellAsYMapById(value.id);
    if (yCell === undefined) {
      return;
    }
  }

  private _cellsObserver = (events: Y.YEvent<any>[]): void => {
    events.forEach(event => {
      if (event.target.get('id')) {
        if (event.keys.has('startingCode')) {
          this._changed.emit(<PuzzleDocChange>{
            fieldChange: { ...event.target.get('startingCode') }
          });
        } else if (event.keys.has('description')) {
          this._changed.emit(<PuzzleDocChange>{
            fieldChange: { ...event.target.get('description') }
          });
        } else {
          this._changed.emit(<PuzzleDocChange>{
            cellChanges: { ...event.target.toJSON() }
          });
        }
      } else {
        event.delta.forEach(delta => {
          if (delta.insert !== undefined && delta.insert instanceof Array) {
            this._changed.emit(<PuzzleDocChange>{
              contentChange: true
            });
          } else if (delta.delete) {
            this._changed.emit(<PuzzleDocChange>{
              contentChange: true
            });
          }
        });
      }
    });
  };
  private _getCellAsYMapById(id: string): Y.Map<any> | undefined {
    for (const cell of this._cells) {
      if (cell.get('id') === id) {
        return cell;
      }
    }
    return undefined;
  }
  private _getCellIndexById(id: string): number | undefined {
    for (let i = 0; i < this._cells.length; i++) {
      if (this._cells.get(i).get('id') === id) {
        return i;
      }
    }
    return undefined;
  }
  private _cellFactory: CellFactory = new CellFactory();
  private _cells: Y.Array<Y.Map<any>>;
}
