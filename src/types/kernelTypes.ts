import { PartialJSONObject, PartialJSONValue } from '@lumino/coreutils';
export interface IKernelExecutionResult {
  referenceId: string;
  outputs: IKernelOutput[];
}
export interface IKernelOutput {
  type:
    | 'stream'
    | 'text/html'
    | 'text/plain'
    | 'image/png'
    | 'error'
    | 'application/json';
  output?: string | PartialJSONObject | PartialJSONValue;
}
export interface IKernelExecution {
  referenceId: string;
  src: string;
}
export interface IKernelTestVerification extends IKernelExecution {
  cellId: string;
}
export interface IKernelTestVerified {
  cellId: string;
  referenceId: string;
}
export interface IKernelTestResult {
  referenceId: string;
  result: boolean;
}
