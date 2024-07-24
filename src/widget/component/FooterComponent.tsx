import CellFactoryService from '../../services/CellFactoryService';
import { CellType, InstructorsGroupName } from '../../types';
import { useSelector } from 'react-redux';
import { RootState, selectGroups } from '../../state';
import React from 'react';

type FooterComponentProps = {
  addCell: (type: CellType) => void;
};
export default function FooterComponent(props: FooterComponentProps) {
  const isInstructor = useSelector((state: RootState) =>
    selectGroups(state)
  ).includes(InstructorsGroupName);
  const cellButtons = CellFactoryService.instance
    .getFactoryNamings()
    .map(factory => (
      <button
        type="button"
        className="btn join-item grow hover:bg-base-300 border-solid border-[1px] border-base-300"
        onClick={() => props.addCell(factory.id)}
      >
        {factory.name}
      </button>
    ));

  return (
    <>
      {isInstructor && (
        <div className="join flex my-4 mx-2 animate-fadein">{cellButtons}</div>
      )}
    </>
  );
}
