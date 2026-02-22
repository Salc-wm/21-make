import type { DeployPromptConfig } from '../deployTypes';
import type { DevPromptConfig } from '../devTypes';
import { generateDevPrompt } from './generateDevPrompt';
import {
  projectTypes, targetOSOptions, environmentTypes, vmProviders,
  containerPlatforms, baseImages, nodeVersions, serveMethods,
  reverseProxies, sslMethods, ciCdOptions, registryOptions,
  healthcheckOptions, loggingOptions, backupStrategies,
  deployAutomationPlatforms, queueSystems, workflowScaling,
} from '../data/options/deployOptions';
import { PromptBuilder, t, getLabel } from '../core/PromptBuilder';

export function generateDeployPrompt(config: DeployPromptConfig, inheritedDev?: DevPromptConfig): string {
  const lang = config.promptLanguage === 'en' ? 'en' : 'pt';
  const builder = new PromptBuilder(lang);
  const strings = t(lang);
  const isContainer = config.environmentType === 'container';
  const isLinux = config.targetOS === 'linux';

  // Project
  builder.addSection(`# 📋 ${strings.project}`, [
    builder.addField(strings.name, config.projectName),
    builder.addField(strings.description, config.projectDescription),
    builder.addField(strings.type, config.projectType, projectTypes)
  ]);

  // Inherited Dev
  if (inheritedDev) {
    const rawDev = generateDevPrompt(inheritedDev).replace(/\n*---\n*\*Prompt.*$/i, '').trim();
    builder.addSection(`## 🛠️ Application Architecture & Stack`, [
      `> **${lang === 'pt' ? 'Nota: Segue os parâmetros arquiteturais e frameworks definidos abaixo para o deploy.' : 'Note: Follow the architectural parameters and frameworks defined below for deployment.'}**`,
      '',
      rawDev
    ]);
  }

  // Environment
  const osInfo = targetOSOptions.find(o => o.value === config.targetOS);
  builder.addSection(`## 🖥️ ${strings.environmentOS}`, [
    builder.addField(lang === 'pt' ? 'Sistema Operativo' : 'Operating System', config.targetOS, targetOSOptions) + (osInfo?.desc ? ` — ${osInfo.desc}` : ''),
    builder.addField(lang === 'pt' ? 'Tipo de Ambiente' : 'Environment Type', config.environmentType, environmentTypes),
    config.environmentType === 'vm' && config.vmProvider !== 'none' ? builder.addField(lang === 'pt' ? 'Provedor VM' : 'VM Provider', config.vmProvider, vmProviders) : ''
  ]);

  // Container
  if (isContainer) {
    const imgLabel = config.baseImage === 'custom' && config.customBaseImage ? config.customBaseImage : getLabel(baseImages, config.baseImage);
    builder.addSection(`## 🐳 ${strings.container}`, [
      builder.addField(lang === 'pt' ? 'Plataforma' : 'Platform', config.containerPlatform, containerPlatforms),
      builder.addField(lang === 'pt' ? 'Imagem Base' : 'Base Image', imgLabel)
    ]);
  }

  // Build & Runtime
  builder.addSection(`## ⚙️ ${strings.buildRuntime}`, [
    builder.addField('Node.js', config.nodeVersion, nodeVersions),
    config.buildCommand ? builder.addField('Build Command', `\`${config.buildCommand}\``) : '',
    config.outputDir ? builder.addField('Output Directory', `\`${config.outputDir}\``) : '',
    builder.addField(lang === 'pt' ? 'Servir Com' : 'Serve With', config.serveWith, serveMethods),
    config.envVars.trim() ? `\n**${lang === 'pt' ? 'Variáveis de Ambiente' : 'Environment Variables'}:**\n\`\`\`\n${config.envVars}\n\`\`\`` : ''
  ]);

  // Networking
  builder.addSection(`## 🌐 ${strings.networking}`, [
    builder.addField(lang === 'pt' ? 'Porta Exposta' : 'Exposed Port', config.exposedPort),
    config.reverseProxy !== 'none' ? builder.addField('Reverse Proxy', config.reverseProxy, reverseProxies) : '',
    builder.addField('SSL / TLS', config.sslMethod, sslMethods),
    config.domain.trim() ? builder.addField(lang === 'pt' ? 'Domínio' : 'Domain', config.domain) : ''
  ]);

  // Storage
  if (config.volumes.trim() || config.backupStrategy !== 'none') {
    builder.addSection(`## 💾 ${strings.storage}`, [
      config.volumes.trim() ? builder.addField(lang === 'pt' ? 'Volumes / Mounts' : 'Volumes / Mounts', config.volumes) : '',
      config.backupStrategy !== 'none' ? builder.addField(lang === 'pt' ? 'Estratégia de Backup' : 'Backup Strategy', config.backupStrategy, backupStrategies) : ''
    ]);
  }

  // CI/CD
  if (config.ciCd !== 'none' || config.registry !== 'none') {
    builder.addSection(`## 🔄 ${strings.cicdRegistry}`, [
      config.ciCd !== 'none' ? builder.addField('CI/CD', config.ciCd, ciCdOptions) : '',
      config.registry !== 'none' ? builder.addField('Container Registry', config.registry, registryOptions) : ''
    ]);
  }

  // Monitoring
  builder.addSection(`## 📊 ${strings.monitoring}`, [
    builder.addField('Healthcheck', config.healthcheck, healthcheckOptions),
    builder.addField('Logging', config.logging, loggingOptions)
  ]);

  // Automation
  if (config.automationPlatform !== 'none') {
    const platInfo = deployAutomationPlatforms.find(p => p.value === config.automationPlatform);
    const qInfo = queueSystems.find(q => q.value === config.queueSystem);
    const scaleInfo = workflowScaling.find(w => w.value === config.workflowScaling);
    builder.addSection(`## 🤖 ${strings.automationOrchestration}`, [
      builder.addField(lang === 'pt' ? 'Plataforma' : 'Platform', config.automationPlatform, deployAutomationPlatforms) + (platInfo?.desc ? ` — ${platInfo.desc}` : ''),
      config.queueSystem !== 'none' ? builder.addField(lang === 'pt' ? 'Sistema de Filas' : 'Queue System', config.queueSystem, queueSystems) + (qInfo?.desc ? ` — ${qInfo.desc}` : '') : '',
      builder.addField(lang === 'pt' ? 'Escalonamento' : 'Scaling', config.workflowScaling, workflowScaling) + (scaleInfo?.desc ? ` — ${scaleInfo.desc}` : ''),
      config.automationNotes.trim() ? `\n### ${lang === 'pt' ? 'Notas de Automação' : 'Automation Notes'}\n${config.automationNotes}` : '',
      `\n> ${lang === 'pt' ? 'Incluir configuração e deploy do servidor de automação no mesmo fluxo. Garantir conexão segura entre app e automação (credenciais, network, volumes).' : 'Include automation server configuration and deployment in the same flow. Ensure secure connection between app and automation (credentials, network, volumes).'}`
    ]);
  }

  // Deploy Steps
  const stepsTitle = strings.deploySteps;
  const steps = [
    `### 1. ${lang === 'pt' ? 'Preparar o Ambiente' : 'Prepare Environment'}`,
    isContainer ? (isLinux ? (lang === 'pt' ? '- Instalar Docker: `curl -fsSL https://get.docker.com | sh`\n- Adicionar user ao grupo docker: `sudo usermod -aG docker $USER`' : '- Install Docker: `curl -fsSL https://get.docker.com | sh`\n- Add user to docker group: `sudo usermod -aG docker $USER`') : (lang === 'pt' ? '- Instalar Docker Desktop para Windows\n- Ativar WSL2 como backend' : '- Install Docker Desktop for Windows\n- Enable WSL2 backend')) : (lang === 'pt' ? `- Instalar Node.js ${config.nodeVersion}: usar nvm ou installer oficial\n- Instalar ${config.serveWith}` : `- Install Node.js ${config.nodeVersion}: use nvm or official installer\n- Install ${config.serveWith}`),
    `\n### 2. ${lang === 'pt' ? 'Build & Package' : 'Build & Package'}`,
    isContainer ? (lang === 'pt' ? `- Criar \`Dockerfile\` (multi-stage build recomendado)\n- Build: \`docker build -t ${config.projectName || 'app'} .\`` : `- Create \`Dockerfile\` (multi-stage build recommended)\n- Build: \`docker build -t ${config.projectName || 'app'} .\``) : (lang === 'pt' ? `- Instalar deps: \`npm install\`\n- Build: \`${config.buildCommand}\`` : `- Install deps: \`npm install\`\n- Build: \`${config.buildCommand}\``),
    `\n### 3. ${lang === 'pt' ? 'Deploy & Run' : 'Deploy & Run'}`,
    isContainer ? (lang === 'pt' ? `- Run: \`docker run -d --name ${config.projectName || 'app'} -p ${config.exposedPort}:${config.exposedPort} --restart unless-stopped ${config.projectName || 'app'}\`` : `- Run: \`docker run -d --name ${config.projectName || 'app'} -p ${config.exposedPort}:${config.exposedPort} --restart unless-stopped ${config.projectName || 'app'}\``) : (lang === 'pt' ? `- Copiar ficheiros de \`${config.outputDir}\` para o diretório de serving\n- Iniciar server: \`${config.serveWith === 'pm2' ? 'pm2 start' : config.serveWith === 'node' ? 'node server.js' : 'systemctl start ' + config.serveWith}\`` : `- Copy files from \`${config.outputDir}\` to serving directory\n- Start server: \`${config.serveWith === 'pm2' ? 'pm2 start' : config.serveWith === 'node' ? 'node server.js' : 'systemctl start ' + config.serveWith}\``),
    `\n### 4. ${lang === 'pt' ? 'Verificar' : 'Verify'}`,
    lang === 'pt' ? `- Testar: \`curl http://localhost:${config.exposedPort}\`\n- Verificar logs${isContainer ? ': `docker logs ' + (config.projectName || 'app') + '`' : ''}` : `- Test: \`curl http://localhost:${config.exposedPort}\`\n- Check logs${isContainer ? ': `docker logs ' + (config.projectName || 'app') + '`' : ''}`
  ];
  builder.addSection(`## 🚀 ${stepsTitle}`, steps);

  if (config.extraNotes.trim()) {
    builder.addSection(`## 📝 ${strings.notes}`, config.extraNotes);
  }

  return builder.build('Deploy');
}
