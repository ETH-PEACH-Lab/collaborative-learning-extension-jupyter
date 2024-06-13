import { FieldType, ITextSolution } from '../../../../types';
import SolutionFieldFactory from './SolutionFieldFactory';

export default class TextSolutionFieldFactory extends SolutionFieldFactory {
  public get identifier(): FieldType {
    return 'text-solution';
  }
  protected createSpecific(): ITextSolution {
    return {
      ...this.createField(),
      type: 'text-solution',
      src: ''
    };
  }
}
