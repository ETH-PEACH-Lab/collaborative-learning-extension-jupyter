import CellFactory from '../factory/schema/cellFactory/CellFactory';
import CodeCellFactory from '../factory/schema/cellFactory/CodeCellFactory';
import TextCellFactory from '../factory/schema/cellFactory/TextCellFactory';
import MultipleChoiceCellFactory from '../factory/schema/cellFactory/MultipleChoiceCellFactory';
import * as Y from 'yjs';
import { CellType, ICell } from '../types/schemaTypes';
import FactorySerivce from './FactoryService';
type FactoryNaming = {
  name: string;
  id: CellType;
};
export default class CellFactoryService extends FactorySerivce<
  CellType,
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
  load(cell: ICell): Y.Map<any> {
    return this.findFactory(cell.type ?? 'code-cell').load(cell);
  }
  getFactoryNamings(): FactoryNaming[] {
    return this.factories.map(
      factory => <FactoryNaming>{ id: factory.identifier, name: factory.text }
    );
  }
}
