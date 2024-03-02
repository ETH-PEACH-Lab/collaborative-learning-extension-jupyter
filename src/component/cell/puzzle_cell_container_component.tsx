import React from 'react';
import { ISignal, Signal } from '@lumino/signaling';
import { PuzzleCellComponent } from './puzzle_cell_compontent';
import { Cell } from '../../cell_types';
import { UseSignal } from '@jupyterlab/apputils';

export type PuzzleCellContainerComponentProps = {
  cells: Cell[] | undefined;
  cellSignal: ISignal<any, Cell>;
  onCellChanged: (c: Cell) => void;
  onDelete: (c: Cell) => void;
};
export class PuzzleCellContainerComponent extends React.Component<PuzzleCellContainerComponentProps> {
  componentDidMount() {
    this.props.cellSignal.connect(this._handleCellSignal.bind(this));
  }

  componentWillUnmount() {
    this.props.cellSignal.disconnect(this._handleCellSignal);
  }
  render() {
    const ordererCellComponents: React.ReactElement[] = [];
    this.props?.cells?.forEach(element => {
      let cellCompoent = this._cellCompontent.get(element.id);
      if (cellCompoent === undefined) {
        const signal = new Signal<any, Cell>(this);
        cellCompoent = (
          <UseSignal signal={signal} initialArgs={element} key={element.id}>
            {(_, cell) => (
              <PuzzleCellComponent
                cell={cell}
                onCellChanged={this.props.onCellChanged}
                onDelete={this.props.onDelete}
              />
            )}
          </UseSignal>
        );
        this._cellCompontent.set(element.id, cellCompoent);
        this._cellSignals.set(element.id, signal);
      }
      ordererCellComponents.push(cellCompoent);
    });
    return <span>{ordererCellComponents}</span>;
  }
  private _handleCellSignal(sender: any, cell: Cell) {
    const signal = this._cellSignals.get(cell.id);
    if (signal !== undefined) {
      signal.emit(cell);
    }
  }
  private _cellSignals: Map<string, Signal<any, Cell>> = new Map<
    string,
    Signal<any, Cell>
  >();
  private _cellCompontent: Map<string, React.ReactElement> = new Map<
    string,
    React.ReactElement
  >();
}
