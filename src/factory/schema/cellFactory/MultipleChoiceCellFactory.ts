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
    const temp = this._createCell(fieldCreation);
    return {
      ...temp,
      type: 'multiple-choice-cell',
      solutionOptions: [],
      options: [],
      metadata: {
        ...temp.metadata,
        multi: false,
        random: false
      }
    };
  }
}
