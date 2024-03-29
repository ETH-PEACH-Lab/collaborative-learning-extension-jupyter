import * as Y from 'yjs';
import { PuzzleDocChange } from '../PuzzleYDoc';
import { JSONExt } from '@lumino/coreutils';
import { IField } from '../../../types/schemaTypes';
import IDocObserver from './IDocObsever';
import DocObserverRegisterService, {
  ArrayFieldObserver,
  FieldObserver
} from './DocObserverRegisterService';
export default class DocObserver implements IDocObserver {
  dispose() {
  }
  constructor(
    emitChange: (change: PuzzleDocChange) => void
  ) {
    this._emitChange = emitChange
  }
  init(propertyName:string, arrayChange: (parentId: string, data: any[]) => PuzzleDocChange,data: Y.Array<Y.Map<any>>): void {
    if(this._registerdArrayFieldObserver.has(propertyName)){
      return;
    }
    data.observeDeep(events =>
      this._yArrayFieldObserver(
        events,
        "root",
        propertyName,
        arrayChange
      ))
    this._registerdArrayFieldObserver.add(propertyName);
  }
  private _yArrayFieldObserver = (
    events: Y.YEvent<any>[],
    parentId:string,
    propertyName:string,
    arrayChange: (parentId: string, data: any[]) => PuzzleDocChange
  ): void => {
    events.forEach(event => {
      if (event.path.length === 0) {
        this._establishArrayEntryObserver(propertyName,event.currentTarget as Y.Array<Y.Map<any>>);
        this._emitChange(
          arrayChange(parentId,JSONExt.deepCopy(event.currentTarget.toJSON()))
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

  private _establishArrayObserver = (parentId: string, propertyName:string, yArray: Y.Array<Y.Map<any>>) => {
    const registerKey=parentId+propertyName;
    if(this._registerdArrayFieldObserver.has(registerKey)){
      return;
    }
    const arrayObserver = DocObserverRegisterService.instance.cellArrayFieldObservers.get(
      propertyName
    ) as ArrayFieldObserver;
    yArray.observeDeep(events =>
      this._yArrayFieldObserver(
        events,
        parentId,
        propertyName,
        arrayObserver?.arrayChange
      )
    );
    this._registerdArrayFieldObserver.add(registerKey)
    this._establishArrayEntryObserver(propertyName,yArray);

  };
  private _establishArrayEntryObserver = (propertName:string, yArray: Y.Array<Y.Map<any>>) => {
    const arrayEntryPropertyName = this._getRealPropertyName(propertName,'entry');
    yArray.forEach(yMap => {
      this._establichFieldObserver(arrayEntryPropertyName,yMap)
    });
  }
  private _establichFieldObserver = (propertName:string, yMap: Y.Map<any>) => {
    if (this._registeredFieldObserver.has(yMap.get('id'))) {
      return
    }
    const fieldObserver =
      DocObserverRegisterService.instance.cellFieldObservers.get(
        propertName
      ) as FieldObserver;
      yMap.observe(event =>
      this._fieldObserver(event, fieldObserver.fieldChange)
    );
    this._registeredFieldObserver.add(yMap.get('id'));
    this._establishFieldPropertyObserver(propertName,yMap);
  }

  private _establishFieldPropertyObserver(parentPropertyName: string, yMap:Y.Map<any>){
    [...yMap.keys()].forEach(key => {
      const propertyName = this._getRealPropertyName(parentPropertyName,key);
      if (
        DocObserverRegisterService.instance.cellArrayFieldObservers.has(propertyName) && yMap.has(key)
      ) {
        this._establishArrayObserver(yMap.get('id'), propertyName, yMap.get(key))
      }
      if (
        DocObserverRegisterService.instance.cellFieldObservers.has(propertyName) && yMap.has(key)
      ) {
        this._establichFieldObserver(propertyName, yMap.get(key));
      }
    });
  }
  private _getRealPropertyName(parentPropertyName: string, propertyName: string): string {
    if(parentPropertyName === ""){
      return propertyName
    }
    return [parentPropertyName, propertyName].join('.')
  }
  private _registerdArrayFieldObserver: Set<string> = new Set();
  private _registeredFieldObserver: Set<string> = new Set();
  private _emitChange: (change: PuzzleDocChange) => void;
}
