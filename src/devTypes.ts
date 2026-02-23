export interface DevPromptConfig {
  // Project
  projectName: string;
  projectDescription: string;
  designReference: string;

  // Tech Stack
  framework: string;
  language: string;
  cssApproach: string;
  packageManager: string;

  // Architecture
  stateManagement: string;
  designPattern: string;
  componentPattern: string;
  routingApproach: string;
  fileOrganization: string;

  // API & Data
  apiType: string;
  authApproach: string;
  database: string;

  // Quality & Testing
  testing: string[];
  codeQuality: string[];

  // AI Editor
  aiEditor: string;
  aiInstructions: string;

  // Deploy
  deployTarget: string;

  // Automation
  automationPlatform: string;
  automationTriggers: string[];
  automationGateways: string[];
  automationConnector: string;
  automationWorkflow: string;

  // Extras
  extraNotes: string;

  // Prompt output language
  promptLanguage: string;
}

export const defaultDevConfig: DevPromptConfig = {
  projectName: '',
  projectDescription: '',
  designReference: '',

  framework: 'nextjs',
  language: 'typescript',
  cssApproach: 'tailwind',
  packageManager: 'npm',

  stateManagement: 'context',
  designPattern: 'none',
  componentPattern: 'functional',
  routingApproach: 'app-router',
  fileOrganization: 'feature-based',

  apiType: 'rest',
  authApproach: 'none',
  database: 'none',

  testing: [],
  codeQuality: [],

  aiEditor: 'generic',
  aiInstructions: '',

  deployTarget: 'vercel',

  automationPlatform: 'none',
  automationTriggers: [],
  automationGateways: [],
  automationConnector: 'rest-api',
  automationWorkflow: '',

  extraNotes: '',

  promptLanguage: 'en',
};
