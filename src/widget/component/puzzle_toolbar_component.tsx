import { LabIcon, addIcon } from '@jupyterlab/ui-components';
import React, { useContext } from 'react';
import {
  IUserRoleContext,
  UserRoleContext
} from '../context/user_role_context';
export type PuzzleToolbarComponentProps = {
  addCell: () => void;
};
export function PuzzleToolbarComponent(props: PuzzleToolbarComponentProps) {
  const { isInstructor, setInstructor } = useContext(
    UserRoleContext
  ) as IUserRoleContext;
  return (
    <span className="puzzle-toolbar">
      {isInstructor && (
        <button
          type="button"
          className="btn btn-light btn-sm"
          onClick={props.addCell}
        >
          <LabIcon.resolveReact icon={addIcon} />
        </button>
      )}
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onChange={event => {
            setInstructor(event.target.checked);
          }}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Instructor
        </label>
      </div>
    </span>
  );
}
