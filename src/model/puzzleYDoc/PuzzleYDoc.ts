import {
  ICell,
  IField,
  FieldType,
  CellType,
  ITestCodeField,
  IKernelTestVerified
} from '../../types';
import FieldsMaintainer from './maintainer/FieldMaintainer';
import CellsMaintainer from './maintainer/CellsMaintainer';
import { CellsObserver } from './observer/CellsObserver';
import { FieldsObserver } from './observer/FieldsObserver';
import FieldFactoryService from '../../services/FieldFactoryService';
import CellFactoryService from '../../services/CellFactoryService';
import { KernelMessengerService } from '../../widget/kernel/KernelMessengerService';
import { RootObserver } from 'yjs-normalized';
import { DocumentChange, YDocument } from '@jupyter/ydoc';

export type PuzzleDocChange = DocumentChange & {
  contentChanged: boolean;
};
export class PuzzleYDoc extends YDocument<PuzzleDocChange> {
  constructor() {
    super();
    const cells = this.ydoc.getMap('cells') as any;
    const fields = this.ydoc.getMap('fields') as any;

    this._cellsMaintainer = new CellsMaintainer(
      cells,
      this.transact.bind(this)
    );

    this._fieldsMaintainer = new FieldsMaintainer(
      fields,
      this.transact.bind(this)
    );
    this._cellsObserver = new CellsObserver(
      cells,
      this._onChange.bind(this),
      this.ydoc.guid
    );
    this._fieldsObserver = new FieldsObserver(
      fields,
      this._onChange.bind(this)
    );

    KernelMessengerService.instance.verifiedTestSignal.connect(
      (_, verification: IKernelTestVerified) => {
        const clone = this._fieldsMaintainer.getObjectAsJson(
          verification.referenceId
        ) as ITestCodeField;
        this._fieldsMaintainer.changeObject({
          ...clone,
          verified: true
        } as ITestCodeField);
      }
    );
    this.ydoc.on('update', (update: Uint8Array) => {
      console.debug('Received update: ', update);
    });
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
    this._fieldsObserver.dispose();
    this._cellsObserver.dispose();
  }

  static create(): PuzzleYDoc {
    return new PuzzleYDoc();
  }
  get cells(): ICell[] {
    return [];
  }
  addCell(identifier: CellType, createdBy: string): void {
    this.transact(() => {
      this._cellsMaintainer.addObject(
        CellFactoryService.instance.create(
          identifier,
          (type: FieldType, defaultSrc?: string) =>
            this._fieldCreation(type, createdBy, defaultSrc)
        )
      );
    });
  }
  deleteCell(id: string): void {
    this._cellsMaintainer.deleteObject(id, (_, value) => {
      this._fieldsMaintainer.deleteObject(value);
    });
  }
  changeCell(cell: ICell): void {
    delete cell.documentId;
    this._cellsMaintainer.changeObject(cell);
  }
  swapCellPosition(fromIndex: number, toIndex: number): void {
    this._cellsMaintainer.swapObjectPosition(fromIndex, toIndex);
  }
  changeField(field: IField): void {
    this._fieldsMaintainer.changeObject(field);
  }
  addFieldToPropertyArray(
    cellId: string,
    propertyName: string,
    fieldType: FieldType,
    createdBy: string
  ): void {
    this.transact(() => {
      this._cellsMaintainer.addToPropertyArray(
        cellId,
        propertyName,
        this._fieldCreation(fieldType, createdBy)
      );
    });
  }
  removeFieldFromPropertyArray(
    cellId: string,
    propertyName: string,
    fieldId: string
  ): void {
    this._cellsMaintainer.removeFromPropertyArray(
      cellId,
      propertyName,
      fieldId,
      () => {
        this._fieldsMaintainer.deleteObject(fieldId);
      }
    );
  }
  swapInPropertyArray(
    cellId: string,
    propertyName: string,
    fromIndex: number,
    toIndex: number
  ): void {
    this._cellsMaintainer.swapInPropertyArray(
      cellId,
      propertyName,
      fromIndex,
      toIndex
    );
  }
  private _fieldCreation(
    type: FieldType,
    createdBy: string,
    defaultSrc?: string
  ): string {
    const field = FieldFactoryService.instance.create(type, defaultSrc);
    field.createdBy = createdBy;
    this._fieldsMaintainer.addObject(field);
    return field.id;
  }
  private _onChange(): void {
    this._changed.emit({ contentChanged: true });
  }
  private _cellsMaintainer: CellsMaintainer;
  private _fieldsMaintainer: FieldsMaintainer;
  private _fieldsObserver: RootObserver<IField>;
  private _cellsObserver: RootObserver<ICell>;
}
