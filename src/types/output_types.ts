import { PartialJSONObject } from '@lumino/coreutils';

export type KernelOutput = {
  type: 'stream' | 'text/html' | 'image/png' | 'error' | 'application/json';
  output: string | PartialJSONObject;
  fieldId: string;
};
