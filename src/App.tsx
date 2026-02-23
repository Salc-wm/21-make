import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Layers, Paintbrush, Type, Layout, Puzzle, FileText,
  Sparkles, MessageSquare, ClipboardCopy, Check, RotateCcw,
  ChevronDown, ChevronUp, Zap, Eye, Moon, Sun, Globe, Pencil,
  Palette, Code, Minus, Square, X, Save, BookOpen, Rocket, Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type PromptConfig, defaultConfig } from './types';
import type { PageDetail } from './types';
import { type DevPromptConfig, defaultDevConfig } from './devTypes';
import { type DeployPromptConfig, defaultDeployConfig } from './deployTypes';
import {
  getAppTypes, getAppPageTypeOptions, getDesignStyles, getDarkModeOptions, getBorderRadiusOptions,
  getDensityOptions, getFontStyles, getFontSizes, getLayoutTypes,
  getNavigationStyles, getAnimationOptions, getComponentOptions,
  getPageOptions, getFeedbackOptions, getLanguageOptions, getToneOptions,
} from './data/options/options';
import { generatePrompt } from './generators/generatePrompt';
import { generateLandingPagePrompt } from './generators/generateLandingPagePrompt';
import { generateDevPrompt } from './generators/generateDevPrompt';
import { generateDeployPrompt } from './generators/generateDeployPrompt';
import { t } from './core/PromptBuilder';
import { SectionCard } from './components/SectionCard';
import { SelectField } from './components/SelectField';
import { TextField } from './components/TextField';
import { CheckboxGroup } from './components/CheckboxGroup';
import { OptionCards } from './components/OptionCards';
import { ColorSchemeSelector } from './components/ColorSchemeSelector';
import { PageDetailEditorList } from './components/PageDetailEditor';
import { StitchAIPreview } from './components/StitchAIPreview';
import { ScrollProgressBars } from './components/ScrollProgressBars';
import { PrePromptPanel } from './components/PrePromptPanel';
import { ProfileManager } from './components/ProfileManager';
import { DevForm } from './components/DevForm';
import { DevPrePromptPanel } from './components/DevPrePromptPanel';
import { DeployForm } from './components/DeployForm';
import { DeployPrePromptPanel } from './components/DeployPrePromptPanel';
import { DeployCommandsPanel } from './components/DeployCommandsPanel';
import { usePersistedState } from './hooks/usePersistedState';
import { DictionaryPanel } from './components/DictionaryPanel';
import { SettingsModal, type GlobalSettings } from './components/SettingsModal';
import { AutomationForm } from './components/AutomationForm';
import { Settings } from 'lucide-react';
import { AutomationPrePromptPanel } from './components/AutomationPrePromptPanel';

import type { AutomationPromptConfig } from './automationTypes';
import { defaultAutomationConfig } from './automationTypes';
import { generateAutomationPrompt } from './generators/generateAutomationPrompt';

type AppMode = 'design' | 'dev' | 'deploy' | 'automation';
type SectionId = 'project' | 'visual' | 'typo' | 'layout' | 'components' | 'pages' | 'interactions' | 'tone' | 'extras';

