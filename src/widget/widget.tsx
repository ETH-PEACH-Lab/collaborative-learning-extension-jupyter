import { DocumentRegistry, DocumentWidget } from '@jupyterlab/docregistry';

import { Signal } from '@lumino/signaling';
import { PuzzleDocModel } from '../model/puzzle_doc_model';

import * as React from 'react';
import { ReactWidget, UseSignal } from '@jupyterlab/apputils';
import { PuzzleToolbarComponent } from './component/puzzle_toolbar_component';
import { PuzzleCellContainerComponent } from './component/puzzle_cell_container_component';
import { Cell } from '../types/cell_types';
import { Message } from '@lumino/messaging';
import { UserRoleProvider } from './context/user_role_context';
import { DocModelContextProvider } from './context/doc_model_context';
import { KernelMessager } from './kernel/kernel_messager';

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
      <DocModelContextProvider
        cellSignal={this._model.cellChanged}
        fieldSignal={this._model.fieldChanged}
        fieldOutputSignal={this._kernelMessager.fieldOutputChanged}
        executeCell={this._kernelMessager.executeCode.bind(
          this._kernelMessager
        )}
        changeCell={this._model.setCell.bind(this._model)}
        deleteCell={this._model.deleteCell.bind(this._model)}
      >
        <UserRoleProvider>
          <PuzzleToolbarComponent
            addCell={() => {
              this._model.addCell();
            }}
          ></PuzzleToolbarComponent>
          <UseSignal
            signal={this._cellsSignal}
            initialArgs={this._model.cells}
            key={'cells_container_signal'}
          >
            {(_, cells) => (
              <PuzzleCellContainerComponent
                key={'cells_container'}
                cells={cells}
              ></PuzzleCellContainerComponent>
            )}
          </UseSignal>
        </UserRoleProvider>
      </DocModelContextProvider>
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
    this._cellsSignal = new Signal<PuzzlePanel, Cell[]>(this);
    this._kernelMessager = new KernelMessager(context.sessionContext);
    context.ready.then(value => {
      this._model.contentChanged.connect(this._onContentChanged);
      this._model.clientChanged.connect(this._onClientChanged);
      this.update();
      this._cellsSignal.emit(this._model.cells);
    });
    this.addClass('jp-puzzle-panel');
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

  /**
   * Handle `after-attach` messages sent to the widget.
   *
   * @param msg Widget layout message
   */
  protected onAfterAttach(msg: Message): void {
    super.onAfterAttach(msg);
    this.node.addEventListener('mouseleave', this, true);
    this.node.addEventListener('mousemove', this, true);
  }

  /**
   * Handle `before-detach` messages sent to the widget.
   *
   * @param msg Widget layout message
   */
  protected onBeforeDetach(msg: Message): void {
    this.node.removeEventListener('mouseleave', this, true);
    this.node.removeEventListener('mousemove', this, true);
    super.onBeforeDetach(msg);
  }

  handleEvent(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (event.type) {
      switch (event.type) {
        case 'mouseleave':
          // Wrapping the modifications to the shared model into a flag
          // to prevent apply changes triggered by the same client
          this._model.setCursor(null);
          break;
        case 'mousemove': {
          const bbox = this.node.getBoundingClientRect();
          // Wrapping the modifications to the shared model into a flag
          // to prevent apply changes triggered by the same client
          this._model.setCursor({
            x: event.x - bbox.left,
            y: event.y - bbox.top
          });
        }
      }
    }
  }

  private _onClientChanged = (
    sender: PuzzleDocModel,
    clients: Map<number, any>
  ): void => {
    clients.forEach((client, key) => {
      if (this._model.clientId !== key) {
        const id = key.toString();

        if (client.mouse) {
          if (this._clients.has(id)) {
            const elt = this._clients.get(id)!;
            elt.style.left = client.mouse.x + 'px';
            elt.style.top = client.mouse.y + 'px';
          } else {
            const el = document.createElement('div');
            el.className = 'jp-puzzle-client';
            el.style.left = client.mouse.x + 'px';
            el.style.top = client.mouse.y + 'px';
            el.style.backgroundColor = client.user.color;
            el.innerText = client.user.name;
            this._clients.set(id, el);
            this.node.appendChild(el);
          }
        } else if (this._clients.has(id)) {
          this.node.removeChild(this._clients.get(id)!);
          this._clients.delete(id);
        }
      }
    });
  };
  private _clients: Map<string, HTMLElement> = new Map<string, HTMLElement>();
  private _cellsSignal: Signal<PuzzlePanel, Cell[]>;
  private _model: PuzzleDocModel;
  private _kernelMessager: KernelMessager;
}
