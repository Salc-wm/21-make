import { useMemo } from 'react';
import {
  Layers, Zap, Puzzle, Bot, Rocket, FileText,
  ChevronDown, ChevronUp, Sparkles, Workflow, Cpu, Code, Database, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DevPromptConfig } from '../devTypes';
import {
  frameworks, devLanguages, cssApproaches, stateManagementOptions,
  designPatterns, componentPatterns, routingApproaches, fileOrganizations,
  apiTypes, authApproaches, databases, packageManagers,
  testingOptions, codeQualityOptions, aiEditors, deployTargets,
  automationPlatforms, automationTriggers, automationGateways, automationConnectors,
} from '../data/devOptions';
import { SectionCard } from './SectionCard';
import { SelectField } from './SelectField';
import { TextField } from './TextField';
import { CheckboxGroup } from './CheckboxGroup';
import { OptionCards } from './OptionCards';
import { t } from '../core/PromptBuilder';

interface DevFormProps {
  config: DevPromptConfig;
  onUpdate: <K extends keyof DevPromptConfig>(key: K, value: DevPromptConfig[K]) => void;
  promptLength: number;
  isInheriting?: boolean;
}

type DevSectionId = 'project' | 'tech' | 'arch' | 'api' | 'quality' | 'ai' | 'deploy' | 'automation' | 'extras';

