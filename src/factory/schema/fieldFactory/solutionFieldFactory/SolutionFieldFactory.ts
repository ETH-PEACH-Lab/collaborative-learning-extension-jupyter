import { IStudentSolution } from '../../../../types';
import FieldFactory from '../FieldFactory';

export default abstract class SolutionFieldFactory extends FieldFactory {
  protected createField(): IStudentSolution {
    return {
      ...super.createField(),
      comment: '',
      grade: -1,
      createdBy: '',
      submitted: false
    };
  }
}
