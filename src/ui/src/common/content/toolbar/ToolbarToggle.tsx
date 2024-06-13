import React from 'react';
type ToolbarToggleProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};
export const ToolbarToggle: React.FC<ToolbarToggleProps> = ({
  checked,
  label,
  onChange
}: ToolbarToggleProps) => {
  return (
    <div className="form-control bg-base-200 w-fit flex justify-center pl-2 pr-2 shadow-sm">
      <label className="label cursor-pointer p-0">
        <span className="label-text pr-2">{label}</span>
        <input
          type="checkbox"
          className="toggle toggle-xs"
          onChange={event => onChange(event.target.checked)}
          checked={checked}
        />
      </label>
    </div>
  );
};
