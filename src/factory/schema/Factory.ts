import * as Y from 'yjs';
export default abstract class Factory<T extends string> {
  public abstract get identifier(): T;
  protected toYMap(data: any) {
    return new Y.Map<any>(Object.entries(data));
  }
  protected toYArray(data: any[]): Y.Array<Y.Map<any>> {
    const yArray = new Y.Array<Y.Map<any>>();
    data.forEach(entry => yArray.push([this.toYMap(entry)]));
    return yArray;
  }
  public create() {
    return this.toYMap(this.createSpecific());
  }
  protected abstract createSpecific(): any;
}
