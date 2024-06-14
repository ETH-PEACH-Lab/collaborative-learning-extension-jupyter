import { ISessionContext } from '@jupyterlab/apputils';
import { IOutput } from '@jupyterlab/nbformat';
import { KernelMessage } from '@jupyterlab/services';
import { IOPubMessageType } from '@jupyterlab/services/lib/kernel/messages';
import { ISignal, Signal } from '@lumino/signaling';
import {
  IKernelExecution,
  IKernelOutput,
  IKernelTestVerification,
  IKernelTestVerified
} from '../../types/app/kernel.types';
import ExecutionOutputHelper from './ExecutionOutputHelper';
import {
  setKernelExecutionResult,
  setKernelTestResult,
  store
} from '../../state';

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
          referenceId: execution.referenceId,
          outputs
        })
      )
    );
  }
  executeTest(
    execution: IKernelExecution,
    sessionContext: ISessionContext | null
  ) {
    this._executeTest(execution, sessionContext).then(successful =>
      store.dispatch(
        setKernelTestResult({
          referenceId: execution.referenceId,
          result: successful
        })
      )
    );
  }
  verifyTest(
    execution: IKernelTestVerification,
    sessionContext: ISessionContext | null
  ): void {
    this._executeTest(execution, sessionContext).then(successful => {
      if (successful) {
        this._verifiedTestSignal.emit(<IKernelTestVerified>{
          referenceId: execution.referenceId
        });
      }
      store.dispatch(
        setKernelTestResult({
          referenceId: execution.referenceId,
          result: successful
        })
      );
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
        code: execution.src
      });
      future.onIOPub = (msg: KernelMessage.IIOPubMessage<IOPubMessageType>) => {
        const msgType = msg.header.msg_type;
        console.debug(
          'message type: ' + msgType + ' for: ' + execution.referenceId
        );
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
    execution: IKernelExecution,
    sessionContext: ISessionContext | null
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, _) => {
      if (
        !execution.src.includes('assert') ||
        !sessionContext ||
        !sessionContext.session?.kernel
      ) {
        store.dispatch(
          setKernelExecutionResult({
            referenceId: execution.referenceId,
            outputs: [
              this._executionOutputHelper.onError(
                'No asserts were found in the test code'
              )
            ]
          })
        );
        return resolve(false);
      }
      const future = sessionContext.session?.kernel?.requestExecute({
        code: execution.src
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
                referenceId: execution.referenceId,
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
  private _executionOutputHelper: ExecutionOutputHelper =
    new ExecutionOutputHelper();
  private _verifiedTestSignal: Signal<any, IKernelTestVerified> = new Signal(
    this
  );
}