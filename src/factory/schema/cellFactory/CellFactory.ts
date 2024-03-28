import { UUID } from '@lumino/coreutils';
import { ICell, CellType, IField } from '../../../types/schemaTypes';
import FieldFactoryService from '../../../services/FieldFactoryService';
import Factory from '../Factory';
import { PuzzleDocChange } from '../../../model/puzzleYDoc/PuzzleYDoc';
import * as Y from 'yjs';
import DocObserverRegisterService from '../../../model/puzzleYDoc/observer/DocObserverRegisterService';

export default abstract class CellFactory extends Factory<CellType> {
  constructor() {
    super();
    this.fieldNames.forEach(fieldName =>
      DocObserverRegisterService.instance.registerCellFieldObserver(
        fieldName,
        this.fieldChange
      )
    );
    this.arrayFieldNames.forEach(arrayFieldName =>
      DocObserverRegisterService.instance.registerCellYArrayFieldObserver(
        arrayFieldName,
        (data: IField[]) =>
          <PuzzleDocChange>{
            arrayFildChanges: { propertyName: arrayFieldName, fields: data }
          },
        this.fieldChange
      )
    );
  }
  protected fieldChange(field: IField) {
    return <PuzzleDocChange>{ fieldChange: field };
  }

  public load(c: ICell): Y.Map<any> {
    const obj = this.toYMap(c);
    this.fieldNames.forEach(fieldName =>
      obj.set(fieldName, this.toYMap(c[fieldName as keyof ICell]))
    );
    this.relevantArrayFieldNames.forEach(arrayFieldName => {
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
      description: FieldFactoryService.instance.create('markdown'),
      metadata: {},
      solutions: {}
    };
  }
  public get fieldNames(): string[] {
    return [...this.relevantFieldNames, 'description'];
  }
  public get arrayFieldNames(): string[] {
    return [...this.relevantArrayFieldNames, 'studentSolutions'];
  }
  protected abstract get relevantFieldNames(): string[];
  protected abstract get relevantArrayFieldNames(): string[];
}
