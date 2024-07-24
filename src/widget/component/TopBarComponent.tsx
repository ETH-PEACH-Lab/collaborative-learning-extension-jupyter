import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  selectGroups,
  setToInstructor,
  setToStudent
} from '../../state';
import { InstructorsGroupName } from '../../types';
type TopBarComponentProps = {
  hide: boolean;
};
export const TopBarComponent: React.FC<TopBarComponentProps> = ({ hide }) => {
  const isInstructor = useSelector((state: RootState) =>
    selectGroups(state)
  ).includes(InstructorsGroupName);
  const dispatch = useDispatch();

  return !hide ? (
    <div className="form-control items-end animate-fadein">
      <label className="label cursor-pointer">
        <span className="label-text mr-2">Instructor</span>
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          defaultChecked={isInstructor}
          onChange={event => {
            event.target.checked
              ? dispatch(setToInstructor())
              : dispatch(setToStudent());
          }}
        />
      </label>
    </div>
  ) : (
    <></>
  );
};
