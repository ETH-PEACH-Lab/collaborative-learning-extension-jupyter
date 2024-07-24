import CodeFieldFactory from '../factory/schema/fieldFactory/srcFieldFactory/CodeFieldFactory';
import MarkdownFieldFactory from '../factory/schema/fieldFactory/srcFieldFactory/MarkdownFieldFactory';
import MultipleChoiceItemFieldFactory from '../factory/schema/fieldFactory/srcFieldFactory/MultipleChoiceItemFieldFactory';
import TestCodeFieldFactory from '../factory/schema/fieldFactory/srcFieldFactory/TestCodeFieldFactory';
import FieldFactory from '../factory/schema/fieldFactory/FieldFactory';
import { FieldType } from '../types';
import { CodeSolutionFieldFactory } from '../factory/schema/fieldFactory/solutionFieldFactory/CodeSolutionFieldFactory';
import { MultipleChoiceSolutionFieldFactory } from '../factory/schema/fieldFactory/solutionFieldFactory/MultipleChoiceSolutionFieldFactory';
import TextSolutionFieldFactory from '../factory/schema/fieldFactory/solutionFieldFactory/TextSolutionFieldFactory';
import FactoryService from './FactoryService';

export default class FieldFactoryService extends FactoryService<
  FieldType,
  FieldFactory
> {
  private static _instance: FieldFactoryService = new FieldFactoryService();

  public static get instance(): FieldFactoryService {
    return this._instance;
  }

  private constructor() {
    super();
    this.factories.push(
      new CodeFieldFactory(),
      new MarkdownFieldFactory(),
      new MultipleChoiceItemFieldFactory(),
      new TestCodeFieldFactory()
    );
    this.factories.push(
      new CodeSolutionFieldFactory(),
      new MultipleChoiceSolutionFieldFactory(),
      new TextSolutionFieldFactory()
    );
  }
  create(type: FieldType, defaultSrc?: string) {
    return this.findFactory(type).create(defaultSrc);
  }
}
