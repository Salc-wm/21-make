import { useState, memo, useMemo } from 'react';
import {
  Server, Container, Cpu, Globe, HardDrive, RefreshCw, Activity,
  FileText, ChevronDown, ChevronUp, Sparkles, Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DeployPromptConfig } from '../deployTypes';
import {
  projectTypes, targetOSOptions, environmentTypes, vmProviders,
  containerPlatforms, baseImages, nodeVersions, serveMethods,
  reverseProxies, sslMethods, ciCdOptions, registryOptions,
  healthcheckOptions, loggingOptions, backupStrategies,
  deployAutomationPlatforms, queueSystems, workflowScaling,
} from '../data/options/deployOptions';
import { SectionCard } from './SectionCard';
import { SelectField } from './SelectField';
import { TextField } from './TextField';
import { OptionCards } from './OptionCards';
import { t } from '../core/PromptBuilder';

interface DeployFormProps {
  config: DeployPromptConfig;
  onUpdate: <K extends keyof DeployPromptConfig>(key: K, value: DeployPromptConfig[K]) => void;
  promptLength: number;
  isInheriting?: boolean;
}

type DeploySectionId = 'project' | 'env' | 'container' | 'build' | 'network' | 'storage' | 'cicd' | 'monitor' | 'automation' | 'extras';

