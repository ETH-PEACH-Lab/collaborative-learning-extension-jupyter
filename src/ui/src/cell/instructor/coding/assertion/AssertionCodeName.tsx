import React from 'react';
type AssertionCodeNameProps = {
  name: string;
  onNameChange: (name: string) => void;
};
export const AssertionCodeName: React.FC<AssertionCodeNameProps> = ({
  name,
  onNameChange: onChangeName
}: AssertionCodeNameProps) => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        placeholder="Test name"
        className="input input-bordered input-sm w-full"
        value={name}
        onChange={event => onChangeName(event.target.value)}
      />
    </div>
  );
};
