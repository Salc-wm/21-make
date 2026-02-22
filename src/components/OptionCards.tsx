import { memo } from 'react';

interface OptionCardsProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; desc?: string; preview?: string }[];
}

export const OptionCards = memo(function OptionCards({ label, value, onChange, options }: OptionCardsProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map(opt => (
          <button
            type="button"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`rounded-lg border px-3 py-2.5 text-left transition ${
              value === opt.value
                ? 'border-zinc-900 dark:border-zinc-300 bg-zinc-50 dark:bg-zinc-800 ring-1 ring-zinc-900 dark:ring-zinc-300'
                : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800'
            }`}
          >
            <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{opt.label}</div>
            {opt.desc && (
              <div className="mt-0.5 text-[10px] leading-tight text-zinc-500 dark:text-zinc-400">{opt.desc}</div>
            )}
            {opt.preview && (
              <div
                className="mt-1.5 h-4 w-8 border border-zinc-200 dark:border-zinc-600"
                style={{ borderRadius: opt.preview }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
});
