import { CellType, ITextCell } from '../../../types/schemaTypes';
import CellFactory from './CellFactory';

export default class TextCellFactory extends CellFactory {
  protected get relevantFieldNames(): string[] {
    return [];
  }
  protected get relevantArrayFieldNames(): string[] {
    return [];
  }
  public loadSpecific(c: ITextCell) {
    return this.toYMap(c);
  }
  public get text(): string {
    return 'Text response';
  }
  public get identifier(): CellType {
    return 'text-cell';
  }
  public createSpecific() {
    return {
      ...this._createCell(),
      type: 'text-cell'
    };
  }
}
