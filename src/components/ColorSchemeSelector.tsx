import { colorSchemes } from '../data/options/options';

interface ColorSchemeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  primaryColor: string;
  onPrimaryColorChange: (color: string) => void;
}

export function ColorSchemeSelector({ value, onChange, primaryColor, onPrimaryColorChange }: ColorSchemeSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
        Paleta de Cores
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {colorSchemes.map(scheme => (
          <button
            type="button"
            key={scheme.value}
            onClick={() => onChange(scheme.value)}
            className={`rounded-lg border p-3 text-left transition ${
              value === scheme.value
                ? 'border-zinc-900 dark:border-zinc-300 bg-zinc-50 dark:bg-zinc-800 ring-1 ring-zinc-900 dark:ring-zinc-300'
                : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800'
            }`}
          >
            <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{scheme.label}</div>
            {scheme.colors.length > 0 && (
              <div className="mt-2 flex gap-1">
                {scheme.colors.map((color, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 rounded-full border border-zinc-200 dark:border-zinc-600"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
            {scheme.value === 'custom' && (
              <div className="mt-2 text-[10px] text-zinc-500 dark:text-zinc-400">Definir cor</div>
            )}
          </button>
        ))}
      </div>
      {value === 'custom' && (
        <div className="mt-3 flex items-center gap-3">
          <label className="text-xs text-zinc-600 dark:text-zinc-400">Cor Primária:</label>
          <input
            type="color"
            value={primaryColor}
            onChange={e => onPrimaryColorChange(e.target.value)}
            className="h-8 w-12 cursor-pointer rounded border border-zinc-300 dark:border-zinc-600"
          />
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{primaryColor}</span>
        </div>
      )}
    </div>
  );
}
