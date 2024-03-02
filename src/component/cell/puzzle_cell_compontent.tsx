import React from 'react';
import { PuzzleCodeCellComponent } from './types/puzzle_code_cell_component';
import { PuzzleMarkDownCellComponent } from './types/puzzle_markdown_cell_component';
import { Cell } from '../../cell_types';

type PuzzleCellComponentProps = {
  cell: Cell | undefined;
  onCellChanged: (c: Cell) => void;
  onDelete: (c: Cell) => void;
};
export class PuzzleCellComponent extends React.Component<PuzzleCellComponentProps> {
  render() {
    if (this.props.cell === undefined) {
      return;
    }
    const rendering = [
      <PuzzleCellSettingsComponent
        onDelete={this.onDelete.bind(this)}
      ></PuzzleCellSettingsComponent>
    ];
    if (this.props?.cell?.cell_type === 'code') {
      rendering.push(
        <PuzzleCodeCellComponent
          cell={this.props.cell}
          onChange={this.props.onCellChanged}
        />
      );
    }
    if (this.props?.cell?.cell_type === 'markdown') {
      rendering.push(<PuzzleMarkDownCellComponent cell={this.props.cell} />);
    }
    return <div>{rendering}</div>;
  }
  onDelete = () => {
    if (this.props.cell === undefined) {
      return;
    }
    this.props.onDelete(this.props.cell);
  };
}
type PuzzleCellSettingsComponentProps = {
  onDelete: () => void;
};
export class PuzzleCellSettingsComponent extends React.Component<PuzzleCellSettingsComponentProps> {
  render(): React.ReactNode {
    return <button onClick={this.props.onDelete}>delete</button>;
  }
}
