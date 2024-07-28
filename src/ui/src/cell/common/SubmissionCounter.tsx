import React from 'react';
type SubmissionCounterProps = {
  counter: number;
  total: number;
};
export const SubmissionCounter: React.FC<SubmissionCounterProps> = ({
  counter,
  total
}) => {
  return (
    <div className="absolute left-4 top-4 badge badge-success rounded-sm">
      Submissions: {counter} / {total}
    </div>
  );
};
