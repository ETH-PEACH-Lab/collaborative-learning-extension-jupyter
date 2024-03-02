import React from 'react';
import { ISignal } from '@lumino/signaling';

import { PuzzleCodeCellComponent } from './types/puzzle_code_cell_component';
import { PuzzleMarkDownCellComponent } from './types/puzzle_markdown_cell_component';
import { Cell } from '../../cell_types';

type PuzzleCellComponentProps = {
  initCell: Cell;
  signal: ISignal<any, Cell>;
  onCellChanged: (c: Cell) => void;
  onDelete: (c: Cell) => void;
};
type PuzzleCellComponentState = {
  cell: Cell;
};
export class PuzzleCellComponent extends React.Component<
  PuzzleCellComponentProps,
  PuzzleCellComponentState
> {
  componentDidMount() {
    this.setState({ cell: this.props.initCell });
    this.props.signal.connect(this._handleSignal.bind(this));
  }

  componentWillUnmount() {
    this.props.signal.disconnect(this._handleSignal.bind(this));
  }
  _handleSignal = (sender: any, value: Cell) => {
    this.setState({ cell: value });
  };
  render() {
    const rendering = [<PuzzleCellSettingsComponent onDelete={this.onDelete.bind(this)}></PuzzleCellSettingsComponent>]
    if (this.state?.cell.cell_type === 'code') {
      rendering.push(<PuzzleCodeCellComponent cell={this.state.cell} onChange={this.props.onCellChanged} />);
    }
    if (this.state?.cell.cell_type === 'markdown') {
      rendering.push(<PuzzleMarkDownCellComponent cell={this.state.cell} />);
    }
    return <div>{rendering}</div>
  }
  onDelete = () => {
    this.props.onDelete(this.state.cell);
  }
}
type PuzzleCellSettingsComponentProps = {
  onDelete: () => void;
};
export class PuzzleCellSettingsComponent extends React.Component<PuzzleCellSettingsComponentProps>{
  render(): React.ReactNode {
    return <button onClick={this.props.onDelete}>delete</button>
  }
}