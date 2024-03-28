import Factory from '../factory/schema/Factory';
import * as Y from 'yjs';
export default abstract class FactorySerivce<
  P extends string,
  T extends Factory<P>
> {
  protected factories: T[] = [];
  create(type: P): Y.Map<any> {
    return this.findFactory(type).create();
  }
  protected findFactory(type: P) {
    const factory = this.factories.find(factory => factory.identifier === type);
    if (factory !== undefined) {
      return factory;
    }
    throw Error('Factory for type: ' + type + ' was not found');
  }
}
