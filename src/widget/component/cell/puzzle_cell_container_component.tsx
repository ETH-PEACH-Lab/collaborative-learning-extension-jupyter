import React from 'react';
import { ISignal, Signal } from '@lumino/signaling';
import { PuzzleCellSettingsComponent } from './puzzle_cell_settings_compontent';
import { UseSignal } from '@jupyterlab/apputils';
import { Cell, ICodeCell } from '../../../types/cell_types';
import { PuzzleCodeCellComponent } from './types/puzzle_code_cell_component';
import { PuzzleMarkDownCellComponent } from './types/puzzle_markdown_cell_component';

export type PuzzleCellContainerComponentProps = {
  cells: Cell[] | undefined;
  cellSignal: ISignal<any, Cell>;
  onExcuteCell: (c: ICodeCell) => void;
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
    const updatedIds: Set<string> = new Set<string>();
    this.props?.cells?.forEach(element => {
      updatedIds.add(element.id);
      let cellCompoent = this._cellCompontents.get(element.id);
      if (cellCompoent === undefined) {
        const signal = new Signal<any, Cell>(this);
        cellCompoent = (
          <UseSignal signal={signal} initialArgs={element} key={element.id}>
            {(_, cell) => {
              return this._renderCell(cell);
            }}
          </UseSignal>
        );
        this._cellCompontents.set(element.id, cellCompoent);
        this._cellSignals.set(element.id, signal);
      }
      ordererCellComponents.push(cellCompoent);
    });
    const maintainedIds = Array.from(this._cellCompontents.keys());
    const removableIds = maintainedIds.filter(item => !updatedIds.has(item));
    removableIds.forEach(id => {
      this._cellCompontents.delete(id);
      this._cellSignals.delete(id);
    });
    return <span>{ordererCellComponents}</span>;
  }
  private _handleCellSignal(_: any, cell: Cell) {
    const signal = this._cellSignals.get(cell.id);
    if (signal !== undefined) {
      signal.emit(cell);
    }
  }
  private _cellSignals: Map<string, Signal<any, Cell>> = new Map<
    string,
    Signal<any, Cell>
  >();
  private _cellCompontents: Map<string, React.ReactElement> = new Map<
    string,
    React.ReactElement
  >();
  private _renderCell(cell: Cell | undefined): React.ReactElement {
    if (cell === undefined) {
      return <div></div>;
    }
    const rendering = [
      <PuzzleCellSettingsComponent
        onDelete={() => {
          this.props.onDelete(cell);
        }}
      ></PuzzleCellSettingsComponent>
    ];
    if (cell?.cell_type === 'code') {
      rendering.push(
        <PuzzleCodeCellComponent
          cell={cell}
          onChange={this.props.onCellChanged}
          executeCell={this.props.onExcuteCell}
        />
      );
    }
    if (cell?.cell_type === 'markdown') {
      rendering.push(<PuzzleMarkDownCellComponent cell={cell} />);
    }
    return <div>{rendering}</div>;
  }
}
