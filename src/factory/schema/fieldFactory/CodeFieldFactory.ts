import { FieldType, ICodeField } from '../../../types/schemaTypes';
import FieldFactory from './FieldFactory';

export default class CodeFieldFactory extends FieldFactory {
  public get identifier(): FieldType {
    return 'code-field';
  }
  public createSpecific(): ICodeField {
    return {
      ...this.createField(),
      src: '',
      type: 'code-field',
      language: 'python'
    };
  }
}
