import { IField } from '../../../types/schemaTypes';
import { PuzzleDocChange } from '../PuzzleYDoc';
import IDocObserverRegister from './IDocObserverRegister';
export type ArrayFieldObserver = {
  arrayChange: (parentId: string, data: IField[]) => PuzzleDocChange;
};
export type FieldObserver = {
  fieldChange: (data: IField) => PuzzleDocChange;
};
export default class DocObserverRegisterService
  implements IDocObserverRegister
{
  private static _instance: DocObserverRegisterService =
    new DocObserverRegisterService();
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
  get cellFieldObservers() {
    return this._cellFieldObservers;
  }
  get cellArrayFieldObservers() {
    return this._cellArrayFieldObservers;
  }
  private _cellFieldObservers: Map<string, FieldObserver> = new Map();
  private _cellArrayFieldObservers: Map<string, ArrayFieldObserver> = new Map();
}
