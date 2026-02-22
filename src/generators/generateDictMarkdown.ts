import type { ArchitectureDictionary } from '../architectureDictionary';

function line(key: string, value: string | number): string {
  if (!value || value === 'none' || value === 'Nenhum' || value === 'Nenhum / N/A') return '';
  return `- **${key}:** ${value}\n`;
}

function listLines(items: string[]): string {
  const filtered = items.filter(Boolean);
  if (filtered.length === 0) return '';
  return filtered.map(i => `  - ${i}`).join('\n') + '\n';
}

export function generateDictMarkdown(dict: ArchitectureDictionary): string {
  const isPT = dict.meta.language === 'pt';
  const roleText = isPT
    ? `Você é o arquiteto técnico responsável pelo projeto "${dict.meta.name}". Use este Architecture Dictionary como fonte única de verdade para todas as decisões técnicas, de design e de deployment.`
    : `You are the technical architect responsible for the project "${dict.meta.name}". Use this Architecture Dictionary as the single source of truth for all technical, design, and deployment decisions.`;

  const s: string[] = [
    `# 📖 Architecture Dictionary — ${dict.meta.name}\n`,
    `> Generated: ${dict.meta.generatedAt}  \n`,
    `> ${roleText}\n`,
    dict.meta.description ? `> ${dict.meta.description}\n` : '',
  ];

  if (dict.meta.appType || dict.meta.appPageType) {
    s.push(
      `\n## 📋 ${isPT ? 'Projeto' : 'Project'}\n`,
      line(isPT ? 'Nome' : 'Name', dict.meta.name),
      line(isPT ? 'Descrição' : 'Description', dict.meta.description),
      line(isPT ? 'Tipo' : 'Type', dict.meta.appType || ''),
      line(isPT ? 'Estrutura' : 'Structure', dict.meta.appPageType || '')
    );
    if (dict.meta.numberOfPages && dict.meta.numberOfPages > 1) {
      s.push(`- **${isPT ? 'Número de Páginas' : 'Number of Pages'}:** ${dict.meta.numberOfPages}\n`);
    }
    if (dict.meta.sessionDetails) {
      const sessionEntries = Object.entries(dict.meta.sessionDetails).filter(([, v]) => v.trim());
      if (sessionEntries.length > 0) {
        s.push(`\n### ${isPT ? 'Estrutura de Páginas' : 'Page Structure'}\n`);
        sessionEntries.forEach(([key, value]) => {
          s.push(`- **${isPT ? 'Página' : 'Page'} ${key}:** ${value}\n`);
        });
      }
    }
  }

  if (dict.meta.guidelines && dict.meta.guidelines.length > 0) {
    s.push(`\n## 🎯 ${isPT ? 'Diretrizes Gerais' : 'General Guidelines'}\n`, listLines(dict.meta.guidelines));
  }

  s.push(
    // ── Visual Style ──────────────────────────────────
    `\n## 🎨 ${isPT ? 'Estilo Visual' : 'Visual Style'}\n`,
    line(isPT ? 'Estilo de Design' : 'Design Style', dict.design.style),
    line(isPT ? 'Paleta de Cores' : 'Color Palette', dict.design.colorScheme),
    line('Mode', dict.design.darkMode),
    line('Border Radius', dict.design.borderRadius),
    line(isPT ? 'Densidade' : 'Density', dict.design.density),
    
    `\n## 🔤 ${isPT ? 'Tipografia' : 'Typography'}\n`,
    line(isPT ? 'Família' : 'Family', dict.design.typography.family),
    line(isPT ? 'Tamanho Base' : 'Base Size', dict.design.typography.size),
    
    `\n## 📐 ${isPT ? 'Layout & Navegação' : 'Layout & Navigation'}\n`,
    line(isPT ? 'Layout Type' : 'Layout Type', dict.design.layout.type),
    line(isPT ? 'Navegação' : 'Navigation', dict.design.layout.navigation),
    line(isPT ? 'Posição da Sidebar' : 'Sidebar Position', dict.design.layout.sidebarPosition),
    line(isPT ? 'Responsividade' : 'Responsiveness', dict.design.layout.responsiveness)
  );

  if (dict.design.pages.length > 0) {
    s.push(`\n## 📄 ${isPT ? 'Páginas / Ecrãs' : 'Pages / Screens'}\n`);
    dict.design.pages.forEach(p => {
      s.push(`### ${p.name}\n`);
      if (p.description) s.push(`- **${isPT ? 'Descrição' : 'Description'}:** ${p.description}\n`);
      if (p.elements) s.push(`- **${isPT ? 'Elementos' : 'Elements'}:** ${p.elements}\n`);
      if (p.notes) s.push(`- **${isPT ? 'Notas' : 'Notes'}:** ${p.notes}\n`);
    });
  }
  if (dict.design.components.length > 0) {
    s.push(`\n## 🧩 ${isPT ? 'Componentes UI' : 'UI Components'}\n`, listLines(dict.design.components));
  }

  s.push(
    `\n## ✨ ${isPT ? 'Interações & Feedback' : 'Interactions & Feedback'}\n`,
    line(isPT ? 'Animações' : 'Animations', dict.design.interactions.animations)
  );

  if (dict.design.interactions.feedback.length > 0) {
    s.push(`- **${isPT ? 'Feedback visual' : 'Visual feedback'}:**\n`, listLines(dict.design.interactions.feedback.map(f => f.replace('-', ' ').replace(/^\\w/, c => c.toUpperCase()))));
  }

  s.push(
    `\n## 💬 ${isPT ? 'Tom & Linguagem' : 'Tone & Language'}\n`,
    line(isPT ? 'Idioma da UI' : 'UI Language', dict.design.tone.language),
    line(isPT ? 'Tom' : 'Tone', dict.design.tone.tone)
  );

  if (dict.design.tone.rules.length > 0) {
    s.push(listLines(dict.design.tone.rules));
  }

  if (dict.design.notes) {
    s.push(`\n## 📝 ${isPT ? 'Notas Adicionais' : 'Additional Notes'}\n${dict.design.notes}\n`);
  }

  if (dict.design.qualityRules.length > 0) {
    s.push(`\n## ⚙️ ${isPT ? 'Regras de Qualidade' : 'Quality Rules'}\n`, listLines(dict.design.qualityRules));
  }

  s.push(
    // ── Development ──────────────────────────────
    `\n## ⚡ Development\n`,
    line('Framework', dict.development.framework),
    line(isPT ? 'Linguagem' : 'Language', dict.development.language),
    line('CSS / Styling', dict.development.css),
    line('Package Manager', dict.development.packageManager),
    
    `\n### ${isPT ? 'Arquitetura' : 'Architecture'}\n`,
    line('State Management', dict.development.architecture.stateManagement),
    line('Design Pattern', dict.development.architecture.designPattern),
    line(isPT ? 'Padrão de Componentes' : 'Component Pattern', dict.development.architecture.componentPattern),
    line('Routing', dict.development.architecture.routing),
    line(isPT ? 'Organização de Ficheiros' : 'File Organization', dict.development.architecture.fileOrganization),
    
    `\n### API & ${isPT ? 'Dados' : 'Data'}\n`,
    line(isPT ? 'Tipo de API' : 'API Type', dict.development.api.type),
    line(isPT ? 'Autenticação' : 'Authentication', dict.development.api.auth),
    line(isPT ? 'Base de Dados' : 'Database', dict.development.api.database)
  );

  if (dict.development.quality.testing.length > 0) {
    s.push(`\n### ${isPT ? 'Qualidade & Testes' : 'Quality & Testing'}\n- **Testing:**\n`, listLines(dict.development.quality.testing));
  }
  if (dict.development.quality.codeQuality.length > 0) {
    s.push(`- **Code Quality:**\n`, listLines(dict.development.quality.codeQuality));
  }

  s.push(
    `\n## 🤖 ${isPT ? 'Instruções para AI Editor' : 'AI Editor Instructions'}\n`,
    line(isPT ? 'AI Editor Alvo' : 'Target AI Editor', dict.development.aiEditor)
  );

  if (dict.development.aiInstructions) {
    s.push(`\n### ${isPT ? 'Instruções Específicas' : 'Specific Instructions'}\n${dict.development.aiInstructions}\n`);
  }

  s.push(
    `\n## ⚙️ ${isPT ? 'Regras de Implementação' : 'Implementation Rules'}\n`,
    listLines(dict.development.rules),
    `\n### ${isPT ? 'Deploy' : 'Deploy Target'}\n`,
    line('Deploy Target', dict.development.deployTarget)
  );

  if (dict.development.automation.platform !== 'Sem Automação' && dict.development.automation.platform !== 'none') {
    s.push(
      `\n### ${isPT ? 'Automação' : 'Automation'}\n`,
      line(isPT ? 'Plataforma' : 'Platform', dict.development.automation.platform)
    );
    if (dict.development.automation.triggers.length > 0) {
      s.push(`- **Triggers:** ${dict.development.automation.triggers.join(', ')}\n`);
    }
    if (dict.development.automation.gateways.length > 0) {
      s.push(`- **Gateways:** ${dict.development.automation.gateways.join(', ')}\n`);
    }
    s.push(line(isPT ? 'Conector' : 'Connector', dict.development.automation.connector));
    if (dict.development.automation.workflow) {
      s.push(`\n#### Workflow\n${dict.development.automation.workflow}\n`);
    }
  }

  // ── Deployment ───────────────────────────────
  s.push(
    `\n## 🚀 Deployment\n`,
    line(isPT ? 'Tipo de Projeto' : 'Project Type', dict.deployment.projectType),
    
    `\n### ${isPT ? 'Ambiente' : 'Environment'}\n`,
    line('SO', dict.deployment.environment.os),
    line(isPT ? 'Tipo de Ambiente' : 'Environment Type', dict.deployment.environment.type),
    
    `\n### Container\n`,
    line(isPT ? 'Plataforma' : 'Platform', dict.deployment.container.platform),
    line(isPT ? 'Imagem Base' : 'Base Image', dict.deployment.container.baseImage)
  );
  
  if (dict.deployment.container.customImage) {
    s.push(line(isPT ? 'Imagem Custom' : 'Custom Image', dict.deployment.container.customImage));
  }

  s.push(
    `\n### Build & Runtime\n`,
    line('Node.js', dict.deployment.build.nodeVersion),
    line('Build Command', dict.deployment.build.buildCommand),
    line('Output Dir', dict.deployment.build.outputDir),
    line('Serve With', dict.deployment.build.serveWith),
    
    `\n### Networking\n`,
    line(isPT ? 'Porta' : 'Port', dict.deployment.networking.port),
    line('Reverse Proxy', dict.deployment.networking.reverseProxy),
    line('SSL', dict.deployment.networking.ssl)
  );
  
  if (dict.deployment.networking.domain) {
    s.push(line(isPT ? 'Domínio' : 'Domain', dict.deployment.networking.domain));
  }

  s.push(
    `\n### CI/CD\n`,
    line('Pipeline', dict.deployment.cicd.pipeline),
    line('Registry', dict.deployment.cicd.registry),
    
    `\n### ${isPT ? 'Monitorização' : 'Monitoring'}\n`,
    line('Healthcheck', dict.deployment.monitoring.healthcheck),
    line('Logging', dict.deployment.monitoring.logging)
  );

  if (dict.deployment.automation.platform !== 'Nenhum' && dict.deployment.automation.platform !== 'none') {
    s.push(
      `\n### ${isPT ? 'Automação & Orquestração' : 'Automation & Orchestration'}\n`,
      line(isPT ? 'Plataforma' : 'Platform', dict.deployment.automation.platform),
      line('Queue', dict.deployment.automation.queueSystem),
      line(isPT ? 'Escalonamento' : 'Scaling', dict.deployment.automation.scaling)
    );
    if (dict.deployment.automation.notes) {
      s.push(`\n#### ${isPT ? 'Notas' : 'Notes'}\n${dict.deployment.automation.notes}\n`);
    }
  }

  // ── Automation Flows ───────────────────────────
  if (dict.automationFlows && dict.automationFlows.targetPlatform) {
    s.push(
      `\n## 🔄 ${dict.meta.language === 'pt' ? 'Fluxos de Automação' : 'Automation Flows'}\n`,
      line(isPT ? 'Plataforma Alvo' : 'Target Platform', dict.automationFlows.targetPlatform),
      line(isPT ? 'Tipo de Automação' : 'Automation Type', dict.automationFlows.automationType),
      line(isPT ? 'Tipo de Trigger' : 'Trigger Type', dict.automationFlows.triggerType),
      line('Error Handling', dict.automationFlows.errorHandling),
      line('Retries', dict.automationFlows.retries)
    );

    if (dict.automationFlows.coreNodes && dict.automationFlows.coreNodes.length > 0) {
      s.push(`\n### ${isPT ? 'Nós Principais' : 'Core Nodes'}\n`, listLines(dict.automationFlows.coreNodes));
    }
    if (dict.automationFlows.authRequirements && dict.automationFlows.authRequirements.length > 0) {
      s.push(`\n### ${isPT ? 'Requisitos de Autenticação' : 'Auth Requirements'}\n`, listLines(dict.automationFlows.authRequirements));
    }
    if (dict.automationFlows.customInstructions) {
      s.push(`\n### ${isPT ? 'Instruções Personalizadas' : 'Custom Instructions'}\n${dict.automationFlows.customInstructions}\n`);
    }
  }

  // Footer
  s.push(`\n---\n*Architecture Dictionary gerado automaticamente pelo Prompt Generator*\n`);

  return s.filter(Boolean).join('');
}
