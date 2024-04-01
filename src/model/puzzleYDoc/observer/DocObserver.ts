import * as Y from 'yjs';
import { PuzzleDocChange } from '../PuzzleYDoc';
import IDocObserver from './IDocObsever';
import ObserverBase from './type/ObserverBase';
import FieldObserver from './type/field/FieldObserver';
import ArrayFieldObserver from './type/arrayField/ArrayFieldObserver';

export default class DocObserver implements IDocObserver {
  dispose() {}
  constructor(emitChange: (change: PuzzleDocChange) => void) {
    this._observers.push(
      new ArrayFieldObserver(emitChange),
      new FieldObserver(emitChange)
    );
    this._observers.forEach(observerA =>
      this._observers.forEach(observerB =>
        observerA.id !== observerB.id ? observerA.attach(observerB) : null
      )
    );
  }
  init(propertyName: string, data: Y.Array<Y.Map<any>>): void {
    (this._observers[0] as ArrayFieldObserver).establishArrayObserver(
      '',
      propertyName,
      data
    );
  }
  private _observers: ObserverBase[] = [];
}
