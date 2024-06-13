import { CellType, FieldType, IMultipleChoiceCell } from '../../../types';
import CellFactory from './CellFactory';

export default class MultipleChoiceCellFactory extends CellFactory {
  public get text(): string {
    return 'Multiple choice';
  }
  public get identifier(): CellType {
    return 'multiple-choice-cell';
  }
  public createSpecific(
    fieldCreation: (type: FieldType) => string
  ): IMultipleChoiceCell {
    return {
      ...this._createCell(fieldCreation),
      type: 'multiple-choice-cell',
      solutionOptions: [],
      options: [],
      multi: false,
      random: false
    };
  }
}
