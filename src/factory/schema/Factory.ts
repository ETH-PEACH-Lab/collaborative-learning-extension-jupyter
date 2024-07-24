export default abstract class Factory<T extends string> {
  public abstract get identifier(): T;
}
