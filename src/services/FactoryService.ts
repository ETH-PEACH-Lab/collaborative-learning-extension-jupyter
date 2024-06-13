import Factory from '../factory/schema/Factory';
import { FieldType, YObject } from '../types';

export default abstract class FactoryService<
  P extends string,
  Q extends YObject,
  T extends Factory<P, Q>
> {
  protected factories: T[] = [];
  create(type: P, fieldCreation: (type: FieldType) => string): Q {
    return this.findFactory(type).create(fieldCreation);
  }
  protected findFactory(type: P) {
    const factory = this.factories.find(factory => factory.identifier === type);
    if (factory !== undefined) {
      return factory;
    }
    throw Error('Factory for type: ' + type + ' was not found');
  }
}
