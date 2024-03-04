import React from 'react';

type PuzzleCellSettingsComponentProps = {
  onDelete: () => void;
};
export class PuzzleCellSettingsComponent extends React.Component<PuzzleCellSettingsComponentProps> {
  render(): React.ReactNode {
    return <button onClick={this.props.onDelete}>Delete</button>;
  }
}
