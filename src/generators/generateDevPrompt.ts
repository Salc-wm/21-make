import type { DevPromptConfig } from '../devTypes';
import type { PromptConfig as DesignPromptConfig } from '../types';
import { generatePrompt as generateDesignPrompt } from './generatePrompt';
import {
  frameworks, devLanguages, cssApproaches, stateManagementOptions,
  designPatterns, componentPatterns, routingApproaches, fileOrganizations,
  apiTypes, authApproaches, databases, packageManagers,
  testingOptions, codeQualityOptions, aiEditors, deployTargets,
  automationPlatforms, automationTriggers, automationGateways, automationConnectors,
} from '../data/devOptions';
import { PromptBuilder, t } from '../core/PromptBuilder';

export function generateDevPrompt(config: DevPromptConfig, inheritedDesign?: DesignPromptConfig): string {
  const lang = config.promptLanguage === 'en' ? 'en' : 'pt';
  const builder = new PromptBuilder(lang);
  const strings = t(lang);

  // Project
  builder.addSection(`# 📋 ${strings.project}`, [
    builder.addField(strings.name, config.projectName),
    builder.addField(strings.description, config.projectDescription),
    config.designReference ? `\n### ${lang === 'pt' ? 'Referência de Design' : 'Design Reference'}\n${config.designReference}` : ''
  ]);

  // Inherited Design
  if (inheritedDesign) {
    const rawDesign = generateDesignPrompt(inheritedDesign).replace(/\n*---\n*\*Prompt.*$/i, '').trim();
    builder.addSection(`## 🎨 UI/UX Design Specifications`, [
      `> **${lang === 'pt' ? 'Nota: Segue estritamente as especificações de design abaixo.' : 'Note: Strictly follow the design specifications provided below.'}**`,
      '',
      rawDesign
    ]);
  }

  // Tech Stack
  const fwInfo = frameworks.find(f => f.value === config.framework);
  builder.addSection(`## ⚡ ${strings.techStack}`, [
    builder.addField('Framework', config.framework, frameworks) + (fwInfo?.desc ? ` — ${fwInfo.desc}` : ''),
    builder.addField(lang === 'pt' ? 'Linguagem' : 'Language', config.language, devLanguages),
    builder.addField('CSS / Styling', config.cssApproach, cssApproaches),
    builder.addField('Package Manager', config.packageManager, packageManagers)
  ]);

  // Architecture
  const dpInfo = designPatterns.find(p => p.value === config.designPattern);
  builder.addSection(`## 🏗️ ${strings.architecture}`, [
    builder.addField('State Management', config.stateManagement, stateManagementOptions),
    config.designPattern !== 'none' ? builder.addField('Design Pattern', config.designPattern, designPatterns) + (dpInfo?.desc ? ` — ${dpInfo.desc}` : '') : '',
    builder.addField(lang === 'pt' ? 'Padrão de Componentes' : 'Component Pattern', config.componentPattern, componentPatterns),
    builder.addField('Routing', config.routingApproach, routingApproaches),
    builder.addField(lang === 'pt' ? 'Organização de Ficheiros' : 'File Organization', config.fileOrganization, fileOrganizations)
  ]);

  // API & Data
  if (config.apiType !== 'none' || config.authApproach !== 'none' || config.database !== 'none') {
    builder.addSection(`## 🔌 ${strings.apiData}`, [
      builder.addField(lang === 'pt' ? 'Tipo de API' : 'API Type', config.apiType, apiTypes),
      config.authApproach !== 'none' ? builder.addField(lang === 'pt' ? 'Autenticação' : 'Authentication', config.authApproach, authApproaches) : '',
      config.database !== 'none' ? builder.addField(lang === 'pt' ? 'Base de Dados' : 'Database', config.database, databases) : ''
    ]);
  }

  // Quality & Testing
  if (config.testing.length > 0 || config.codeQuality.length > 0) {
    builder.addSection(`## 🧪 ${strings.qualityTesting}`, [
      config.testing.length > 0 ? `**Testing:**\n${builder.addList(config.testing.map(v => {
        const found = testingOptions.find(o => o.value === v);
        return found?.label ?? v;
      }))}` : '',
      config.codeQuality.length > 0 ? `\n**${lang === 'pt' ? 'Qualidade de Código' : 'Code Quality'}:**\n${builder.addList(config.codeQuality.map(v => {
        const found = codeQualityOptions.find(o => o.value === v);
        return found?.label ?? v;
      }))}` : ''
    ]);
  }

  // AI Editor
  const editorInfo = aiEditors.find(e => e.value === config.aiEditor);
  builder.addSection(`## 🤖 ${strings.aiInstructions}`, [
    builder.addField(lang === 'pt' ? 'AI Editor Alvo' : 'Target AI Editor', config.aiEditor, aiEditors) + (editorInfo?.desc ? ` — ${editorInfo.desc}` : ''),
    config.aiInstructions.trim() ? `\n### ${lang === 'pt' ? 'Instruções Específicas' : 'Specific Instructions'}\n${config.aiInstructions}` : ''
  ]);

  // Deploy Target
  if (config.deployTarget !== 'none') {
    builder.addSection(`## 🚀 ${strings.deploy}`, builder.addField('Target', config.deployTarget, deployTargets));
  }

  // Automation
  if (config.automationPlatform !== 'none') {
    const platInfo = automationPlatforms.find(p => p.value === config.automationPlatform);
    builder.addSection(`## 🔄 ${strings.automationWorkflows}`, [
      builder.addField(lang === 'pt' ? 'Plataforma' : 'Platform', config.automationPlatform, automationPlatforms) + (platInfo?.desc ? ` — ${platInfo.desc}` : ''),
      config.automationTriggers.length > 0 ? builder.addField('Triggers', config.automationTriggers.map(v => {
        const found = automationTriggers.find(o => o.value === v);
        return found?.label ?? v;
      }).join(', ')) : '',
      config.automationGateways.length > 0 ? `**${lang === 'pt' ? 'Gateways' : 'Gateways'}:**\n${builder.addList(config.automationGateways.map(v => {
        const found = automationGateways.find(o => o.value === v);
        return found?.label ?? v;
      }))}` : '',
      builder.addField(lang === 'pt' ? 'Conector' : 'Connector', config.automationConnector, automationConnectors),
      config.automationWorkflow.trim() ? `\n### ${lang === 'pt' ? 'Descrição do Workflow' : 'Workflow Description'}\n${config.automationWorkflow}` : '',
      `\n> ${lang === 'pt' ? 'Implementar endpoints/webhooks necessários para integração com a plataforma de automação. Garantir payload JSON consistente e documentação dos endpoints.' : 'Implement necessary endpoints/webhooks for integration with the automation platform. Ensure consistent JSON payloads and endpoint documentation.'}`
    ]);
  }

  // Rules
  builder.addSection(`## ⚙️ ${strings.rules}`, builder.addList(lang === 'pt' ? [
    'Implementa o design **pixel-perfect** seguindo as imagens/referências de design fornecidas',
    'Todo o código deve ser **production-ready** — sem placeholders, sem TODOs, sem código comentado',
    'Componentes **reutilizáveis** e bem estruturados com tipos TypeScript completos',
    '**Responsivo** — mobile-first ou desktop-first conforme indicado',
    '**Acessível** — semântica HTML correta, ARIA labels, keyboard navigation',
    'Seguir as **convenções da framework** escolhida e best practices da comunidade',
    'Ficheiros organizados de forma **clara e consistente** segundo o padrão indicado',
    'Nomes de variáveis, funções e componentes **descritivos e em inglês**',
    'Tratamento de **erros e edge cases** — loading, empty, error states',
    'Código **limpo e legível** — sem duplicação, funções curtas, single responsibility'
  ] : [
    'Implement the design **pixel-perfect** following the provided design images/references',
    'All code must be **production-ready** — no placeholders, no TODOs, no commented-out code',
    '**Reusable** and well-structured components with complete TypeScript types',
    '**Responsive** — mobile-first or desktop-first as indicated',
    '**Accessible** — proper HTML semantics, ARIA labels, keyboard navigation',
    'Follow the chosen **framework conventions** and community best practices',
    'Files organized in a **clear and consistent** structure per the indicated pattern',
    'Variable, function, and component names should be **descriptive and in English**',
    'Proper **error and edge case handling** — loading, empty, error states',
    'Clean and **readable code** — no duplication, short functions, single responsibility'
  ]));

  if (config.extraNotes.trim()) {
    builder.addSection(`## 📝 ${strings.notes}`, config.extraNotes);
  }

  return builder.build('Developer');
}
