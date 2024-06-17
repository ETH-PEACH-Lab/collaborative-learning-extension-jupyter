import { DocumentRegistry } from '@jupyterlab/docregistry';

import { Signal } from '@lumino/signaling';
import { PuzzleDocModel } from '../model/puzzleYDoc/PuzzleDocModel';

import * as React from 'react';
import { ISessionContext, ReactWidget } from '@jupyterlab/apputils';
import { TopBarComponent } from './component/TopBarComponent';
import { CellContainerComponent } from './component/CellContainerComponent';
import { DocModelContextProvider } from './context/docModelContext';
import FooterComponent from './component/FooterComponent';
import { KernelContextProvider } from './context/kernelContext';
import { KernelMessengerService } from './kernel/KernelMessengerService';
import { IKernelExecution } from '../types/app/kernel.types';
import { Provider } from 'react-redux';
import { store } from '../state/store';
/**
 * Widget that contains the main view of the PuzzleWidget.
 */
export class PuzzlePanel extends ReactWidget {
  protected render() {
    return (
      <Provider store={store}>
        <DocModelContextProvider
          changeField={this._model.changeField.bind(this._model)}
          deleteCell={this._model.deleteCell.bind(this._model)}
          addFieldToPropertyArray={this._model.addFieldToPropertyArray.bind(
            this._model
          )}
          removeFieldFromPropertyArray={this._model.removeFieldFromPropertyArray.bind(
            this._model
          )}
          changeCell={this._model.changeCell.bind(this._model)}
          swapCellPosition={this._model.swapCellPosition.bind(this._model)}
          swapInPropertyArray={this._model.swapInPropertyArray.bind(
            this._model
          )}
        >
          <KernelContextProvider
            executeCode={(execution: IKernelExecution) =>
              KernelMessengerService.instance.executeCode(
                execution,
                this._sessionContext
              )
            }
            executeTest={(execution: IKernelExecution) =>
              KernelMessengerService.instance.executeTest(
                execution,
                this._sessionContext
              )
            }
            verifyTest={(execution: IKernelExecution) =>
              KernelMessengerService.instance.verifyTest(
                execution,
                this._sessionContext
              )
            }
          >
            <TopBarComponent />
            <CellContainerComponent
              docId={this._model.docId}
            ></CellContainerComponent>
            <FooterComponent addCell={this._model.addCell.bind(this._model)} />
          </KernelContextProvider>
        </DocModelContextProvider>
      </Provider>
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
}
