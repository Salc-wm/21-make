import type { PromptConfig } from '../types';
import { defaultConfig } from '../types';

export interface PrePrompt {
  id: string;
  label: string;
  description: string;
  emoji: string;
  category: 'productivity' | 'business' | 'marketing' | 'dev-tools' | 'finance' | 'health' | 'education' | 'social';
  config: Partial<PromptConfig>;
}

export const prePromptCategories: { value: string; label: string; emoji: string }[] = [
  { value: 'all', label: 'Todos', emoji: '🌐' },
  { value: 'productivity', label: 'Produtividade', emoji: '⚡' },
  { value: 'business', label: 'Negócios', emoji: '💼' },
  { value: 'marketing', label: 'Marketing', emoji: '📣' },
  { value: 'dev-tools', label: 'Dev Tools', emoji: '🛠️' },
  { value: 'finance', label: 'Finanças', emoji: '💰' },
  { value: 'health', label: 'Saúde', emoji: '🏥' },
  { value: 'education', label: 'Educação', emoji: '📚' },
  { value: 'social', label: 'Social', emoji: '👥' },
];

import prePromptsData from './prePrompts.json';

export const prePrompts: PrePrompt[] = prePromptsData as PrePrompt[];

export function applyPrePrompt(prePrompt: PrePrompt): PromptConfig {
  return { ...defaultConfig, ...prePrompt.config };
}