export const DeployForm = memo(function DeployForm({ config, onUpdate, promptLength, isInheriting }: DeployFormProps) {
  const lang = config.promptLanguage === 'en' ? 'en' : 'pt';
  const strings = t(lang);
  const isContainer = config.environmentType === 'container';

  const completionCount = useMemo(() => {
    let count = 0;
    if (config.projectName) count++;
    if (config.projectDescription) count++;
    if (config.domain) count++;
    if (config.envVars) count++;
    if (config.volumes) count++;
    return count;
  }, [config.projectName, config.projectDescription, config.domain, config.envVars, config.volumes]);

  return (
    <div className="w-full space-y-4">
      {/* Stats bar */}
      <div className="flex items-center gap-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="h-2 w-2 rounded-full bg-teal-500" />
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
        <div className="flex items-center gap-2 rounded-lg border border-teal-200 dark:border-teal-900/50 bg-teal-50 dark:bg-teal-900/10 p-3 mb-4 text-xs text-teal-800 dark:text-teal-400">
          <Sparkles className="h-4 w-4 shrink-0" />
          <p>
            <strong>{strings.inheritedContext}:</strong> {strings.inheritedDevDesc}
          </p>
        </div>
      )}

      <div className="columns-1 xl:columns-2 2xl:columns-3 gap-4">
      {/* Project */}
      <DeployCollapsible id="project" title={strings.project} icon={<Server className="h-4 w-4" />} defaultOpen>
        <SectionCard icon={<Server className="h-4 w-4" />} title={strings.project} description={strings.deployProjectDesc}>
          <TextField label={strings.name} value={config.projectName} onChange={v => onUpdate('projectName', v)} placeholder="Ex: meu-saas-app" />
          <TextField label={strings.description} value={config.projectDescription} onChange={v => onUpdate('projectDescription', v)} placeholder="Ex: Dashboard SaaS com Next.js + Prisma" multiline rows={2} />
          <OptionCards label={strings.type} value={config.projectType} onChange={v => onUpdate('projectType', v)} options={projectTypes} />
        </SectionCard>
      </DeployCollapsible>

      {/* Environment */}
      <DeployCollapsible id="env" title={strings.environmentOS} icon={<Cpu className="h-4 w-4" />} defaultOpen>
        <SectionCard icon={<Cpu className="h-4 w-4" />} title={strings.environmentOS} description={strings.envDesc}>
          <OptionCards label={lang === 'en' ? 'Operating System' : 'Sistema Operativo'} value={config.targetOS} onChange={v => onUpdate('targetOS', v)} options={targetOSOptions} />
          <OptionCards label={lang === 'en' ? 'Environment Type' : 'Tipo de Ambiente'} value={config.environmentType} onChange={v => onUpdate('environmentType', v)} options={environmentTypes} />
          {config.environmentType === 'vm' && (
            <SelectField label="Provedor VM" value={config.vmProvider} onChange={v => onUpdate('vmProvider', v)} options={vmProviders} />
          )}
        </SectionCard>
      </DeployCollapsible>

      {/* Container (conditional) */}
      {isContainer && (
        <DeployCollapsible id="container" title={strings.container} icon={<Container className="h-4 w-4" />} defaultOpen>
          <SectionCard icon={<Container className="h-4 w-4" />} title={strings.container} description={strings.containerDesc}>
            <OptionCards label="Plataforma" value={config.containerPlatform} onChange={v => onUpdate('containerPlatform', v)} options={containerPlatforms} />
            <OptionCards label="Imagem Base" value={config.baseImage} onChange={v => onUpdate('baseImage', v)} options={baseImages} />
            {config.baseImage === 'custom' && (
              <TextField label="Imagem Custom" value={config.customBaseImage} onChange={v => onUpdate('customBaseImage', v)} placeholder="Ex: myregistry.io/my-base:latest" />
            )}
          </SectionCard>
        </DeployCollapsible>
      )}

      {/* Build & Runtime */}
      <DeployCollapsible id="build" title={strings.buildRuntime} icon={<Cpu className="h-4 w-4" />} defaultOpen>
        <SectionCard icon={<Cpu className="h-4 w-4" />} title={strings.buildRuntime} description={strings.buildDesc}>
          <OptionCards label="Node.js Version" value={config.nodeVersion} onChange={v => onUpdate('nodeVersion', v)} options={nodeVersions} />
          <TextField label="Build Command" value={config.buildCommand} onChange={v => onUpdate('buildCommand', v)} placeholder="npm run build" />
          <TextField label="Output Directory" value={config.outputDir} onChange={v => onUpdate('outputDir', v)} placeholder="dist" />
          <OptionCards label="Servir Com" value={config.serveWith} onChange={v => onUpdate('serveWith', v)} options={serveMethods} />
          <TextField label="Variáveis de Ambiente" value={config.envVars} onChange={v => onUpdate('envVars', v)} placeholder={"DATABASE_URL=postgresql://...\nNODE_ENV=production\nAPI_KEY=xxx"} multiline rows={3} />
        </SectionCard>
      </DeployCollapsible>

      {/* Networking */}
      <DeployCollapsible id="network" title={strings.networking} icon={<Globe className="h-4 w-4" />}>
        <SectionCard icon={<Globe className="h-4 w-4" />} title={strings.networking} description={strings.networkDesc}>
          <TextField label="Porta Exposta" value={config.exposedPort} onChange={v => onUpdate('exposedPort', v)} placeholder="80" />
          <OptionCards label="Reverse Proxy" value={config.reverseProxy} onChange={v => onUpdate('reverseProxy', v)} options={reverseProxies} />
          <OptionCards label="SSL / TLS" value={config.sslMethod} onChange={v => onUpdate('sslMethod', v)} options={sslMethods} />
          <TextField label="Domínio" value={config.domain} onChange={v => onUpdate('domain', v)} placeholder="Ex: app.meudominio.com" />
        </SectionCard>
      </DeployCollapsible>

      {/* Storage */}
      <DeployCollapsible id="storage" title={strings.storage} icon={<HardDrive className="h-4 w-4" />}>
        <SectionCard icon={<HardDrive className="h-4 w-4" />} title={strings.storage} description={strings.storageDesc}>
          <TextField label="Volumes / Mounts" value={config.volumes} onChange={v => onUpdate('volumes', v)} placeholder="Ex: ./data:/app/data, postgres-data:/var/lib/postgresql/data" multiline rows={2} />
          <OptionCards label="Backup" value={config.backupStrategy} onChange={v => onUpdate('backupStrategy', v)} options={backupStrategies} />
        </SectionCard>
      </DeployCollapsible>

      {/* CI/CD */}
      <DeployCollapsible id="cicd" title={strings.cicdRegistry} icon={<RefreshCw className="h-4 w-4" />}>
        <SectionCard icon={<RefreshCw className="h-4 w-4" />} title={strings.cicdRegistry} description={strings.cicdDesc}>
          <OptionCards label="CI/CD" value={config.ciCd} onChange={v => onUpdate('ciCd', v)} options={ciCdOptions} />
          <OptionCards label="Container Registry" value={config.registry} onChange={v => onUpdate('registry', v)} options={registryOptions} />
        </SectionCard>
      </DeployCollapsible>

      {/* Monitoring */}
      <DeployCollapsible id="monitor" title={strings.monitoring} icon={<Activity className="h-4 w-4" />}>
        <SectionCard icon={<Activity className="h-4 w-4" />} title={strings.monitoring} description={strings.monitorDesc}>
          <OptionCards label="Healthcheck" value={config.healthcheck} onChange={v => onUpdate('healthcheck', v)} options={healthcheckOptions} />
          <OptionCards label="Logging" value={config.logging} onChange={v => onUpdate('logging', v)} options={loggingOptions} />
        </SectionCard>
      </DeployCollapsible>

      {/* Automation & Orchestration */}
      <DeployCollapsible id="automation" title={strings.automationOrchestration} icon={<Bot className="h-4 w-4" />}>
        <SectionCard icon={<Bot className="h-4 w-4" />} title={strings.automationOrchestration} description={strings.orchestrationDesc}>
          <OptionCards label="Plataforma" value={config.automationPlatform} onChange={v => onUpdate('automationPlatform', v)} options={deployAutomationPlatforms} />
          {config.automationPlatform !== 'none' && (
            <>
              <OptionCards label="Queue System" value={config.queueSystem} onChange={v => onUpdate('queueSystem', v)} options={queueSystems} />
              <OptionCards label="Escalonamento" value={config.workflowScaling} onChange={v => onUpdate('workflowScaling', v)} options={workflowScaling} />
              <TextField label="Notas de Automação" value={config.automationNotes} onChange={v => onUpdate('automationNotes', v)} placeholder="Ex: n8n rodando como container Docker separado..." multiline rows={3} />
            </>
          )}
        </SectionCard>
      </DeployCollapsible>

      {/* Extra Notes */}
      <DeployCollapsible id="extras" title={strings.notes} icon={<FileText className="h-4 w-4" />}>
        <SectionCard icon={<FileText className="h-4 w-4" />} title={strings.notes} description={strings.notesDesc}>
          <TextField label="Notas Livres" value={config.extraNotes} onChange={v => onUpdate('extraNotes', v)} placeholder="Ex: Usar docker-compose para orquestrar com DB..." multiline rows={4} />
        </SectionCard>
      </DeployCollapsible>
      </div>
    </div>
  );
});

// Local collapsible
function DeployCollapsible({
  id: _id,
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  id: DeploySectionId;
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
