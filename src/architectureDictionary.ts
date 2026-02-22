import type { PromptConfig } from './types';
import type { DevPromptConfig } from './devTypes';
import type { DeployPromptConfig } from './deployTypes';
import { getLabel } from './core/PromptBuilder';
import {
  getAppTypes, getAppPageTypeOptions, getDesignStyles, getDarkModeOptions, getBorderRadiusOptions, getDensityOptions, getFontStyles, getFontSizes, getLayoutTypes, getNavigationStyles, getAnimationOptions, getLanguageOptions, getToneOptions, getPageOptions, getColorSchemes, getComponentOptions
} from './data/options/options';
import {
  getFrameworks, getDevLanguages, getCssApproaches, getStateManagementOptions, getDesignPatterns, getComponentPatterns, getRoutingApproaches, getFileOrganizations, getApiTypes, getAuthApproaches, getDatabases, getPackageManagers, getTestingOptions, getCodeQualityOptions, getAiEditors, getDeployTargets, getAutomationPlatforms, getAutomationTriggers, getAutomationGateways, getAutomationConnectors
} from './data/options/devOptions';
import {
  getProjectTypes, getTargetOSOptions, getEnvironmentTypes, getContainerPlatforms, getBaseImages, getNodeVersions, getServeMethods, getReverseProxies, getSslMethods, getCiCdOptions, getRegistryOptions, getHealthcheckOptions, getLoggingOptions, getBackupStrategies, getDeployAutomationPlatforms, getQueueSystems, getWorkflowScaling
} from './data/options/deployOptions';

