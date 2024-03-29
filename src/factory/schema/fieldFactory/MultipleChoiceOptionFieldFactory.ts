import {
  FieldType,
  IMultipleChoiceOptionField
} from '../../../types/schemaTypes';
import FieldFactory from './FieldFactory';

export default class MultipleChoiceOptionFieldFactory extends FieldFactory {
  public get identifier(): FieldType {
    return 'multiple-choice-option-field';
  }
  public createSpecific(): IMultipleChoiceOptionField {
    return {
      ...this.createField(),
      src: '',
      type: 'multiple-choice-option-field'
    };
  }
}
