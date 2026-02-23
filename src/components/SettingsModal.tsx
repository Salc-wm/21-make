import { useState, useEffect } from 'react';
import { X, Settings2, Globe, FileText, Code } from 'lucide-react';
import { t } from '../core/PromptBuilder';
import { TextField } from './TextField';
import { SelectField } from './SelectField';
import { getAppTypes, getLanguageOptions } from '../data/options/options';
import { getAiEditors, getPackageManagers, getDeployTargets } from '../data/options/devOptions';

export interface GlobalSettings {
  projectName: string;
  projectDescription: string;
  appType: string;
  language: string;
  aiEditor: string;
  packageManager: string;
  deployTarget: string;
  promptLanguage: string;
}

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  currentSettings: GlobalSettings;
  onSave: (settings: GlobalSettings) => void;
  isTauri: boolean;
}

export function SettingsModal({ open, onClose, currentSettings, onSave }: SettingsModalProps) {
  const [settings, setSettings] = useState<GlobalSettings>(currentSettings);
  const lang = (settings.promptLanguage as import('../core/i18n').Lang) || 'en';
  const strings = t(lang);

  // Sync state if modal opens with new current settings
  useEffect(() => {
    if (open) {
      setSettings(currentSettings);
    }
  }, [open, currentSettings]);

  if (!open) return null;

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const update = <K extends keyof GlobalSettings>(key: K, value: GlobalSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-[60] bg-zinc-900/40 backdrop-blur-sm transition-opacity dark:bg-black/60"
        onClick={onClose}
      />
      <div 
        className="fixed top-1/2 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 dark:bg-zinc-900 sm:max-w-md sm:w-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800/80">
              <Settings2 className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {strings.globalSettings}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Project Identity */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <FileText className="h-4 w-4" />
              {strings.projectIdentity}
            </h3>
            <div className="space-y-4">
              <TextField 
                label={strings.name} 
                value={settings.projectName} 
                onChange={v => update('projectName', v)} 
                placeholder={strings.projectNameHint} 
              />
              <TextField 
                label={strings.description} 
                value={settings.projectDescription} 
                onChange={v => update('projectDescription', v)} 
                placeholder={strings.projectDescHint} 
                multiline 
                rows={2} 
              />
              <SelectField 
                label={strings.type} 
                value={settings.appType} 
                onChange={v => update('appType', v)} 
                options={getAppTypes(lang)} 
              />
            </div>
          </div>

          <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

          {/* Development Defaults */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <Code className="h-4 w-4" />
              {strings.devDefaults}
            </h3>
            <div className="space-y-4">
              <SelectField 
                label={strings.targetAiEditor} 
                value={settings.aiEditor} 
                onChange={v => update('aiEditor', v)} 
                options={getAiEditors(lang)} 
              />
              <SelectField 
                label={strings.packageManager} 
                value={settings.packageManager} 
                onChange={v => update('packageManager', v)} 
                options={getPackageManagers(lang)} 
              />
              <SelectField 
                label={strings.deployTarget} 
                value={settings.deployTarget} 
                onChange={v => update('deployTarget', v)} 
                options={getDeployTargets(lang)} 
              />
            </div>
          </div>

          <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

          {/* Output Preferences */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <Globe className="h-4 w-4" />
              {strings.appLocalization}
            </h3>
            <div className="space-y-4">
              <SelectField 
                label={strings.language} 
                value={settings.language} 
                onChange={v => update('language', v)} 
                options={getLanguageOptions(lang)} 
              />
              
              {/* Output Language Toggle */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {strings.promptGenLang}
                </label>
                <div className="flex flex-wrap gap-2 rounded-lg border border-zinc-200 bg-zinc-50/50 p-1 dark:border-zinc-700 dark:bg-zinc-900/50">
                  {getLanguageOptions(lang).map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => update('promptLanguage', opt.value)}
                      className={`flex-1 min-w-[60px] rounded-md py-1.5 text-xs font-medium transition ${
                        settings.promptLanguage === opt.value
                          ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                          : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                      }`}
                    >
                      {opt.value.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex-none border-t border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-700 transition"
            >
              {strings.cancel}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition"
            >
              {strings.saveDefaults}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
