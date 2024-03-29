import { CellType, IMulitpleChoiceCell } from '../../../types/schemaTypes';
import CellFactory from './CellFactory';

export default class MultipleChoiceCellFactory extends CellFactory {
  protected get relevantFieldNames(): string[] {
    return [];
  }
  protected get relevantArrayFieldNames(): string[] {
    return [];
  }
  public loadSpecific(c: IMulitpleChoiceCell) {
    return this.toYMap(c);
  }
  public get text(): string {
    return 'Multiple choice';
  }
  public get identifier(): CellType {
    return 'multiple-choice-cell';
  }
  public createSpecific() {
    return {
      ...this._createCell(),
      type: 'multiple-choice-cell',
      options: [],
      solutionOptions: []
    };
  }
}
