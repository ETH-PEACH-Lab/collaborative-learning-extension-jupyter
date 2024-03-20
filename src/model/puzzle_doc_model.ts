import { IChangedArgs } from '@jupyterlab/coreutils';

import { DocumentRegistry, IDocumentWidget } from '@jupyterlab/docregistry';

import { PartialJSONValue } from '@lumino/coreutils';

import { ISignal, Signal } from '@lumino/signaling';

import { Cell, Field } from '../types/cell_types';

import { PuzzleDocChange, PuzzleYDoc } from './puzzle_ydoc';
import { IDocumentManager } from '@jupyterlab/docmanager';

import { ReactWidget } from '@jupyterlab/ui-components';

type Position = {
  x: number;
  y: number;
};
export namespace PuzzleDocModel {
  export interface IOptions extends DocumentRegistry.IModelOptions<PuzzleYDoc> {
    docManager: IDocumentManager;
  }
}
/**
 * PuzzleDocModel: this Model represents the content of the file
 */
export class PuzzleDocModel implements DocumentRegistry.IModel {
  /**
   * Construct a new PuzzleDocModel.
   *
   * @param options The options used to create a puzzle doc model.
   */
  constructor(options: PuzzleDocModel.IOptions) {
    const { collaborationEnabled, sharedModel, docManager } = options;
    this._docManager = docManager;
    this._collaborationEnabled = !!collaborationEnabled;
    if (sharedModel) {
      this.sharedModel = sharedModel;
    } else {
      this.sharedModel = PuzzleYDoc.create();
    }

    this.sharedModel.changed.connect(this._onSharedModelChanged);
    this.sharedModel.awareness.on('change', this._onClientChanged);
  }

  get collaborative(): boolean {
    return this._collaborationEnabled;
  }

  readonly defaultKernelName = '';
  readonly defaultKernelLanguage = '';

  /**
   * The dirty state of the document.
   *
   * A document is dirty when its content differs from
   * the content saved on disk.
   */
  get dirty(): boolean {
    return this._dirty;
  }
  set dirty(newValue: boolean) {
    const oldValue = this._dirty;
    if (newValue === oldValue) {
      return;
    }
    this._dirty = newValue;
    this.triggerStateChange({
      name: 'dirty',
      oldValue,
      newValue
    });
  }

  /**
   * Whether the model is disposed.
   */
  get isDisposed(): boolean {
    return this._isDisposed;
  }

  /**
   * The read only state of the document.
   */
  get readOnly(): boolean {
    return this._readOnly;
  }
  set readOnly(newValue: boolean) {
    if (newValue === this._readOnly) {
      return;
    }
    const oldValue = this._readOnly;
    this._readOnly = newValue;
    this.triggerStateChange({ name: 'readOnly', oldValue, newValue });
  }

  /**
   * The shared document model.
   */
  readonly sharedModel: PuzzleYDoc = PuzzleYDoc.create();

  /**
   * The client ID from the document
   *
   * ### Notes
   * Each browser sharing the document will get an unique ID.
   * Its is defined per document not globally.
   */
  get clientId(): number {
    return this.sharedModel.awareness.clientID;
  }
  /**
   * Shared object content
   */
  get cells(): Cell[] {
    return this.sharedModel.getCells();
  }
  set cells(v: Cell[]) {
    this.sharedModel.setCells(v);
  }
  setCell(v: Cell) {
    this.sharedModel.setCell(v);
  }
  addCell(): void {
    this.sharedModel.addCell();
  }
  deleteCell(c: Cell): void {
    this.sharedModel.deleteCell(c);
  }

  get contentChanged(): ISignal<this, void> {
    return this._contentChanged;
  }
  get cellChanged(): ISignal<this, Cell> {
    return this._cellChanged;
  }
  get fieldChanged(): ISignal<this, Field> {
    return this._fieldChanged;
  }

  get stateChanged(): ISignal<this, IChangedArgs<any>> {
    return this._stateChanged;
  }

  get clientChanged(): ISignal<this, Map<number, any>> {
    return this._clientChanged;
  }

  loadSolution(): IDocumentWidget<ReactWidget> | undefined {
    const path = 'testfiles/output-support.puzzle';
    const documentWidget = this._docManager.open(
      path
    ) as IDocumentWidget<ReactWidget>;
    documentWidget.close();
    return documentWidget;
  }
  /**
   * Dispose of the resources held by the model.
   */
  dispose(): void {
    if (this._isDisposed) {
      return;
    }
    this._isDisposed = true;
    Signal.clearData(this);
  }

