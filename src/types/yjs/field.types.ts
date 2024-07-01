import { SolutionField, SolutionType, SrcField, SrcFieldType } from './fields';
import { YObject } from './main.types';
export type Language = 'python' | 'java';

export type FieldType = SolutionType | SrcFieldType;
export type Field = SolutionField | SrcField;

export interface IField extends YObject {
  type?: FieldType;
  createdBy?: string;
}
