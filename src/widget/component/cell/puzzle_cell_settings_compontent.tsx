import { LabIcon, deleteIcon } from '@jupyterlab/ui-components';
import React, { useContext } from 'react';
import {
  IUserRoleContext,
  UserRoleContext
} from '../../context/user_role_context';

type PuzzleCellSettingsComponentProps = {
  onDelete: () => void;
};
export function PuzzleCellSettingsComponent(
  props: PuzzleCellSettingsComponentProps
) {
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