  /**
   * Should return the data that you need to store in disk as a string.
   * The context will call this method to get the file's content and save it
   * to disk
   *
   * @returns The data
   */
  toString(): string {
    const cells = this.sharedModel.getCells();
    const obj = {
      cells: cells ?? []
    };
    return JSON.stringify(obj, null, 2);
  }

  /**
   * The context will call this method when loading data from disk.
   * This method should implement the logic to parse the data and store it
   * on the datastore.
   *
   * @param data Serialized data
   */
  fromString(data: string): void {
    const obj = JSON.parse(data);
    this.sharedModel.transact(() => {
      this.sharedModel.setCells(obj.cells);
    });
  }

  /**
   * Serialize the model to JSON.
   *
   * #### Notes
   * This method is only used if a document model as format 'json', every other
   * document will load/save the data through toString/fromString.
   */
  toJSON(): PartialJSONValue {
    return JSON.parse(this.toString() || 'null');
  }

  /**
   * Deserialize the model from JSON.
   *
   * #### Notes
   * This method is only used if a document model as format 'json', every other
   * document will load/save the data through toString/fromString.
   */
  fromJSON(value: PartialJSONValue): void {
    this.fromString(JSON.stringify(value));
  }

  /**
   * Initialize the model with its current state.
   */
  initialize(): void {
    return;
  }
  /**
   * Sets the mouse's position of the client
   *
   * @param pos Mouse position
   */
  setCursor(pos: Position | null): void {
    // Adds the position of the mouse from the client to the shared state.
    this.sharedModel.awareness.setLocalStateField('mouse', pos);
  }
  /**
   * Trigger a state change signal.
   */
  protected triggerStateChange(args: IChangedArgs<any>): void {
    this._stateChanged.emit(args);
  }
  protected triggerContentChanged(): void {
    this._contentChanged.emit();
    this.dirty = true;
  }
  protected triggerCellChanged(cell: Cell): void {
    this._cellChanged.emit(cell);
    this.dirty = true;
  }
  protected triggerFieldChanged(field: Field): void {
    this._fieldChanged.emit(field);
    this.dirty = true;
  }
  /**
   * Callback to listen for changes on the sharedModel. This callback listens
   * to changes on the different clients sharing the document and propagates
   * them to the DocumentWidget.
   */
  private _onClientChanged = () => {
    const clients = this.sharedModel.awareness.getStates();
    this._clientChanged.emit(clients);
  };
  /**
   * Callback to listen for changes on the sharedModel. This callback listens
   * to changes on shared model's content and propagates them to the DocumentWidget.
   *
   * @param sender The sharedModel that triggers the changes.
   * @param changes The changes on the sharedModel.
   */
  private _onSharedModelChanged = (
    sender: PuzzleYDoc,
    changes: PuzzleDocChange
  ): void => {
    if (changes.cellChanges) {
      this.triggerCellChanged(changes.cellChanges);
    }
    if (changes.contentChange) {
      this.triggerContentChanged();
    }
    if (changes.fieldChange) {
      this.triggerFieldChanged(changes.fieldChange);
    }
    if (changes.stateChange) {
      changes.stateChange.forEach(value => {
        if (value.name === 'dirty') {
          // Setting `dirty` will trigger the state change.
          // We always set `dirty` because the shared model state
          // and the local attribute are synchronized one way shared model -> _dirty
          this.dirty = value.newValue;
        } else if (value.oldValue !== value.newValue) {
          this.triggerStateChange({
            newValue: undefined,
            oldValue: undefined,
            ...value
          });
        }
      });
    }
  };
  private _dirty = false;
  private _isDisposed = false;
  private _readOnly = false;

  private _contentChanged = new Signal<this, void>(this);
  private _cellChanged = new Signal<this, Cell>(this);
  private _fieldChanged = new Signal<this, Field>(this);
  private _collaborationEnabled: boolean;
  private _stateChanged = new Signal<this, IChangedArgs<any>>(this);
  private _clientChanged = new Signal<this, Map<number, any>>(this);

  private _docManager: IDocumentManager;
}
