import { useState, useMemo, useCallback } from 'react';
import { t } from '../core/PromptBuilder';
import { X, Copy, Check, Save, FileJson, FileText, FileCode, Braces } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PromptConfig } from '../types';
import type { DevPromptConfig } from '../devTypes';
import type { DeployPromptConfig } from '../deployTypes';
import { buildDictionary } from '../architectureDictionary';
import { generateDictJSON } from '../generators/generateDictJSON';
import { generateDictMarkdown } from '../generators/generateDictMarkdown';
import { generateDictXML } from '../generators/generateDictXML';
import { generateDictPOML } from '../generators/generateDictPOML';

type DictFormat = 'json' | 'markdown' | 'xml' | 'poml';

interface DictionaryPanelProps {
  open: boolean;
  onClose: () => void;
  config: PromptConfig;
  devConfig: DevPromptConfig;
  deployConfig: DeployPromptConfig;
  automationConfig: import('../automationTypes').AutomationPromptConfig;
  isTauri: boolean;
  lang: import('../core/i18n').Lang;
}

const FORMAT_TABS: { id: DictFormat; label: string; icon: React.ReactNode; ext: string }[] = [
  { id: 'json', label: 'JSON', icon: <FileJson className="h-3.5 w-3.5" />, ext: '.json' },
  { id: 'markdown', label: 'Markdown', icon: <FileText className="h-3.5 w-3.5" />, ext: '.md' },
  { id: 'xml', label: 'XML', icon: <FileCode className="h-3.5 w-3.5" />, ext: '.xml' },
  { id: 'poml', label: 'POML', icon: <Braces className="h-3.5 w-3.5" />, ext: '.poml' },
];

export function DictionaryPanel({ open, onClose, config, devConfig, deployConfig, automationConfig, isTauri, lang }: DictionaryPanelProps) {
  const strings = t(lang);
  const [format, setFormat] = useState<DictFormat>('json');
  const [copied, setCopied] = useState(false);

  const dictionary = useMemo(
    () => buildDictionary(config, devConfig, deployConfig, automationConfig),
    [config, devConfig, deployConfig, automationConfig]
  );

  const output = useMemo(() => {
    switch (format) {
      case 'json': return generateDictJSON(dictionary);
      case 'markdown': return generateDictMarkdown(dictionary);
      case 'xml': return generateDictXML(dictionary);
      case 'poml': return generateDictPOML(dictionary);
    }
  }, [dictionary, format]);

  const charCount = output.length;
  const tokenEstimate = Math.round(charCount / 4);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const handleSaveAs = useCallback(async () => {
    if (!isTauri) return;
    try {
      const { save } = await import('@tauri-apps/plugin-dialog');
      const { writeTextFile } = await import('@tauri-apps/plugin-fs');
      const tab = FORMAT_TABS.find(t => t.id === format)!;
      const filePath = await save({
        filters: [{
          name: tab.label,
          extensions: [tab.ext.replace('.', '')]
        }]
      });
      if (filePath) {
        await writeTextFile(filePath, output);
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
  }, [isTauri, format, output]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900 shadow-2xl sm:inset-8 md:inset-12 lg:inset-20"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                  <FileJson className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-zinc-100">{strings.dictTitle}</h2>
                  <p className="text-xs text-zinc-500">{strings.project}: {dictionary.meta.name || '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Stats */}
                <span className="text-xs text-zinc-500">
                  {charCount.toLocaleString()} chars · ≈ {tokenEstimate.toLocaleString()} tokens
                </span>

                {/* Save As */}
                {isTauri && (
                  <button
                    onClick={handleSaveAs}
                    className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-2.5 py-1.5 text-xs text-zinc-300 transition hover:bg-zinc-800"
                  >
                    <Save className="h-3.5 w-3.5" />
                    {strings.save}
                  </button>
                )}

                {/* Copy */}
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-violet-600 text-white hover:bg-violet-500'
                  }`}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? strings.copied : strings.copy}
                </button>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Format Tabs */}
            <div className="flex gap-1 border-b border-zinc-800 px-5 py-2">
              {FORMAT_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFormat(tab.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    format === tab.id
                      ? 'bg-violet-600/20 text-violet-300 ring-1 ring-violet-500/40'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  <span className="ml-1 text-[10px] text-zinc-500">{tab.ext}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-5">
              <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-zinc-300">
                {output}
              </pre>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
