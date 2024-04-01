import { ISessionContext } from '@jupyterlab/apputils';
import { IOutput } from '@jupyterlab/nbformat';
import { KernelMessage } from '@jupyterlab/services';
import { IOPubMessageType } from '@jupyterlab/services/lib/kernel/messages';
import { ISignal, Signal } from '@lumino/signaling';
import {
  IKernelExecution,
  IKernelExecutionResult,
  IKernelOutput,
  IKernelTestResult,
  IKernelTestVerification,
  IKernelTestVerified
} from '../../types/kernelTypes';
import ExecutionOutputHelper from './ExecutionOutputHelper';

export class KernelMessagerService {
  private static _instance: KernelMessagerService = new KernelMessagerService();
  public static get instance(): KernelMessagerService {
    return this._instance;
  }
  get verifiedTestSignal(): ISignal<any, IKernelTestVerified> {
    return this._verifiedTestSignal;
  }
  get testResultSignal(): ISignal<any, IKernelTestResult> {
    return this._testResultSignal;
  }
  get outputChanged(): ISignal<any, IKernelExecutionResult> {
    return this._outputChanged;
  }
  executeCode(
    execution: IKernelExecution,
    sessionContext: ISessionContext | null
  ): void {
    this._executeCode(execution, sessionContext).then(outputs =>
      this._outputChanged.emit({
        referenceId: execution.referenceId,
        outputs: outputs
      })
    );
  }
  executeTest(
    execution: IKernelExecution,
    sessionContext: ISessionContext | null
  ) {
    this._executeTest(execution, sessionContext).then(successful =>
      this._testResultSignal.emit({
        referenceId: execution.referenceId,
        result: successful
      })
    );
  }
  verifyTest(
    execution: IKernelTestVerification,
    sessionContext: ISessionContext | null
  ): void {
    this._executeTest(execution, sessionContext).then(successful => {
      if (successful) {
        this._verifiedTestSignal.emit(<IKernelTestVerified>{
          referenceId: execution.referenceId,
          cellId: execution.cellId
        });
      }
      this._testResultSignal.emit({
        referenceId: execution.referenceId,
        result: successful
      });
    });
  }
  private _executeCode = (
    execution: IKernelExecution,
    sessionContext: ISessionContext | null
  ): Promise<IKernelOutput[]> => {
    const outputs: IKernelOutput[] = [];
    return new Promise<IKernelOutput[]>((resolve, reject) => {
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
    return new Promise<boolean>((resolve, reject) => {
      if (
        !execution.src.includes('assert') ||
        !sessionContext ||
        !sessionContext.session?.kernel
      ) {
        this._outputChanged.emit({
          referenceId: execution.referenceId,
          outputs: [
            this._executionOutputHelper.onError(
              'No asserts were found in the test code'
            )
          ]
        });
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
            this._outputChanged.emit({
              referenceId: execution.referenceId,
              outputs: [
                this._executionOutputHelper.onError(
                  this._executionOutputHelper.getErrorMessage(_output)
                )
              ]
            });
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
  private _testResultSignal: Signal<any, IKernelTestResult> = new Signal(this);
  private _outputChanged: Signal<any, IKernelExecutionResult> = new Signal(
    this
  );
}
