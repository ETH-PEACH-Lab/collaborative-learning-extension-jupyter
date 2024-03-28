import React, { useContext } from 'react';
import CellFactoryService from '../../services/CellFactoryService';
import { IUserRoleContext, UserRoleContext } from '../context/userRoleContext';
import { CellType } from '../../types/schemaTypes';
type FooterComponentProps = {
  addCell: (type: CellType) => void;
};
export default function FooterComponent(props: FooterComponentProps) {
  const { isInstructor } = useContext(UserRoleContext) as IUserRoleContext;
  const cellButtons = CellFactoryService.instance
    .getFactoryNamings()
    .map(factory => (
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => props.addCell(factory.id)}
      >
        {factory.name}
      </button>
    ));

  return (
    <>
      {isInstructor && (
        <div
          className="btn-group btn-group-justified puzzle-footer-btn-group"
          role="group"
          aria-label="Basic example"
        >
          {cellButtons}
        </div>
      )}
    </>
  );
}
