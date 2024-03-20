import { PartialJSONObject } from '@lumino/coreutils';

export type Metadata = PartialJSONObject;

export type Cell = {
  id: string;
  description: IMarkdownField;
  startingCode: ICodeField;
  solutions: Map<string, string>;
  metadata: Metadata;
};
export type Solution = {
  clientId: string;
  cellId: string;
  solution: ICodeField;
};
export type Language = 'python' | 'java';

export type FieldType = 'markdown' | 'code' | 'multiple-choice';

export type Field = {
  id: string;
  src: string;
  type: FieldType;
};
export interface IMarkdownField extends Field {
  type: 'markdown';
  rendering: boolean;
}
export interface ICodeField extends Field {
  type: 'code';
  language: Language;
}
export interface IMultipleChoiceField extends Field {
  type: 'multiple-choice';
  language: Language;
}
