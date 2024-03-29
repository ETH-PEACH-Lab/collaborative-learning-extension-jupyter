import { IField } from '../../../types/schemaTypes';
import { PuzzleDocChange } from '../PuzzleYDoc';

export default interface IDocObserverRegister {
  registerCellYArrayFieldObserver(
    propertyName: string,
    arrayChange: (parentId: string, data: any[]) => PuzzleDocChange
  ): void;
  registerCellFieldObserver(
    propertyName: string,
    fieldChange: (data: IField) => PuzzleDocChange
  ): void;
}
