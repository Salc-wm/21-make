import { useState, memo, useMemo } from 'react';
import {
  Server, Container, Cpu, Globe, HardDrive, RefreshCw, Activity,
  FileText, ChevronDown, ChevronUp, Sparkles, Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DeployPromptConfig } from '../deployTypes';
import {
  getProjectTypes, getTargetOSOptions, getEnvironmentTypes, getVmProviders,
  getContainerPlatforms, getBaseImages, getNodeVersions, getServeMethods,
  getReverseProxies, getSslMethods, getCiCdOptions, getRegistryOptions,
  getHealthcheckOptions, getLoggingOptions, getBackupStrategies,
  getDeployAutomationPlatforms, getQueueSystems, getWorkflowScaling,
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
  const lang = (config.promptLanguage as import('../core/i18n').Lang) || 'en';
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
          <TextField label={strings.name} value={config.projectName} onChange={v => onUpdate('projectName', v)} placeholder={strings.projectNameHint} />
          <TextField label={strings.description} value={config.projectDescription} onChange={v => onUpdate('projectDescription', v)} placeholder={strings.projectDescHint} multiline rows={2} />
          <OptionCards label={strings.type} value={config.projectType} onChange={v => onUpdate('projectType', v)} options={getProjectTypes(lang)} />
        </SectionCard>
      </DeployCollapsible>

      {/* Environment */}
      <DeployCollapsible id="env" title={strings.environmentOS} icon={<Cpu className="h-4 w-4" />} defaultOpen>
        <SectionCard icon={<Cpu className="h-4 w-4" />} title={strings.environmentOS} description={strings.envDesc}>
          <OptionCards label={strings.osLabel} value={config.targetOS} onChange={v => onUpdate('targetOS', v)} options={getTargetOSOptions(lang)} />
          <OptionCards label={strings.envTypeLabel} value={config.environmentType} onChange={v => onUpdate('environmentType', v)} options={getEnvironmentTypes(lang)} />
          {config.environmentType === 'vm' && (
            <SelectField
              label={strings.vmProviderLabel}
              value={config.vmProvider}
              onChange={v => onUpdate('vmProvider', v)}
              options={getVmProviders(lang)}
              placeholder={strings.selectOption}
            />
          )}
        </SectionCard>
      </DeployCollapsible>

      {/* Container (conditional) */}
      {isContainer && (
        <DeployCollapsible id="container" title={strings.container} icon={<Container className="h-4 w-4" />} defaultOpen>
          <SectionCard icon={<Container className="h-4 w-4" />} title={strings.container} description={strings.containerDesc}>
            <OptionCards label={strings.platformLabel} value={config.containerPlatform} onChange={v => onUpdate('containerPlatform', v)} options={getContainerPlatforms(lang)} />
            <OptionCards label={strings.baseImageLabel} value={config.baseImage} onChange={v => onUpdate('baseImage', v)} options={getBaseImages(lang)} />
            {config.baseImage === 'custom' && (
              <TextField label={strings.customImageLabel} value={config.customBaseImage} onChange={v => onUpdate('customBaseImage', v)} placeholder={strings.customImageHint} />
            )}
          </SectionCard>
        </DeployCollapsible>
      )}

      {/* Build & Runtime */}
      <DeployCollapsible id="build" title={strings.buildRuntime} icon={<Cpu className="h-4 w-4" />} defaultOpen>
        <SectionCard icon={<Cpu className="h-4 w-4" />} title={strings.buildRuntime} description={strings.buildDesc}>
          <OptionCards label={strings.nodeVersionLabel} value={config.nodeVersion} onChange={v => onUpdate('nodeVersion', v)} options={getNodeVersions(lang)} />
          <TextField label={strings.buildCommandLabel} value={config.buildCommand} onChange={v => onUpdate('buildCommand', v)} placeholder={strings.buildCommandHint} />
          <TextField label={strings.outputDirLabel} value={config.outputDir} onChange={v => onUpdate('outputDir', v)} placeholder={strings.outputDirHint} />
          <OptionCards label={strings.serveWithLabel} value={config.serveWith} onChange={v => onUpdate('serveWith', v)} options={getServeMethods(lang)} />
          <TextField label={strings.envVarsLabel} value={config.envVars} onChange={v => onUpdate('envVars', v)} placeholder={strings.envVarsHint} multiline rows={3} />
        </SectionCard>
      </DeployCollapsible>

      {/* Networking */}
      <DeployCollapsible id="network" title={strings.networking} icon={<Globe className="h-4 w-4" />}>
        <SectionCard icon={<Globe className="h-4 w-4" />} title={strings.networking} description={strings.networkDesc}>
          <TextField label={strings.exposedPortLabel} value={config.exposedPort} onChange={v => onUpdate('exposedPort', v)} placeholder={strings.exposedPortHint} />
          <OptionCards label={strings.reverseProxyLabel} value={config.reverseProxy} onChange={v => onUpdate('reverseProxy', v)} options={getReverseProxies(lang)} />
          <OptionCards label={strings.sslLabel} value={config.sslMethod} onChange={v => onUpdate('sslMethod', v)} options={getSslMethods(lang)} />
          <TextField label={strings.domainLabel} value={config.domain} onChange={v => onUpdate('domain', v)} placeholder={strings.domainHint} />
        </SectionCard>
      </DeployCollapsible>

      {/* Storage */}
      <DeployCollapsible id="storage" title={strings.storage} icon={<HardDrive className="h-4 w-4" />}>
        <SectionCard icon={<HardDrive className="h-4 w-4" />} title={strings.storage} description={strings.storageDesc}>
          <TextField label={strings.volumesLabel} value={config.volumes} onChange={v => onUpdate('volumes', v)} placeholder={strings.volumesHint} multiline rows={2} />
          <OptionCards label={strings.backupLabel} value={config.backupStrategy} onChange={v => onUpdate('backupStrategy', v)} options={getBackupStrategies(lang)} />
        </SectionCard>
      </DeployCollapsible>

      {/* CI/CD */}
      <DeployCollapsible id="cicd" title={strings.cicdRegistry} icon={<RefreshCw className="h-4 w-4" />}>
        <SectionCard icon={<RefreshCw className="h-4 w-4" />} title={strings.cicdRegistry} description={strings.cicdDesc}>
          <OptionCards label={strings.cicdLabel} value={config.ciCd} onChange={v => onUpdate('ciCd', v)} options={getCiCdOptions(lang)} />
          <OptionCards label={strings.registryLabel} value={config.registry} onChange={v => onUpdate('registry', v)} options={getRegistryOptions(lang)} />
        </SectionCard>
      </DeployCollapsible>

      {/* Monitoring */}
      <DeployCollapsible id="monitor" title={strings.monitoring} icon={<Activity className="h-4 w-4" />}>
        <SectionCard icon={<Activity className="h-4 w-4" />} title={strings.monitoring} description={strings.monitorDesc}>
          <OptionCards label={strings.healthcheckLabel} value={config.healthcheck} onChange={v => onUpdate('healthcheck', v)} options={getHealthcheckOptions(lang)} />
          <OptionCards label={strings.loggingLabel} value={config.logging} onChange={v => onUpdate('logging', v)} options={getLoggingOptions(lang)} />
        </SectionCard>
      </DeployCollapsible>

      {/* Automation & Orchestration */}
      <DeployCollapsible id="automation" title={strings.automationOrchestration} icon={<Bot className="h-4 w-4" />}>
        <SectionCard icon={<Bot className="h-4 w-4" />} title={strings.automationOrchestration} description={strings.orchestrationDesc}>
          <OptionCards label={strings.platformLabel} value={config.automationPlatform} onChange={v => onUpdate('automationPlatform', v)} options={getDeployAutomationPlatforms(lang)} />
          {config.automationPlatform !== 'none' && (
            <>
              <OptionCards label={strings.queueSystemLabel} value={config.queueSystem} onChange={v => onUpdate('queueSystem', v)} options={getQueueSystems(lang)} />
              <OptionCards label={strings.scalingLabel} value={config.workflowScaling} onChange={v => onUpdate('workflowScaling', v)} options={getWorkflowScaling(lang)} />
              <TextField label={strings.automationNotesLabel} value={config.automationNotes} onChange={v => onUpdate('automationNotes', v)} placeholder={strings.automationNotesHint} multiline rows={3} />
            </>
          )}
        </SectionCard>
      </DeployCollapsible>

      {/* Extra Notes */}
      <DeployCollapsible id="extras" title={strings.notes} icon={<FileText className="h-4 w-4" />}>
        <SectionCard icon={<FileText className="h-4 w-4" />} title={strings.notes} description={strings.notesDesc}>
          <TextField label={strings.extraNotesLabel} value={config.extraNotes} onChange={v => onUpdate('extraNotes', v)} placeholder={strings.extraNotesHint} multiline rows={4} />
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
