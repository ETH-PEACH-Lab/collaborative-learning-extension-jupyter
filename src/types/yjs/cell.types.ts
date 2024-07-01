import { YObject } from './main.types';

export type CellType = 'text-cell' | 'code-cell' | 'multiple-choice-cell';

export type Cell = ICell | ICodeCell | ITextCell | IMultipleChoiceCell;
export type CellMetadata = {
  showSolution: boolean;
  visible: boolean;
};
export interface ICell extends YObject {
  type: CellType;
  descriptionId: string;
  studentSolutionIds: string[];
  metadata: CellMetadata;
  documentId?: string;
}
export type TestingMode = 'tests' | 'one-test-required' | 'no-tests';

export type CodeCellMetadata = {
  testingMode: TestingMode;
} & CellMetadata;

export interface ICodeCell extends ICell {
  startingCodeId: string;
  solutionCodeId: string;
  testingCodeIds: string[];
  metadata: CodeCellMetadata;
  type: 'code-cell';
}
export interface ITextCell extends ICell {
  type: 'text-cell';
  solutionId: string;
}

export type MultipleChoiceCellMetadata = {
  multi: boolean;
  random: boolean;
} & CellMetadata;

export interface IMultipleChoiceCell extends ICell {
  options: string[];
  solutionOptions: string[];
  type: 'multiple-choice-cell';
  metadata: MultipleChoiceCellMetadata;
}
