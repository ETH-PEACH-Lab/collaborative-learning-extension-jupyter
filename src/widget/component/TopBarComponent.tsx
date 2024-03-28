import React, { useContext } from 'react';
import { IUserRoleContext, UserRoleContext } from '../context/userRoleContext';
export function TopBarComponent() {
  const { setInstructor } = useContext(UserRoleContext) as IUserRoleContext;
  return (
    <>
      <span className="puzzle-toolbar">
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
    </>
  );
}
