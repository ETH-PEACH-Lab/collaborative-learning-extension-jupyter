import { UUID } from '@lumino/coreutils';
import { CellFactory } from './cell_factory';
import { Cell, CellType, ICodeCell } from '../cell_types';

export class CodeCellFactory extends CellFactory {
  public createCell(): Cell {
    return <ICodeCell>{
      id: UUID.uuid4(),
      code: '',
      language: 'TypeScript',
      cell_type: 'code'
    };
  }
  protected getCellType(): CellType {
    return 'code';
  }
}
