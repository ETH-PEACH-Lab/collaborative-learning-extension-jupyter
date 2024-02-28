
import { DocumentRegistry, DocumentWidget } from '@jupyterlab/docregistry';

import { ISignal, Signal } from '@lumino/signaling';
import { Cell, PuzzleDocModel } from './model';

import * as React from 'react';
import { Editor } from '@monaco-editor/react';
import { ReactWidget } from '@jupyterlab/apputils';
import { Message } from '@lumino/messaging';

export class PuzzleDocWidget extends DocumentWidget<
  PuzzlePanel,
  PuzzleDocModel
> {
  constructor(options: DocumentWidget.IOptions<PuzzlePanel, PuzzleDocModel>) {
    console.log('creating puzzle doc widget')
    super(options);
  }
  
  dispose(): void {
    this.content.dispose();
    super.dispose();
  }
}
type PuzzleComponentProps = {
  initCell: Cell,
  signal: ISignal<any,Cell>
  onCellChanged: CallableFunction;
};
type PuzzleComponentState = {
  cell: Cell
}
class PuzzleComponent extends React.Component<PuzzleComponentProps,PuzzleComponentState> {
  componentDidMount() {
    this.setState({cell:this.props.initCell})
    if(this.props.signal.connect(this._handleSignal.bind(this))){
      console.log("connection established")
    }
    else{
      console.log("connection could not been established")
    }
  }

  componentWillUnmount() {
    this.props.signal.disconnect(this._handleSignal.bind(this));
  }
  _handleSignal = (sender:any, value:Cell) => {
    console.log(value);
    this.setState({ cell: value });
  };
  render() {
    return (<div>
              <p>{this.state?.cell?.code}</p>
            <Editor height="90vh" defaultLanguage="javascript" value={this.state?.cell?.code} onChange={this.onChange.bind(this)}/>
                          </div>)
  }
  onChange(value: string | undefined){
    if(value !== undefined){
      let tmp = this.state.cell;
      tmp.code=value;
      this.props.onCellChanged(this.state.cell);
    }
  }
}
/**
 * Widget that contains the main view of the PuzzleWidget.
 */
export class PuzzlePanel extends ReactWidget {
  private _signal: Signal<PuzzlePanel, Cell> =new Signal<PuzzlePanel, Cell>(this)
  protected render() {
    return <PuzzleComponent signal={this._signal} initCell={this._model.cells[0]} onCellChanged={this.onCellChanged.bind(this)}/>;
  }
  /**
   * Construct a `PuzzlePanel`.
   *
   * @param context - The puzzle context.
   */
  constructor(context: DocumentRegistry.IContext<PuzzleDocModel>) {
    super();
    this._model = context.model;
    this._cellSignals = new Map<string, Signal<PuzzlePanel,Cell>>();

    context.ready.then(value => {
      this._model.contentChanged.connect(this._onContentChanged);

      this._onContentChanged();

      this.update();
    });
    this._onContentChanged();
  }

  onCellChanged(value: Cell):void{
    console.log(value);
    this._model.cells = [value];
  }
  protected onAfterShow(msg: Message): void {
      console.log("afterShow");
  }
  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this._model.contentChanged.disconnect(this._onContentChanged);
    Signal.clearData(this);
    super.dispose();
  }

  private _onContentChanged = (): void => {
    let self = this;
    console.log(self._model.cells[0].code);
    self._signal.emit(self._model.cells[0])
  };

  //@ts-ignore
  private _onCellChanged = (
    sender: PuzzleDocModel,
    cellIdentifier: string
  ): void => {
    this._model.cells.forEach(element => {
      if(element.id===cellIdentifier){
        this._cellSignals.get(cellIdentifier)?.emit(element)
      }
    });
  };
  private _cellSignals: Map<string, Signal<PuzzlePanel,Cell>>;
  private _model: PuzzleDocModel;
}