import { FieldType, ITextSolution } from '../../../../types';
import SolutionFieldFactory from './SolutionFieldFactory';

export default class TextSolutionFieldFactory extends SolutionFieldFactory {
  public get identifier(): FieldType {
    return 'text-solution';
  }
  protected createSpecific(defaultSrc?: string): ITextSolution {
    return {
      ...this.createField(),
      type: 'text-solution',
      src: defaultSrc ?? '### Your Solution here \n (supports **markdown**)'
    };
  }
}
