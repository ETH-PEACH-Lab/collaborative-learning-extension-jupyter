import { LabIcon, deleteIcon } from '@jupyterlab/ui-components';
import React, { useContext } from 'react';
import {
  IUserRoleContext,
  UserRoleContext
} from '../../context/userRoleContext';

type CellSettingsComponentProps = {
  onDelete: () => void;
};
export function CellSettingsComponent(props: CellSettingsComponentProps) {
  const { isInstructor } = useContext(UserRoleContext) as IUserRoleContext;
  return (
    <>
      {isInstructor && (
        <button className="btn btn-light btn-sm" onClick={props.onDelete}>
          <LabIcon.resolveReact icon={deleteIcon} />
        </button>
      )}
    </>
  );
}
