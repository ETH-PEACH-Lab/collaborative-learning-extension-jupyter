import ObserverBase, { IObserverableEvent } from '../ObserverBase';
import * as Y from 'yjs';
import { JSONExt } from '@lumino/coreutils';
import DocObserverableRegisterService, {
  ArrayFieldObserverRegistration
} from '../../register/DocObserverableRegisterService';
import { PuzzleDocChange } from '../../../PuzzleYDoc';

export default class ArrayFieldObserver extends ObserverBase {
  protected update(event: IObserverableEvent): void {
    if (event.type === 'ArrayObserved') {
      if (event.parentId) {
        this.establishArrayObserver(
          event.parentId,
          event.propertyName,
          event.data as Y.Array<Y.Map<any>>
        );
      }
    }
  }
  private _yArrayFieldObserver = (
    events: Y.YEvent<any>[],
    parentId: string,
    propertyName: string,
    arrayChange: (parentId: string, data: any[]) => PuzzleDocChange
  ): void => {
    events.forEach(event => {
      if (event.path.length === 0) {
        this._establishArrayEntryObserver(
          propertyName,
          event.currentTarget as Y.Array<Y.Map<any>>
        );
        this._emitChange(
          arrayChange(parentId, JSONExt.deepCopy(event.currentTarget.toJSON()))
        );
      }
    });
  };
  establishArrayObserver = (
    parentId: string,
    propertyName: string,
    yArray: Y.Array<Y.Map<any>>
  ) => {
    const registerKey = parentId + propertyName;
    if (this._registeredObservers.has(registerKey)) {
      return;
    }
    const arrayObserver =
      DocObserverableRegisterService.instance.arrayFieldObservers.get(
        propertyName
      ) as ArrayFieldObserverRegistration;
    yArray.observeDeep(events =>
      this._yArrayFieldObserver(
        events,
        parentId,
        propertyName,
        arrayObserver?.arrayChange
      )
    );
    this._registeredObservers.add(registerKey);
    this._establishArrayEntryObserver(propertyName, yArray);
  };
  private _establishArrayEntryObserver = (
    propertName: string,
    yArray: Y.Array<Y.Map<any>>
  ) => {
    const arrayEntryPropertyName = this._getRealPropertyName(
      propertName,
      'entry'
    );
    yArray.forEach(yMap => {
      this.notify({
        type: 'FieldObserved',
        propertyName: arrayEntryPropertyName,
        data: yMap
      });
    });
  };
}
