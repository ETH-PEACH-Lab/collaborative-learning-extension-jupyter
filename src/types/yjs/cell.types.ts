import { YObject } from './main.types';

export type CellType = 'text-cell' | 'code-cell' | 'multiple-choice-cell';

export interface ICell extends YObject {
  type: CellType;
  visible: boolean;
  descriptionId: string;
  studentSolutionIds: string[];
  showSolution: boolean;
  documentId?: string;
  [key: string]: any;
}

export interface ICodeCell extends ICell {
  startingCodeId: string;
  solutionCodeId: string;
  testingCodeIds: string[];
  type: 'code-cell';
}
export interface ITextCell extends ICell {
  type: 'text-cell';
  solutionId: string;
}

export interface IMultipleChoiceCell extends ICell {
  options: string[];
  solutionOptions: string[];
  type: 'multiple-choice-cell';
  multi: boolean;
  random: boolean;
}
