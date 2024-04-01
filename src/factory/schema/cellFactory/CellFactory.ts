import { UUID } from '@lumino/coreutils';
import { ICell, CellType, IField } from '../../../types/schemaTypes';
import FieldFactoryService from '../../../services/FieldFactoryService';
import Factory from '../Factory';
import { PuzzleDocChange } from '../../../model/puzzleYDoc/PuzzleYDoc';
import * as Y from 'yjs';
import DocObserverableRegisterService from '../../../model/puzzleYDoc/observer/register/DocObserverableRegisterService';

export default abstract class CellFactory extends Factory<CellType> {
  constructor() {
    super();
    this.fieldNames.forEach(fieldName =>
      DocObserverableRegisterService.instance.registerCellFieldObserver(
        'cells.entry.' + fieldName,
        this.fieldChange
      )
    );
    this.arrayFieldNames.forEach(arrayFieldName => {
      DocObserverableRegisterService.instance.registerCellYArrayFieldObserver(
        'cells.entry.' + arrayFieldName,
        (parentId: string, data: any[]) =>
          <PuzzleDocChange>{
            arrayFieldChanges: {
              parentId: parentId,
              propertyName: arrayFieldName,
              fields: data
            }
          }
      );
      DocObserverableRegisterService.instance.registerCellFieldObserver(
        'cells.entry.' + arrayFieldName + '.entry',
        this.fieldChange
      );
    });
  }
  protected fieldChange(field: IField) {
    return <PuzzleDocChange>{ fieldChange: field };
  }

  public load(c: ICell): Y.Map<any> {
    const obj = this.toYMap(c);
    this.fieldNames.forEach(fieldName =>
      obj.set(fieldName, this.toYMap(c[fieldName as keyof ICell]))
    );
    this.arrayFieldNames.forEach(arrayFieldName => {
      const array = c[arrayFieldName as keyof ICell];
      if (Array.isArray(array)) {
        obj.set(arrayFieldName, this.toYArray(array));
      }
    });
    return obj;
  }

  public abstract get text(): string;

  protected _createCell() {
    return {
      id: UUID.uuid4(),
      description: FieldFactoryService.instance.create('markdown-field'),
      metadata: {},
      solutions: {},
      studentCode: this.toYArray([])
    };
  }
  private get fieldNames(): string[] {
    return [...this.relevantFieldNames, 'description'];
  }
  private get arrayFieldNames(): string[] {
    return this.relevantArrayFieldNames;
  }
  protected abstract get relevantFieldNames(): string[];
  protected abstract get relevantArrayFieldNames(): string[];
}
