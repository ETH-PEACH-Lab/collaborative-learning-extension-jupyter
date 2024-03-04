import { ISessionContext } from '@jupyterlab/apputils';
import { Cell, ICodeCell } from '../types/cell_types';
import { PuzzleYDoc } from './puzzle_ydoc';
import { IOutput } from '@jupyterlab/nbformat';
import { KernelMessage } from '@jupyterlab/services';
import { IOPubMessageType } from '@jupyterlab/services/lib/kernel/messages';
import { Signal } from '@lumino/signaling';
import { CellOutput } from '../types/output_types';

export class PuzzleKernelDoc extends PuzzleYDoc {
  constructor(sessionContext: ISessionContext | null) {
    super();
    this._sessionContext = sessionContext;
  }
  executeCell(cell: ICodeCell): void {
    if (!this._sessionContext || !this._sessionContext.session?.kernel) {
      return;
    }

    const future = this._sessionContext.session?.kernel?.requestExecute({
      code: cell.code
    });
    future.onIOPub = (msg: KernelMessage.IIOPubMessage<IOPubMessageType>) => {
      this._onIOPub(msg, cell);
    };
  }

  static create(session: ISessionContext | null): PuzzleKernelDoc {
    return new PuzzleKernelDoc(session);
  }

  private _onIOPub = (
    msg: KernelMessage.IIOPubMessage<IOPubMessageType>,
    cell: Cell
  ): void => {
    const msgType = msg.header.msg_type;
    const _output = msg.content as IOutput;
    switch (msgType) {
      case 'execute_result':
      case 'display_data':
      case 'error':
        console.log(_output);
        this._cellOutputChanged.emit({
          type: 'error',
          cell: cell,
          output: 'text'
        });
        break;
      case 'stream':
        console.log(_output);
        break;
      case 'update_display_data':
        console.log(_output);
        break;
      default:
        break;
    }
    return;
  };
  private _sessionContext: ISessionContext | null;
  private _cellOutputChanged: Signal<any, CellOutput> = new Signal<
    any,
    CellOutput
  >(this);
}
