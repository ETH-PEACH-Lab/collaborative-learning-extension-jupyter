import { FieldType, ITestCodeField } from '../../../types/schemaTypes';
import FieldFactory from './FieldFactory';

export default class TestCodeFieldFactory extends FieldFactory {
  public get identifier(): FieldType {
    return 'test-code';
  }
  public createSpecific(): ITestCodeField {
    return {
      ...this.createField(),
      type: 'test-code',
      language: 'python',
      name: '',
      verified: false,
      createdBy: ''
    };
  }
}
