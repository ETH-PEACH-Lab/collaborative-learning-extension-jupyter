import { IChangedArgs } from '@jupyterlab/coreutils';

import { DocumentRegistry, IDocumentWidget } from '@jupyterlab/docregistry';

import { PartialJSONValue } from '@lumino/coreutils';

import { ISignal, Signal } from '@lumino/signaling';

import {
  ICell,
  IField,
  ITestCodeField,
  CellType,
  FieldProperty,
  ArrayFieldProperty,
  IArrayFieldSignaling
} from '../../types/schemaTypes';

import { PuzzleDocChange, PuzzleYDoc } from './PuzzleYDoc';
import { IDocumentManager } from '@jupyterlab/docmanager';

import { ReactWidget } from '@jupyterlab/ui-components';
import { User } from '@jupyterlab/services';

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
    const { collaborationEnabled, sharedModel, docManager, identity } = options;
    this._docManager = docManager;
    this._identity = identity;
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
  get cells(): ICell[] {
    return this.sharedModel.cells;
  }
  set cells(v: ICell[]) {
    this.sharedModel.setCells(v);
  }
  addCell(type: CellType): void {
    this.sharedModel.addCell(type);
  }
  setField(cellId: string, propertyName: FieldProperty, field: IField) {
    this.sharedModel.setField(cellId, propertyName, field);
  }
  removeArrayField(cellId: string, propertyName: ArrayFieldProperty, id: string) {
    this.sharedModel.removeArrayField(cellId, propertyName, id);
  }
  setArrayField(
    cellId: string,
    propertyName: ArrayFieldProperty,
    field: ITestCodeField
  ) {
    this.sharedModel.setArrayField(cellId, propertyName, field);
  }
  deleteCell(c: ICell): void {
    this.sharedModel.deleteCell(c);
  }
  addTestCode(cellId: string): void {
    if (!this._identity) {
      return;
    }
    this.sharedModel.addTestCodeField(cellId, this._identity);
  }
  getIdentity(): User.IIdentity | null {
    return this._identity;
  }

  get contentChanged(): ISignal<this, void> {
    return this._contentChanged;
  }
  get arrayFieldChanged(): ISignal<this, IArrayFieldSignaling> {
    return this._arrayFieldChanged;
  }
  get fieldChanged(): ISignal<this, IField> {
    return this._fieldChanged;
  }

  get stateChanged(): ISignal<this, IChangedArgs<any>> {
    return this._stateChanged;
  }

  loadSolution(): IDocumentWidget<ReactWidget> | undefined {
    const path = 'testfiles/output-support.puzzle';
    const documentWidget = this._docManager.open(
      path
    ) as IDocumentWidget<ReactWidget>;
    documentWidget.close();
    return documentWidget;
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

  fromString(data: string): void {
    const obj = JSON.parse(data);
    this.sharedModel.transact(() => {
      this.sharedModel.setCells(obj.cells);
    });
  }

  toJSON(): PartialJSONValue {
    return JSON.parse(this.toString() || 'null');
  }

  fromJSON(value: PartialJSONValue): void {
    this.fromString(JSON.stringify(value));
  }

  initialize(): void {
    return;
  }
  /**
   * Trigger a state change signal.
   */
  protected triggerStateChange(args: IChangedArgs<any>): void {
    this._stateChanged.emit(args);
  }
  protected triggerArrayFieldChanged(arrayField: IArrayFieldSignaling): void {
    this._arrayFieldChanged.emit(arrayField);
    this.dirty = true;
  }
  protected triggerFieldChanged(field: IField): void {
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
    if (!changes.stateChange) {
      this._contentChanged.emit();
    }
    if (changes.fieldChange) {
      this.triggerFieldChanged(changes.fieldChange);
    }
    if (changes.arrayFieldChanges) {
      this.triggerArrayFieldChanged(changes.arrayFieldChanges);
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
  private _arrayFieldChanged = new Signal<this, IArrayFieldSignaling>(this);
  private _fieldChanged = new Signal<this, IField>(this);
  private _collaborationEnabled: boolean;
  private _stateChanged = new Signal<this, IChangedArgs<any>>(this);
  private _clientChanged = new Signal<this, Map<number, any>>(this);

  private _docManager: IDocumentManager;
  private _identity: User.IIdentity | null;
}
