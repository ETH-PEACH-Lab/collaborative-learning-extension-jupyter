import { SolutionType, SrcFieldType } from './fields';
import { YObject } from './main.types';
export type Language = 'python' | 'java';

export type FieldType = SolutionType | SrcFieldType;

export interface IField extends YObject {
  type?: FieldType;
  createdBy?: string;
  [key: string]: any;
}
