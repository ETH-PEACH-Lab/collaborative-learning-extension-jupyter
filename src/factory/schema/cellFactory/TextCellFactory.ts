import { CellType, FieldType, ITextCell } from '../../../types';
import CellFactory from './CellFactory';

export default class TextCellFactory extends CellFactory {
  public get text(): string {
    return 'Text response';
  }
  public get identifier(): CellType {
    return 'text-cell';
  }
  public createSpecific(fieldCreation: (type: FieldType) => string): ITextCell {
    return {
      ...this._createCell(fieldCreation),
      type: 'text-cell',
      solutionId: fieldCreation('markdown')
    };
  }
}
