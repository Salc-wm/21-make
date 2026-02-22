import type { AutomationPromptConfig } from '../../automationTypes';
import { defaultAutomationConfig } from '../../automationTypes';

export interface AutomationPrePrompt {
  id: string;
  category: string;
  emoji: string;
  label: string;
  description: string;
  config: Partial<AutomationPromptConfig>;
}

export const automationPrePromptCategories = [
  { value: 'all', label: 'Tudo', emoji: '🌟' },
  { value: 'marketing', label: 'Marketing', emoji: '📈' },
  { value: 'sales', label: 'Vendas', emoji: '💰' },
  { value: 'ops', label: 'Operações', emoji: '⚙️' },
  { value: 'data', label: 'Dados', emoji: '📊' }
];

import automationPrePromptsData from '../json/automationPrePrompts.json';

export const automationPrePrompts: AutomationPrePrompt[] = automationPrePromptsData as AutomationPrePrompt[];

export function applyAutomationPrePrompt(prePrompt: AutomationPrePrompt): AutomationPromptConfig {
  
  const baseConfig = JSON.parse(JSON.stringify(defaultAutomationConfig)) as AutomationPromptConfig;

  return { ...baseConfig, ...prePrompt.config };
}
