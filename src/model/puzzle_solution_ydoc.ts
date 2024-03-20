import { DocumentChange, YDocument } from '@jupyter/ydoc';
import { Solution } from '../types/cell_types';

export type PuzzleSolutionDocChange = {
  contentChange?: Solution;
} & DocumentChange;

export class PuzzleSolutionYDoc extends YDocument<PuzzleSolutionDocChange> {
  constructor() {
    super();
  }
  readonly version: string = '1.0.0';

  static create(): PuzzleSolutionYDoc {
    return new PuzzleSolutionYDoc();
  }
}
