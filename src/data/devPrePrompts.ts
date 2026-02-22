import type { DevPromptConfig } from '../devTypes';
import { defaultDevConfig } from '../devTypes';

export interface DevPrePrompt {
  id: string;
  label: string;
  description: string;
  emoji: string;
  config: Partial<DevPromptConfig>;
}

import devPrePromptsData from './devPrePrompts.json';

export const devPrePrompts: DevPrePrompt[] = devPrePromptsData as DevPrePrompt[];

export function applyDevPrePrompt(prePrompt: DevPrePrompt): DevPromptConfig {
  return { ...defaultDevConfig, ...prePrompt.config };
}
