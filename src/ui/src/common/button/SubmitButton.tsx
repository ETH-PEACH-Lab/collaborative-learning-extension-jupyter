import React from 'react';
import { RightAlignedToolbar } from '../toolbar';
import { BaseButton } from './BaseButton';

type SubmitButtonProps = {
  onSubmit: () => void;
  submitted?: boolean;
  showBadgeOnSubmitted?: boolean;
  finalized?: boolean;
  iconSubmit?: string;
  labelSubmit?: string;
  className?: string;
};
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onSubmit,
  submitted = false,
  showBadgeOnSubmitted = false,
  finalized = false,
  labelSubmit = 'Submit',
  iconSubmit,
  className = ''
}: SubmitButtonProps) => {
  return (
    <RightAlignedToolbar className={className}>
      {showBadgeOnSubmitted && submitted && (
        <span className="badge badge-success mr-4">Submitted</span>
      )}
      <BaseButton
        onClick={onSubmit}
        disabled={submitted || finalized}
        label={labelSubmit}
        icon={iconSubmit}
      />
    </RightAlignedToolbar>
  );
};
