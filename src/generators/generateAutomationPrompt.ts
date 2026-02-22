import type { AutomationPromptConfig } from '../automationTypes';
import type { PromptConfig as DesignPromptConfig } from '../types';

export function generateAutomationPrompt(
  config: AutomationPromptConfig,
  inheritedDesign?: DesignPromptConfig
): string {
  const isPT = config.promptLanguage === 'pt';

  const s: string[] = [];

  // ── Mission & Context ──────────────────────────────
  const role = isPT
    ? `Você é um Engenheiro de Automação Especialista focado em orquestrar workflows usando ${config.targetPlatform}.
Sua missão é projetar, documentar e (se possível) fornecer o JSON final/código para uma automação robusta, resiliente e de falha-segura.`
    : `You are an Expert Automation Engineer focused on orchestrating workflows using ${config.targetPlatform}.
Your mission is to design, document, and (if possible) provide the final JSON/code for a robust, resilient, and fail-safe automation.`;

  s.push(`# System Prompt: Automation Engineer\n\n${role}\n\n`);

  s.push(`## 1. Project Context\n`);
  if (config.projectName) {
    s.push(`- **${isPT ? 'Projeto' : 'Project'}**: ${config.projectName}\n`);
  }
  if (config.projectDescription) {
    s.push(`- **${isPT ? 'Descrição' : 'Description'}**: ${config.projectDescription}\n`);
  }
  if (inheritedDesign) {
    s.push(`- **${isPT ? 'Contexto de Design' : 'Design Context'}**: This automation supports a frontend with ${inheritedDesign.pages.length} pages and ${inheritedDesign.components.length} core components.\n`);
  }
  s.push(`- **${isPT ? 'Tom da Comunicação' : 'Tone'}**: ${config.tone}\n\n`);

  // ── Technical Architecture ────────────────────────
  s.push(`## 2. Technical Architecture\n`);
  s.push(`- **${isPT ? 'Plataforma Alvo' : 'Target Platform'}**: ${config.targetPlatform}\n`);
  s.push(`- **${isPT ? 'Tipo de Automação' : 'Automation Type'}**: ${config.automationType}\n`);
  s.push(`- **${isPT ? 'Gatilho' : 'Trigger'}**: ${config.triggerType}\n`);
  
  if (config.coreNodes.length > 0) {
    s.push(`- **${isPT ? 'Nós Essenciais' : 'Core Nodes'}**: ${config.coreNodes.join(', ')}\n`);
  }
  if (config.authRequirements.length > 0) {
    s.push(`- **${isPT ? 'Autenticação' : 'Authentication'}**: ${config.authRequirements.join(', ')}\n`);
  }
  s.push('\n');

  // ── Resilience & Rules ─────────────────────────
  s.push(`## 3. Resilience & Failure Handling\n`);
  s.push(`- **${isPT ? 'Em caso de erro' : 'Error Handling'}**: ${config.errorHandling}\n`);
  s.push(`- **${isPT ? 'Política de Retentativas' : 'Retry Policy'}**: ${config.retries}\n\n`);

  const instructions = isPT
    ? `1. Esboce a arquitetura lógica do fluxo passo-a-passo.
2. Identifique quaisquer transformações de dados ou mapeamentos necessários entre os nós.
3. Certifique-se de que os sub-fluxos de Erro / Retentativa estejam cobertos.`
    : `1. Outline the logical step-by-step flow architecture.
2. Identify any required data transformations or mappings between nodes.
3. Ensure the Error / Retry sub-flows are covered.`;

  s.push(`## 4. Output Instructions\n${instructions}\n\n`);

  if (config.targetPlatform.toLowerCase() === 'n8n') {
    const n8nRule = isPT
      ? `IMPORTANTE: Ao final, forneça o JSON exportado do workflow formato n8n dentro de um bloco de código \`\`\`json, para que eu possa simplesmente copiar e colar diretamente no painel do n8n.`
      : `IMPORTANT: At the end, provide the exported n8n workflow JSON inside a \`\`\`json code block, so I can simply copy and paste it directly into the n8n canvas.`;
    s.push(`> ${n8nRule}\n\n`);
  }

  // ── Custom Instructions ────────────────────────
  if (config.customInstructions.trim()) {
    s.push(`## 5. Custom Requirements / Logic\n${config.customInstructions}\n\n`);
  }

  s.push(`---\n*${isPT ? 'Por favor, aguarde minhas instruções específicas e cenários de dados antes de gerar a arquitetura completa.' : 'Please wait for my specific instructions and data scenarios before generating the full architecture.'}*`);

  return s.join('');
}
