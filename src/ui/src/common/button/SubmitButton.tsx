import React, { useId } from 'react';
import { ToolbarButton } from '../content';
import { submitIcon } from '../../icon';

type SubmitButtonProps = {
  onSubmit: () => void;
  submitted?: boolean;
  showBadgeOnSubmitted?: boolean;
  finalized?: boolean;
  labelSubmit?: string;
  className?: string;
};
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onSubmit,
  submitted = false,
  showBadgeOnSubmitted = false,
  finalized = false,
  labelSubmit = 'Submit'
}: SubmitButtonProps) => {
  const id = useId();
  return (
    <>
      {showBadgeOnSubmitted && submitted && (
        <span className="badge badge-success mr-4">Submitted</span>
      )}
      <ToolbarButton
        icon={submitIcon.svgstr}
        onClick={() =>
          (
            document.getElementById('modal-' + id) as HTMLDialogElement
          ).showModal()
        }
        disabled={submitted || finalized}
        label={labelSubmit}
      />
      <dialog id={'modal-' + id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Submission</h3>
          <p className="pt-4">Are you sure you want to submit your solution?</p>
          <p className="py-4">
            Once you submit, you will not be able to make any changes to your
            solution.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-2" type="submit" onClick={onSubmit}>
                Submit
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
