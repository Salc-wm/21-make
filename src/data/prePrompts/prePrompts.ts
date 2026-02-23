import type { PromptConfig } from '../../types';
import { defaultConfig } from '../../types';
import { i18n, type Lang } from '../../core/i18n';

export interface PrePrompt {
  id: string;
  label: string;
  description: string;
  emoji: string;
  category: 'productivity' | 'business' | 'marketing' | 'dev-tools' | 'finance' | 'health' | 'education' | 'social';
  config: Partial<PromptConfig>;
}

export const getPrePromptCategories = (lang: Lang) => {
  const strings = i18n[lang];
  return [
    { value: 'all', label: strings.templateAll, emoji: '🌐' },
    { value: 'productivity', label: strings.templateProductivity, emoji: '⚡' },
    { value: 'business', label: strings.templateBusiness, emoji: '💼' },
    { value: 'marketing', label: strings.templateMarketing, emoji: '📣' },
    { value: 'dev-tools', label: strings.templateDevTools, emoji: '🛠️' },
    { value: 'finance', label: strings.templateFinance, emoji: '💰' },
    { value: 'health', label: strings.templateHealth, emoji: '🏥' },
    { value: 'education', label: strings.templateEducation, emoji: '📚' },
    { value: 'social', label: strings.templateSocial, emoji: '👥' },
  ];
};

import prePromptsData from '../json/prePrompts.json';

export const prePrompts: PrePrompt[] = prePromptsData as PrePrompt[];

export function applyPrePrompt(prePrompt: PrePrompt): PromptConfig {
  return { ...defaultConfig, ...prePrompt.config };
}
