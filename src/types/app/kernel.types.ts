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
  output?: string | object;
}
export interface IKernelExecution {
  cellId: string;
  codeBodyId: string;
}
export interface IKernelAssertionExecution extends IKernelExecution {
  assertionCodeId: string;
}
export interface IKernelTestVerified {
  referenceId: string;
}
export interface IKernelTestResult {
  referenceId: string;
  result: boolean;
  cellId: string;
}
