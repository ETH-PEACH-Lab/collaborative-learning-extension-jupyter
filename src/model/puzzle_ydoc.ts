import { DocumentChange, YDocument } from '@jupyter/ydoc';
import { CellFactory } from '../cell_factory/cell_factory';
import * as Y from 'yjs';
import { Cell, CellType } from '../types/cell_types';
import { MarkdownCellFactory } from '../cell_factory/markdown_cell_factory';
import { CodeCellFactory } from '../cell_factory/code_cell_factory';

export type PuzzleDocChange = {
  cellChanges?: Cell;
  contentChange?: boolean;
} & DocumentChange;

export class PuzzleYDoc extends YDocument<PuzzleDocChange> {
  constructor() {
    super();
    this._cells = this.ydoc.getArray('cells');
    this._cells.observeDeep(this._cellsObserver);
    this._factories.push(new CodeCellFactory(), new MarkdownCellFactory());
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

  /**
   * Returns an the requested object.
   *
   * @returns The content
   */
  getCells() {
    return this._cells.toJSON();
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
      Object.entries(value).forEach(value => {
        yCell?.set(value[0], value[1]);
      });
    });
  }
  addCell(type: CellType) {
    this._factories.forEach(factory => {
      if (factory.matchCellType(type)) {
        this._cells.push([
          new Y.Map<any>(Object.entries(factory.createCell()))
        ]);
      }
    });
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

  private _cellsObserver = (events: Y.YEvent<any>[]): void => {
    events.forEach(event => {
      if (event.target.get('id') && event.target.get('cell_type')) {
        this._changed.emit(<PuzzleDocChange>{
          cellChanges: event.target.toJSON()
        });
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
  private _factories: Array<CellFactory> = [];
  private _cells: Y.Array<Y.Map<any>>;
}
