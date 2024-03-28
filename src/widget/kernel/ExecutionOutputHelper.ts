import { IOutput } from '@jupyterlab/nbformat';
import { PartialJSONObject } from '@lumino/coreutils';
import { IKernelOutput } from '../../types/kernelTypes';
import { ISignal, Signal } from '@lumino/signaling';

export default class ExecutionOutputHelper {
  clear = (referenceId: string) => {
    console.debug('clear: ' + referenceId);
    this._outputChanged.emit(<IKernelOutput>{
      referenceId: referenceId,
      type: 'clear'
    });
  };
  onStreamMessage = (referenceId: string, output: IOutput) => {
    this._outputChanged.emit(<IKernelOutput>{
      referenceId: referenceId,
      output: output.text,
      type: 'stream'
    });
  };
  getErrorMessage = (output: IOutput) =>
    output.ename + (output.evalue ? ': ' + output.evalue : '');
  onError = (referenceId: string, output: string) => {
    this._outputChanged.emit(<IKernelOutput>{
      referenceId: referenceId,
      output: output,
      type: 'error'
    });
  };
  onOutputObject = (referenceId: string, output: IOutput) => {
    if (typeof output.data === 'object') {
      this._outputChanged.emit(<IKernelOutput>{
        referenceId: referenceId,
        ...this.getDataObjectOutputValue(output)
      });
    }
  };
  getDataObjectOutputValue(_output: IOutput) {
    const jsonObject = _output.data as PartialJSONObject;
    jsonObject;
    if (jsonObject['text/plain'] !== undefined) {
      return { output: jsonObject['text/plain'], type: 'text/plain' };
    }
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
  get outputChanged(): ISignal<any, IKernelOutput> {
    return this._outputChanged;
  }
  private _outputChanged: Signal<any, IKernelOutput> = new Signal(this);
}
