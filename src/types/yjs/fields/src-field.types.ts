import { IField, Language } from '../field.types';

export type SrcFieldType =
  | 'markdown'
  | 'code'
  | 'test-code'
  | 'multiple-choice-item';
export interface ISrcField extends IField {
  type: SrcFieldType;
  src: string;
}
export interface IMarkdownField extends ISrcField {
  type: 'markdown';
  src: string;
}
export interface ICodeField extends ISrcField {
  type: 'code';
  language: Language;
}
export interface ITestCodeField extends ISrcField {
  name: string;
  type: 'test-code';
  language: Language;
  verified: boolean;
  createdBy: string;
}
