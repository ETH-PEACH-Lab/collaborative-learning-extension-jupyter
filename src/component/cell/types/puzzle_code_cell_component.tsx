import React from 'react';
import { PuzzleEditorComponent } from '../../util/puzzle_editor_component';
import { Cell, ICodeCell } from '../../../cell_types';

type PuzzleCodeCellComponentProps = {
  cell: ICodeCell;
  onChange: (c: Cell) => void;
};

export class PuzzleCodeCellComponent extends React.Component<PuzzleCodeCellComponentProps> {
  render() {
    return (
      <PuzzleEditorComponent
        code={this.props.cell.code}
        language={this.props.cell.language}
        onCodeChange={this.onCodeChange.bind(this)}
      />
    );
  }
  onCodeChange(value: string) {
    this.props.cell.code = value;
    this.props.onChange(this.props.cell);
  }
}
