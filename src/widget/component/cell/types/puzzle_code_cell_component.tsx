import React from 'react';
import { PuzzleEditorComponent } from '../../util/puzzle_editor_component';
import { Cell, ICodeCell } from '../../../../types/cell_types';

type PuzzleCodeCellComponentProps = {
  cell: ICodeCell;
  onChange: (c: Cell) => void;
  executeCell: (c: ICodeCell) => void;
};

export class PuzzleCodeCellComponent extends React.Component<PuzzleCodeCellComponentProps> {
  render() {
    return (
      <span>
        <button onClick={this.onExecute.bind(this)}>Execute</button>
        <PuzzleEditorComponent
          code={this.props.cell.code}
          language={this.props.cell.language}
          onCodeChange={this.onCodeChange.bind(this)}
        />
      </span>
    );
  }
  onExecute() {
    this.props.executeCell(this.props.cell);
  }
  onCodeChange(value: string) {
    this.props.cell.code = value;
    this.props.onChange(this.props.cell);
  }
}
