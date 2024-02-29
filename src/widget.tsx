import { DocumentRegistry, DocumentWidget } from '@jupyterlab/docregistry';

import { Signal } from '@lumino/signaling';
import { Cell, PuzzleDocModel } from './model';

import * as React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import { PuzzleToolbarComponent } from './component/puzzle_toolbar_component';
import { PuzzleCellContainerComponent } from './component/puzzle_cell_container_component';

export class PuzzleDocWidget extends DocumentWidget<
  PuzzlePanel,
  PuzzleDocModel
> {
  constructor(options: DocumentWidget.IOptions<PuzzlePanel, PuzzleDocModel>) {
    console.log('creating puzzle doc widget');
    super(options);
  }

  dispose(): void {
    this.content.dispose();
    super.dispose();
  }
}
/**
 * Widget that contains the main view of the PuzzleWidget.
 */
export class PuzzlePanel extends ReactWidget {
  protected render() {
    return (
      <span>
        <PuzzleToolbarComponent
          addCodeCell={this.addCodeCell.bind(this)}
        ></PuzzleToolbarComponent>
        <PuzzleCellContainerComponent
          cellSignal={this._cellSignal}
          cellsSignal={this._cellsSignal}
          cells={this._model.cells}
          onCellChanged={this.onCellChanged.bind(this)}
        ></PuzzleCellContainerComponent>
      </span>
    );
  }
  /**
   * Construct a `PuzzlePanel`.
   *
   * @param context - The puzzle context.
   */
  constructor(context: DocumentRegistry.IContext<PuzzleDocModel>) {
    super();
    this._model = context.model;
    this._cellSignal = new Signal<PuzzlePanel, Cell>(this);
    this._cellsSignal = new Signal<PuzzlePanel, Cell[]>(this);
    context.ready.then(value => {
      this._model.contentChanged.connect(this._onContentChanged);
      this._model.cellChanged.connect(this._onCellChanged);
      this.update();
      this._cellsSignal.emit(this._model.cells);
    });
    this.addClass('jp-puzzle-panel');
  }

  onCellChanged(value: Cell): void {
    this._model.cell = value;
  }
  addCodeCell(): void {
    this._model.addCodeCell();
  }
  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this._model.contentChanged.disconnect(this._onContentChanged);
    Signal.clearData(this);
    super.dispose();
  }
  private _onContentChanged = (): void => {
    this._cellsSignal.emit(this._model.cells);
  };

  private _onCellChanged = (sender: PuzzleDocModel, cell: Cell): void => {
    this._cellSignal.emit(cell);
  };
  private _cellSignal: Signal<PuzzlePanel, Cell>;
  private _cellsSignal: Signal<PuzzlePanel, Cell[]>;
  private _model: PuzzleDocModel;
}
