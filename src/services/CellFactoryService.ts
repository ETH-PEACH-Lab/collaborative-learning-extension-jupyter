import CellFactory from '../factory/schema/cellFactory/CellFactory';
import CodeCellFactory from '../factory/schema/cellFactory/CodeCellFactory';
import TextCellFactory from '../factory/schema/cellFactory/TextCellFactory';
import MultipleChoiceCellFactory from '../factory/schema/cellFactory/MultipleChoiceCellFactory';
import { CellType, ICell } from '../types';
import FactoryService from './FactoryService';
type FactoryNaming = {
  name: string;
  id: CellType;
};
export default class CellFactoryService extends FactoryService<
  CellType,
  ICell,
  CellFactory
> {
  private static _instance: CellFactoryService = new CellFactoryService();

  public static get instance(): CellFactoryService {
    return this._instance;
  }

  private constructor() {
    super();
    this.factories.push(new CodeCellFactory());
    this.factories.push(new TextCellFactory());
    this.factories.push(new MultipleChoiceCellFactory());
  }
  getFactoryNamings(): FactoryNaming[] {
    return this.factories.map(
      factory => <FactoryNaming>{ id: factory.identifier, name: factory.text }
    );
  }
}