// ── Unified Architecture Dictionary ───────────────
export interface ArchitectureDictionary {
  meta: {
    name: string;
    description: string;
    generatedAt: string;
    language: string;
    appType?: string;
    appPageType?: string;
    numberOfPages?: number;
    sessionDetails?: Record<string, string>;
    guidelines?: string[];
  };
  design: {
    style: string;
    colorScheme: string;
    primaryColor: string;
    darkMode: string;
    borderRadius: string;
    density: string;
    typography: { family: string; size: string };
    layout: { type: string; navigation: string; sidebarPosition: string; responsiveness: string };
    pages: { name: string; description?: string; elements?: string; notes?: string }[];
    components: string[];
    interactions: { animations: string; feedback: string[] };
    tone: { language: string; tone: string; rules: string[] };
    notes: string;
    qualityRules: string[];
  };
  development: {
    framework: string;
    language: string;
    css: string;
    packageManager: string;
    architecture: {
      stateManagement: string;
      designPattern: string;
      componentPattern: string;
      routing: string;
      fileOrganization: string;
    };
    api: { type: string; auth: string; database: string };
    quality: { testing: string[]; codeQuality: string[] };
    aiEditor: string;
    aiInstructions: string;
    rules: string[];
    deployTarget: string;
    automation: {
      platform: string;
      triggers: string[];
      gateways: string[];
      connector: string;
      workflow: string;
    };
  };
    deployment: {
      projectType: string;
      environment: { os: string; type: string; vmProvider: string };
      container: { platform: string; baseImage: string; customImage: string };
      build: {
        nodeVersion: string;
        buildCommand: string;
        outputDir: string;
        serveWith: string;
        envVars: string;
      };
      networking: { port: string; reverseProxy: string; ssl: string; domain: string };
      storage: { volumes: string; backup: string };
      cicd: { pipeline: string; registry: string };
      monitoring: { healthcheck: string; logging: string };
      automation: {
        platform: string;
        queueSystem: string;
        scaling: string;
        notes: string;
      };
    };
    automationFlows: {
      targetPlatform: string;
      automationType: string;
      triggerType: string;
      coreNodes: string[];
      authRequirements: string[];
      errorHandling: string;
      retries: string;
      customInstructions: string;
    };
  }
  
  // ── Builder ───────────────────────────────────────
  export function buildDictionary(
    config: PromptConfig,
    devConfig: DevPromptConfig,
    deployConfig: DeployPromptConfig,
    automationConfig: import('./automationTypes').AutomationPromptConfig
  ): ArchitectureDictionary {
    const isPT = (config.promptLanguage || 'pt') === 'pt';
    const lang: import('./core/i18n').Lang = isPT ? 'pt' : 'en';

    // Parse custom pages
    const customPages = config.customPages ? config.customPages.split(',').map(p => p.trim()).filter(Boolean) : [];

    return {
      meta: {
        name: config.projectName || devConfig.projectName || deployConfig.projectName || automationConfig.projectName || 'Untitled',
        description: config.projectDescription || devConfig.projectDescription || deployConfig.projectDescription || automationConfig.projectDescription || '',
        generatedAt: new Date().toISOString(),
        language: config.promptLanguage || 'pt',
        appType: getLabel(getAppTypes(lang), config.appType),
        appPageType: getLabel(getAppPageTypeOptions(lang), config.appPageType),
        numberOfPages: config.numberOfPages,
        sessionDetails: config.sessionDetails,
        guidelines: isPT ? [
          'Sóbrio — sem elementos desnecessários, sem ruído visual',
          'Direto — hierarquia clara, o utilizador sabe imediatamente o que fazer',
          'Limpo — espaço em branco generoso, alinhamentos consistentes, tipografia legível',
          'Prioriza a funcionalidade sobre a decoração',
          'Usa uma abordagem "less is more"'
        ] : [
          'Clean — no unnecessary elements, no visual noise',
          'Direct — clear hierarchy, the user immediately knows what to do',
          'Polished — generous white space, consistent alignment, readable typography',
          'Prioritize functionality over decoration',
          'Use a "less is more" approach'
        ],
      },
      design: {
        style: getLabel(getDesignStyles(lang), config.designStyle),
        colorScheme: (() => {
          const scheme = getColorSchemes(lang).find(c => c.value === config.colorScheme);
          if (!scheme) return config.colorScheme || '';
          if (scheme.colors && scheme.colors.length > 0) {
            return `${scheme.label} (${scheme.colors.join(', ')})`;
          }
          if (config.colorScheme === 'custom' && config.primaryColor) {
            return `${scheme.label} (${config.primaryColor})`;
          }
          return scheme.label;
        })(),
        primaryColor: config.primaryColor,
        darkMode: getLabel(getDarkModeOptions(lang), config.darkMode),
        borderRadius: getLabel(getBorderRadiusOptions(lang), config.borderRadius),
        density: getLabel(getDensityOptions(lang), config.density),
        typography: {
          family: getLabel(getFontStyles(lang), config.fontStyle),
          size: getLabel(getFontSizes(lang), config.fontSize),
        },
        layout: {
          type: getLabel(getLayoutTypes(lang), config.layoutType),
          navigation: getLabel(getNavigationStyles(lang), config.navigationStyle),
          sidebarPosition: config.sidebarPosition === 'left' ? (isPT ? 'Esquerda' : 'Left') : (isPT ? 'Direita' : 'Right'),
          responsiveness: config.responsiveness === 'fully-responsive' ? (isPT ? 'Totalmente responsivo' : 'Fully responsive') : (isPT ? 'Desktop-first com adaptação mobile' : 'Desktop-first with mobile adaptation'),
        },
        pages: (() => {
          const allP: { name: string; description?: string; elements?: string; notes?: string }[] = [];
          config.pages.forEach(p => {
            const label = getLabel(getPageOptions(lang), p);
            const d = config.pageDetails?.[p];
            allP.push({ name: label, description: d?.description, elements: d?.components, notes: d?.notes });
          });
          customPages.forEach(p => {
            const d = config.pageDetails?.[`custom:${p}`];
            allP.push({ name: `${p} (custom)`, description: d?.description, elements: d?.components, notes: d?.notes });
          });
          return allP;
        })(),
        components: config.components.map(c => getLabel(getComponentOptions(lang), c)),
        interactions: {
          animations: getLabel(getAnimationOptions(lang), config.animations),
          feedback: config.feedback,
        },
        tone: {
          language: getLabel(getLanguageOptions(lang), config.language),
          tone: getLabel(getToneOptions(lang), config.tone),
          rules: isPT ? [
            'Textos curtos e diretos (microcopy eficaz)',
            'Labels descritivos e ações claras nos botões'
          ] : [
            'Short and direct text (effective microcopy)',
            'Descriptive labels and clear action buttons'
          ],
        },
        notes: config.extraNotes || '',
        qualityRules: isPT ? [
          'Consistência em todo o design (cores, espaçamentos, tipografia)',
          'Acessibilidade: contraste mínimo WCAG AA, focus states visíveis',
          'Design pixel-perfect, alinhamentos perfeitos',
          'Uso de grid system de 8px',
          'Ícones com estilo consistente (outline ou filled, não misturar)',
          'Estados para todos os elementos interativos'
        ] : [
          'Consistency throughout the design (colors, spacing, typography)',
          'Accessibility: minimum WCAG AA contrast, visible focus states',
          'Pixel-perfect design, precise alignment',
          'Use an 8px grid system',
          'Consistent icon style (outline or filled, do not mix)',
          'States for all interactive elements'
        ],
      },
      development: {
        framework: getLabel(getFrameworks(lang), devConfig.framework),
        language: getLabel(getDevLanguages(lang), devConfig.language),
        css: getLabel(getCssApproaches(lang), devConfig.cssApproach),
        packageManager: getLabel(getPackageManagers(lang), devConfig.packageManager),
        architecture: {
          stateManagement: getLabel(getStateManagementOptions(lang), devConfig.stateManagement),
          designPattern: getLabel(getDesignPatterns(lang), devConfig.designPattern),
          componentPattern: getLabel(getComponentPatterns(lang), devConfig.componentPattern),
          routing: getLabel(getRoutingApproaches(lang), devConfig.routingApproach),
          fileOrganization: getLabel(getFileOrganizations(lang), devConfig.fileOrganization),
        },
        api: {
          type: getLabel(getApiTypes(lang), devConfig.apiType),
          auth: getLabel(getAuthApproaches(lang), devConfig.authApproach),
          database: getLabel(getDatabases(lang), devConfig.database),
        },
        quality: {
          testing: devConfig.testing.map(v => getLabel(getTestingOptions(lang), v)),
          codeQuality: devConfig.codeQuality.map(v => getLabel(getCodeQualityOptions(lang), v)),
        },
        aiEditor: getLabel(getAiEditors(lang), devConfig.aiEditor),
        aiInstructions: devConfig.aiInstructions || '',
        rules: isPT ? [
          'Implementa o design pixel-perfect seguindo as imagens/referências de design fornecidas',
          'Todo o código deve ser production-ready — sem placeholders, sem TODOs, sem código comentado',
          'Componentes reutilizáveis e bem estruturados com tipos TypeScript completos',
          'Responsivo — mobile-first ou desktop-first conforme indicado',
          'Acessível — semântica HTML correta, ARIA labels, keyboard navigation',
          'Seguir as convenções da framework escolhida e best practices da comunidade',
          'Ficheiros organizados de forma clara e consistente segundo o padrão indicado',
          'Nomes de variáveis, funções e componentes descritivos e em inglês',
          'Tratamento de erros e edge cases — loading, empty, error states',
          'Código limpo e legível — sem duplicação, funções curtas, single responsibility'
        ] : [
          'Implement the design pixel-perfect following the provided design images/references',
          'All code must be production-ready — no placeholders, no TODOs, no commented-out code',
          'Reusable and well-structured components with complete TypeScript types',
          'Responsive — mobile-first or desktop-first as indicated',
          'Accessible — proper HTML semantics, ARIA labels, keyboard navigation',
          'Follow the chosen framework conventions and community best practices',
          'Files organized in a clear and consistent structure per the indicated pattern',
          'Variable, function, and component names should be descriptive and in English',
          'Proper error and edge case handling — loading, empty, error states',
          'Clean and readable code — no duplication, short functions, single responsibility'
        ],
        deployTarget: getLabel(getDeployTargets(lang), devConfig.deployTarget),
        automation: {
          platform: getLabel(getAutomationPlatforms(lang), devConfig.automationPlatform),
          triggers: devConfig.automationTriggers.map(v => getLabel(getAutomationTriggers(lang), v)),
          gateways: devConfig.automationGateways.map(v => getLabel(getAutomationGateways(lang), v)),
          connector: getLabel(getAutomationConnectors(lang), devConfig.automationConnector),
          workflow: devConfig.automationWorkflow,
        },
      },
      deployment: {
        projectType: getLabel(getProjectTypes(lang), deployConfig.projectType),
        environment: {
          os: getLabel(getTargetOSOptions(lang), deployConfig.targetOS),
          type: getLabel(getEnvironmentTypes(lang), deployConfig.environmentType),
          vmProvider: deployConfig.vmProvider,
        },
        container: {
          platform: getLabel(getContainerPlatforms(lang), deployConfig.containerPlatform),
          baseImage: getLabel(getBaseImages(lang), deployConfig.baseImage),
          customImage: deployConfig.customBaseImage,
        },
        build: {
          nodeVersion: getLabel(getNodeVersions(lang), deployConfig.nodeVersion),
          buildCommand: deployConfig.buildCommand,
          outputDir: deployConfig.outputDir,
          serveWith: getLabel(getServeMethods(lang), deployConfig.serveWith),
          envVars: deployConfig.envVars,
        },
        networking: {
          port: deployConfig.exposedPort,
          reverseProxy: getLabel(getReverseProxies(lang), deployConfig.reverseProxy),
          ssl: getLabel(getSslMethods(lang), deployConfig.sslMethod),
          domain: deployConfig.domain,
        },
        storage: {
          volumes: deployConfig.volumes,
          backup: getLabel(getBackupStrategies(lang), deployConfig.backupStrategy),
        },
        cicd: {
          pipeline: getLabel(getCiCdOptions(lang), deployConfig.ciCd),
          registry: getLabel(getRegistryOptions(lang), deployConfig.registry),
        },
        monitoring: {
          healthcheck: getLabel(getHealthcheckOptions(lang), deployConfig.healthcheck),
          logging: getLabel(getLoggingOptions(lang), deployConfig.logging),
        },
        automation: {
          platform: getLabel(getDeployAutomationPlatforms(lang), deployConfig.automationPlatform),
          queueSystem: getLabel(getQueueSystems(lang), deployConfig.queueSystem),
          scaling: getLabel(getWorkflowScaling(lang), deployConfig.workflowScaling),
          notes: deployConfig.automationNotes,
        },
      },
      automationFlows: {
        targetPlatform: automationConfig.targetPlatform,
        automationType: automationConfig.automationType,
        triggerType: automationConfig.triggerType,
        coreNodes: automationConfig.coreNodes,
        authRequirements: automationConfig.authRequirements,
        errorHandling: automationConfig.errorHandling,
        retries: automationConfig.retries,
        customInstructions: automationConfig.customInstructions,
      },
    };
  }
