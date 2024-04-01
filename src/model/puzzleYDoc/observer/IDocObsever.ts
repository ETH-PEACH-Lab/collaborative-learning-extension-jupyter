import * as Y from 'yjs';
export default interface IDocObserver {
  dispose(): void;
  init(propertyName: string, data: Y.Array<Y.Map<any>>): void;
}
