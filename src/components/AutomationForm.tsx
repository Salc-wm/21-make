import { useMemo } from 'react';
import { Layers, Workflow, Route, CheckCircle, ShieldCheck, Zap, Box } from 'lucide-react';
import type { AutomationPromptConfig } from '../automationTypes';
import {
  automationPlatforms, automationTypes, triggerTypes,
  coreNodes, authRequirements, errorHandlingOptions, retryOptions
} from '../data/automationOptions';
import { SectionCard } from './SectionCard';
import { TextField } from './TextField';
import { OptionCards } from './OptionCards';
import { CheckboxGroup } from './CheckboxGroup';
import { t } from '../core/PromptBuilder';
import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function AutoCollapsible({
  id: _id,
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

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

interface AutomationFormProps {
  config: AutomationPromptConfig;
  onUpdate: <K extends keyof AutomationPromptConfig>(key: K, value: AutomationPromptConfig[K]) => void;
  promptLength: number;
}

export function AutomationForm({ config, onUpdate, promptLength }: AutomationFormProps) {
  const strings = t(config.promptLanguage === 'en' ? 'en' : 'pt');

  const completionCount = useMemo(() => {
    let count = 0;
    if (config.projectName) count++;
    if (config.projectDescription) count++;
    if (config.coreNodes.length > 0) count++;
    if (config.authRequirements.length > 0) count++;
    if (config.customInstructions) count++;
    return count;
  }, [config]);

  return (
    <div className="w-full space-y-4">
      {/* Stats bar */}
      <div className="flex items-center gap-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="h-2 w-2 rounded-full bg-sky-500" />
          <span>{completionCount}/5 {strings.fieldsFilled}</span>
        </div>
        <div className="ml-auto flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5" title="Estimativa baseada em 1 token ≈ 4 caracteres">
            <Zap className="h-3.5 w-3.5 text-sky-500" />
            <span>≈ {Math.ceil(promptLength / 4).toLocaleString()} {strings.tokens}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{promptLength.toLocaleString()} {strings.characters}</span>
          </div>
        </div>
      </div>

      <div className="columns-1 xl:columns-2 2xl:columns-3 gap-4">
        {/* Project Context */}
        <AutoCollapsible
          id="project"
          title={strings.project}
          icon={<Layers className="h-4 w-4" />}
          defaultOpen
        >
          <SectionCard
            icon={<Layers className="h-4 w-4" />}
            title={strings.project}
            description="Informações base do projeto de automação"
          >
            <TextField
              label={strings.name}
              value={config.projectName}
              onChange={v => onUpdate('projectName', v)}
              placeholder="Ex: Sync de Leads Diário"
            />
            <TextField
              label={strings.description}
              value={config.projectDescription}
              onChange={v => onUpdate('projectDescription', v)}
              placeholder="Ex: Puxa leads do Typeform, valida o e-mail, insere no Hubspot e envia alert no Slack."
              multiline
              rows={3}
            />
            <TextField
              label="Instruções Customizadas"
              value={config.customInstructions}
              onChange={v => onUpdate('customInstructions', v)}
              placeholder="Ex: Não esquecer de formatar a data para YYYY-MM-DD..."
              multiline
              rows={4}
            />
          </SectionCard>
        </AutoCollapsible>

        {/* Platform & Triggers */}
        <AutoCollapsible
          id="platform"
          title="Plataforma & Trigger"
          icon={<Workflow className="h-4 w-4" />}
          defaultOpen
        >
          <SectionCard
            icon={<Workflow className="h-4 w-4" />}
            title="Arquitetura Core"
            description="Onde e como a automação inicia"
          >
            <OptionCards
              label="Plataforma de Automação"
              value={config.targetPlatform}
              onChange={v => onUpdate('targetPlatform', v)}
              options={automationPlatforms}
            />
            <OptionCards
              label="Tipo de Automação"
              value={config.automationType}
              onChange={v => onUpdate('automationType', v)}
              options={automationTypes}
            />
            <OptionCards
              label="Gatilho (Trigger)"
              value={config.triggerType}
              onChange={v => onUpdate('triggerType', v)}
              options={triggerTypes}
            />
          </SectionCard>
        </AutoCollapsible>

        {/* Nodes & Auth */}
        <AutoCollapsible
          id="nodes"
          title="Segurança & Nós"
          icon={<Box className="h-4 w-4" />}
          defaultOpen
        >
          <SectionCard
            icon={<ShieldCheck className="h-4 w-4" />}
            title="Funcionalidades de Rede"
            description="Nós e níveis de permissões"
          >
            <CheckboxGroup
              label="Nós Essenciais do Workflow"
              options={coreNodes}
              selected={config.coreNodes}
              onChange={v => onUpdate('coreNodes', v)}
            />
            <CheckboxGroup
              label="Requisitos de Autenticação / APIs"
              options={authRequirements}
              selected={config.authRequirements}
              onChange={v => onUpdate('authRequirements', v)}
            />
          </SectionCard>
        </AutoCollapsible>

        {/* Resilience */}
        <AutoCollapsible
          id="resilience"
          title="Resiliência"
          icon={<CheckCircle className="h-4 w-4" />}
          defaultOpen
        >
          <SectionCard
            icon={<Route className="h-4 w-4" />}
            title="Falhas e Retentativas"
            description="Como lidar com quedas de APIs"
          >
            <OptionCards
              label="Em caso de erro em um Nó"
              value={config.errorHandling}
              onChange={v => onUpdate('errorHandling', v)}
              options={errorHandlingOptions}
            />
            <OptionCards
              label="Política de Retentativas"
              value={config.retries}
              onChange={v => onUpdate('retries', v)}
              options={retryOptions}
            />
          </SectionCard>
        </AutoCollapsible>
      </div>
    </div>
  );
}
