import type { ArchitectureDictionary } from '../architectureDictionary';

/**
 * Pure XML format.
 * XML tags provide structure for programmatic consumption.
 */
export function generateDictXML(dict: ArchitectureDictionary): string {
  const isPT = dict.meta.language === 'pt';
  const s: string[] = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<architecture-dictionary name="${esc(dict.meta.name)}" generated="${dict.meta.generatedAt}">\n`
  ];

  if (dict.meta.description) {
    s.push(`  <description>${esc(dict.meta.description)}</description>\n`);
  }

  if (dict.meta.appType || dict.meta.appPageType) {
    const projectTag = isPT ? 'projeto' : 'project';
    s.push(`  <${projectTag}>`);
    s.push(kv(isPT ? 'tipo' : 'type', dict.meta.appType || ''));
    s.push(kv(isPT ? 'estrutura' : 'structure', dict.meta.appPageType || ''));
    if (dict.meta.numberOfPages && dict.meta.numberOfPages > 1) {
      s.push(kv(isPT ? 'numero-de-paginas' : 'number-of-pages', dict.meta.numberOfPages.toString()));
    }
    if (dict.meta.sessionDetails) {
      const sessionEntries = Object.entries(dict.meta.sessionDetails).filter(([, v]) => v.trim());
      if (sessionEntries.length > 0) {
        const pagesTag = isPT ? 'estrutura-de-paginas' : 'page-structure';
        s.push(`    <${pagesTag}>`);
        sessionEntries.forEach(([key, value]) => {
          s.push(`      <page id="${key}">${esc(value)}</page>`);
        });
        s.push(`    </${pagesTag}>`);
      }
    }
    s.push(`  </${projectTag}>\n`);
  }

  if (dict.meta.guidelines && dict.meta.guidelines.length > 0) {
    const glTag = isPT ? 'diretrizes-gerais' : 'general-guidelines';
    s.push(`  <${glTag}>`);
    dict.meta.guidelines.forEach(g => s.push(`    <guideline>${esc(g)}</guideline>`));
    s.push(`  </${glTag}>\n`);
  }

  // ── Visual Style ──────────────────────────────────
  s.push(`  <design>`);
  s.push(`    <visual-style>`);
  s.push(kv(isPT ? 'estilo-de-design' : 'design-style', dict.design.style));
  s.push(kv(isPT ? 'paleta-de-cores' : 'color-palette', dict.design.colorScheme));
  s.push(kv('mode', dict.design.darkMode));
  s.push(kv('border-radius', dict.design.borderRadius));
  s.push(kv(isPT ? 'densidade' : 'density', dict.design.density));
  s.push(`    </visual-style>`);

  s.push(`    <typography>`);
  s.push(kv(isPT ? 'familia' : 'family', dict.design.typography.family));
  s.push(kv(isPT ? 'tamanho' : 'size', dict.design.typography.size));
  s.push(`    </typography>`);

  s.push(`    <layout-and-navigation>`);
  s.push(kv(isPT ? 'tipo-de-layout' : 'layout-type', dict.design.layout.type));
  s.push(kv(isPT ? 'navegacao' : 'navigation', dict.design.layout.navigation));
  s.push(kv(isPT ? 'posicao-sidebar' : 'sidebar-position', dict.design.layout.sidebarPosition));
  s.push(kv(isPT ? 'responsividade' : 'responsiveness', dict.design.layout.responsiveness));
  s.push(`    </layout-and-navigation>`);

  const pagesTag = isPT ? 'paginas' : 'pages';
  if (dict.design.pages.length > 0) {
    s.push(`    <${pagesTag}>`);
    dict.design.pages.forEach(p => {
      s.push(`      <page name="${esc(p.name)}">`);
      if (p.description) s.push(`        <description>${esc(p.description)}</description>`);
      if (p.elements) s.push(`        <elements>${esc(p.elements)}</elements>`);
      if (p.notes) s.push(`        <notes>${esc(p.notes)}</notes>`);
      s.push(`      </page>`);
    });
    s.push(`    </${pagesTag}>`);
  }
  
  const componentsTag = isPT ? 'componentes' : 'components';
  if (dict.design.components.length > 0) {
    s.push(`    <${componentsTag}>`);
    dict.design.components.forEach(c => s.push(`      <component>${esc(c)}</component>`));
    s.push(`    </${componentsTag}>`);
  }

  const interactionsTag = isPT ? 'interacoes-e-feedback' : 'interactions-and-feedback';
  s.push(`    <${interactionsTag}>`);
  s.push(kv(isPT ? 'animacoes' : 'animations', dict.design.interactions.animations));
  if (dict.design.interactions.feedback.length > 0) {
    s.push(`      <visual-feedback>`);
    dict.design.interactions.feedback.forEach(f => s.push(`        <item>${esc(f.replace('-', ' ').replace(/^\\w/, c => c.toUpperCase()))}</item>`));
    s.push(`      </visual-feedback>`);
  }
  s.push(`    </${interactionsTag}>`);

  const toneTag = isPT ? 'tom-e-linguagem' : 'tone-and-language';
  s.push(`    <${toneTag}>`);
  s.push(kv(isPT ? 'idioma' : 'language', dict.design.tone.language));
  s.push(kv(isPT ? 'tom' : 'tone', dict.design.tone.tone));
  if (dict.design.tone.rules.length > 0) {
    s.push(`      <rules>`);
    dict.design.tone.rules.forEach(r => s.push(`        <rule>${esc(r)}</rule>`));
    s.push(`      </rules>`);
  }
  s.push(`    </${toneTag}>`);

  if (dict.design.notes) {
    const notesTag = isPT ? 'notas-adicionais' : 'additional-notes';
    s.push(`    <${notesTag}>\n      ${esc(dict.design.notes)}\n    </${notesTag}>`);
  }

  if (dict.design.qualityRules.length > 0) {
    const qrTag = isPT ? 'regras-de-qualidade' : 'quality-rules';
    s.push(`    <${qrTag}>`);
    dict.design.qualityRules.forEach(r => s.push(`      <rule>${esc(r)}</rule>`));
    s.push(`    </${qrTag}>`);
  }
  s.push(`  </design>\n`);

  // ── Development ─────────────────────────────
  s.push(`  <development>`);
  s.push(`    <tech-stack>`);
  s.push(kv('framework', dict.development.framework));
  s.push(kv(isPT ? 'linguagem' : 'language', dict.development.language));
  s.push(kv('css-styling', dict.development.css));
  s.push(kv('package-manager', dict.development.packageManager));
  s.push(`    </tech-stack>`);

  const arcTag = isPT ? 'arquitetura' : 'architecture';
  s.push(`    <${arcTag}>`);
  s.push(kv('state-management', dict.development.architecture.stateManagement));
  s.push(kv('design-pattern', dict.development.architecture.designPattern));
  s.push(kv(isPT ? 'padrao-de-componentes' : 'component-pattern', dict.development.architecture.componentPattern));
  s.push(kv('routing', dict.development.architecture.routing));
  s.push(kv(isPT ? 'organizacao-de-ficheiros' : 'file-organization', dict.development.architecture.fileOrganization));
  s.push(`    </${arcTag}>`);

  const apiTag = isPT ? 'api-e-dados' : 'api-and-data';
  s.push(`    <${apiTag}>`);
  s.push(kv(isPT ? 'tipo-de-api' : 'api-type', dict.development.api.type));
  s.push(kv(isPT ? 'autenticacao' : 'authentication', dict.development.api.auth));
  s.push(kv(isPT ? 'base-de-dados' : 'database', dict.development.api.database));
  s.push(`    </${apiTag}>`);

  if (dict.development.quality.testing.length > 0 || dict.development.quality.codeQuality.length > 0) {
    const qualityTag = isPT ? 'qualidade-e-testes' : 'quality-and-testing';
    s.push(`    <${qualityTag}>`);
    if (dict.development.quality.testing.length > 0) {
      s.push(`      <testing>`);
      dict.development.quality.testing.forEach(t => s.push(`        <item>${esc(t)}</item>`));
      s.push(`      </testing>`);
    }
    if (dict.development.quality.codeQuality.length > 0) {
      s.push(`      <code-quality>`);
      dict.development.quality.codeQuality.forEach(q => s.push(`        <item>${esc(q)}</item>`));
      s.push(`      </code-quality>`);
    }
    s.push(`    </${qualityTag}>`);
  }

  const aiTag = isPT ? 'instrucoes-ai-editor' : 'ai-editor-instructions';
  s.push(`    <${aiTag}>`);
  s.push(kv(isPT ? 'ai-editor-alvo' : 'target-ai-editor', dict.development.aiEditor));
  if (dict.development.aiInstructions) {
    const instTag = isPT ? 'instrucoes-especificas' : 'specific-instructions';
    s.push(`      <${instTag}>${esc(dict.development.aiInstructions)}</${instTag}>`);
  }
  s.push(`    </${aiTag}>`);

  if (dict.development.rules && dict.development.rules.length > 0) {
    const rulesTag = isPT ? 'regras-de-implementacao' : 'implementation-rules';
    s.push(`    <${rulesTag}>`);
    dict.development.rules.forEach(r => s.push(`      <rule>${esc(r)}</rule>`));
    s.push(`    </${rulesTag}>`);
  }

  s.push(kv('deploy-target', dict.development.deployTarget));

  if (dict.development.automation.platform !== 'Sem Automação' && dict.development.automation.platform !== 'none') {
    const autoTag = isPT ? 'automacao' : 'automation';
    s.push(`    <${autoTag}>`);
    s.push(kv(isPT ? 'plataforma' : 'platform', dict.development.automation.platform));
    if (dict.development.automation.triggers.length > 0) {
      s.push(`      <triggers>`);
      dict.development.automation.triggers.forEach(t => s.push(`        <item>${esc(t)}</item>`));
      s.push(`      </triggers>`);
    }
    if (dict.development.automation.gateways.length > 0) {
      s.push(`      <gateways>`);
      dict.development.automation.gateways.forEach(g => s.push(`        <item>${esc(g)}</item>`));
      s.push(`      </gateways>`);
    }
    s.push(kv(isPT ? 'conector' : 'connector', dict.development.automation.connector));
    if (dict.development.automation.workflow) {
      s.push(`      <workflow-description>${esc(dict.development.automation.workflow)}</workflow-description>`);
    }
    s.push(`    </${autoTag}>`);
  }
  s.push(`  </development>\n`);

  // ── Deployment ──────────────────────────────
  s.push(`  <deployment>`);
  
  const envTag = isPT ? 'ambiente' : 'environment';
  s.push(`    <${envTag}>`);
  s.push(kv(isPT ? 'tipo-de-projeto' : 'project-type', dict.deployment.projectType));
  s.push(kv('so', dict.deployment.environment.os));
  s.push(kv(isPT ? 'tipo-de-ambiente' : 'environment-type', dict.deployment.environment.type));
  s.push(`    </${envTag}>`);

  s.push(`    <container>`);
  s.push(kv(isPT ? 'plataforma' : 'platform', dict.deployment.container.platform));
  s.push(kv(isPT ? 'imagem-base' : 'base-image', dict.deployment.container.baseImage));
  if (dict.deployment.container.customImage) {
    s.push(kv(isPT ? 'imagem-custom' : 'custom-image', dict.deployment.container.customImage));
  }
  s.push(`    </container>`);
  
  s.push(`    <build-runtime>`);
  s.push(kv('nodejs', dict.deployment.build.nodeVersion));
  s.push(kv('build-command', dict.deployment.build.buildCommand));
  s.push(kv('output-dir', dict.deployment.build.outputDir));
  s.push(kv('serve-with', dict.deployment.build.serveWith));
  s.push(`    </build-runtime>`);

  s.push(`    <networking>`);
  s.push(kv(isPT ? 'porta' : 'port', dict.deployment.networking.port));
  s.push(kv('reverse-proxy', dict.deployment.networking.reverseProxy));
  s.push(kv('ssl', dict.deployment.networking.ssl));
  if (dict.deployment.networking.domain) {
    s.push(kv(isPT ? 'dominio' : 'domain', dict.deployment.networking.domain));
  }
  s.push(`    </networking>`);
  
  s.push(`    <cicd>`);
  s.push(kv('pipeline', dict.deployment.cicd.pipeline));
  s.push(kv('registry', dict.deployment.cicd.registry));
  s.push(`    </cicd>`);

  const monTag = isPT ? 'monitorizacao' : 'monitoring';
  s.push(`    <${monTag}>`);
  s.push(kv('healthcheck', dict.deployment.monitoring.healthcheck));
  s.push(kv('logging', dict.deployment.monitoring.logging));
  s.push(`    </${monTag}>`);

  if (dict.deployment.automation.platform !== 'Nenhum' && dict.deployment.automation.platform !== 'none') {
    const orchTag = isPT ? 'automacao-e-orquestracao' : 'automation-and-orchestration';
    s.push(`    <${orchTag}>`);
    s.push(kv(isPT ? 'plataforma' : 'platform', dict.deployment.automation.platform));
    s.push(kv('queue', dict.deployment.automation.queueSystem));
    s.push(kv(isPT ? 'escalonamento' : 'scaling', dict.deployment.automation.scaling));
    if (dict.deployment.automation.notes) {
      s.push(`      <notes>${esc(dict.deployment.automation.notes)}</notes>`);
    }
    s.push(`    </${orchTag}>`);
  }
  s.push(`  </deployment>\n`);

  // ── Automation Flows ───────────────────────────
  if (dict.automationFlows && dict.automationFlows.targetPlatform) {
    s.push(`  <automation-flows>`);
    
    const configTag = isPT ? 'configuracao' : 'configuration';
    s.push(`    <${configTag}>`);
    s.push(kv(isPT ? 'plataforma-alvo' : 'target-platform', dict.automationFlows.targetPlatform));
    s.push(kv(isPT ? 'tipo-de-automacao' : 'automation-type', dict.automationFlows.automationType));
    s.push(kv(isPT ? 'tipo-de-trigger' : 'trigger-type', dict.automationFlows.triggerType));
    s.push(kv('error-handling', dict.automationFlows.errorHandling));
    s.push(kv('retries', dict.automationFlows.retries));
    s.push(`    </${configTag}>`);

    if (dict.automationFlows.coreNodes && dict.automationFlows.coreNodes.length > 0) {
      const nodesTag = isPT ? 'nos-principais' : 'core-nodes';
      s.push(`    <${nodesTag}>`);
      dict.automationFlows.coreNodes.forEach(n => s.push(`      <node>${esc(n)}</node>`));
      s.push(`    </${nodesTag}>`);
    }
    
    if (dict.automationFlows.authRequirements && dict.automationFlows.authRequirements.length > 0) {
      const authTag = isPT ? 'autenticacao' : 'auth-requirements';
      s.push(`    <${authTag}>`);
      dict.automationFlows.authRequirements.forEach(a => s.push(`      <requirement>${esc(a)}</requirement>`));
      s.push(`    </${authTag}>`);
    }

    if (dict.automationFlows.customInstructions) {
      const instTag = isPT ? 'instrucoes' : 'instructions';
      s.push(`    <${instTag}>${esc(dict.automationFlows.customInstructions)}</${instTag}>`);
    }

    s.push(`  </automation-flows>\n`);
  }

  s.push(`</architecture-dictionary>`);

  return s.filter(Boolean).join('\n');
}

// ── Helpers ───────────────────────────────────
function kv(key: string, value: string): string {
  if (!value || value === 'none' || value === 'Nenhum' || value === 'Nenhum / N/A' || value === 'Sem Automação') return '';
  return `      <${key}>${esc(value)}</${key}>`;
}

function esc(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
