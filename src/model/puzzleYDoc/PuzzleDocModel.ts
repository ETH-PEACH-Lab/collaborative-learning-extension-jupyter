import { IChangedArgs } from '@jupyterlab/coreutils';

import { DocumentRegistry } from '@jupyterlab/docregistry';

import { PartialJSONValue } from '@lumino/coreutils';

import { ISignal, Signal } from '@lumino/signaling';

import { IField, CellType, ICell, FieldType } from '../../types';

import { PuzzleYDoc } from './PuzzleYDoc';
import { IDocumentManager } from '@jupyterlab/docmanager';

import { User } from '@jupyterlab/services';
import { DocumentChange } from '@jupyter/ydoc';
import { setIdentity, store } from '../../state';
export namespace PuzzleDocModel {
  export interface IOptions extends DocumentRegistry.IModelOptions<PuzzleYDoc> {
    docManager: IDocumentManager;
    identity: User.IIdentity | null;
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
    const { collaborationEnabled, sharedModel, identity } = options;
    this._identity = identity;
    store.dispatch(setIdentity(identity));
    this._collaborationEnabled = !!collaborationEnabled;
    if (sharedModel) {
      this.sharedModel = sharedModel;
    } else {
      this.sharedModel = PuzzleYDoc.create();
    }
    this.sharedModel.changed.connect(this._onSharedModelChanged);
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

  get docId(): string {
    return this.sharedModel.ydoc.guid;
  }

  addCell(type: CellType): void {
    this.sharedModel.addCell(type, this._identity?.username ?? '');
  }
  changeField(field: IField) {
    this.sharedModel.changeField(field);
  }
  deleteCell(id: string): void {
    this.sharedModel.deleteCell(id);
  }
  changeCell(cell: ICell): void {
    this.sharedModel.changeCell(cell);
  }
  swapCellPosition(fromIndex: number, toIndex: number): void {
    this.sharedModel.swapCellPosition(fromIndex, toIndex);
  }
  addFieldToPropertyArray(
    cellId: string,
    propertyName: string,
    fieldType: FieldType
  ): void {
    this.sharedModel.addFieldToPropertyArray(
      cellId,
      propertyName,
      fieldType,
      this._identity?.username ?? ''
    );
  }
  removeFieldFromPropertyArray(
    cellId: string,
    propertyName: string,
    id: string
  ): void {
    this.sharedModel.removeFieldFromPropertyArray(cellId, propertyName, id);
  }
  swapInPropertyArray(
    cellId: string,
    propertyName: string,
    fromIndex: number,
    toIndex: number
  ): void {
    this.sharedModel.swapInPropertyArray(
      cellId,
      propertyName,
      fromIndex,
      toIndex
    );
  }
  getIdentity(): User.IIdentity | null {
    return this._identity;
  }

  get stateChanged(): ISignal<this, IChangedArgs<any>> {
    return this._stateChanged;
  }

  dispose(): void {
    if (this._isDisposed) {
      return;
    }
    this._isDisposed = true;
    Signal.clearData(this);
  }

  toString(): string {
    const cells = this.sharedModel.cells;
    const obj = {
      cells: cells ?? []
    };
    return JSON.stringify(obj, null, 2);
  }

  fromString(_: string): void {}

  toJSON(): PartialJSONValue {
    return JSON.parse(this.toString() || 'null');
  }

  fromJSON(value: PartialJSONValue): void {
    this.fromString(JSON.stringify(value));
  }

  initialize(): void {
    return;
  }
  private _onSharedModelChanged = (
    _: PuzzleYDoc,
    changes: DocumentChange
  ): void => {
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
  /**
   * Trigger a state change signal.
   */
  protected triggerStateChange(args: IChangedArgs<any>): void {
    this._stateChanged.emit(args);
  }

  private _dirty = false;
  private _isDisposed = false;
  private _readOnly = false;
  private _collaborationEnabled: boolean;

  private _stateChanged = new Signal<this, IChangedArgs<any>>(this);
  contentChanged: ISignal<this, void> = new Signal<this, void>(this);
  private _identity: User.IIdentity | null;
}
