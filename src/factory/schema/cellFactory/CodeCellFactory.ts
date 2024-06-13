import { CellType, FieldType, ICodeCell } from '../../../types';
import CellFactory from './CellFactory';

export default class CodeCellFactory extends CellFactory {
  public get identifier(): CellType {
    return 'code-cell';
  }

  public get text(): string {
    return 'Coding Exercise';
  }

  protected createSpecific(
    fieldCreation: (type: FieldType) => string
  ): ICodeCell {
    return {
      ...this._createCell(fieldCreation),
      type: 'code-cell',
      startingCodeId: fieldCreation('code'),
      solutionCodeId: fieldCreation('code'),
      testingCodeIds: []
    };
  }
}
