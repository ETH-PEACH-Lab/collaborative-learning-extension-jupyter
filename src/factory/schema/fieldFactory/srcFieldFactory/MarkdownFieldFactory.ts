import { FieldType, IMarkdownField } from '../../../../types';
import FieldFactory from '../FieldFactory';

export default class MarkdownFieldFactory extends FieldFactory {
  public get identifier(): FieldType {
    return 'markdown';
  }
  protected createSpecific(): IMarkdownField {
    return { ...this.createField(), src: '', type: 'markdown' };
  }
}
