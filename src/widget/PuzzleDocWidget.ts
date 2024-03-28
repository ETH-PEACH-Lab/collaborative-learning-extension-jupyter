import { DocumentWidget } from '@jupyterlab/docregistry';
import { PuzzleDocModel } from '../model/puzzleYDoc/PuzzleDocModel';
import { PuzzlePanel } from './PuzzlePanel';

export default class PuzzleDocWidget extends DocumentWidget<
  PuzzlePanel,
  PuzzleDocModel
> {
  constructor(options: DocumentWidget.IOptions<PuzzlePanel, PuzzleDocModel>) {
    console.log('creating puzzle doc widget');
    super(options);
  }

  dispose(): void {
    this.content.dispose();
    super.dispose();
  }
}
