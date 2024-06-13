import React from 'react';

export type MultipleChoiceInstructorConfigItemProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};
export const MultipleChoiceInstructorConfigItem: React.FC<
  MultipleChoiceInstructorConfigItemProps
> = ({ label, value, onChange }: MultipleChoiceInstructorConfigItemProps) => {
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">{label}</span>
        <input
          type="checkbox"
          onChange={value => onChange(value.target.checked)}
          checked={value}
          className="checkbox checkbox-sm"
        />
      </label>
    </div>
  );
};
