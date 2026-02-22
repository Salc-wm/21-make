import { useState } from 'react';
import { Sparkles, ChevronRight, Search, X, Package } from 'lucide-react';
import { automationPrePrompts, automationPrePromptCategories, applyAutomationPrePrompt } from '../data/prePrompts/automationPrePrompts';
import type { AutomationPrePrompt } from '../data/prePrompts/automationPrePrompts';
import type { AutomationPromptConfig } from '../automationTypes';

interface AutomationPrePromptPanelProps {
  onApply: (config: AutomationPromptConfig) => void;
}

export function AutomationPrePromptPanel({ onApply }: AutomationPrePromptPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const filtered = automationPrePrompts.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = search === '' ||
      p.label.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApply = (prePrompt: AutomationPrePrompt) => {
    if (confirmingId === prePrompt.id) {
      const newConfig = applyAutomationPrePrompt(prePrompt);
      onApply(newConfig);
      setIsOpen(false);
      setConfirmingId(null);
      setSearch('');
      setSelectedCategory('all');
    } else {
      setConfirmingId(prePrompt.id);
      // Auto-reset the confirmation after 5 seconds
      setTimeout(() => setConfirmingId(prev => prev === prePrompt.id ? null : prev), 5000);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 rounded-xl border border-dashed border-sky-300 dark:border-sky-600/50 bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-900/10 dark:to-indigo-900/10 px-4 py-3 text-sm font-medium text-sky-800 dark:text-sky-300 transition-all hover:border-sky-400 hover:shadow-sm hover:shadow-sky-100 dark:hover:border-sky-500 dark:hover:shadow-sky-900/20 w-full justify-center"
      >
        <Package className="h-4 w-4 text-sky-500 transition-transform group-hover:scale-110" />
        <span>Usar Pre&#8209;Prompt de Automação</span>
        <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-60 transition-transform group-hover:translate-x-0.5" />
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg animate-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-4 py-3 bg-gradient-to-r from-sky-50/80 to-indigo-50/80 dark:from-sky-900/10 dark:to-indigo-900/10 rounded-t-xl">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-sky-500" />
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Automation Templates</span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">— templates prontos</span>
        </div>
        <button
          onClick={() => { setIsOpen(false); setConfirmingId(null); setSearch(''); }}
          className="flex items-center justify-center rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 pb-2 z-20 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar automações..."
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 pl-9 pr-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 dark:focus:border-zinc-500"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="px-4 pb-2 flex flex-wrap gap-1.5 z-20 relative">
        {automationPrePromptCategories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition ${
              selectedCategory === cat.value
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="max-h-[340px] overflow-y-auto px-4 pb-4 space-y-2 scrollbar-thin z-10 relative">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-8 text-zinc-400 dark:text-zinc-500">
            <Search className="h-6 w-6 mb-2 opacity-40" />
            <span className="text-xs">Nenhum template encontrado</span>
          </div>
        )}
        {filtered.map(pp => {
          const isConfirming = confirmingId === pp.id;
          return (
            <button
              key={pp.id}
              onClick={() => handleApply(pp)}
              className={`group w-full text-left rounded-lg border p-3 transition-all ${
                isConfirming
                  ? 'border-sky-400 dark:border-sky-500 bg-sky-50 dark:bg-sky-900/20 ring-1 ring-sky-400 dark:ring-sky-500'
                  : 'border-zinc-150 dark:border-zinc-700/70 bg-zinc-50/50 dark:bg-zinc-800/30 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5 flex-shrink-0">{pp.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                      {pp.label}
                    </span>
                    {isConfirming && (
                      <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400">
                        Clica para confirmar
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
                    {pp.description}
                  </p>
                  {/* Preview tags */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-700/50 px-1.5 py-0.5 text-[9px] font-medium text-zinc-600 dark:text-zinc-400">
                      {pp.config.targetPlatform}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-700/50 px-1.5 py-0.5 text-[9px] font-medium text-zinc-600 dark:text-zinc-400">
                      {pp.config.triggerType}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-700/50 px-1.5 py-0.5 text-[9px] font-medium text-zinc-600 dark:text-zinc-400">
                      {pp.config.automationType}
                    </span>
                  </div>
                </div>
                <ChevronRight className={`h-4 w-4 mt-1 flex-shrink-0 transition-transform ${
                  isConfirming ? 'text-sky-500' : 'text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5'
                }`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