export function App() {
  const [isTauri] = useState(() => typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window);

  const handleMinimize = async () => {
    if (isTauri) {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      getCurrentWindow().minimize();
    }
  };

  const handleToggleMaximize = async () => {
    if (isTauri) {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      getCurrentWindow().toggleMaximize();
    }
  };

  const handleClose = async () => {
    if (isTauri) {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      getCurrentWindow().close();
    }
  };

  const getSavedLanguage = (): import('./core/i18n').Lang => {
    try {
      const saved = localStorage.getItem('stitch-language') as import('./core/i18n').Lang;
      if (['pt', 'en', 'es', 'fr'].includes(saved)) return saved;
      return 'en';
    } catch {
      return 'en';
    }
  };

  // Design config
  const [config, setConfig] = useState<PromptConfig>(() => ({ ...defaultConfig, promptLanguage: getSavedLanguage() }));
  // Developer config
  const [devConfig, setDevConfig] = useState<DevPromptConfig>(() => ({ ...defaultDevConfig, promptLanguage: getSavedLanguage() }));
  // Deploy config
  const [deployConfig, setDeployConfig] = useState<DeployPromptConfig>(() => ({ ...defaultDeployConfig, promptLanguage: getSavedLanguage() }));
  // Automation config
  const [automationConfig, setAutomationConfig] = useState<AutomationPromptConfig>(() => ({ ...defaultAutomationConfig, promptLanguage: getSavedLanguage() }));

  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [activeMode, setActiveMode] = usePersistedState<AppMode>('design-app-mode', 'design');
  const [isEditing, setIsEditing] = usePersistedState<boolean>('design-is-editing', false);
  const [editedPrompt, setEditedPrompt] = usePersistedState<string>('design-edited-prompt', '');
  const [isPromptMinimized, setIsPromptMinimized] = usePersistedState<boolean>('stitch-prompt-minimized', false);

  const [nightMode, setNightMode] = usePersistedState<boolean>('stitch-night-mode', () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [expandedSections, setExpandedSections] = useState<Set<SectionId>>(
    new Set(['project', 'visual', 'typo', 'layout', 'components', 'pages', 'interactions', 'tone', 'extras'])
  );

  // If the user has a project name defined in Design mode, assume the context is shared
  const hasDesignContext = Boolean(config.projectName);
  const hasDevContext = Boolean(devConfig.projectName);

  const generatedDesignPrompt = useMemo(() => {
    if (config.isOnePageLandingPrompt) {
      return generateLandingPagePrompt(config);
    }
    return generatePrompt(config);
  }, [config]);

  const generatedDevPromptText = useMemo(() => generateDevPrompt(devConfig, hasDesignContext ? config : undefined), [devConfig, config, hasDesignContext]);
  const generatedDeployPromptText = useMemo(() => generateDeployPrompt(deployConfig, hasDevContext ? devConfig : undefined), [deployConfig, devConfig, hasDevContext]);
  const generatedAutomationPromptText = useMemo(() => generateAutomationPrompt(automationConfig, hasDesignContext ? config : undefined), [automationConfig, config, hasDesignContext]);
  
  const lang = (config.promptLanguage as import('./core/i18n').Lang) || 'en';
  const strings = t(lang);

  const generatedPrompt = 
    activeMode === 'design' ? generatedDesignPrompt : 
    activeMode === 'dev' ? generatedDevPromptText : 
    activeMode === 'automation' ? generatedAutomationPromptText :
    generatedDeployPromptText;

  // When editing, use the user's edited text; otherwise use the generated prompt
  const prompt = isEditing ? editedPrompt : generatedPrompt;

  // Sync editedPrompt when the generated prompt changes (only if not currently editing)
  useEffect(() => {
    if (!isEditing) {
      setEditedPrompt(generatedPrompt);
    }
  }, [generatedPrompt, isEditing]);

  const update = useCallback(<K extends keyof PromptConfig>(key: K, value: PromptConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));

    // Sync shared context down to Dev, Deploy and Automation
    const sharedKeys = ['projectName', 'projectDescription', 'promptLanguage', 'tone'] as const;
    if (sharedKeys.includes(key as any)) {
      setDevConfig(prev => ({ ...prev, [key]: value } as any));
      setDeployConfig(prev => ({ ...prev, [key]: value } as any));
      setAutomationConfig(prev => ({ ...prev, [key]: value } as any));
    }
  }, []);

  const updatePageDetail = useCallback((key: string, detail: PageDetail) => {
    setConfig(prev => ({
      ...prev,
      pageDetails: { ...prev.pageDetails, [key]: detail },
    }));
  }, []);

  // Build page labels map for PageDetailEditorList
  const pageLabels = useMemo(() => {
    const map: Record<string, string> = {};
    getPageOptions(lang).forEach(p => { map[p.value] = p.label; });
    return map;
  }, [lang]);

  const handleCopy = async () => {
    const promptToCopy = prompt.replace(/\n*---\n*\*Prompt.*$/i, '');
    try {
      await navigator.clipboard.writeText(promptToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = promptToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveAs = async () => {
    if (!isTauri) return;
    try {
      const { save } = await import('@tauri-apps/plugin-dialog');
      const { writeTextFile } = await import('@tauri-apps/plugin-fs');
      const filePath = await save({
        filters: [{
          name: 'Markdown',
          extensions: ['md', 'txt']
        }]
      });
      if (filePath) {
        const promptToSave = prompt.replace(/\n*---\n*\*Prompt.*$/i, '');
        await writeTextFile(filePath, promptToSave);
      }
    } catch (e) {
      console.error('Failed to save file:',e);
    }
  };

  const handleReset = () => {
    if (window.confirm(strings.confirmReset)) {
      setConfig({ ...defaultConfig, promptLanguage: lang });
      setDevConfig({ ...defaultDevConfig, promptLanguage: lang });
      setDeployConfig({ ...defaultDeployConfig, promptLanguage: lang });
      setAutomationConfig({ ...defaultAutomationConfig, promptLanguage: lang });
    }
  };

  const updateDev = useCallback(<K extends keyof DevPromptConfig>(key: K, value: DevPromptConfig[K]) => {
    setDevConfig(prev => ({ ...prev, [key]: value }));

    // Sync shared context
    const sharedKeys = ['projectName', 'projectDescription', 'promptLanguage', 'tone'] as const;
    if (sharedKeys.includes(key as any)) {
      setConfig(prev => ({ ...prev, [key]: value } as any));
      setDeployConfig(prev => ({ ...prev, [key]: value } as any));
      setAutomationConfig(prev => ({ ...prev, [key]: value } as any));
    }
  }, []);

  const updateDeploy = useCallback(<K extends keyof DeployPromptConfig>(key: K, value: DeployPromptConfig[K]) => {
    setDeployConfig(prev => ({ ...prev, [key]: value }));

    // Sync shared context
    const sharedKeys = ['projectName', 'projectDescription', 'promptLanguage', 'tone'] as const;
    if (sharedKeys.includes(key as any)) {
      setConfig(prev => ({ ...prev, [key]: value } as any));
      setDevConfig(prev => ({ ...prev, [key]: value } as any));
      setAutomationConfig(prev => ({ ...prev, [key]: value } as any));
    }
  }, []);

  const updateAutomation = useCallback(<K extends keyof AutomationPromptConfig>(key: K, value: AutomationPromptConfig[K]) => {
    setAutomationConfig(prev => ({ ...prev, [key]: value }));

    // Sync shared context
    const sharedKeys = ['projectName', 'projectDescription', 'promptLanguage', 'tone'] as const;
    if (sharedKeys.includes(key as any)) {
      setConfig(prev => ({ ...prev, [key]: value } as any));
      setDevConfig(prev => ({ ...prev, [key]: value } as any));
      setDeployConfig(prev => ({ ...prev, [key]: value } as any));
    }
  }, []);

  const toggleSection = useCallback((id: SectionId) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const isSectionOpen = (id: SectionId) => expandedSections.has(id);

  const handleGlobalSettingsSave = useCallback((settings: GlobalSettings) => {
    // 1. Update Design Tab Config
    setConfig(prev => ({
      ...prev,
      projectName: settings.projectName,
      projectDescription: settings.projectDescription,
      appType: settings.appType,
      language: settings.language,
      promptLanguage: settings.promptLanguage
    }));

    // 2. Update Developer Tab Config
    setDevConfig(prev => ({
      ...prev,
      projectName: settings.projectName,
      projectDescription: settings.projectDescription,
      language: settings.language,
      aiEditor: settings.aiEditor,
      packageManager: settings.packageManager,
      deployTarget: settings.deployTarget,
      promptLanguage: settings.promptLanguage
    }));

    // 3. Update Deploy Tab Config
    setDeployConfig(prev => ({
      ...prev,
      projectName: settings.projectName,
      projectDescription: settings.projectDescription,
      promptLanguage: settings.promptLanguage
    }));

    // 4. Update Automation Tab Config
    setAutomationConfig(prev => ({
      ...prev,
      projectName: settings.projectName,
      projectDescription: settings.projectDescription,
      promptLanguage: settings.promptLanguage
    }));
    
    try { localStorage.setItem('stitch-language', settings.promptLanguage); } catch { /* ignore */ }
  }, []);

  const completionCount = useMemo(() => [
    !!config.projectName,
    !!config.projectDescription,

    config.components.length > 0,
    config.pages.length > 0,
    config.feedback.length > 0
  ].filter(Boolean).length, [config]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + C
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handleCopy();
      }

      // Ctrl/Cmd + 1, 2, 3, 4
      const modeMap: Record<string, any> = {
        '1': 'design',
        '2': 'dev',
        '3': 'deploy',
        '4': 'automation'
      };

      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        const mode = modeMap[e.key];
        if (mode) {
          e.preventDefault();
          setActiveMode(mode);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCopy]);

  return (
    <div className={`h-screen flex flex-col overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 ${nightMode ? 'dark' : ''}`}>
      {/* Scroll Progress Bars */}
      <ScrollProgressBars />

      {/* Header */}
      <header data-tauri-drag-region className="flex-none z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 select-none relative">
        <div data-tauri-drag-region className={`mx-auto flex w-full items-center justify-between py-1.5 pl-4 sm:pl-6 ${isTauri ? 'pr-24 sm:pr-28' : 'pr-4 sm:pr-6'}`}>
          <div data-tauri-drag-region className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100">
              <Zap className="h-3.5 w-3.5 text-white dark:text-zinc-900" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{strings.appTitle}</h1>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                {activeMode === 'design' ? strings.appSubDesign : activeMode === 'dev' ? strings.appSubDev : activeMode === 'automation' ? strings.appSubAutomation : strings.appSubDeploy}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Mode Switcher */}
            <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-700 p-0.5">
              <button
                onClick={() => setActiveMode('design')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  activeMode === 'design'
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                <Palette className="h-3 w-3" />
                {strings.design}
              </button>
              <button
                onClick={() => setActiveMode('dev')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  activeMode === 'dev'
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                <Code className="h-3 w-3" />
                {strings.dev}
              </button>
              <button
                onClick={() => setActiveMode('deploy')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  activeMode === 'deploy'
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                <Rocket className="h-3 w-3" />
                {strings.deploy}
              </button>
              <button
                onClick={() => setActiveMode('automation')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  activeMode === 'automation'
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                <Workflow className="h-3 w-3" />
                {strings.automation}
              </button>
            </div>
            <button
              onClick={() => {
                const currentLang = activeMode === 'design' ? config.promptLanguage : activeMode === 'dev' ? devConfig.promptLanguage : activeMode === 'automation' ? automationConfig.promptLanguage : deployConfig.promptLanguage;
                let newLang = 'en';
                if (currentLang === 'en') newLang = 'pt';
                else if (currentLang === 'pt') newLang = 'es';
                else if (currentLang === 'es') newLang = 'fr';
                else newLang = 'en';

                update('promptLanguage', newLang);
                updateDev('promptLanguage', newLang);
                updateDeploy('promptLanguage', newLang);
                updateAutomation('promptLanguage', newLang);
                try { localStorage.setItem('stitch-language', newLang); } catch { /* ignore */ }
              }}
              className="flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-700 px-2 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
              title={(() => {
                const langCode = activeMode === 'design' ? config.promptLanguage : activeMode === 'dev' ? devConfig.promptLanguage : activeMode === 'automation' ? automationConfig.promptLanguage : deployConfig.promptLanguage;
                if (langCode === 'en') return strings.switchToPt;
                if (langCode === 'pt') return strings.switchToEs;
                if (langCode === 'es') return strings.switchToFr;
                return strings.switchToEn;
              })()}
            >
              <Globe className="h-3 w-3" />
              {(activeMode === 'design' ? config.promptLanguage : activeMode === 'dev' ? devConfig.promptLanguage : activeMode === 'automation' ? automationConfig.promptLanguage : deployConfig.promptLanguage).toUpperCase()}
            </button>
            {/* Night Mode Toggle */}
            <button
              onClick={() => setNightMode(!nightMode)}
              className="flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 p-1.5 text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
              title={nightMode ? 'Modo Claro' : 'Modo Escuro'}
            >
              {nightMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            {/* Global Settings */}
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-700 px-2 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
              title="Global Settings"
            >
              <Settings className="h-3 w-3" />
            </button>
            {/* Architecture Dictionary */}
            <button
              onClick={() => setShowDictionary(true)}
              className="flex items-center gap-1 rounded-lg border border-violet-300 dark:border-violet-700 px-2 py-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 transition hover:bg-violet-50 dark:hover:bg-violet-900/30"
              title="Architecture Dictionary"
            >
              <BookOpen className="h-3 w-3" />
              Dict
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {strings.reset}
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition lg:hidden ${
                showPreview
                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                  : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              {strings.preview}
            </button>
          </div>
        </div>
        {isTauri && (
          <div data-tauri-drag-region="false" className="absolute top-0 bottom-0 right-0 flex items-center pr-2 gap-0.5 z-50">
            <button
              onClick={handleMinimize}
              data-tauri-drag-region="false"
              className="flex items-center justify-center rounded p-1.5 text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              title="Minimize"
            >
              <Minus data-tauri-drag-region="false" className="h-4 w-4" />
            </button>
            <button
              onClick={handleToggleMaximize}
              data-tauri-drag-region="false"
              className="flex items-center justify-center rounded p-1.5 text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              title="Maximize"
            >
              <Square data-tauri-drag-region="false" className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleClose}
              data-tauri-drag-region="false"
              className="flex items-center justify-center rounded p-1.5 text-zinc-600 transition hover:bg-red-50 hover:text-red-500 dark:text-zinc-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
              title="Close"
            >
              <X data-tauri-drag-region="false" className="h-4 w-4" />
            </button>
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto relative">
      <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row items-start">
          {/* Left Column — Form */}
          <div className={`flex-1 min-w-0 space-y-4 ${showPreview ? 'hidden lg:block' : ''}`}>
            {activeMode === 'design' ? (
              <>
                {/* Pre-Prompt Panel */}
                <PrePromptPanel onApply={(cfg) => setConfig(cfg)} nightMode={nightMode} lang={lang} />

                <ProfileManager mode="design" currentConfig={config} onLoadProfile={setConfig} lang={lang} />

                {/* Stats bar */}
                <div className="flex items-center gap-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{completionCount}/5 {strings.fieldsFilled}</span>
                  </div>
                  <div className="ml-auto flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5" title="Estimativa baseada em 1 token ≈ 4 caracteres">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                      <span>≈ {Math.ceil(prompt.length / 4).toLocaleString()} {strings.tokens}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>{prompt.length.toLocaleString()} {strings.characters}</span>
                    </div>
                  </div>
                </div>

            {/* Sections */}
            <div className="columns-1 xl:columns-2 2xl:columns-3 gap-4 mt-6">
              {/* Project */}
              <CollapsibleSection id="project" title={strings.project} icon={<Layers className="h-4 w-4" />} isOpen={isSectionOpen('project')} onToggle={() => toggleSection('project')}>
                <SectionCard icon={<Layers className="h-4 w-4" />} title={strings.project} description={strings.projectDesc}>
                  <TextField label={strings.name} value={config.projectName} onChange={v => update('projectName', v)} placeholder={strings.projectNameHint} />
                  <TextField label={strings.description} value={config.projectDescription} onChange={v => update('projectDescription', v)} placeholder={strings.projectDescHint} multiline rows={2} />
                  <OptionCards label={strings.type} value={config.appType} onChange={v => update('appType', v)} options={getAppTypes(lang)} />
                  <OptionCards label={strings.screenType} value={config.appPageType} onChange={v => update('appPageType', v)} options={getAppPageTypeOptions(lang)} />
                  {config.appPageType === 'multi-page' && (
                    <div className="flex items-center gap-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-3">
                      <div className="flex-1">
                        <label className="text-xs font-medium text-zinc-500">{strings.numberOfPages}</label>
                        <input type="number" min="1" max="20" value={config.numberOfPages} onChange={e => update('numberOfPages', parseInt(e.target.value) || 1)} className="mt-1 block w-full rounded-md border border-zinc-200 bg-white py-1.5 px-3 text-sm focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900" />
                      </div>
                    </div>
                  )}
                </SectionCard>
              </CollapsibleSection>

              {/* Visual Style */}
              <CollapsibleSection id="visual" title={strings.visualStyle} icon={<Paintbrush className="h-4 w-4" />} isOpen={isSectionOpen('visual')} onToggle={() => toggleSection('visual')}>
                <SectionCard icon={<Paintbrush className="h-4 w-4" />} title={strings.visualStyle} description={strings.styleDesc}>
                  <OptionCards label={strings.designStyle} value={config.designStyle} onChange={v => update('designStyle', v)} options={getDesignStyles(lang)} />
                  <ColorSchemeSelector value={config.colorScheme} onChange={v => update('colorScheme', v)} primaryColor={config.primaryColor} onPrimaryColorChange={v => update('primaryColor', v)} lang={lang} />
                  <OptionCards label={strings.mode} value={config.darkMode} onChange={v => update('darkMode', v)} options={getDarkModeOptions(lang)} />
                  <OptionCards label={strings.borderRadius} value={config.borderRadius} onChange={v => update('borderRadius', v)} options={getBorderRadiusOptions(lang)} />
                  <OptionCards label={strings.density} value={config.density} onChange={v => update('density', v)} options={getDensityOptions(lang)} />
                </SectionCard>
              </CollapsibleSection>

              {/* Typography */}
              <CollapsibleSection id="typo" title={strings.typography} icon={<Type className="h-4 w-4" />} isOpen={isSectionOpen('typo')} onToggle={() => toggleSection('typo')}>
                <SectionCard icon={<Type className="h-4 w-4" />} title={strings.typography} description={strings.styleDesc}>
                  <SelectField label={strings.fontStyleLabel} value={config.fontStyle} onChange={v => update('fontStyle', v)} options={getFontStyles(lang)} />
                  <OptionCards label={strings.fontSizeLabel} value={config.fontSize} onChange={v => update('fontSize', v)} options={getFontSizes(lang)} />
                </SectionCard>
              </CollapsibleSection>

              {/* Layout & Navigation */}
              <CollapsibleSection id="layout" title={strings.layoutNav} icon={<Layout className="h-4 w-4" />} isOpen={isSectionOpen('layout')} onToggle={() => toggleSection('layout')}>
                <SectionCard icon={<Layout className="h-4 w-4" />} title={strings.layoutNav} description={strings.pagesDesc}>
                  <OptionCards label={strings.layoutTypeLabel} value={config.layoutType} onChange={v => update('layoutType', v)} options={getLayoutTypes(lang)} />
                  <OptionCards label={strings.navStyleLabel} value={config.navigationStyle} onChange={v => update('navigationStyle', v)} options={getNavigationStyles(lang)} />
                </SectionCard>
              </CollapsibleSection>

              {/* Components */}
              <CollapsibleSection id="components" title={strings.components} icon={<Puzzle className="h-4 w-4" />} isOpen={isSectionOpen('components')} onToggle={() => toggleSection('components')}>
                <SectionCard icon={<Puzzle className="h-4 w-4" />} title={strings.components} description={strings.pagesDesc}>
                  <CheckboxGroup label="UI Components" options={getComponentOptions(lang)} selected={config.components} onChange={v => update('components', v)} columns={2} />
                  <OptionCards label="Animations" value={config.animations} onChange={v => update('animations', v)} options={getAnimationOptions(lang)} />
                </SectionCard>
              </CollapsibleSection>

              {/* Pages */}
              <CollapsibleSection id="pages" title={strings.pagesTitle} icon={<FileText className="h-4 w-4" />} isOpen={isSectionOpen('pages')} onToggle={() => toggleSection('pages')}>
                <SectionCard icon={<FileText className="h-4 w-4" />} title={strings.pagesTitle} description={strings.pagesDesc}>
                  <CheckboxGroup label="Core Pages" options={getPageOptions(lang)} selected={config.pages} onChange={v => update('pages', v)} columns={2} />
                  <TextField label="Custom Pages (comma separated)" value={config.customPages} onChange={v => update('customPages', v)} placeholder="Ex: Dashboard, Settings, Profile" />
                  <PageDetailEditorList
                    pages={config.pages}
                    customPages={config.customPages}
                    pageDetails={config.pageDetails}
                    onPageDetailChange={updatePageDetail}
                    pageLabels={pageLabels}
                    lang={lang}
                  />
                </SectionCard>
              </CollapsibleSection>

              {/* Interactions */}
              <CollapsibleSection id="interactions" title={strings.interactions} icon={<MessageSquare className="h-4 w-4" />} isOpen={isSectionOpen('interactions')} onToggle={() => toggleSection('interactions')}>
                <SectionCard icon={<MessageSquare className="h-4 w-4" />} title={strings.interactions} description={strings.interactionsDesc}>
                  <CheckboxGroup label="Feedback & States" options={getFeedbackOptions(lang)} selected={config.feedback} onChange={v => update('feedback', v)} columns={2} />
                </SectionCard>
              </CollapsibleSection>

              {/* Tone & Quality */}
              <CollapsibleSection id="tone" title={strings.toneLang} icon={<RotateCcw className="h-4 w-4" />} isOpen={isSectionOpen('tone')} onToggle={() => toggleSection('tone')}>
                <SectionCard icon={<RotateCcw className="h-4 w-4" />} title={strings.toneLang} description={strings.toneDesc}>
                  <OptionCards label="Tone of Voice" value={config.tone} onChange={v => update('tone', v)} options={getToneOptions(lang)} />
                  <OptionCards label={strings.language} value={config.language} onChange={v => update('language', v)} options={getLanguageOptions(lang)} />
                </SectionCard>
              </CollapsibleSection>

              {/* Extra Notes */}
              <CollapsibleSection id="extras" title={strings.notes} icon={<FileText className="h-4 w-4" />} isOpen={isSectionOpen('extras')} onToggle={() => toggleSection('extras')}>
                <SectionCard icon={<FileText className="h-4 w-4" />} title={strings.notes} description={strings.notesDesc}>
                  <TextField label="Extra Context" value={config.extraNotes} onChange={v => update('extraNotes', v)} placeholder="Ex: Use a style similar to Linear or Stripe..." multiline rows={4} />
                </SectionCard>
              </CollapsibleSection>
            </div>
              </>
            ) : activeMode === 'dev' ? (
              <>
                {/* Dev Pre-Prompt Panel */}
                <DevPrePromptPanel onApply={(cfg) => setDevConfig(cfg)} />

                <ProfileManager mode="dev" currentConfig={devConfig} onLoadProfile={setDevConfig} lang={lang} />
                {/* Dev Form */}
                <DevForm
                  config={devConfig}
                  onUpdate={updateDev}
                  promptLength={prompt.length}
                  isInheriting={hasDesignContext}
                />
              </>
            ) : activeMode === 'deploy' ? (
              <>
                {/* Deploy Pre-Prompt Panel */}
                <DeployPrePromptPanel onApply={(cfg) => setDeployConfig(cfg)} />

                <ProfileManager mode="deploy" currentConfig={deployConfig} onLoadProfile={setDeployConfig} lang={lang} />
                {/* Deploy Form */}
                <DeployForm
                  config={deployConfig}
                  onUpdate={updateDeploy}
                  promptLength={prompt.length}
                  isInheriting={hasDevContext}
                />
              </>
            ) : (
              <>
                {/* Automation Pre-Prompt Panel */}
                <AutomationPrePromptPanel onApply={(cfg) => setAutomationConfig(cfg)} />

                {/* Automation Form */}
                <AutomationForm
                  config={automationConfig}
                  onUpdate={updateAutomation}
                  promptLength={prompt.length}
                />
              </>
            )}
          </div>
          {/* Right Column — Preview */}
          <div className={`w-full shrink-0 lg:w-[400px] xl:w-[450px] 2xl:w-[500px] ${!showPreview ? 'hidden lg:block' : ''}`}>
            <div className="sticky top-16">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                {/* Preview Header */}
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${isEditing ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {isEditing ? strings.editingPrompt : strings.generatedPrompt}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsPromptMinimized(!isPromptMinimized)}
                      className="flex items-center justify-center rounded-lg border border-zinc-200 p-1.5 text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                      title={isPromptMinimized ? strings.expand : strings.minimize}
                    >
                      {isPromptMinimized ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => {
                        if (!isEditing) {
                          setEditedPrompt(generatedPrompt);
                        } else {
                          // Exiting edit mode — clear persisted edited prompt
                          try { localStorage.removeItem('design-edited-prompt'); } catch { /* ignore */ }
                        }
                        setIsEditing(!isEditing);
                      }}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        isEditing
                          ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-600'
                          : 'border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800'
                      }`}
                      title={isEditing ? strings.exitEditMode : strings.editPromptDirectly}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      {isEditing ? strings.editing : strings.edit}
                    </button>
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        copied
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          {strings.copied}
                        </>
                      ) : (
                        <>
                          <ClipboardCopy className="h-3.5 w-3.5" />
                          {strings.copy}
                        </>
                      )}
                    </button>
                    {isTauri && (
                      <button
                        onClick={handleSaveAs}
                        className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        title={strings.saveAsFile}
                      >
                        <Save className="h-3.5 w-3.5" />
                        {strings.save}
                      </button>
                    )}
                  </div>
                </div>

                {/* Preview Content */}
                {!isPromptMinimized && (
                  <div className="max-h-[calc(100vh-160px)] overflow-y-auto p-5">
                    {isEditing ? (
                      <textarea
                        value={editedPrompt}
                        onChange={(e) => setEditedPrompt(e.target.value)}
                        className="w-full min-h-[400px] resize-y rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4 font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                        spellCheck={false}
                      />
                    ) : (
                      <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {prompt}
                      </pre>
                    )}
                  </div>
                )}
              </div>

              {/* Deploy Commands Panel — only in deploy mode */}
              {activeMode === 'deploy' && (
                <div className="mt-4">
                  <DeployCommandsPanel config={deployConfig} lang={lang} />
                </div>
              )}

              {/* AI Preview */}
              <div className="mt-4">
                <StitchAIPreview prompt={prompt} nightMode={nightMode} lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky copy button */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-3 backdrop-blur-sm lg:hidden">
        <button
          onClick={handleCopy}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
            copied
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-zinc-900 text-white active:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:active:bg-zinc-200'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Prompt Copiado!
            </>
          ) : (
            <>
              <ClipboardCopy className="h-4 w-4" />
              Copiar Prompt
            </>
          )}
        </button>
      </div>

      {/* Bottom padding for mobile sticky button */}
      <div className="h-20 lg:hidden" />

      {/* Architecture Dictionary Panel */}
      <DictionaryPanel
        open={showDictionary}
        onClose={() => setShowDictionary(false)}
        config={config}
        devConfig={devConfig}
        deployConfig={deployConfig}
        automationConfig={automationConfig}
        isTauri={isTauri}
        lang={lang}
      />

      {/* Global Settings Modal */}
      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleGlobalSettingsSave}
        isTauri={isTauri}
        currentSettings={{
          projectName: config.projectName || devConfig.projectName || deployConfig.projectName || automationConfig.projectName || '',
          projectDescription: config.projectDescription || devConfig.projectDescription || deployConfig.projectDescription || automationConfig.projectDescription || '',
          appType: config.appType,
          language: config.language,
          aiEditor: devConfig.aiEditor,
          packageManager: devConfig.packageManager,
          deployTarget: devConfig.deployTarget,
          promptLanguage: activeMode === 'design' ? config.promptLanguage as "en"|"pt" : activeMode === 'dev' ? devConfig.promptLanguage as "en"|"pt" : activeMode === 'automation' ? automationConfig.promptLanguage as "en"|"pt" : deployConfig.promptLanguage as "en"|"pt"
        }}
      />
      </div>
    </div>
  );
}

// Collapsible Section Component
function CollapsibleSection({
  id: _id,
  title,
  icon,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  void _id;
  return (
    <div className="break-inside-avoid mb-4">
      <button
        onClick={onToggle}
        className="mb-2 flex w-full items-center justify-between rounded-lg px-1 py-1 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {icon}
          {title}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-zinc-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
            animate={{ height: 'auto', opacity: 1, transitionEnd: { overflow: 'visible' } }}
            exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
