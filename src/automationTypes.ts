export interface AutomationPromptConfig {
  // Shared
  projectName: string;
  projectDescription: string;
  promptLanguage: string;
  tone: string;

  // Automation Specific
  targetPlatform: string;
  automationType: string;
  triggerType: string;
  coreNodes: string[];
  authRequirements: string[];
  errorHandling: string;
  retries: string;
  customInstructions: string;
}

export const defaultAutomationConfig: AutomationPromptConfig = {
  projectName: '',
  projectDescription: '',
  promptLanguage: 'en',
  tone: 'professional',
  targetPlatform: 'n8n',
  automationType: 'ETL / Data Sync',
  triggerType: 'Webhook',
  coreNodes: [],
  authRequirements: [],
  errorHandling: 'Stop execution',
  retries: 'No retries',
  customInstructions: '',
};
