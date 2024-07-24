import { UUID } from '@lumino/coreutils';
import { ICell, CellType, FieldType } from '../../../types';
import Factory from '../Factory';

export default abstract class CellFactory extends Factory<CellType> {
  constructor() {
    super();
  }
  public abstract get identifier(): CellType;
  public abstract get text(): string;

  public create(
    fieldCreation: (type: FieldType, defaultSrc?: string) => string
  ): ICell {
    return this.createSpecific(fieldCreation);
  }
  protected abstract createSpecific(
    fieldCreation: (type: FieldType, defaultSrc?: string) => string
  ): ICell;
  protected _createCell(
    fieldCreation: (type: FieldType, defaultSrc?: string) => string
  ): ICell {
    return {
      id: UUID.uuid4(),
      type: this.identifier,
      descriptionId: fieldCreation(
        'markdown',
        '# Exercise Title \n Provide a description of the exercise in this area. \n - **Markdown** *format* is `supported`'
      ),
      studentSolutionIds: [],
      metadata: {
        visible: false,
        showSolution: false
      }
    };
  }
}
