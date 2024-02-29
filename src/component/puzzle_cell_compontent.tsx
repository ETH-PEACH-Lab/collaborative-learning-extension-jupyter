import React from "react";
import { Editor } from '@monaco-editor/react';
import { ISignal } from '@lumino/signaling';
import { Cell, CodeCell, MarkdownCell } from '../model';
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { editor } from "monaco-editor";
type PuzzleCellComponentProps = {
  initCell: Cell,
  signal: ISignal<any,Cell>
  onCellChanged: (c: Cell) => void;
};
type PuzzleCellComponentState = {
    cell: Cell
}
export class PuzzleCellComponent extends React.Component<PuzzleCellComponentProps,PuzzleCellComponentState> {
  componentDidMount() {
    this.setState({cell:this.props.initCell})
    this.props.signal.connect(this._handleSignal.bind(this))
  }

  componentWillUnmount() {
    this.props.signal.disconnect(this._handleSignal.bind(this));
  }
  _handleSignal = (sender:any, value:Cell) => {
    this.setState({ cell: value });
  };
  render() {
    if(this.state?.cell.cell_type === "code")
      return <PuzzleCodeCellComponent cell={this.state.cell} onChange={this.props.onCellChanged}/>
    if(this.state?.cell.cell_type === "markdown")
      return <PuzzleMarkDownCellComponent cell={this.state.cell} />
  }
}

type PuzzleCodeCellComponentProps = {
  cell: CodeCell;
  onChange: (c: Cell) => void;
}

class PuzzleCodeCellComponent extends React.Component<PuzzleCodeCellComponentProps>{
  private editor: editor.IStandaloneCodeEditor | null = null;
  render() {
    return <Editor defaultLanguage={this.props?.cell?.language} height={'auto'}
    options={{wrappingStrategy: "advanced", wordWrap: 'on', minimap:{ enabled:false}, scrollBeyondLastLine: false, overviewRulerLanes: 0}}
    value={this.props?.cell?.code} onChange={this.onCodeChange.bind(this)} theme="vs-dark" onMount={this.onEditorMount.bind(this)}/>
  }
  onCodeChange(value : string | undefined){
    if(value !== undefined){
      this.props.cell.code = value;
      this.props.onChange(this.props.cell);
    }
  }
  onEditorMount(editor: editor.IStandaloneCodeEditor){
    this.editor = editor;
    editor.onDidContentSizeChange( this.updateEditorHeight.bind(this));
    this.updateEditorHeight();
  }
  updateEditorHeight ():void{
    if(this.editor !== null){
      const container = this.editor.getDomNode();
      if (!container) {
        return
      }
      const contentHeight = Math.min(1000, this.editor.getContentHeight());
      container.style.width = `100%`;
      container.style.height = `${contentHeight}px`;
      this.editor.layout({width:container.getBoundingClientRect().width,height: contentHeight});
    }
  }
}
type PuzzleMarkdownCellComponentProps = {
  cell: MarkdownCell
}
class PuzzleMarkDownCellComponent extends React.Component<PuzzleMarkdownCellComponentProps>{
  render() {
    return <Markdown remarkPlugins={[remarkGfm]}>{this.props.cell.markdown}</Markdown>
  }
}