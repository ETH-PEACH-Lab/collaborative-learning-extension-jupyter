import React from 'react';
export type PuzzleToolbarComponentProps = {
  addCodeCell: () => void;
  addMarkdownCell: () => void;
};
export class PuzzleToolbarComponent extends React.Component<PuzzleToolbarComponentProps> {
  render() {
    return (
      <span>
        <button onClick={this.props.addCodeCell}>Add Code Cell</button>
        <button onClick={this.props.addMarkdownCell}>Add Markdown Cell</button>
      </span>
    );
  }
}
