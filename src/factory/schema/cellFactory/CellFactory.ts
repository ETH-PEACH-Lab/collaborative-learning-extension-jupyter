import { UUID } from '@lumino/coreutils';
import { ICell, CellType, FieldType } from '../../../types';
import Factory from '../Factory';

export default abstract class CellFactory extends Factory<CellType, ICell> {
  constructor() {
    super();
  }
  public abstract get identifier(): CellType;
  public abstract get text(): string;

  protected _createCell(fieldCreation: (type: FieldType) => string): ICell {
    return {
      id: UUID.uuid4(),
      type: this.identifier,
      descriptionId: fieldCreation('markdown'),
      studentSolutionIds: [],
      visible: false,
      showSolution: false
    };
  }
}
