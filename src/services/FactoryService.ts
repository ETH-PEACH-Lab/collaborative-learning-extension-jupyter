import Factory from '../factory/schema/Factory';

export default abstract class FactoryService<
  P extends string,
  T extends Factory<P>
> {
  protected factories: T[] = [];

  protected findFactory(type: P) {
    const factory = this.factories.find(factory => factory.identifier === type);
    if (factory !== undefined) {
      return factory;
    }
    throw Error('Factory for type: ' + type + ' was not found');
  }
}
