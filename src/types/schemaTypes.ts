import { PartialJSONObject } from '@lumino/coreutils';
export type Metadata = PartialJSONObject;
export type Language = 'python' | 'java';
export type SrcFieldType =
  | 'markdown-field'
  | 'code-field'
  | 'test-code-field'
  | 'multiple-choice-option-field';
export type SolutionType =
  | 'code-solution'
  | 'test-solution'
  | 'multiple-choice-solution';
export type CellType = 'text-cell' | 'code-cell' | 'multiple-choice-cell';
export type FieldType = SrcFieldType | SolutionType | CellType;

export interface IYObject {
  id: string;
}
export interface IField extends IYObject {
  type?: FieldType;
}
export interface ISrcField extends IField {
  src: string;
}
export interface IMarkdownField extends ISrcField {
  type: 'markdown-field';
  src: string;
}
export interface ICodeField extends ISrcField {
  type: 'code-field';
  language: Language;
}
export interface ITestCodeField extends ISrcField {
  name: string;
  type: 'test-code-field';
  language: Language;
  verified: boolean;
  createdBy: string;
}
export interface IMultipleChoiceOptionField extends ISrcField {
  type: 'multiple-choice-option-field';
}

export interface ISolution extends IField {
  type: SolutionType;
  grade: number;
  comment: string;
}

export interface ICodeSolution extends ISolution {
  src: ICodeField;
}
export interface ITextSolution extends ISolution {
  src: IMarkdownField;
}
export interface IMultipleChoiceSolution extends ISolution {
  choice: number[];
}
export interface ICell extends IField {
  type: CellType;
  description: IMarkdownField;
  metadata: Metadata;
  studentCode: Map<string, ISolution>;
}

export interface ICodeCell extends ICell {
  startingCode: ICodeField;
  solutionCode: ICodeField;
  testingCode: ITestCodeField[];
  type: 'code-cell';
}
export interface ITextCell extends ICell {
  type: 'text-cell';
}

export interface IMulitpleChoiceCell extends ICell {
  options: IMultipleChoiceOptionField[];
  solutionOptions: number[];
  type: 'multiple-choice-cell';
}
export type FieldProperty = 'startingCode' | 'solutionCode' | 'description';
export type ArrayFieldProperty = 'cells' | 'testingCode';

export interface IArrayFieldSignaling {
  parentId: string;
  propertyName: ArrayFieldProperty;
  fields: IField[];
}
