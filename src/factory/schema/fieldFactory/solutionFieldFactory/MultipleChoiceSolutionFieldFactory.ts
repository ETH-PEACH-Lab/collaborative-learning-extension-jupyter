import { FieldType, IMultipleChoiceSolution } from '../../../../types';
import SolutionFieldFactory from './SolutionFieldFactory';

export class MultipleChoiceSolutionFieldFactory extends SolutionFieldFactory {
  public get identifier(): FieldType {
    return 'multiple-choice-solution';
  }
  protected createSpecific(): IMultipleChoiceSolution {
    return {
      ...this.createField(),
      type: 'multiple-choice-solution',
      src: []
    };
  }
}
