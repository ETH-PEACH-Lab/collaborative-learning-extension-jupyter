import * as Y from 'yjs';
import { CellType, ICell } from '../../../types/schemaTypes';
import CellFactoryService from '../../../services/CellFactoryService';
import { JSONExt } from '@lumino/coreutils';
import Maintainer from './Maintainer';

export default class CellsMaintainer extends Maintainer {
  constructor(cells: Y.Array<Y.Map<any>>, transact: (fn: () => void) => void) {
    super(transact);
    this._cells = cells;
  }
  get cells(): ICell[] {
    const cells = this._cells.map(cell => {
      return JSONExt.deepCopy(cell.toJSON()) as ICell;
    });
    return cells;
  }
  addCell(type: CellType) {
    const cell = CellFactoryService.instance.create(type);
    this._cells.push([cell]);
  }
  setCells(cells: ICell[]) {
    this._transact(() => {
      this._cells.delete(0, this._cells.length);
      const newYCells: Y.Map<any>[] = [];
      cells.forEach(cell => {
        const yMap = CellFactoryService.instance.load(cell);
        if (yMap !== undefined) {
          newYCells.push(yMap);
        }
      });
      this._cells.push(newYCells);
    });
  }
  deleteCell(value: ICell): void {
    const yCellIndex = this._getCellIndexById(value.id);
    this._cells.delete(yCellIndex, 1);
  }

  getCellAsYMapById(id: string): Y.Map<any> {
    for (const entry of this._cells) {
      if (entry.get('id') === id) {
        return entry;
      }
    }
    throw Error('Cell with id: ' + id + ' does not exist');
  }
  private _getCellIndexById(id: string): number {
    for (let i = 0; i < this._cells.length; i++) {
      if (this._cells.get(i).get('id') === id) {
        return i;
      }
    }
    throw Error('Cell with id: ' + id + ' does not exist');
  }

  private _cells: Y.Array<Y.Map<any>>;
}
