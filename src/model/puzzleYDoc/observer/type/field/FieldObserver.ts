import { JSONExt } from '@lumino/coreutils';
import { IField } from '../../../../../types/schemaTypes';
import { PuzzleDocChange } from '../../../PuzzleYDoc';
import DocObserverableRegisterService, {
  FieldObserverRegistration
} from '../../register/DocObserverableRegisterService';
import ObserverBase, { IObserverableEvent } from '../ObserverBase';
import * as Y from 'yjs';

export default class FieldObserver extends ObserverBase {
  protected update(event: IObserverableEvent): void {
    if (event.type === 'FieldObserved') {
      this._establichFieldObserver(
        event.propertyName,
        event.data as Y.Map<any>
      );
    }
  }
  private _establichFieldObserver = (propertName: string, yMap: Y.Map<any>) => {
    if (this._registeredObservers.has(yMap.get('id'))) {
      return;
    }
    const fieldObserver =
      DocObserverableRegisterService.instance.fieldObservers.get(
        propertName
      ) as FieldObserverRegistration;
    yMap.observe(event =>
      this._fieldObserver(event, fieldObserver.fieldChange)
    );
    this._registeredObservers.add(yMap.get('id'));
    this._establishFieldPropertyObserver(propertName, yMap);
  };

  private _establishFieldPropertyObserver(
    parentPropertyName: string,
    yMap: Y.Map<any>
  ) {
    [...yMap.keys()].forEach(key => {
      const propertyName = this._getRealPropertyName(parentPropertyName, key);
      if (
        DocObserverableRegisterService.instance.arrayFieldObservers.has(
          propertyName
        ) &&
        yMap.has(key)
      ) {
        this.notify({
          type: 'ArrayObserved',
          parentId: yMap.get('id'),
          propertyName: propertyName,
          data: yMap.get(key)
        });
      }
      if (
        DocObserverableRegisterService.instance.fieldObservers.has(
          propertyName
        ) &&
        yMap.has(key)
      ) {
        this._establichFieldObserver(propertyName, yMap.get(key));
      }
    });
  }
  private _fieldObserver = (
    event: Y.YMapEvent<any>,
    change: (data: IField) => PuzzleDocChange
  ): void => {
    this._emitChange(change(JSONExt.deepCopy(event.currentTarget.toJSON())));
  };
}
