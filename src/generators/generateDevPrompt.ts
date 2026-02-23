import type { DevPromptConfig } from '../devTypes';
import type { PromptConfig as DesignPromptConfig } from '../types';
import { generatePrompt as generateDesignPrompt } from './generatePrompt';
import {
  getFrameworks, getDevLanguages, getCssApproaches, getStateManagementOptions, getDesignPatterns, getComponentPatterns, getRoutingApproaches, getFileOrganizations, getApiTypes, getAuthApproaches, getDatabases, getPackageManagers, getTestingOptions, getCodeQualityOptions, getAiEditors, getDeployTargets, getAutomationPlatforms, getAutomationTriggers, getAutomationGateways, getAutomationConnectors
} from '../data/options/devOptions';
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
  const fwInfo = getFrameworks(lang).find(f => f.value === config.framework);
  builder.addSection(`## ⚡ ${strings.techStack}`, [
    builder.addField('Framework', config.framework, getFrameworks(lang)) + (fwInfo?.desc ? ` — ${fwInfo.desc}` : ''),
    builder.addField(lang === 'pt' ? 'Linguagem' : 'Language', config.language, getDevLanguages(lang)),
    builder.addField('CSS / Styling', config.cssApproach, getCssApproaches(lang)),
    builder.addField('Package Manager', config.packageManager, getPackageManagers(lang))
  ]);

  // Architecture
  const dpInfo = getDesignPatterns(lang).find(p => p.value === config.designPattern);
  builder.addSection(`## 🏗️ ${strings.architecture}`, [
    builder.addField('State Management', config.stateManagement, getStateManagementOptions(lang)),
    config.designPattern !== 'none' ? builder.addField('Design Pattern', config.designPattern, getDesignPatterns(lang)) + (dpInfo?.desc ? ` — ${dpInfo.desc}` : '') : '',
    builder.addField(lang === 'pt' ? 'Padrão de Componentes' : 'Component Pattern', config.componentPattern, getComponentPatterns(lang)),
    builder.addField('Routing', config.routingApproach, getRoutingApproaches(lang)),
    builder.addField(lang === 'pt' ? 'Organização de Ficheiros' : 'File Organization', config.fileOrganization, getFileOrganizations(lang))
  ]);

  // API & Data
  if (config.apiType !== 'none' || config.authApproach !== 'none' || config.database !== 'none') {
    builder.addSection(`## 🔌 ${strings.apiData}`, [
      builder.addField(lang === 'pt' ? 'Tipo de API' : 'API Type', config.apiType, getApiTypes(lang)),
      config.authApproach !== 'none' ? builder.addField(lang === 'pt' ? 'Autenticação' : 'Authentication', config.authApproach, getAuthApproaches(lang)) : '',
      config.database !== 'none' ? builder.addField(lang === 'pt' ? 'Base de Dados' : 'Database', config.database, getDatabases(lang)) : ''
    ]);
  }

  // Quality & Testing
  if (config.testing.length > 0 || config.codeQuality.length > 0) {
    builder.addSection(`## 🧪 ${strings.qualityTesting}`, [
      config.testing.length > 0 ? `**Testing:**\n${builder.addList(config.testing.map(v => {
        const found = getTestingOptions(lang).find(o => o.value === v);
        return found?.label ?? v;
      }))}` : '',
      config.codeQuality.length > 0 ? `\n**${lang === 'pt' ? 'Qualidade de Código' : 'Code Quality'}:**\n${builder.addList(config.codeQuality.map(v => {
        const found = getCodeQualityOptions(lang).find(o => o.value === v);
        return found?.label ?? v;
      }))}` : ''
    ]);
  }

  // AI Editor
  const editorInfo = getAiEditors(lang).find(e => e.value === config.aiEditor);
  builder.addSection(`## 🤖 ${strings.aiInstructions}`, [
    builder.addField(lang === 'pt' ? 'AI Editor Alvo' : 'Target AI Editor', config.aiEditor, getAiEditors(lang)) + (editorInfo?.desc ? ` — ${editorInfo.desc}` : ''),
    config.aiInstructions.trim() ? `\n### ${lang === 'pt' ? 'Instruções Específicas' : 'Specific Instructions'}\n${config.aiInstructions}` : ''
  ]);

  // Deploy Target
  if (config.deployTarget !== 'none') {
    builder.addSection(`## 🚀 ${strings.deploy}`, builder.addField('Target', config.deployTarget, getDeployTargets(lang)));
  }

  // Automation
  if (config.automationPlatform !== 'none') {
    const platInfo = getAutomationPlatforms(lang).find(p => p.value === config.automationPlatform);
    builder.addSection(`## 🔄 ${strings.automationWorkflows}`, [
      builder.addField(lang === 'pt' ? 'Plataforma' : 'Platform', config.automationPlatform, getAutomationPlatforms(lang)) + (platInfo?.desc ? ` — ${platInfo.desc}` : ''),
      config.getAutomationTriggers(lang).length > 0 ? builder.addField('Triggers', config.getAutomationTriggers(lang).map(v => {
        const found = getAutomationTriggers(lang).find(o => o.value === v);
        return found?.label ?? v;
      }).join(', ')) : '',
      config.getAutomationGateways(lang).length > 0 ? `**${lang === 'pt' ? 'Gateways' : 'Gateways'}:**\n${builder.addList(config.getAutomationGateways(lang).map(v => {
        const found = getAutomationGateways(lang).find(o => o.value === v);
        return found?.label ?? v;
      }))}` : '',
      builder.addField(lang === 'pt' ? 'Conector' : 'Connector', config.automationConnector, getAutomationConnectors(lang)),
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
