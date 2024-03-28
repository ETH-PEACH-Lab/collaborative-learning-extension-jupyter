import { PartialJSONObject } from '@lumino/coreutils';
export type Metadata = PartialJSONObject;
export type Language = 'python' | 'java';
export type FieldType =
  | 'markdown'
  | 'code'
  | 'test-code'
  | 'multiple-choice-option';
export type CellType = 'text' | 'code' | 'multiple-choice';
export interface IField {
  id: string;
  type?: FieldType;
  src: string;
}
export interface IMarkdownField extends IField {
  type: 'markdown';
}
export interface ICodeField extends IField {
  type: 'code';
  language: Language;
}
export interface ITestCodeField extends IField {
  name: string;
  type: 'test-code';
  language: Language;
  verified: boolean;
  createdBy: string;
}
export interface IMultipleChoiceOptionField extends IField {
  type: 'multiple-choice-option';
}

export type Solution = {
  id: string;
  grade: number;
  comment: string;
};

export interface ICodeSolution extends Solution {
  src: ICodeField;
}
export interface ITextSolution extends Solution {
  src: IMarkdownField;
}
export interface IMultipleChoiceSolution extends Solution {
  choice: number[];
}
export interface ICell {
  id: string;
  type?: CellType;
  description: IMarkdownField;
  metadata: Metadata;
  solutions: Map<string, Solution>;
}

export interface ICodeCell extends ICell {
  startingCode: ICodeField;
  solutionCode: ICodeField;
  testingCode: ITestCodeField[];
  type: 'code';
}
export interface ITextCell extends ICell {
  type: 'text';
}

export interface IMulitpleChoiceCell extends ICell {
  options: IMultipleChoiceOptionField[];
  solutionOptions: number[];
  type: 'multiple-choice';
}
export type FieldProperty = 'startingCode' | 'solutionCode' | 'description';
export type ArrayFieldProperty = 'testingCode';

export interface IArrayFieldSignaling {
  propertyName: ArrayFieldProperty;
  fields: IField[];
}
