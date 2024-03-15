import { ISessionContext } from '@jupyterlab/apputils';
import { ICodeField } from '../types/cell_types';
import { IOutput } from '@jupyterlab/nbformat';
import { KernelMessage } from '@jupyterlab/services';
import { IOPubMessageType } from '@jupyterlab/services/lib/kernel/messages';
import { Signal } from '@lumino/signaling';
import { KernelOutput } from '../types/output_types';
import { PartialJSONObject } from '@lumino/coreutils';

export class KernelMessager {
  constructor(sessionContext: ISessionContext) {
    this._sessionContext = sessionContext;
  }

  get fieldOutputChanged(): Signal<any, KernelOutput> {
    return this._outputChanged;
  }

  executeCode(code: ICodeField): void {
    if (!this._sessionContext || !this._sessionContext.session?.kernel) {
      return;
    }
    const future = this._sessionContext.session?.kernel?.requestExecute({
      code: code.src
    });
    future.onIOPub = (msg: KernelMessage.IIOPubMessage<IOPubMessageType>) => {
      this._onIOPub(msg, code);
    };
  }
  private getDataObjectOutputValue(_output: IOutput) {
    const jsonObject = _output.data as PartialJSONObject;
    if (jsonObject['text/html'] !== undefined) {
      return { output: jsonObject['text/html'], type: 'text/html' };
    }
    if (jsonObject['application/json'] !== undefined) {
      return {
        output: jsonObject['application/json'],
        type: 'application/json'
      };
    }
    if (jsonObject['image/png'] !== undefined) {
      return { output: jsonObject['image/png'], type: 'image/png' };
    }
    return { output: 'Output type not supported', type: 'error' };
  }
  private _onIOPub = (
    msg: KernelMessage.IIOPubMessage<IOPubMessageType>,
    codeField: ICodeField
  ): void => {
    const msgType = msg.header.msg_type;
    const _output = msg.content as IOutput;
    switch (msgType) {
      case 'execute_result':
        if (typeof _output.data === 'object') {
          this._outputChanged.emit(<KernelOutput>{
            fieldId: codeField.id,
            ...this.getDataObjectOutputValue(_output)
          });
        }
        break;
      case 'display_data':
        if (typeof _output.data === 'object') {
          this._outputChanged.emit(<KernelOutput>{
            fieldId: codeField.id,
            ...this.getDataObjectOutputValue(_output)
          });
        }
        break;
      case 'error':
        this._outputChanged.emit(<KernelOutput>{
          fieldId: codeField.id,
          output: _output.evalue,
          type: 'error'
        });
        break;
      case 'stream':
        console.log(_output);
        this._outputChanged.emit(<KernelOutput>{
          fieldId: codeField.id,
          output: _output.text,
          type: 'stream'
        });
        break;
      default:
        break;
    }
    return;
  };
  private _sessionContext: ISessionContext | null;
  private _outputChanged: Signal<any, KernelOutput> = new Signal(this);
}
