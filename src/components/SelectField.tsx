import { memo } from 'react';
import { CustomSelect } from './CustomSelect';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; desc?: string }[];
}

export const SelectField = memo(function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <CustomSelect 
        value={value}
        onChange={onChange}
        options={options}
      />
    </div>
  );
});
