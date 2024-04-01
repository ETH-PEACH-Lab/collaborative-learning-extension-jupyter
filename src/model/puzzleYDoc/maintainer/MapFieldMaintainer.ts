import { JSONExt } from '@lumino/coreutils';
import { IField, MapFieldProperty } from '../../../types/schemaTypes';
import Maintainer from './Maintainer';
import * as Y from 'yjs';

export default class MapFieldMaintainer extends Maintainer {
  get property(): MapFieldProperty {
    return this._property;
  }
  constructor(property: MapFieldProperty, transact: (fn: () => void) => void) {
    super(transact);
    this._property = property;
  }

  private _property: MapFieldProperty;
  exists(yCell: Y.Map<any>, id: string): boolean {
    return yCell.get(this._property).has(id);
  }
  setField(yCell: Y.Map<any>, value: IField) {
    const yMap = yCell.get(this.property) as Y.Map<any>;
    const subYMap = yMap.get(value.id);
    this._transact(() => {
      Object.entries(value).forEach(v => {
        subYMap.set(v[0], JSONExt.deepCopy(v[1]));
      });
    });
  }
  addField(yCell: Y.Map<any>, field: Y.Map<any>, id: string) {
    const yMap = yCell?.get(this._property) as Y.Map<Y.Map<any>>;
    if (!yMap.has(id)) {
      yMap.set(id, field);
    }
  }
  removeField(yCell: Y.Map<any>, id: string) {
    const yMap = yCell.get(this.property) as Y.Map<any>;
    yMap.delete(id);
  }
}
