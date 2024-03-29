import * as Y from 'yjs';
import { PuzzleDocChange } from '../PuzzleYDoc';
export default interface IDocObserver {
  dispose(): void;
  init(
    propertyName: string,
    arrayChange: (parentId: string, data: any[]) => PuzzleDocChange,
    data: Y.Array<Y.Map<any>>
  ): void;
}
