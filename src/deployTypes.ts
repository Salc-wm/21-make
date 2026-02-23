export interface DeployPromptConfig {
  // Project
  projectName: string;
  projectDescription: string;
  projectType: string;

  // OS & Environment
  targetOS: string;
  environmentType: string;
  vmProvider: string;

  // Container
  containerPlatform: string;
  baseImage: string;
  customBaseImage: string;

  // Build & Runtime
  nodeVersion: string;
  buildCommand: string;
  outputDir: string;
  serveWith: string;
  envVars: string;

  // Networking
  exposedPort: string;
  reverseProxy: string;
  sslMethod: string;
  domain: string;

  // Storage & Persistence
  volumes: string;
  backupStrategy: string;

  // CI/CD (optional)
  ciCd: string;
  registry: string;

  // Monitoring
  healthcheck: string;
  logging: string;

  // Automation & Orchestration
  automationPlatform: string;
  queueSystem: string;
  workflowScaling: string;
  automationNotes: string;

  // Extra
  extraNotes: string;

  // Prompt language
  promptLanguage: string;
}

export const defaultDeployConfig: DeployPromptConfig = {
  projectName: '',
  projectDescription: '',
  projectType: 'static-spa',

  targetOS: 'linux',
  environmentType: 'container',
  vmProvider: 'none',

  containerPlatform: 'docker',
  baseImage: 'node-alpine',
  customBaseImage: '',

  nodeVersion: '20',
  buildCommand: 'npm run build',
  outputDir: 'dist',
  serveWith: 'nginx',
  envVars: '',

  exposedPort: '80',
  reverseProxy: 'nginx',
  sslMethod: 'letsencrypt',
  domain: '',

  volumes: '',
  backupStrategy: 'none',

  ciCd: 'none',
  registry: 'none',

  healthcheck: 'http',
  logging: 'stdout',

  automationPlatform: 'none',
  queueSystem: 'none',
  workflowScaling: 'single',
  automationNotes: '',

  extraNotes: '',
  promptLanguage: 'en',
};
