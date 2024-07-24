import { ISessionContext } from '@jupyterlab/apputils';
import { IOutput } from '@jupyterlab/nbformat';
import { KernelMessage } from '@jupyterlab/services';
import { IOPubMessageType } from '@jupyterlab/services/lib/kernel/messages';
import { ISignal, Signal } from '@lumino/signaling';
import {
  IKernelAssertionExecution,
  IKernelExecution,
  IKernelOutput,
  IKernelTestVerified
} from '../../types/app/kernel.types';
import ExecutionOutputHelper from './ExecutionOutputHelper';
import {
  removeKernelExecutionResult,
  setKernelExecutionResult,
  setKernelTestResult,
  store
} from '../../state';
import { ICodeCell, ICodeField } from '../../types';

export class KernelMessengerService {
  private static _instance: KernelMessengerService =
    new KernelMessengerService();
  public static get instance(): KernelMessengerService {
    return this._instance;
  }
  get verifiedTestSignal(): ISignal<any, IKernelTestVerified> {
    return this._verifiedTestSignal;
  }
  executeCode(
    execution: IKernelExecution,
    sessionContext: ISessionContext | null
  ): void {
    this._executeCode(execution, sessionContext).then(outputs =>
      store.dispatch(
        setKernelExecutionResult({
          referenceId: execution.codeBodyId,
          outputs
        })
      )
    );
  }
  executeTest(
    execution: IKernelAssertionExecution,
    sessionContext: ISessionContext | null
  ) {
    store.dispatch(removeKernelExecutionResult(execution.assertionCodeId));
    this._executeTest(execution, sessionContext).then(successful =>
      store.dispatch(
        setKernelTestResult({
          referenceId: execution.assertionCodeId,
          result: successful,
          cellId: execution.cellId
        })
      )
    );
  }
  verifyTest(
    execution: IKernelAssertionExecution,
    sessionContext: ISessionContext | null
  ): void {
    store.dispatch(removeKernelExecutionResult(execution.assertionCodeId));
    this._executeTest(execution, sessionContext).then(successful => {
      if (successful) {
        this._verifiedTestSignal.emit(<IKernelTestVerified>{
          referenceId: execution.assertionCodeId
        });
      } else {
        store.dispatch(
          setKernelTestResult({
            referenceId: execution.assertionCodeId,
            result: successful,
            cellId: execution.cellId
          })
        );
      }
    });
  }
  private _executeCode = (
    execution: IKernelExecution,
    sessionContext: ISessionContext | null
  ): Promise<IKernelOutput[]> => {
    const outputs: IKernelOutput[] = [];
    return new Promise<IKernelOutput[]>((resolve, _) => {
      if (!sessionContext || !sessionContext.session?.kernel) {
        return;
      }
      const future = sessionContext.session?.kernel?.requestExecute({
        code: this._extractExecutionSrc(execution)
      });
      future.onIOPub = (msg: KernelMessage.IIOPubMessage<IOPubMessageType>) => {
        const msgType = msg.header.msg_type;
        const _output = msg.content as IOutput;
        switch (msgType) {
          case 'execute_result': {
            const executeResult =
              this._executionOutputHelper.onOutputObject(_output);
            if (executeResult) {
              outputs.push(executeResult);
            }
            break;
          }
          case 'display_data': {
            const displayData =
              this._executionOutputHelper.onOutputObject(_output);
            if (displayData) {
              outputs.push(displayData);
            }
            break;
          }
          case 'error':
            outputs.push(
              this._executionOutputHelper.onError(
                this._executionOutputHelper.getErrorMessage(_output)
              )
            );
            break;
          case 'stream':
            outputs.push(this._executionOutputHelper.onStreamMessage(_output));
            break;
          case 'status':
            if (_output.execution_state === 'idle') {
              resolve(outputs);
            }
            break;
          default:
            break;
        }
        return;
      };
    });
  };
  private _executeTest(
    execution: IKernelAssertionExecution,
    sessionContext: ISessionContext | null
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, _) => {
      const src = this._extractAssertionExecutionSrc(execution);
      if (
        !src.includes('assert') ||
        !sessionContext ||
        !sessionContext.session?.kernel
      ) {
        store.dispatch(
          setKernelExecutionResult({
            referenceId: execution.assertionCodeId,
            outputs: [
              this._executionOutputHelper.onError(
                'No asserts were found in the assertion code'
              )
            ]
          })
        );
        return resolve(false);
      }
      if (!this._isMeaningfulAssertion(src)) {
        store.dispatch(
          setKernelExecutionResult({
            referenceId: execution.assertionCodeId,
            outputs: [
              this._executionOutputHelper.onError(
                'The assertion code contains a meaningless assertion'
              )
            ]
          })
        );
        return resolve(false);
      }
      const future = sessionContext.session?.kernel?.requestExecute({
        code: src
      });
      future.onIOPub = (msg: KernelMessage.IIOPubMessage<IOPubMessageType>) => {
        const msgType = msg.header.msg_type;
        const _output = msg.content as IOutput;
        switch (msgType) {
          case 'status':
            if (_output.execution_state === 'idle') {
              return resolve(true);
            }
            break;
          case 'error':
            store.dispatch(
              setKernelExecutionResult({
                referenceId: execution.assertionCodeId,
                outputs: [
                  this._executionOutputHelper.onError(
                    this._executionOutputHelper.getErrorMessage(_output)
                  )
                ]
              })
            );
            return resolve(false);
        }
      };
    });
  }
  private _isMeaningfulAssertion(assertion: string) {
    if (
      assertion.includes('==') ||
      assertion.includes('!=') ||
      assertion.includes('>=') ||
      assertion.includes('<=') ||
      assertion.includes('>') ||
      assertion.includes('<')
    ) {
      const assertRegex = /assert\s+[^;]+/g;
      const matches = assertion.match(assertRegex) ?? [];
      for (let i = 0; i < matches.length; i++) {
        const parts = matches[i].split(/==|!=|>=|<=|>|</);
        if (parts.length < 2) {
          return false;
        }
        const leftPart = parts[0]
          .replace('assert', '')
          .replace(/^["'](.+(?=["']$))["']$/, '"')
          .trim();

        const rightPart = parts[1]
          .replace(/^["'](.+(?=["']$))["']$/, '"')
          .trim();
        try {
          const leftPartValue = eval(leftPart);
          const rightPartValue = eval(rightPart);
          if (leftPartValue === rightPartValue) {
            return false;
          }
        } catch {
          if (leftPart === rightPart) {
            return false;
          }
        }

        return true;
      }
    }
    if (assertion.match(/^assert\s+True.*$/g)) {
      return false;
    }
    return true;
  }

  private _extractAssertionExecutionSrc(
    execution: IKernelAssertionExecution
  ): string {
    const assertionField = store.getState().fields.byId[
      execution.assertionCodeId
    ] as ICodeField;
    if (!assertionField) {
      return '';
    }
    return [this._extractExecutionSrc(execution), assertionField.src].join(
      '\r\n'
    );
  }
  private _extractExecutionSrc(execution: IKernelExecution): string {
    const codeCell = store.getState().cells.byId[execution.cellId] as ICodeCell;
    if (!codeCell) {
      return '';
    }
    const fields: ICodeField[] = [];
    fields.push(
      store.getState().fields.byId[codeCell.startingCodeId] as ICodeField
    );
    fields.push(
      store.getState().fields.byId[execution.codeBodyId] as ICodeField
    );
    return fields.map(field => field.src).join('\r\n');
  }
  private _executionOutputHelper: ExecutionOutputHelper =
    new ExecutionOutputHelper();
  private _verifiedTestSignal: Signal<any, IKernelTestVerified> = new Signal(
    this
  );
}
