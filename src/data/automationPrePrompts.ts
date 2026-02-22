import type { AutomationPromptConfig } from '../automationTypes';
import { defaultAutomationConfig } from '../automationTypes';

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

export const automationPrePrompts: AutomationPrePrompt[] = [
  {
    id: 'n8n-webhook-crm',
    category: 'sales',
    emoji: '🎯',
    label: 'Lead Capture to CRM',
    description: 'Receives a webhook form submission and creates/updates a contact in the CRM.',
    config: {
      targetPlatform: 'n8n',
      automationType: 'ETL / Data Sync',
      triggerType: 'Webhook',
      coreNodes: ['http', 'switch', 'db'],
      authRequirements: ['bearer'],
      errorHandling: 'Alert',
      retries: 'Retry 1x'
    }
  },
  {
    id: 'n8n-ai-triage',
    category: 'ops',
    emoji: '🤖',
    label: 'AI Support Ticket Triage',
    description: 'Reads incoming support emails, uses LLM to categorize, and routes to Slack/Discord.',
    config: {
      targetPlatform: 'n8n',
      automationType: 'AI Agent / Chatbot',
      triggerType: 'Email',
      coreNodes: ['llm', 'switch', 'http'],
      authRequirements: ['bearer', 'oauth2'],
      errorHandling: 'Continue on failure',
      retries: 'No retries'
    }
  },
  {
    id: 'make-daily-report',
    category: 'data',
    emoji: '📊',
    label: 'Daily KPI Report',
    description: 'Extracts data from DB daily via Cron and sends beautiful Slack/Email summary.',
    config: {
      targetPlatform: 'Make (Integromat)',
      automationType: 'Scheduled Job / Cron',
      triggerType: 'Cron',
      coreNodes: ['db', 'json', 'http'],
      authRequirements: ['bearer'],
      errorHandling: 'Stop execution',
      retries: 'Retry 3x (Backoff)'
    }
  }
];

export function applyAutomationPrePrompt(prePrompt: AutomationPrePrompt): AutomationPromptConfig {
  // Create a deep copy of the default config
  const baseConfig = JSON.parse(JSON.stringify(defaultAutomationConfig)) as AutomationPromptConfig;
  
  // Merge the prePrompt config onto the base config
  return { ...baseConfig, ...prePrompt.config };
}
