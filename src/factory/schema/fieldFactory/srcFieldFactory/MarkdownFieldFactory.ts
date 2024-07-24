import { FieldType, IMarkdownField } from '../../../../types';
import FieldFactory from '../FieldFactory';

export default class MarkdownFieldFactory extends FieldFactory {
  public get identifier(): FieldType {
    return 'markdown';
  }
  protected createSpecific(defaultSrc?: string): IMarkdownField {
    return { ...this.createField(), src: defaultSrc ?? '', type: 'markdown' };
  }
}
