import { FieldType, ICodeSolution } from '../../../../types';
import SolutionFieldFactory from './SolutionFieldFactory';

export class CodeSolutionFieldFactory extends SolutionFieldFactory {
  public get identifier(): FieldType {
    return 'code-solution';
  }
  protected createSpecific(defaultSrc?: string): ICodeSolution {
    return {
      ...this.createField(),
      language: 'python',
      src:
        defaultSrc ??
        '# Add your solution here, beware of the starting code and indented blocks',
      type: 'code-solution'
    };
  }
}
