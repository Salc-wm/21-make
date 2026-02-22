import type { PromptConfig } from './types';
import type { DevPromptConfig } from './devTypes';
import type { DeployPromptConfig } from './deployTypes';
import { getLabel } from './core/PromptBuilder';
import {
  appTypes, appPageTypeOptions,
  designStyles, darkModeOptions, borderRadiusOptions,
  densityOptions, fontStyles, fontSizes, layoutTypes,
  navigationStyles, animationOptions, languageOptions, toneOptions,
  pageOptions, colorSchemes, componentOptions,
} from './data/options/options';
import {
  frameworks, devLanguages, cssApproaches, stateManagementOptions,
  designPatterns, componentPatterns, routingApproaches, fileOrganizations,
  apiTypes, authApproaches, databases, packageManagers,
  testingOptions, codeQualityOptions, aiEditors, deployTargets,
  automationPlatforms, automationTriggers, automationGateways, automationConnectors,
} from './data/options/devOptions';
import {
  projectTypes, targetOSOptions, environmentTypes,
  containerPlatforms, baseImages, nodeVersions, serveMethods,
  reverseProxies, sslMethods, ciCdOptions, registryOptions,
  healthcheckOptions, loggingOptions, backupStrategies,
  deployAutomationPlatforms, queueSystems, workflowScaling,
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

    // Parse custom pages
    const customPages = config.customPages ? config.customPages.split(',').map(p => p.trim()).filter(Boolean) : [];

    return {
      meta: {
        name: config.projectName || devConfig.projectName || deployConfig.projectName || automationConfig.projectName || 'Untitled',
        description: config.projectDescription || devConfig.projectDescription || deployConfig.projectDescription || automationConfig.projectDescription || '',
        generatedAt: new Date().toISOString(),
        language: config.promptLanguage || 'pt',
        appType: getLabel(appTypes, config.appType),
        appPageType: getLabel(appPageTypeOptions, config.appPageType),
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
        style: getLabel(designStyles, config.designStyle),
        colorScheme: (() => {
          const scheme = colorSchemes.find(c => c.value === config.colorScheme);
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
        darkMode: getLabel(darkModeOptions, config.darkMode),
        borderRadius: getLabel(borderRadiusOptions, config.borderRadius),
        density: getLabel(densityOptions, config.density),
        typography: {
          family: getLabel(fontStyles, config.fontStyle),
          size: getLabel(fontSizes, config.fontSize),
        },
        layout: {
          type: getLabel(layoutTypes, config.layoutType),
          navigation: getLabel(navigationStyles, config.navigationStyle),
          sidebarPosition: config.sidebarPosition === 'left' ? (isPT ? 'Esquerda' : 'Left') : (isPT ? 'Direita' : 'Right'),
          responsiveness: config.responsiveness === 'fully-responsive' ? (isPT ? 'Totalmente responsivo' : 'Fully responsive') : (isPT ? 'Desktop-first com adaptação mobile' : 'Desktop-first with mobile adaptation'),
        },
        pages: (() => {
          const allP: { name: string; description?: string; elements?: string; notes?: string }[] = [];
          config.pages.forEach(p => {
            const label = getLabel(pageOptions, p);
            const d = config.pageDetails?.[p];
            allP.push({ name: label, description: d?.description, elements: d?.components, notes: d?.notes });
          });
          customPages.forEach(p => {
            const d = config.pageDetails?.[`custom:${p}`];
            allP.push({ name: `${p} (custom)`, description: d?.description, elements: d?.components, notes: d?.notes });
          });
          return allP;
        })(),
        components: config.components.map(c => getLabel(componentOptions, c)),
        interactions: {
          animations: getLabel(animationOptions, config.animations),
          feedback: config.feedback,
        },
        tone: {
          language: getLabel(languageOptions, config.language),
          tone: getLabel(toneOptions, config.tone),
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
        framework: getLabel(frameworks, devConfig.framework),
        language: getLabel(devLanguages, devConfig.language),
        css: getLabel(cssApproaches, devConfig.cssApproach),
        packageManager: getLabel(packageManagers, devConfig.packageManager),
        architecture: {
          stateManagement: getLabel(stateManagementOptions, devConfig.stateManagement),
          designPattern: getLabel(designPatterns, devConfig.designPattern),
          componentPattern: getLabel(componentPatterns, devConfig.componentPattern),
          routing: getLabel(routingApproaches, devConfig.routingApproach),
          fileOrganization: getLabel(fileOrganizations, devConfig.fileOrganization),
        },
        api: {
          type: getLabel(apiTypes, devConfig.apiType),
          auth: getLabel(authApproaches, devConfig.authApproach),
          database: getLabel(databases, devConfig.database),
        },
        quality: {
          testing: devConfig.testing.map(v => getLabel(testingOptions, v)),
          codeQuality: devConfig.codeQuality.map(v => getLabel(codeQualityOptions, v)),
        },
        aiEditor: getLabel(aiEditors, devConfig.aiEditor),
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
        deployTarget: getLabel(deployTargets, devConfig.deployTarget),
        automation: {
          platform: getLabel(automationPlatforms, devConfig.automationPlatform),
          triggers: devConfig.automationTriggers.map(v => getLabel(automationTriggers, v)),
          gateways: devConfig.automationGateways.map(v => getLabel(automationGateways, v)),
          connector: getLabel(automationConnectors, devConfig.automationConnector),
          workflow: devConfig.automationWorkflow,
        },
      },
      deployment: {
        projectType: getLabel(projectTypes, deployConfig.projectType),
        environment: {
          os: getLabel(targetOSOptions, deployConfig.targetOS),
          type: getLabel(environmentTypes, deployConfig.environmentType),
          vmProvider: deployConfig.vmProvider,
        },
        container: {
          platform: getLabel(containerPlatforms, deployConfig.containerPlatform),
          baseImage: getLabel(baseImages, deployConfig.baseImage),
          customImage: deployConfig.customBaseImage,
        },
        build: {
          nodeVersion: getLabel(nodeVersions, deployConfig.nodeVersion),
          buildCommand: deployConfig.buildCommand,
          outputDir: deployConfig.outputDir,
          serveWith: getLabel(serveMethods, deployConfig.serveWith),
          envVars: deployConfig.envVars,
        },
        networking: {
          port: deployConfig.exposedPort,
          reverseProxy: getLabel(reverseProxies, deployConfig.reverseProxy),
          ssl: getLabel(sslMethods, deployConfig.sslMethod),
          domain: deployConfig.domain,
        },
        storage: {
          volumes: deployConfig.volumes,
          backup: getLabel(backupStrategies, deployConfig.backupStrategy),
        },
        cicd: {
          pipeline: getLabel(ciCdOptions, deployConfig.ciCd),
          registry: getLabel(registryOptions, deployConfig.registry),
        },
        monitoring: {
          healthcheck: getLabel(healthcheckOptions, deployConfig.healthcheck),
          logging: getLabel(loggingOptions, deployConfig.logging),
        },
        automation: {
          platform: getLabel(deployAutomationPlatforms, deployConfig.automationPlatform),
          queueSystem: getLabel(queueSystems, deployConfig.queueSystem),
          scaling: getLabel(workflowScaling, deployConfig.workflowScaling),
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