export function DevForm({ config, onUpdate, promptLength, isInheriting }: DevFormProps) {
  const strings = t(config.promptLanguage === 'en' ? 'en' : 'pt');
  
  const completionCount = useMemo(() => {
    let count = 0;
    if (config.projectName) count++;
    if (config.projectDescription) count++;
    if (config.designReference) count++;
    if (config.testing.length > 0) count++;
    if (config.codeQuality.length > 0) count++;
    return count;
  }, [config]);

  return (
    <div className="w-full space-y-4">
      {/* Stats bar */}
      <div className="flex items-center gap-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span>{completionCount}/5 {strings.fieldsFilled}</span>
        </div>
        <div className="ml-auto flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5" title="Estimativa baseada em 1 token ≈ 4 caracteres">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>≈ {Math.ceil(promptLength / 4).toLocaleString()} {strings.tokens}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{promptLength.toLocaleString()} {strings.characters}</span>
          </div>
        </div>
      </div>

      {isInheriting && (
        <div className="flex items-center gap-2 rounded-lg border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-900/10 p-3 mb-4 text-xs text-indigo-800 dark:text-indigo-300">
          <Sparkles className="h-4 w-4 shrink-0" />
          <p>
            <strong>{strings.inheritedContext}:</strong> {strings.inheritedDesignDesc}
          </p>
        </div>
      )}

      <div className="columns-1 xl:columns-2 2xl:columns-3 gap-4">
      {/* Project & Design Reference */}
      <DevCollapsible
        id="project"
        title={`${strings.project} & Design`}
        icon={<Layers className="h-4 w-4" />}
        defaultOpen
      >
        <SectionCard
          icon={<Layers className="h-4 w-4" />}
          title={`${strings.project} & Referência de Design`}
          description="Contexto do projeto e designs existentes"
        >
          <TextField
            label={strings.name}
            value={config.projectName}
            onChange={v => onUpdate('projectName', v)}
            placeholder="Ex: TaskFlow Dashboard"
          />
          <TextField
            label={strings.description}
            value={config.projectDescription}
            onChange={v => onUpdate('projectDescription', v)}
            placeholder="Ex: Dashboard SaaS de gestão de projetos com Kanban, timeline e analytics"
            multiline
            rows={2}
          />
          <TextField
            label="Referência de Design"
            value={config.designReference}
            onChange={v => onUpdate('designReference', v)}
            placeholder="Ex: Seguir as imagens de design geradas anteriormente..."
            multiline
            rows={4}
          />
        </SectionCard>
      </DevCollapsible>

      {/* Tech Stack */}
      <DevCollapsible
        id="tech"
        title={strings.techStack}
        icon={<Zap className="h-4 w-4" />}
        defaultOpen
      >
        <SectionCard
          icon={<Cpu className="h-4 w-4" />}
          title={strings.project}
          description={strings.devProjectDesc}
        >
          <OptionCards
            label="Framework"
            value={config.framework}
            onChange={v => onUpdate('framework', v)}
            options={frameworks}
          />
          <OptionCards
            label={strings.language || 'Linguagem'}
            value={config.language}
            onChange={v => onUpdate('language', v)}
            options={devLanguages}
          />
          <OptionCards
            label="CSS / Styling"
            value={config.cssApproach}
            onChange={v => onUpdate('cssApproach', v)}
            options={cssApproaches}
          />
          <OptionCards
            label="Package Manager"
            value={config.packageManager}
            onChange={v => onUpdate('packageManager', v)}
            options={packageManagers}
          />
        </SectionCard>
      </DevCollapsible>

      {/* Architecture */}
      <DevCollapsible
        id="arch"
        title={strings.architecture}
        icon={<Puzzle className="h-4 w-4" />}
        defaultOpen
      >
        <SectionCard
          icon={<Code className="h-4 w-4" />}
          title={strings.architecture}
          description={strings.patternsDesc}
        >
          <OptionCards
            label="State Management"
            value={config.stateManagement}
            onChange={v => onUpdate('stateManagement', v)}
            options={stateManagementOptions}
          />
          <OptionCards
            label="Design Pattern"
            value={config.designPattern}
            onChange={v => onUpdate('designPattern', v)}
            options={designPatterns}
          />
          <OptionCards
            label="Padrão de Componentes"
            value={config.componentPattern}
            onChange={v => onUpdate('componentPattern', v)}
            options={componentPatterns}
          />
          <SelectField
            label="Routing"
            value={config.routingApproach}
            onChange={v => onUpdate('routingApproach', v)}
            options={routingApproaches}
          />
          <OptionCards
            label="Organização de Ficheiros"
            value={config.fileOrganization}
            onChange={v => onUpdate('fileOrganization', v)}
            options={fileOrganizations}
          />
        </SectionCard>
      </DevCollapsible>

      {/* API & Data */}
      <DevCollapsible
        id="api"
        title={strings.apiData}
        icon={<Database className="h-4 w-4" />}
      >
        <SectionCard
          icon={<Database className="h-4 w-4" />}
          title={strings.apiData}
          description={strings.apiDesc}
        >
          <SelectField
            label="Tipo de API"
            value={config.apiType}
            onChange={v => onUpdate('apiType', v)}
            options={apiTypes}
          />
          <SelectField
            label="Autenticação"
            value={config.authApproach}
            onChange={v => onUpdate('authApproach', v)}
            options={authApproaches}
          />
          <SelectField
            label="Base de Dados"
            value={config.database}
            onChange={v => onUpdate('database', v)}
            options={databases}
          />
        </SectionCard>
      </DevCollapsible>

      {/* Quality & Testing */}
      <DevCollapsible
        id="quality"
        title={strings.qualityTesting}
        icon={<ShieldCheck className="h-4 w-4" />}
      >
        <SectionCard
          icon={<ShieldCheck className="h-4 w-4" />}
          title={strings.qualityTesting}
          description={strings.qualityDesc}
        >
          <CheckboxGroup
            label="Testing"
            options={testingOptions}
            selected={config.testing}
            onChange={v => onUpdate('testing', v)}
            columns={2}
          />
          <CheckboxGroup
            label="Qualidade de Código"
            options={codeQualityOptions}
            selected={config.codeQuality}
            onChange={v => onUpdate('codeQuality', v)}
            columns={2}
          />
        </SectionCard>
      </DevCollapsible>

      {/* AI Editor Instructions */}
      <DevCollapsible
        id="ai"
        title="AI Editor"
        icon={<Bot className="h-4 w-4" />}
        defaultOpen
      >
        <SectionCard
          icon={<Bot className="h-4 w-4" />}
          title={strings.aiInstructions}
          description="Configura como o AI editor deve implementar"
        >
          <OptionCards
            label="AI Editor Alvo"
            value={config.aiEditor}
            onChange={v => onUpdate('aiEditor', v)}
            options={aiEditors}
          />
          <TextField
            label="Instruções Específicas"
            value={config.aiInstructions}
            onChange={v => onUpdate('aiInstructions', v)}
            placeholder="Ex: Implementar todos os componentes como Server Components..."
            multiline
            rows={4}
          />
        </SectionCard>
      </DevCollapsible>

      {/* Deploy */}
      <DevCollapsible
        id="deploy"
        title={strings.deploy}
        icon={<Rocket className="h-4 w-4" />}
      >
        <SectionCard
          icon={<Rocket className="h-4 w-4" />}
          title={strings.deploy}
          description="Target de deploy"
        >
          <SelectField
            label="Deploy Target"
            value={config.deployTarget}
            onChange={v => onUpdate('deployTarget', v)}
            options={deployTargets}
          />
        </SectionCard>
      </DevCollapsible>

      {/* Automation & Workflows */}
      <DevCollapsible
        id="automation"
        title={strings.automationWorkflows}
        icon={<Workflow className="h-4 w-4" />}
      >
        <SectionCard
          icon={<Workflow className="h-4 w-4" />}
          title={strings.automationWorkflows}
          description={strings.automationDesc}
        >
          <OptionCards
            label="Plataforma de Automação"
            value={config.automationPlatform}
            onChange={v => onUpdate('automationPlatform', v)}
            options={automationPlatforms}
          />
          {config.automationPlatform !== 'none' && (
            <>
              <CheckboxGroup
                label="Tipos de Trigger"
                selected={config.automationTriggers}
                onChange={v => onUpdate('automationTriggers', v)}
                options={automationTriggers}
              />
              <CheckboxGroup
                label="Padrões de Gateway"
                selected={config.automationGateways}
                onChange={v => onUpdate('automationGateways', v)}
                options={automationGateways}
              />
              <SelectField
                label="Conector com a App"
                value={config.automationConnector}
                onChange={v => onUpdate('automationConnector', v)}
                options={automationConnectors}
              />
              <TextField
                label="Descrição do Workflow"
                value={config.automationWorkflow}
                onChange={v => onUpdate('automationWorkflow', v)}
                placeholder="Ex: Quando um utilizador submete um formulário..."
                multiline
                rows={4}
              />
            </>
          )}
        </SectionCard>
      </DevCollapsible>

      {/* Extra Notes */}
      <DevCollapsible
        id="extras"
        title={strings.notes}
        icon={<FileText className="h-4 w-4" />}
      >
        <SectionCard
          icon={<FileText className="h-4 w-4" />}
          title={strings.notes}
          description={strings.notesDesc}
        >
          <TextField
            label="Notas Livres"
            value={config.extraNotes}
            onChange={v => onUpdate('extraNotes', v)}
            placeholder="Ex: Usar a mesma estrutura existente em /src/components..."
            multiline
            rows={4}
          />
        </SectionCard>
      </DevCollapsible>
      </div>
    </div>
  );
}

// Local collapsible section for DevForm
import { useState } from 'react';

function DevCollapsible({
  id: _id,
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  id: DevSectionId;
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  void _id;

  return (
    <div className="break-inside-avoid mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 flex w-full items-center justify-between rounded-lg px-1 py-1 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {icon}
          {title}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-zinc-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
            animate={{ height: 'auto', opacity: 1, transitionEnd: { overflow: 'visible' } }}
            exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
