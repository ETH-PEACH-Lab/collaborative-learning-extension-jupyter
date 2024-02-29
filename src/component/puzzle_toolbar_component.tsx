import React from 'react';
export type PuzzleToolbarComponentProps = {
  addCodeCell: () => void;
};
export class PuzzleToolbarComponent extends React.Component<PuzzleToolbarComponentProps> {
  render() {
    return <button onClick={this.props.addCodeCell}>Add Code Cell</button>;
  }
}
