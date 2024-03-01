import React from 'react';
import { ISignal } from '@lumino/signaling';
import { Cell, ICodeCell, IMarkdownCell } from '../../model';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PuzzleEditorComponent } from '../util/puzzle_editor_component';
type PuzzleCellComponentProps = {
  initCell: Cell;
  signal: ISignal<any, Cell>;
  onCellChanged: (c: Cell) => void;
};
type PuzzleCellComponentState = {
  cell: Cell;
};
export class PuzzleCellComponent extends React.Component<
  PuzzleCellComponentProps,
  PuzzleCellComponentState
> {
  componentDidMount() {
    this.setState({ cell: this.props.initCell });
    this.props.signal.connect(this._handleSignal.bind(this));
  }

  componentWillUnmount() {
    this.props.signal.disconnect(this._handleSignal.bind(this));
  }
  _handleSignal = (sender: any, value: Cell) => {
    this.setState({ cell: value });
  };
  render() {
    if (this.state?.cell.cell_type === 'code') {
      return (
        <PuzzleCodeCellComponent
          cell={this.state.cell}
          onChange={this.props.onCellChanged}
        />
      );
    }
    if (this.state?.cell.cell_type === 'markdown') {
      return <PuzzleMarkDownCellComponent cell={this.state.cell} />;
    }
  }
}

type PuzzleCodeCellComponentProps = {
  cell: ICodeCell;
  onChange: (c: Cell) => void;
};

class PuzzleCodeCellComponent extends React.Component<PuzzleCodeCellComponentProps> {
  render() {
    return (
      <PuzzleEditorComponent
        code={this.props.cell.code}
        language={this.props.cell.language}
        onCodeChange={this.onCodeChange.bind(this)}
      />
    );
  }
  onCodeChange(value: string) {
    this.props.cell.code = value;
    this.props.onChange(this.props.cell);
  }
}
type PuzzleMarkdownCellComponentProps = {
  cell: IMarkdownCell;
};
class PuzzleMarkDownCellComponent extends React.Component<PuzzleMarkdownCellComponentProps> {
  render() {
    return (
      <Markdown remarkPlugins={[remarkGfm]}>
        {this.props.cell.markdown}
      </Markdown>
    );
  }
}
