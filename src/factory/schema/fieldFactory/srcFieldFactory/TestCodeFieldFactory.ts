import { FieldType, ITestCodeField } from '../../../../types';
import FieldFactory from '../FieldFactory';

export default class TestCodeFieldFactory extends FieldFactory {
  public get identifier(): FieldType {
    return 'test-code';
  }
  protected createSpecific(): ITestCodeField {
    return {
      ...this.createField(),
      src: '',
      type: 'test-code',
      language: 'python',
      name: '',
      verified: false,
      createdBy: ''
    };
  }
}
