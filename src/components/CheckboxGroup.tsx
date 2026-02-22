import { memo } from 'react';

interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: number;
}

export const CheckboxGroup = memo(function CheckboxGroup({ label, options, selected, onChange, columns = 2 }: CheckboxGroupProps) {
  const toggleItem = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(s => s !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const gridClass = columns === 3
    ? 'grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid grid-cols-1 gap-2 sm:grid-cols-2';

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <div className={gridClass}>
        {options.map(opt => (
          <button
            type="button"
            key={opt.value}
            onClick={() => toggleItem(opt.value)}
            className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition ${
              selected.includes(opt.value)
                ? 'border-zinc-900 dark:border-zinc-300 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 hover:bg-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800'
            }`}
          >
            <div
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                selected.includes(opt.value)
                  ? 'border-zinc-900 bg-zinc-900 dark:border-zinc-300 dark:bg-zinc-300'
                  : 'border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800'
              }`}
            >
              {selected.includes(opt.value) && (
                <svg className="h-3 w-3 text-white dark:text-zinc-900" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="text-xs leading-tight">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
});
