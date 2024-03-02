import { YDocument, DocumentChange } from '@jupyter/ydoc';

import { IChangedArgs } from '@jupyterlab/coreutils';

import { DocumentRegistry } from '@jupyterlab/docregistry';

import { PartialJSONValue } from '@lumino/coreutils';

import { ISignal, Signal } from '@lumino/signaling';

import * as Y from 'yjs';
import { Cell, CellType } from './cell_types';
import { CellFactory } from './factory/cell_factory';
import { CodeCellFactory } from './factory/code_cell_factory';
import { MarkdownCellFactory } from './factory/markdown_cell_factory';


/**
 * PuzzleDocModel: this Model represents the content of the file
 */
export class PuzzleDocModel implements DocumentRegistry.IModel {
  /**
   * Construct a new PuzzleDocModel.
   *
   * @param options The options used to create a puzzle doc model.
   */
  constructor(options: DocumentRegistry.IModelOptions<PuzzleDoc>) {
    const { collaborationEnabled, sharedModel } = options;
    this._collaborationEnabled = !!collaborationEnabled;
    if (sharedModel) {
      this.sharedModel = sharedModel;
    } else {
      this.sharedModel = PuzzleDoc.create();
    }

    // Listening for changes on the shared model to propagate them
    this.sharedModel.changed.connect(this._onSharedModelChanged);
  }

  /**
   * Whether the model is collaborative or not.
   */
  get collaborative(): boolean {
    return this._collaborationEnabled;
  }

  /**
   * The default kernel name of the document.
   *
   * #### Notes
   * Only used if a document has associated kernel.
   */
  readonly defaultKernelName = '';

  /**
   * The default kernel language of the document.
   *
   * #### Notes
   * Only used if a document has associated kernel.
   */
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
  readonly sharedModel: PuzzleDoc = PuzzleDoc.create();

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
    return this.sharedModel.get('cells');
  }
  set cells(v: Cell[]) {
    this.sharedModel.setCells(v);
  }
  set cell(v: Cell) {
    this.sharedModel.setCell(v);
  }

  addCell(cellType: CellType): void {
    this.sharedModel.addCell(cellType);
  }
  deleteCell(c: Cell): void {
    this.sharedModel.deleteCell(c);
  }

  /**
   * A signal emitted when the document content changes.
   *
   * ### Notes
   * The content refers to the data stored in the model
   */
  get contentChanged(): ISignal<this, void> {
    return this._contentChanged;
  }

  /**
   * A signal emitted when a cell changes.
   */
  get cellChanged(): ISignal<this, Cell> {
    return this._cellChanged;
  }
  /**
   * A signal emitted when the document state changes.
   *
   * ### Notes
   * The state refers to the metadata and attributes of the model.
   */
  get stateChanged(): ISignal<this, IChangedArgs<any>> {
    return this._stateChanged;
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
    const cells = this.sharedModel.get('cells');
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

  /**
   * Callback to listen for changes on the sharedModel. This callback listens
   * to changes on shared model's content and propagates them to the DocumentWidget.
   *
   * @param sender The sharedModel that triggers the changes.
   * @param changes The changes on the sharedModel.
   */
  private _onSharedModelChanged = (
    sender: PuzzleDoc,
    changes: PuzzleDocChange
  ): void => {
    if (changes.cellChanges) {
      this.triggerCellChanged(changes.cellChanges);
    }
    if(changes.contentChange){
      this.triggerContentChanged();
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
  private _collaborationEnabled: boolean;
  private _stateChanged = new Signal<this, IChangedArgs<any>>(this);
}
export type PuzzleDocChange = {
  cellChanges?: Cell;
  contentChange?: Boolean;
} & DocumentChange;

export class PuzzleDoc extends YDocument<PuzzleDocChange> {
  constructor() {
    super();
    this._cells = this.ydoc.getArray('cells');
    this._cells.observeDeep(this._cellsObserver);
    this._factories.push(new CodeCellFactory(),new MarkdownCellFactory())
  }

  readonly version: string = '1.0.0';

  /**
   * Dispose of the resources.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    super.dispose();
    this._cells.unobserveDeep(this._cellsObserver);
  }

  /**
   * Static method to create instances on the sharedModel
   *
   * @returns The sharedModel instance
   */
  static create(): PuzzleDoc {
    return new PuzzleDoc();
  }

  /**
   * Returns an the requested object.
   *
   * @param key The key of the object.
   * @returns The content
   */
  get(key: 'cells'): Cell[];
  get(key: string): any {
    const data = this._cells;
    return key === 'cells' ? (data ? data.toJSON() : []) : data ?? '';
  }

  deleteCell(value: Cell): void {
    const yCellIndex = this._getCellIndexById(value.id);
    if (yCellIndex === undefined) {
      return;
    }
    this._cells.delete(yCellIndex,1);
  }
  /**
   * Adds new data.
   *
   * @param key The key of the object.
   * @param value New object.
   */
  setCell(value: Cell): void {
    const yCell = this._getCellAsYMapById(value.id);
    if (yCell === undefined) {
      return;
    }
    this.transact(() => {
      Object.entries(value).forEach(value => {
        yCell?.set(value[0], value[1]);
      });
    });
  }
  addCell(type: CellType){
    this._factories.forEach(factory=>{
      if(factory.matchCellType(type))
        this._cells.push([new Y.Map<any>(Object.entries(factory.createCell()))]);
    })
  }
  setCells(cells: Cell[]): void {
    this.transact(() => {
      this._cells.delete(0, this._cells.length);
      const newYCells: Y.Map<any>[] = [];
      cells.forEach(cell => {
        newYCells.push(new Y.Map<any>(Object.entries(cell)));
      });
      this._cells.push(newYCells);
    });
  }
  private _cellsObserver = (events: Y.YEvent<any>[]): void => {
    events.forEach(event => {
      if (event.target.get('id') && event.target.get('cell_type')) {
        this._changed.emit(<PuzzleDocChange>{
          cellChanges: event.target.toJSON()
        });
      } else {
        event.delta.forEach(delta => {
          if (delta.insert !== undefined && delta.insert instanceof Array) {
            delta.insert.forEach(insert => {
              this._changed.emit(<PuzzleDocChange>{
                cellChanges: insert.toJSON()
              });
            });
          }
          else if(delta.delete){
            this._changed.emit(<PuzzleDocChange>{
              contentChange: true
            });
          }
        });
      }
    });
  };

  private _getCellAsYMapById(id: string): Y.Map<any> | undefined {
    for (const cell of this._cells) {
      if (cell.get('id') === id) {
        return cell;
      }
    }
    return undefined;
  }
  private _getCellIndexById(id: string): number | undefined {
    for(let i = 0; i < this._cells.length; i++){
      if(this._cells.get(i).get('id') === id){
        return i;
      }
    }
    return undefined;
  }
  private _factories: Array<CellFactory> = [];
  private _cells: Y.Array<Y.Map<any>>;
}
