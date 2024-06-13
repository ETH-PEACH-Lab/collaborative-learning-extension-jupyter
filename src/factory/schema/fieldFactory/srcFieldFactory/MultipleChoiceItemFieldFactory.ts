import { IMultipleChoiceItem } from 'react-quiz-ui';
import { FieldType } from '../../../../types';
import FieldFactory from '../FieldFactory';

export default class MultipleChoiceItemFieldFactory extends FieldFactory {
  public get identifier(): FieldType {
    return 'multiple-choice-item';
  }
  protected createSpecific(): IMultipleChoiceItem {
    return {
      ...this.createField(),
      src: ''
    };
  }
}
