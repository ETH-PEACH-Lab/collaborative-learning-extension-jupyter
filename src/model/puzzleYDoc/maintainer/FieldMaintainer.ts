import * as Y from 'yjs';
import { IField } from '../../../types/schemaTypes';
import { JSONExt } from '@lumino/coreutils';
import Maintainer from './Maintainer';
export default class FieldMaintainer extends Maintainer {
  constructor(transact: (fn: () => void) => void) {
    super(transact);
  }
  setField(yCell: Y.Map<any>, property: string, value: IField): void {
    const yField = yCell.get(property) as Y.Map<any>;
    this._transact(() => {
      Object.entries(value).forEach(v => {
        yField.set(v[0], JSONExt.deepCopy(v[1]));
      });
    });
  }
}
