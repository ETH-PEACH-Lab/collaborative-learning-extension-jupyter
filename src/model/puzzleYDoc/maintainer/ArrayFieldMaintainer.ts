import * as Y from 'yjs';
import Maintainer from './Maintainer';
import { ArrayFieldProperty, IField } from '../../../types/schemaTypes';
import { JSONExt } from '@lumino/coreutils';

export default class ArrayFieldMaintainer extends Maintainer {
  constructor(
    property: ArrayFieldProperty,
    transact: (fn: () => void) => void
  ) {
    super(transact);
    this._property = property;
  }
  get property() {
    return this._property;
  }
  setField(yCell: Y.Map<any>, value: IField) {
    const yMap = this._getArrayFieldByIdAsYMap(value.id, yCell);
    this._transact(() => {
      Object.entries(value).forEach(v => {
        yMap.set(v[0], JSONExt.deepCopy(v[1]));
      });
    });
  }

  addField(yCell: Y.Map<any>, field: Y.Map<any>) {
    const yMap = yCell?.get(this._property) as Y.Array<Y.Map<any>>;
    yMap.push([field]);
  }
  removeField(yCell: Y.Map<any>, id: string) {
    const index = this._getArrayFieldIndexById(id, yCell);
    const yArray = yCell.get(this._property) as Y.Array<Y.Map<any>>;
    yArray.delete(index, 1);
  }
  protected _getArrayFieldByIdAsYMap(
    id: string,
    yCell: Y.Map<any>
  ): Y.Map<any> {
    const yArray = yCell.get(this._property) as Y.Array<Y.Map<any>>;
    for (const entry of yArray) {
      if (entry.get('id') === id) {
        return entry;
      }
    }
    throw Error('Field with id: ' + id + 'does not exist');
  }
  private _getArrayFieldIndexById(id: string, yCell: Y.Map<any>): number {
    const yArray = yCell.get(this._property) as Y.Array<Y.Map<any>>;
    for (let i = 0; i < yArray.length; i++) {
      if (yArray.get(i).get('id') === id) {
        return i;
      }
    }
    throw Error('Cell with id: ' + id + ' does not exist');
  }

  protected _property: string;
}
