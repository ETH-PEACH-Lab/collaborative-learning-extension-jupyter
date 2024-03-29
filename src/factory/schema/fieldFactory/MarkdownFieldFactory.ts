import { FieldType, IMarkdownField } from '../../../types/schemaTypes';
import FieldFactory from './FieldFactory';

export default class MarkdownFieldFactory extends FieldFactory {
  public get identifier(): FieldType {
    return 'markdown-field';
  }
  public createSpecific(): IMarkdownField {
    return { ...this.createField(), src:'', type: 'markdown-field' };
  }
}
