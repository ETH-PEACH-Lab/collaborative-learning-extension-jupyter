import CodeFieldFactory from '../factory/schema/fieldFactory/CodeFieldFactory';
import MarkdownFieldFactory from '../factory/schema/fieldFactory/MarkdownFieldFactory';
import MultipleChoiceOptionFieldFactory from '../factory/schema/fieldFactory/MultipleChoiceOptionFieldFactory';
import TestCodeFieldFactory from '../factory/schema/fieldFactory/TestCodeFieldFactory';
import FactorySerivce from './FactoryService';
import FieldFactory from '../factory/schema/fieldFactory/FieldFactory';
import { FieldType } from '../types/schemaTypes';

export default class FieldFactoryService extends FactorySerivce<
  FieldType,
  FieldFactory
> {
  private static _instance: FieldFactoryService = new FieldFactoryService();

  public static get instance(): FieldFactoryService {
    return this._instance;
  }

  private constructor() {
    super();
    this.factories.push(new CodeFieldFactory());
    this.factories.push(new MarkdownFieldFactory());
    this.factories.push(new MultipleChoiceOptionFieldFactory());
    this.factories.push(new TestCodeFieldFactory());
  }
}
