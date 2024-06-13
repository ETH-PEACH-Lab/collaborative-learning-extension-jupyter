import React from 'react';
import { RightAlignedToolbar } from '../toolbar';
import { BaseButton } from './BaseButton';

type SubmitButtonProps = {
  onSubmit: () => void;
  onUndo: () => void;
  submitted?: boolean;
  showBadgeOnSubmitted?: boolean;
  finalized?: boolean;
  iconSubmit?: string;
  iconUndoSubmit?: string;
  labelSubmit?: string;
  labelUndoSubmit?: string;
  className?: string;
};
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onSubmit,
  onUndo,
  submitted = false,
  showBadgeOnSubmitted = false,
  finalized = false,
  labelSubmit = 'Submit',
  labelUndoSubmit = 'Undo Submission',
  iconSubmit,
  iconUndoSubmit,
  className = ''
}: SubmitButtonProps) => {
  return (
    <RightAlignedToolbar className={className}>
      {showBadgeOnSubmitted && submitted && (
        <span className="badge badge-success mr-4">Submitted</span>
      )}
      <BaseButton
        onClick={onSubmit}
        disabled={submitted}
        label={labelSubmit}
        icon={iconSubmit}
      />
      {!finalized && (
        <BaseButton
          className="ml-4"
          onClick={onUndo}
          disabled={!submitted}
          label={labelUndoSubmit}
          icon={iconUndoSubmit}
        />
      )}
    </RightAlignedToolbar>
  );
};
