import { IField } from '../../../types/schemaTypes';
import { PuzzleDocChange } from '../PuzzleYDoc';

export default interface IDocObserverRegister {
  registerCellYArrayFieldObserver(
    propertyName: string,
    arrayChange: (data: IField[]) => PuzzleDocChange,
    arrayFieldChange: (data: IField) => PuzzleDocChange
  ): void;
  registerCellFieldObserver(
    propertyName: string,
    fieldChange: (data: IField) => PuzzleDocChange
  ): void;
}
