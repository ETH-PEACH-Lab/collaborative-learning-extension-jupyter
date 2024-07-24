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
    fieldCreation: (type: FieldType, defaultSrc?: string) => string
  ): ICodeCell {
    const temp = this._createCell(fieldCreation);
    return {
      ...temp,
      type: 'code-cell',
      metadata: {
        ...temp.metadata,
        testingMode: 'tests'
      },
      startingCodeId: fieldCreation(
        'code',
        '# Provide a basic skeleton code for the learners to start with'
      ),
      solutionCodeId: fieldCreation(
        'code',
        '# Provide a reference solution here. The solution code is used for verifying the test cases. \n # Starting code and solution code are concatenated during execution'
      ),
      testingCodeIds: []
    };
  }
}
