import { RootObserver } from 'yjs-normalized';

export abstract class PuzzleRootObserver<T> extends RootObserver<T> {
  constructor(cells: any, onChange: () => void, documentIdentifier?: string) {
    super(cells, documentIdentifier);
    this._onChange = onChange;
  }
  protected _onChange: () => void;
}
