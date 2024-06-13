import { KernelOutputType } from './KernelOutputType';

export type KernelOutputObject = {
  type: KernelOutputType;
  output?: string | object;
};
