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
    const temp = this._createCell(fieldCreation);
    return {
      ...temp,
      type: 'code-cell',
      metadata: {
        ...temp.metadata,
        testingMode: 'tests'
      },
      startingCodeId: fieldCreation('code'),
      solutionCodeId: fieldCreation('code'),
      testingCodeIds: []
    };
  }
}
