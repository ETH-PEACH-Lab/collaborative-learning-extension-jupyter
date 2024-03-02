import React from 'react';
import { ISignal, Signal } from '@lumino/signaling';
import { PuzzleCellComponent } from './puzzle_cell_compontent';
import { Cell } from '../../cell_types';

export type PuzzleCellContainerComponentProps = {
  cells: Cell[];
  cellsSignal: ISignal<any, Cell[]>;
  cellSignal: ISignal<any, Cell>;
  onCellChanged: (c: Cell) => void;
  onDelete: (c: Cell) => void;
};
export type PuzzleCellContainerComponentState = {
  cells: Cell[];
};
export class PuzzleCellContainerComponent extends React.Component<
  PuzzleCellContainerComponentProps,
  PuzzleCellContainerComponentState
> {
  componentDidMount() {
    this.setState({ cells: this.props.cells });
    this.props.cellsSignal.connect(this._handleCellsSignal.bind(this));
    this.props.cellSignal.connect(this._handleCellSignal.bind(this));
  }

  componentWillUnmount() {
    this.props.cellsSignal.disconnect(this._handleCellsSignal.bind(this));
    this.props.cellSignal.disconnect(this._handleCellSignal.bind(this));
  }
  render() {
    const cellComponents: React.ReactElement[] = [];
    this.state?.cells.forEach(element => {
      const signal = new Signal<this, Cell>(this);
      this._cellSignals.set(element.id, signal);
      cellComponents.push(
        <PuzzleCellComponent
          key={element.id}
          signal={signal}
          initCell={element}
          onCellChanged={this.props.onCellChanged}
          onDelete={this.props.onDelete}
        />
      );
    });
    return <span>{cellComponents}</span>;
  }

  private _handleCellsSignal(sender: any, cells: Cell[]) {
    this.setState({ cells: cells });
    this._cellSignals = new Map<
      string,
      Signal<PuzzleCellContainerComponent, Cell>
    >();
  }
  private _handleCellSignal(sender: any, cell: Cell) {
    const signal = this._cellSignals.get(cell.id);
    if (signal !== undefined) {
      signal.emit(cell);
    } else {
      this.setState({ cells: [...this.state.cells, cell] });
    }
  }
  private _cellSignals: Map<
    string,
    Signal<PuzzleCellContainerComponent, Cell>
  > = new Map<string, Signal<PuzzleCellContainerComponent, Cell>>();
}
