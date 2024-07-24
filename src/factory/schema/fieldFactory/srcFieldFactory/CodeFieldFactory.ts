import { FieldType, ICodeField } from '../../../../types';
import FieldFactory from '../FieldFactory';

export default class CodeFieldFactory extends FieldFactory {
  public get identifier(): FieldType {
    return 'code';
  }
  protected createSpecific(defaultSrc?: string): ICodeField {
    return {
      ...this.createField(),
      src: defaultSrc ?? '',
      type: 'code',
      language: 'python'
    };
  }
}
