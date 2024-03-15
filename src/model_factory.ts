import { DocumentRegistry } from '@jupyterlab/docregistry';

import { Contents } from '@jupyterlab/services';
import { PuzzleDocModel } from './model/puzzle_doc_model';
import { ISessionContext } from '@jupyterlab/apputils';

export namespace PuzzleDocModelFactory {
  export interface IOptions {
    sessionContext: ISessionContext;
  }
}
/**
 * A Model factory to create new instances of PuzzleDocModel.
 */
export class PuzzleDocModelFactory
  implements DocumentRegistry.IModelFactory<PuzzleDocModel>
{
  constructor(options: PuzzleDocModelFactory.IOptions) {
    this._sessionContext = options.sessionContext;
  }
  /**
   * The name of the model.
   *
   * @returns The name
   */
  get name(): string {
    return 'puzzle-model';
  }

  /**
   * The content type of the file.
   *
   * @returns The content type
   */
  get contentType(): Contents.ContentType {
    return 'puzzledoc' as any;
  }

  /**
   * The format of the file.
   *
   * @returns the file format
   */
  get fileFormat(): Contents.FileFormat {
    return 'text';
  }

  readonly collaborative: boolean = true;

  /**
   * Get whether the model factory has been disposed.
   *
   * @returns disposed status
   */
  get isDisposed(): boolean {
    return this._disposed;
  }

  /**
   * Dispose the model factory.
   */
  dispose(): void {
    this._disposed = true;
  }

  /**
   * Get the preferred language given the path on the file.
   *
   * @param path path of the file represented by this document model
   * @returns The preferred language
   */
  preferredLanguage(path: string): string {
    return '';
  }

  /**
   * Create a new instance of PuzzleDocModel.
   *
   * @param languagePreference Language
   * @param modelDB Model database
   * @param isInitialized - Whether the model is initialized or not.
   * @param collaborationEnabled - Whether collaboration is enabled at the application level or not (default `false`).
   * @returns The model
   */
  createNew(options: PuzzleDocModel.IOptions): PuzzleDocModel {
    options.sessionContext = this._sessionContext;
    return new PuzzleDocModel(options);
  }

  private _disposed = false;
  private _sessionContext: ISessionContext;
}
