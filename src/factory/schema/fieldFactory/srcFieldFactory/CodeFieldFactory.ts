import { FieldType, ICodeField } from '../../../../types';
import FieldFactory from '../FieldFactory';

export default class CodeFieldFactory extends FieldFactory {
  public get identifier(): FieldType {
    return 'code';
  }
  protected createSpecific(): ICodeField {
    return {
      ...this.createField(),
      src: '',
      type: 'code',
      language: 'python'
    };
  }
}
