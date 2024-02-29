import { YDocument, DocumentChange } from '@jupyter/ydoc';

import { IChangedArgs } from '@jupyterlab/coreutils';

import { DocumentRegistry } from '@jupyterlab/docregistry';

import { PartialJSONValue, UUID } from '@lumino/coreutils';

import { ISignal, Signal } from '@lumino/signaling';

import * as Y from 'yjs';

/**
 * Document structure
 */
export type SharedObject = {
  cells: Cell[]
};

export type Metadata = {
  id:string
}
type CellType = "markdown" | "code" | "single_choice";
type CellBase = {
  cell_type: CellType
  metadata: Metadata,
}
export interface CodeCell extends CellBase{
  cell_type: "code",
  code: string
  language: string
}
export interface MarkdownCell extends CellBase{
  cell_type: "markdown",
  markdown: string
}
export interface SingleChoiceCell extends CellBase{
  cell_type: "single_choice",
  choices: string[]
  correct: number
}
export type Cell = CodeCell | MarkdownCell | SingleChoiceCell
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
  set cell(v: Cell){
    this.sharedModel.setCell(v);
  }
  addCodeCell():void{
    this.sharedModel.addCodeCell();
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

  /**
   * Trigger a content changed signal.
   */
  protected triggerContentChange(): void {
    this._contentChanged.emit(void 0);
    this.dirty = true;
  }

  protected triggerCellChanged(cell: Cell):void{
    this._cellChanged.emit(cell)
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
    if(changes.cellChanges){
      this.triggerCellChanged(changes.cellChanges)
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
  } & DocumentChange;


export class PuzzleDoc extends YDocument<PuzzleDocChange> {
  constructor() {
    super();
    // Creating a new shared object and listen to its changes
    this._content = this.ydoc.getMap('content');
    this._content.observe(this._contentObserver);
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
    this._content.unobserve(this._contentObserver);
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
    const data = this._content.get(key);
    return key === 'cells'
      ? data
        ? JSON.parse(data)
        : []
      : data ?? '';
  }

  /**
   * Adds new data.
   *
   * @param key The key of the object.
   * @param value New object.
   */
  setCell(value: Cell): void{
    const tmp = this.get('cells');
    for(let i = 0; i < tmp.length;i++){
      if(tmp[i].metadata.id === value.metadata.id){
        tmp[i] = value
        this._content.set('working-cell', JSON.stringify(value));
      }
    }
    this._content.set('cells', JSON.stringify(tmp));
  }
  addCodeCell(): void{
    const tmp = this.get('cells');
    const newCell = <CodeCell>{metadata:{id: UUID.uuid4()},code:"",language:"TypeScript", cell_type:'code'};
    tmp.push(newCell);
    this._content.set('cells', JSON.stringify(tmp));
    this._content.set('working-cell',JSON.stringify(newCell));
  }
  setCells(value: Cell[]): void{
    this._content.set('cells', JSON.stringify(value));
  }
  private _contentObserver = (event: Y.YMapEvent<any>): void => {
      const changes: PuzzleDocChange = {};

      if (event.keysChanged.has('working-cell') && this._content.has('working-cell')) {
        changes.cellChanges = JSON.parse(this._content.get('working-cell'));
        this._content.delete('working-cell');
      }
  
      this._changed.emit(changes);
  };
  private _content: Y.Map<any>;
}