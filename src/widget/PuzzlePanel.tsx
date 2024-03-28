import { DocumentRegistry } from '@jupyterlab/docregistry';

import { Signal } from '@lumino/signaling';
import { PuzzleDocModel } from '../model/puzzleYDoc/PuzzleDocModel';

import * as React from 'react';
import { ISessionContext, ReactWidget, UseSignal } from '@jupyterlab/apputils';
import { TopBarComponent } from './component/TopBarComponent';
import { CellContainerComponent } from './component/CellContainerComponent';
import { UserRoleProvider } from './context/userRoleContext';
import { DocModelContextProvider } from './context/docModelContext';
import FooterComponent from './component/FooterComponent';
import { KernelContextProvider } from './context/kernelContext';
import { KernelMessagerService } from './kernel/KernelMessagerService';
import {
  IKernelExecution,
  IKernelTestVerification
} from '../types/kernelTypes';
import { ICell } from '../types/schemaTypes';
/**
 * Widget that contains the main view of the PuzzleWidget.
 */
export class PuzzlePanel extends ReactWidget {
  protected render() {
    return (
      <DocModelContextProvider
        cellSignal={this._model.cellChanged}
        fieldSignal={this._model.fieldChanged}
        arrayFieldSignal={this._model.arrayFieldChanged}
        setField={this._model.setField.bind(this._model)}
        deleteCell={this._model.deleteCell.bind(this._model)}
        setArrayField={this._model.setArrayField.bind(this._model)}
        addTestCode={this._model.addTestCode.bind(this._model)}
      >
        <KernelContextProvider
          kernelOutputSignal={
            KernelMessagerService.instance.kernelOutputChanged
          }
          testResultSignal={KernelMessagerService.instance.testResultSignal}
          executeCode={(execution: IKernelExecution) =>
            KernelMessagerService.instance.executeCode(
              execution,
              this._sessionContext
            )
          }
          executeTest={(execution: IKernelExecution) =>
            KernelMessagerService.instance.executeTest(
              execution,
              this._sessionContext
            )
          }
          verifyTest={(execution: IKernelTestVerification) =>
            KernelMessagerService.instance.verifyTest(
              execution,
              this._sessionContext
            )
          }
        >
          <UserRoleProvider identity={this._model.getIdentity()}>
            <TopBarComponent />
            <UseSignal
              signal={this._cellsSignal}
              initialArgs={this._model.cells}
              key={'cells_container_signal'}
            >
              {(_, cells) => (
                <CellContainerComponent
                  key={'cells_container'}
                  cells={cells}
                ></CellContainerComponent>
              )}
            </UseSignal>
            <FooterComponent addCell={this._model.addCell.bind(this._model)} />
          </UserRoleProvider>
        </KernelContextProvider>
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
    this._sessionContext = context.sessionContext;
    this._model = context.model;
    this.addClass('jp-puzzle-panel');
    context.ready.then(() => {
      this._model.cellsChanged.connect((_, cells) =>
        this._cellsSignal.emit(cells)
      );
      this._cellsSignal.emit(this._model.cells);
      this.update();
    });
  }
  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    Signal.clearData(this);
    super.dispose();
  }

  private _model: PuzzleDocModel;
  private _sessionContext: ISessionContext;
  private _cellsSignal: Signal<any, ICell[]> = new Signal(this);
}
