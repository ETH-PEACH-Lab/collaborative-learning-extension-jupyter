export default class Maintainer {
  constructor(transact: (fn: () => void) => void) {
    this._transact = transact;
  }
  protected _transact: (fn: () => void) => void;
}
