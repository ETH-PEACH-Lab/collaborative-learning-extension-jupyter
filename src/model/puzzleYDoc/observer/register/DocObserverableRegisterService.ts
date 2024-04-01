
import { IField } from '../../../../types/schemaTypes';
import { PuzzleDocChange } from '../../PuzzleYDoc';
import IDocObserverRegister from './IDocObserverableRegisterService';
export type ArrayFieldObserverRegistration = {
  arrayChange: (parentId: string, data: IField[]) => PuzzleDocChange;
};
export type FieldObserverRegistration = {
  fieldChange: (data: IField) => PuzzleDocChange;
};
export default class DocObserverableRegisterService
  implements IDocObserverRegister
{
  private static _instance: DocObserverableRegisterService =
    new DocObserverableRegisterService();
  public static get instance() {
    return this._instance;
  }
  private constructor() {}
  registerCellYArrayFieldObserver(
    propertyName: string,
    arrayChange: (parentId: string, data: IField[]) => PuzzleDocChange
  ) {
    if (!this._cellArrayFieldObservers.has(propertyName)) {
      this._cellArrayFieldObservers.set(propertyName, {
        arrayChange
      });
    }
  }

  registerCellFieldObserver(
    propertyName: string,
    fieldChange: (data: IField) => PuzzleDocChange
  ) {
    if (!this._cellFieldObservers.has(propertyName)) {
      this._cellFieldObservers.set(propertyName, { fieldChange });
    }
  }
  get fieldObservers() {
    return this._cellFieldObservers;
  }
  get arrayFieldObservers() {
    return this._cellArrayFieldObservers;
  }
  private _cellFieldObservers: Map<string, FieldObserverRegistration> = new Map();
  private _cellArrayFieldObservers: Map<string, ArrayFieldObserverRegistration> = new Map();
}
