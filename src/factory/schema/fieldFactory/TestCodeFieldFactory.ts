import { FieldType, ITestCodeField } from '../../../types/schemaTypes';
import FieldFactory from './FieldFactory';

export default class TestCodeFieldFactory extends FieldFactory {
  public get identifier(): FieldType {
    return 'test-code-field';
  }
  public createSpecific(): ITestCodeField {
    return {
      ...this.createField(),
      src: '',
      type: 'test-code-field',
      language: 'python',
      name: '',
      verified: false,
      createdBy: ''
    };
  }
}
