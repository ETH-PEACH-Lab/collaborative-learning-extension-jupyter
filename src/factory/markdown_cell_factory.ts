import { UUID } from '@lumino/coreutils';
import { CellType, IMarkdownCell } from '../cell_types';
import { CellFactory } from './cell_factory';

export class MarkdownCellFactory extends CellFactory {
  public createCell() {
    return <IMarkdownCell>{
      id: UUID.uuid4(),
      cell_type: 'markdown',
      markdown: '### New Markdown'
    };
  }
  protected getCellType(): CellType {
    return 'markdown';
  }
}
