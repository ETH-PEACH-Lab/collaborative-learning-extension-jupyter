import { FieldType, YObject } from '../../types';
export default abstract class Factory<T extends string, P extends YObject> {
  public abstract get identifier(): T;

  public create(fieldCreation: (type: FieldType) => string): P {
    return this.createSpecific(fieldCreation);
  }
  protected abstract createSpecific(
    fieldCreation: (type: FieldType) => string
  ): P;
}
