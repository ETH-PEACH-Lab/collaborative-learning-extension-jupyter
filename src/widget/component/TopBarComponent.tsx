import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  selectUserRole,
  setToInstructor,
  setToStudent
} from '../../state';
export const TopBarComponent: React.FC<unknown> = () => {
  const userRole = useSelector((state: RootState) => selectUserRole(state));
  const dispatch = useDispatch();

  return (
    <div className="form-control items-end">
      <label className="label cursor-pointer">
        <span className="label-text mr-2">Instructor</span>
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          defaultChecked={userRole === 'instructor'}
          onChange={event => {
            event.target.checked
              ? dispatch(setToInstructor())
              : dispatch(setToStudent());
          }}
        />
      </label>
    </div>
  );
};
