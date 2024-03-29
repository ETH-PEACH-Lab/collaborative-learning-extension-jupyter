import FieldFactoryService from '../../../services/FieldFactoryService';
import { CellType } from '../../../types/schemaTypes';
import CellFactory from './CellFactory';

export default class CodeCellFactory extends CellFactory {
  protected get relevantFieldNames(): string[] {
    return ['startingCode', 'solutionCode'];
  }
  public get relevantArrayFieldNames(): string[] {
    return ['testingCode'];
  }

  public get text(): string {
    return 'Coding Exercise';
  }
  public get identifier(): CellType {
    return 'code-cell';
  }

  protected createSpecific() {
    return {
      ...this._createCell(),
      type: 'code-cell',
      startingCode: FieldFactoryService.instance.create('code-field'),
      solutionCode: FieldFactoryService.instance.create('code-field'),
      testingCode: this.toYArray([])
    };
  }
}
