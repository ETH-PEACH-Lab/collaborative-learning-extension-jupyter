import { DocumentRegistry } from '@jupyterlab/docregistry';

import { Signal } from '@lumino/signaling';
import { PuzzleDocModel } from '../model/puzzleYDoc/PuzzleDocModel';

import * as React from 'react';
import { ISessionContext, ReactWidget } from '@jupyterlab/apputils';
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
import UseArrayFieldSignal from './signal/UseArrayFieldSignal';
/**
 * Widget that contains the main view of the PuzzleWidget.
 */
export class PuzzlePanel extends ReactWidget {
  protected render() {
    return (
      <UserRoleProvider identity={this._model.getIdentity()}>
        <DocModelContextProvider
          fieldSignal={this._model.fieldChanged}
          arrayFieldSignal={this._model.arrayFieldChanged}
          setField={this._model.setField.bind(this._model)}
          deleteCell={this._model.deleteCell.bind(this._model)}
          setArrayField={this._model.setArrayField.bind(this._model)}
          addTestCode={this._model.addTestCode.bind(this._model)}
          removeArrayField={this._model.removeArrayField.bind(this._model)}
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

            <TopBarComponent />
            <UseArrayFieldSignal
              parentId=""
              propertyName="cells"
              fields={[]}
            >
              {cells => (
                <CellContainerComponent
                  cells={cells}
                ></CellContainerComponent>
              )}
            </UseArrayFieldSignal>
            <FooterComponent addCell={this._model.addCell.bind(this._model)} />

          </KernelContextProvider>
        </DocModelContextProvider>
      </UserRoleProvider>
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
