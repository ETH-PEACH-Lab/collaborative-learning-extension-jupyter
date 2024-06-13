import React from 'react';

type CellFooterActionBarProps = {
  hide: boolean;
  addCell: (type: string) => void;
  types: { type: string; name: string }[];
};
export const CellFooterActionBar: React.FC<CellFooterActionBarProps> = ({
  hide,
  types,
  addCell
}: CellFooterActionBarProps) => {
  const cellButtons = types.map(entry => (
    <button
      type="button"
      className="btn join-item grow"
      onClick={() => addCell(entry.type)}
    >
      {entry.name}
    </button>
  ));

  return <>{!hide && <div className="join flex">{cellButtons}</div>}</>;
};
