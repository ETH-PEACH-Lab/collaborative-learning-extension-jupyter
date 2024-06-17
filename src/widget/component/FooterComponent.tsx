import CellFactoryService from '../../services/CellFactoryService';
import { CellType } from '../../types';
import { useSelector } from 'react-redux';
import { RootState, selectUserRole } from '../../state';
import React from 'react';

type FooterComponentProps = {
  addCell: (type: CellType) => void;
};
export default function FooterComponent(props: FooterComponentProps) {
  const isInstructor =
    useSelector((state: RootState) => selectUserRole(state)) === 'instructor';
  const cellButtons = CellFactoryService.instance
    .getFactoryNamings()
    .map(factory => (
      <button
        type="button"
        className="btn join-item grow"
        onClick={() => props.addCell(factory.id)}
      >
        {factory.name}
      </button>
    ));

  return (
    <>{isInstructor && <div className="join flex mt-2">{cellButtons}</div>}</>
  );
}
