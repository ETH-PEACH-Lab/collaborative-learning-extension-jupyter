import { FieldType, ICodeSolution } from '../../../../types';
import SolutionFieldFactory from './SolutionFieldFactory';

export class CodeSolutionFieldFactory extends SolutionFieldFactory {
  public get identifier(): FieldType {
    return 'code-solution';
  }
  protected createSpecific(): ICodeSolution {
    return {
      ...this.createField(),
      language: 'python',
      src: '',
      type: 'code-solution'
    };
  }
}
