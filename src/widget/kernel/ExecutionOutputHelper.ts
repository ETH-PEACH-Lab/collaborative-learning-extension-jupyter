import { IOutput } from '@jupyterlab/nbformat';
import { PartialJSONObject } from '@lumino/coreutils';
import { IKernelOutput } from '../../types/app/kernel.types';

export default class ExecutionOutputHelper {
  onStreamMessage = (output: IOutput) => {
    return <IKernelOutput>{
      output: output.text,
      type: 'stream'
    };
  };
  getErrorMessage = (output: IOutput) =>
    output.ename + (output.evalue ? ': ' + output.evalue : '');
  onError = (output: string) => {
    return <IKernelOutput>{
      output: output,
      type: 'error'
    };
  };
  onOutputObject = (output: IOutput): IKernelOutput | null => {
    if (typeof output.data === 'object') {
      return <IKernelOutput>{
        ...this.getDataObjectOutputValue(output)
      };
    }
    return null;
  };
  getDataObjectOutputValue(_output: IOutput) {
    const jsonObject = _output.data as PartialJSONObject;
    jsonObject;
    if (jsonObject['application/json'] !== undefined) {
      return {
        output: jsonObject['application/json'],
        type: 'application/json'
      };
    }
    if (jsonObject['image/png'] !== undefined) {
      return { output: jsonObject['image/png'], type: 'image/png' };
    }
    if (jsonObject['text/html'] !== undefined) {
      return { output: jsonObject['text/html'], type: 'text/html' };
    }
    if (jsonObject['text/plain'] !== undefined) {
      return { output: jsonObject['text/plain'], type: 'text/plain' };
    }
    return { output: 'Output type not supported', type: 'error' };
  }
}
