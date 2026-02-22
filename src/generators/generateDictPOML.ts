import type { ArchitectureDictionary } from '../architectureDictionary';

/**
 * Generates a POML (Prompt Orchestration Markup Language) document
 * following a structured format — designed for optimal LLM ingestion.
 * Markdown lists and bold headers are replaced with a clean property structure.
 */
export function generateDictPOML(dict: ArchitectureDictionary): string {
  const isPT = dict.meta.language === 'pt';
  const roleText = isPT
    ? `Você é o arquiteto técnico responsável pelo projeto "${dict.meta.name}". Use este Architecture Dictionary como fonte única de verdade para todas as decisões técnicas, de design e de deployment.`
    : `You are the technical architect responsible for the project "${dict.meta.name}". Use this Architecture Dictionary as the single source of truth for all technical, design, and deployment decisions.`;

  const taskText = isPT
    ? `Ao receber qualquer pedido relacionado a este projeto, consulte primeiro este dicionário de arquitetura para garantir consistência. Todas as respostas devem estar alinhadas com as escolhas técnicas aqui definidas.`
    : `When receiving any request related to this project, first consult this architecture dictionary to ensure consistency. All responses must be aligned with the technical choices defined here.`;

  const s: string[] = [
    `<poml>\n`,
    `<role>\n${roleText}\n</role>\n`,
    `<task>\n${taskText}\n</task>\n`,
  ];

  if (dict.meta.appType || dict.meta.appPageType) {
    s.push(
      `<context title="${isPT ? 'Projeto' : 'Project'}">\n`,
      `  <document title="${isPT ? 'Informações Gerais' : 'General Information'}">`,
      prop(isPT ? 'Nome' : 'Name', dict.meta.name),
      prop(isPT ? 'Descrição' : 'Description', dict.meta.description),
      prop(isPT ? 'Tipo' : 'Type', dict.meta.appType || ''),
      prop(isPT ? 'Estrutura' : 'Structure', dict.meta.appPageType || ''),
      `  </document>\n`
    );

    if (dict.meta.numberOfPages && dict.meta.numberOfPages > 1) {
      s.push(`  <document title="${isPT ? 'Número de Páginas' : 'Number of Pages'}">\n    ${dict.meta.numberOfPages}\n  </document>\n`);
    }

    if (dict.meta.sessionDetails) {
      const sessionEntries = Object.entries(dict.meta.sessionDetails).filter(([, v]) => v.trim());
      if (sessionEntries.length > 0) {
        s.push(`  <document title="${isPT ? 'Estrutura de Páginas' : 'Page Structure'}">\n${sessionEntries.map(([key, value]) => `    <page id="${key}">${value}</page>`).join('\n')}\n  </document>\n`);
      }
    }
    s.push(`</context>\n`);
  }

  if (dict.meta.guidelines && dict.meta.guidelines.length > 0) {
    s.push(
      `<context title="${isPT ? 'Diretrizes Gerais' : 'General Guidelines'}">\n`,
      `  <document title="${isPT ? 'Regras' : 'Rules'}">\n${dict.meta.guidelines.map(g => `    <item>${g}</item>`).join('\n')}\n  </document>\n`,
      `</context>\n`
    );
  }

  s.push(
    // Context — Visual Style
    `<context title="${isPT ? 'Especificações de Design' : 'Design Specifications'}">\n`,
    `  <document title="${isPT ? 'Estilo Visual' : 'Visual Style'}">`,
    prop(isPT ? 'Estilo de Design' : 'Design Style', dict.design.style),
    prop(isPT ? 'Paleta de Cores' : 'Color Palette', dict.design.colorScheme),
    prop('Mode', dict.design.darkMode),
    prop('Border Radius', dict.design.borderRadius),
    prop(isPT ? 'Densidade' : 'Density', dict.design.density),
    `  </document>\n`,
    
    `  <document title="${isPT ? 'Tipografia' : 'Typography'}">`,
    prop(isPT ? 'Família' : 'Family', dict.design.typography.family),
    prop(isPT ? 'Tamanho' : 'Size', dict.design.typography.size),
    `  </document>\n`,

    `  <document title="${isPT ? 'Layout & Navegação' : 'Layout & Navigation'}">`,
    prop(isPT ? 'Layout Type' : 'Layout Type', dict.design.layout.type),
    prop(isPT ? 'Navegação' : 'Navigation', dict.design.layout.navigation),
    prop(isPT ? 'Posição da Sidebar' : 'Sidebar Position', dict.design.layout.sidebarPosition),
    prop(isPT ? 'Responsividade' : 'Responsiveness', dict.design.layout.responsiveness),
    `  </document>\n`
  );

  if (dict.design.pages.length > 0) {
    s.push(`  <document title="${isPT ? 'Páginas' : 'Pages'}">`);
    dict.design.pages.forEach(p => {
      if (!p.description && !p.elements && !p.notes) {
        s.push(`    <page>${p.name}</page>`);
      } else {
        s.push(`    <page name="${p.name}">`);
        if (p.description) s.push(`      description: ${p.description}`);
        if (p.elements) s.push(`      elements: ${p.elements}`);
        if (p.notes) s.push(`      notes: ${p.notes}`);
        s.push(`    </page>`);
      }
    });
    s.push(`  </document>\n`);
  }
  if (dict.design.components.length > 0) {
    s.push(`  <document title="${isPT ? 'Componentes' : 'Components'}">\n${dict.design.components.map(c => `    <component>${c}</component>`).join('\n')}\n  </document>\n`);
  }

  s.push(
    `  <document title="${isPT ? 'Interações & Feedback' : 'Interactions & Feedback'}">`,
    prop(isPT ? 'Animações' : 'Animations', dict.design.interactions.animations)
  );
  if (dict.design.interactions.feedback.length > 0) {
    s.push(`    <visual-feedback>\n${dict.design.interactions.feedback.map(f => `      <item>${f.replace('-', ' ').replace(/^\\w/, c => c.toUpperCase())}</item>`).join('\n')}\n    </visual-feedback>`);
  }
  s.push(`  </document>\n`);

  s.push(
    `  <document title="${isPT ? 'Tom & Linguagem' : 'Tone & Language'}">`,
    prop(isPT ? 'Idioma da UI' : 'UI Language', dict.design.tone.language),
    prop(isPT ? 'Tom' : 'Tone', dict.design.tone.tone)
  );
  if (dict.design.tone.rules.length > 0) {
    s.push(`    <rules>\n${dict.design.tone.rules.map(r => `      <rule>${r}</rule>`).join('\n')}\n    </rules>`);
  }
  s.push(`  </document>\n`);

  if (dict.design.notes) {
    s.push(`  <document title="${isPT ? 'Notas Adicionais' : 'Additional Notes'}">\n    ${dict.design.notes}\n  </document>\n`);
  }

  if (dict.design.qualityRules.length > 0) {
    s.push(`  <document title="${isPT ? 'Regras de Qualidade' : 'Quality Rules'}">\n${dict.design.qualityRules.map(r => `    <rule>${r}</rule>`).join('\n')}\n  </document>\n`);
  }

  s.push(`</context>\n`);

  // Context — Development
  s.push(
    `<context title="${isPT ? 'Stack de Desenvolvimento' : 'Development Stack'}">\n`,
    `  <document title="Tech Stack">`,
    prop('Framework', dict.development.framework),
    prop(isPT ? 'Linguagem' : 'Language', dict.development.language),
    prop('CSS / Styling', dict.development.css),
    prop('Package Manager', dict.development.packageManager),
    `  </document>\n`,

    `  <document title="${isPT ? 'Arquitetura' : 'Architecture'}">`,
    prop('State Management', dict.development.architecture.stateManagement),
    prop('Design Pattern', dict.development.architecture.designPattern),
    prop(isPT ? 'Padrão de Componentes' : 'Component Pattern', dict.development.architecture.componentPattern),
    prop('Routing', dict.development.architecture.routing),
    prop(isPT ? 'Organização de Ficheiros' : 'File Organization', dict.development.architecture.fileOrganization),
    `  </document>\n`,

    `  <document title="API & ${isPT ? 'Dados' : 'Data'}">`,
    prop(isPT ? 'Tipo de API' : 'API Type', dict.development.api.type),
    prop(isPT ? 'Autenticação' : 'Authentication', dict.development.api.auth),
    prop(isPT ? 'Base de Dados' : 'Database', dict.development.api.database),
    `  </document>\n`
  );

  if (dict.development.quality.testing.length > 0 || dict.development.quality.codeQuality.length > 0) {
    s.push(`  <document title="${isPT ? 'Qualidade & Testes' : 'Quality & Testing'}">`);
    if (dict.development.quality.testing.length > 0) {
      s.push(`    <testing>\n${dict.development.quality.testing.map(t => `      <item>${t}</item>`).join('\n')}\n    </testing>`);
    }
    if (dict.development.quality.codeQuality.length > 0) {
      s.push(`    <code-quality>\n${dict.development.quality.codeQuality.map(q => `      <item>${q}</item>`).join('\n')}\n    </code-quality>`);
    }
    s.push(`  </document>\n`);
  }

  s.push(
    `  <document title="${isPT ? 'Instruções para AI Editor' : 'AI Editor Instructions'}">`,
    prop(isPT ? 'AI Editor Alvo' : 'Target AI Editor', dict.development.aiEditor)
  );
  if (dict.development.aiInstructions) {
    s.push(`    <instructions>\n${dict.development.aiInstructions}\n    </instructions>`);
  }
  s.push(`  </document>\n`);

  if (dict.development.rules && dict.development.rules.length > 0) {
    s.push(
      `  <document title="${isPT ? 'Regras de Implementação' : 'Implementation Rules'}">\n${dict.development.rules.map(r => `    <item>${r}</item>`).join('\n')}\n  </document>\n`
    );
  }

  if (dict.development.automation.platform !== 'Sem Automação' && dict.development.automation.platform !== 'none') {
    s.push(
      `  <document title="${isPT ? 'Automação' : 'Automation'}">`,
      prop(isPT ? 'Plataforma' : 'Platform', dict.development.automation.platform)
    );
    if (dict.development.automation.triggers.length > 0) {
      s.push(`    <triggers>\n${dict.development.automation.triggers.map(t => `      <item>${t}</item>`).join('\n')}\n    </triggers>`);
    }
    if (dict.development.automation.gateways.length > 0) {
      s.push(`    <gateways>\n${dict.development.automation.gateways.map(g => `      <item>${g}</item>`).join('\n')}\n    </gateways>`);
    }
    s.push(prop(isPT ? 'Conector' : 'Connector', dict.development.automation.connector));
    if (dict.development.automation.workflow) {
      s.push(`    <workflow>\n${dict.development.automation.workflow}\n    </workflow>`);
    }
    s.push(`  </document>\n`);
  }

  s.push(`</context>\n`);

  // Context — Deployment
  s.push(
    `<context title="${isPT ? 'Configuração de Deploy' : 'Deployment Configuration'}">\n`,
    `  <document title="${isPT ? 'Ambiente' : 'Environment'}">`,
    prop(isPT ? 'Tipo de Projeto' : 'Project Type', dict.deployment.projectType),
    prop('SO', dict.deployment.environment.os),
    prop(isPT ? 'Tipo de Ambiente' : 'Environment Type', dict.deployment.environment.type),
    `  </document>\n`,

    `  <document title="Container">`,
    prop(isPT ? 'Plataforma' : 'Platform', dict.deployment.container.platform),
    prop(isPT ? 'Imagem Base' : 'Base Image', dict.deployment.container.baseImage),
    dict.deployment.container.customImage ? prop(isPT ? 'Imagem Custom' : 'Custom Image', dict.deployment.container.customImage) : '',
    `  </document>\n`,

    `  <document title="Build & Runtime">`,
    prop('Node.js', dict.deployment.build.nodeVersion),
    prop('Build', dict.deployment.build.buildCommand),
    prop('Output', dict.deployment.build.outputDir),
    prop('Serve', dict.deployment.build.serveWith),
    `  </document>\n`,

    `  <document title="Networking">`,
    prop(isPT ? 'Porta' : 'Port', dict.deployment.networking.port),
    prop('Reverse Proxy', dict.deployment.networking.reverseProxy),
    prop('SSL', dict.deployment.networking.ssl),
    dict.deployment.networking.domain ? prop(isPT ? 'Domínio' : 'Domain', dict.deployment.networking.domain) : '',
    `  </document>\n`,

    `  <document title="CI/CD">`,
    prop('Pipeline', dict.deployment.cicd.pipeline),
    prop('Registry', dict.deployment.cicd.registry),
    `  </document>\n`,

    `  <document title="${isPT ? 'Monitorização' : 'Monitoring'}">`,
    prop('Healthcheck', dict.deployment.monitoring.healthcheck),
    prop('Logging', dict.deployment.monitoring.logging),
    `  </document>\n`
  );

  if (dict.deployment.automation.platform !== 'Nenhum' && dict.deployment.automation.platform !== 'none') {
    s.push(
      `  <document title="${isPT ? 'Automação de Deploy' : 'Deploy Automation'}">`,
      prop(isPT ? 'Plataforma' : 'Platform', dict.deployment.automation.platform),
      prop('Queue', dict.deployment.automation.queueSystem),
      prop(isPT ? 'Escalonamento' : 'Scaling', dict.deployment.automation.scaling)
    );
    if (dict.deployment.automation.notes) {
      s.push(`    <notes>${dict.deployment.automation.notes}</notes>`);
    }
    s.push(`  </document>\n`);
  }

  s.push(
    `</context>\n`
  );

  // Context — Automation Flows
  if (dict.automationFlows && dict.automationFlows.targetPlatform) {
    s.push(
      `<context title="${isPT ? 'Automações e Fluxos' : 'Automation Flows'}">\n`,
      `  <document title="${isPT ? 'Configuração' : 'Configuration'}">`,
      prop(isPT ? 'Plataforma Alvo' : 'Target Platform', dict.automationFlows.targetPlatform),
      prop(isPT ? 'Tipo de Automação' : 'Automation Type', dict.automationFlows.automationType),
      prop(isPT ? 'Tipo de Trigger' : 'Trigger Type', dict.automationFlows.triggerType),
      prop('Error Handling', dict.automationFlows.errorHandling),
      prop('Retries', dict.automationFlows.retries),
      `  </document>\n`
    );

    if (dict.automationFlows.coreNodes && dict.automationFlows.coreNodes.length > 0) {
      s.push(`  <document title="${isPT ? 'Nós Principais' : 'Core Nodes'}">\n${dict.automationFlows.coreNodes.map(n => `    <node>${n}</node>`).join('\n')}\n  </document>\n`);
    }

    if (dict.automationFlows.authRequirements && dict.automationFlows.authRequirements.length > 0) {
      s.push(`  <document title="${isPT ? 'Autenticação' : 'Auth Requirements'}">\n${dict.automationFlows.authRequirements.map(a => `    <requirement>${a}</requirement>`).join('\n')}\n  </document>\n`);
    }

    if (dict.automationFlows.customInstructions) {
      s.push(`  <document title="${isPT ? 'Instruções' : 'Instructions'}">\n    ${dict.automationFlows.customInstructions}\n  </document>\n`);
    }

    s.push(`</context>\n`);
  }

  s.push(`</poml>`);

  return s.filter(Boolean).join('\n');
}

/**
 * Formats a key-value pair cleanly without Markdown.
 */
function prop(key: string, value: string): string {
  if (!value || value === 'none' || value === 'Nenhum' || value === 'Nenhum / N/A' || value === 'Sem Automação') return '';
  return `    ${key}: ${value}`;
}
