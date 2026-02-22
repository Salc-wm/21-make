import type { DeployPromptConfig } from '../deployTypes';
import { defaultDeployConfig } from '../deployTypes';

export interface DeployPrePrompt {
  id: string;
  label: string;
  description: string;
  emoji: string;
  config: Partial<DeployPromptConfig>;
}

import deployPrePromptsData from './deployPrePrompts.json';

export const deployPrePrompts: DeployPrePrompt[] = deployPrePromptsData as DeployPrePrompt[];

export function applyDeployPrePrompt(prePrompt: DeployPrePrompt): DeployPromptConfig {
  return { ...defaultDeployConfig, ...prePrompt.config };
}
