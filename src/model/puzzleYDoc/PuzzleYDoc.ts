import { DocumentChange, YDocument } from '@jupyter/ydoc';
import * as Y from 'yjs';
import {
  ArrayFieldProperty,
  IArrayFieldSignaling,
  CellType,
  FieldProperty,
  ICell,
  IField
} from '../../types/schemaTypes';
import { User } from '@jupyterlab/services';
import { KernelMessagerService } from '../../widget/kernel/KernelMessagerService';
import { IKernelTestVerified } from '../../types/kernelTypes';
import CellsMaintainer from './maintainer/CellsMaintainer';
import DocObserver from './observer/DocObserver';
import FieldMaintainer from './maintainer/FieldMaintainer';
import TestingCodeMaintainer from './maintainer/TestingCodeMaintainer';
import IDocObserver from './observer/IDocObsever';
import ArrayFieldMaintainer from './maintainer/ArrayFieldMaintainer';
import DocObserverableRegisterService from './observer/register/DocObserverableRegisterService';

export type PuzzleDocChange = {
  fieldChange?: IField;
  arrayFieldChanges?: IArrayFieldSignaling;
} & DocumentChange;

export class PuzzleYDoc extends YDocument<PuzzleDocChange> {
  constructor() {
    super();

    const cells = this.ydoc.getArray('cells') as Y.Array<Y.Map<any>>;
    this._cellsMaintainer = new CellsMaintainer(
      cells,
      this.transact.bind(this)
    );
    this._fieldMaintainer = new FieldMaintainer(this.transact.bind(this));
    this._arrayFieldMaintainer = [
      new TestingCodeMaintainer(this.transact.bind(this))
    ];

    const emitChanges = (change: PuzzleDocChange) => {
      console.debug('Change occured: ' + JSON.stringify(change));
      this._changed.emit(change);
    };
    this._docObserver = new DocObserver(emitChanges.bind(this));
    DocObserverableRegisterService.instance.registerCellYArrayFieldObserver("cells",(parentId,data)=><PuzzleDocChange>{arrayFieldChanges:{
      parentId:parentId,
      propertyName: "cells",
      fields: data
    }})
    this._docObserver.init(
      "cells",
      cells
    );
    KernelMessagerService.instance.verifiedTestSignal.connect(
      (_: any, value: IKernelTestVerified) => {
        this.getArrayFieldMaintainer<TestingCodeMaintainer>(
          'testingCode'
        ).setTestToVerified(
          this._cellsMaintainer.getCellAsYMapById(value.cellId),
          value.referenceId
        );
      }
    );
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
    this._docObserver.dispose();
  }

  static create(): PuzzleYDoc {
    return new PuzzleYDoc();
  }
  get cells(): ICell[] {
    return this._cellsMaintainer.cells;
  }

  deleteCell(value: ICell): void {
    this._cellsMaintainer.deleteCell(value);
  }
  addCell(type: CellType) {
    this._cellsMaintainer.addCell(type);
  }
  setField(cellId: string, property: FieldProperty, value: IField) {
    this._fieldMaintainer.setField(
      this._cellsMaintainer.getCellAsYMapById(cellId),
      property,
      value
    );
  }
  setArrayField(cellId: string, property: ArrayFieldProperty, value: IField) {
    this.getArrayFieldMaintainer(property).setField(
      this._cellsMaintainer.getCellAsYMapById(cellId),
      value
    );
  }
  removeArrayField(cellId:string, property: ArrayFieldProperty, id: string){
    this.getArrayFieldMaintainer(property).removeField(
      this._cellsMaintainer.getCellAsYMapById(cellId),
      id
    );
  }

  addTestCodeField(cellId: string, identity: User.IIdentity) {
    this.getArrayFieldMaintainer<TestingCodeMaintainer>(
      'testingCode'
    ).addTestCode(this._cellsMaintainer.getCellAsYMapById(cellId), identity);
  }

  setCells(cells: ICell[]): void {
    this._cellsMaintainer.setCells(cells);
  }
  private getArrayFieldMaintainer<T extends ArrayFieldMaintainer>(
    property: ArrayFieldProperty
  ) {
    return this._arrayFieldMaintainer.find(
      maintainer => maintainer.property === property
    ) as T;
  }
  private _cellsMaintainer: CellsMaintainer;
  private _fieldMaintainer: FieldMaintainer;
  private _arrayFieldMaintainer: ArrayFieldMaintainer[] = [];
  private _docObserver: IDocObserver;
}
