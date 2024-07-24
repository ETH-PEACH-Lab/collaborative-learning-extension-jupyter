import React from 'react';
import {
  AssertionCodeNameToolbar,
  AssertionCodeNameToolbarProps
} from './AssertionCodeNameToolbar';
export type AssertionCodeNameProps = {
  name: string;
  editing?: boolean;
  success?: boolean;
  onNameChange: (name: string) => void;
  children: React.ReactNode;
};
export const AssertionCodeName: React.FC<AssertionCodeNameProps> & {
  Toolbar: React.FC<AssertionCodeNameToolbarProps>;
} = ({
  name,
  editing,
  success,
  onNameChange: onChangeName,
  children
}: AssertionCodeNameProps) => {
  const truncatedName = name.length > 30 ? name.substring(0, 20) + '...' : name;
  return (
    <div
      className={
        'collapse-title ' +
        (success === undefined ? '' : success ? 'bg-success' : 'bg-error')
      }
    >
      <div className="flex justify-between w-full">
        {editing ? (
          <input
            type="text"
            placeholder="Test name"
            className="input input-bordered input-sm z-10 mr-4"
            value={name}
            onChange={event => onChangeName(event.target.value)}
            onClick={event => event.stopPropagation()}
          />
        ) : (
          <>{truncatedName}</>
        )}
        <div className="z-10">{children}</div>
      </div>
    </div>
  );
};

AssertionCodeName.Toolbar = AssertionCodeNameToolbar;
