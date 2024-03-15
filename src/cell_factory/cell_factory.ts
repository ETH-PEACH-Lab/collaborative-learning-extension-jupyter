import { UUID } from '@lumino/coreutils';
import { Cell, ICodeField, IMarkdownField } from '../types/cell_types';

export class CellFactory {
  public createCell(): Cell {
    return <Cell>{
      id: UUID.uuid4(),
      description: <IMarkdownField>{
        id: UUID.uuid4(),
        type: 'markdown',
        src: '### Description',
        language: 'markdown',
        rendering: false
      },
      metadata: {},
      solutions: {},
      startingCode: <ICodeField>{
        id: UUID.uuid4(),
        type: 'code',
        language: 'python',
        src: ''
      }
    };
  }
}
