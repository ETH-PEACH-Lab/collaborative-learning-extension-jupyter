import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { IMarkdownCell } from '../../../../types/cell_types';

type PuzzleMarkdownCellComponentProps = {
  cell: IMarkdownCell;
};
export class PuzzleMarkDownCellComponent extends React.Component<PuzzleMarkdownCellComponentProps> {
  render() {
    return (
      <Markdown remarkPlugins={[remarkGfm]}>
        {this.props.cell.markdown}
      </Markdown>
    );
  }
}
