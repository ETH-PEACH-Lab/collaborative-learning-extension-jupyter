import { ISessionContext } from '@jupyterlab/apputils';
import { IOutput } from '@jupyterlab/nbformat';
import { KernelMessage } from '@jupyterlab/services';
import { IOPubMessageType } from '@jupyterlab/services/lib/kernel/messages';
import { ISignal, Signal } from '@lumino/signaling';
import {
  IKernelExecution,
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
  get kernelOutputChanged(): ISignal<any, IKernelOutput> {
    return this._executionOutputHelper.outputChanged;
  }
  get verifiedTestSignal(): ISignal<any, IKernelTestVerified> {
    return this._verifiedTestSignal;
  }
  get testResultSignal(): ISignal<any, IKernelTestResult> {
    return this._testResultSignal;
  }

  executeCode(
    execution: IKernelExecution,
    sessionContext: ISessionContext | null
  ): void {
    if (!sessionContext || !sessionContext.session?.kernel) {
      return;
    }
    const future = sessionContext.session?.kernel?.requestExecute({
      code: execution.src
    });
    future.onIOPub = (msg: KernelMessage.IIOPubMessage<IOPubMessageType>) => {
      this._onIOPubExecution(msg, execution);
    };
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
      })
    });
  }
  private _onIOPubExecution = (
    msg: KernelMessage.IIOPubMessage<IOPubMessageType>,
    execution: IKernelExecution
  ): void => {
    const msgType = msg.header.msg_type;
    console.debug(
      'message type: ' + msgType + ' for: ' + execution.referenceId
    );
    const _output = msg.content as IOutput;
    switch (msgType) {
      case 'execute_result':
        this._executionOutputHelper.onOutputObject(
          execution.referenceId,
          _output
        );
        break;
      case 'display_data':
        this._executionOutputHelper.onOutputObject(
          execution.referenceId,
          _output
        );
        break;
      case 'error':
        this._executionOutputHelper.onError(
          execution.referenceId,
          this._executionOutputHelper.getErrorMessage(_output)
        );
        break;
      case 'stream':
        this._executionOutputHelper.onStreamMessage(
          execution.referenceId,
          _output
        );
        break;
      case 'status':
        if (_output.execution_state === 'busy') {
          this._executionOutputHelper.clear(execution.referenceId);
        }
        break;
      default:
        break;
    }
    return;
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
        this._executionOutputHelper.onError(
          execution.referenceId,
          'No asserts were found in the test code'
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
            if (_output.execution_state === 'busy') {
              this._executionOutputHelper.clear(execution.referenceId);
            }
            break;
          case 'error':
            this._executionOutputHelper.onError(
              execution.referenceId,
              this._executionOutputHelper.getErrorMessage(_output)
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
  private _testResultSignal: Signal<any, IKernelTestResult> = new Signal(this);
}
