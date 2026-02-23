export interface PageDetail {
  name: string;
  description: string;
  components: string;
  notes: string;
  isCustom?: boolean;
}

export interface PromptConfig {
  // Projeto
  projectName: string;
  projectDescription: string;
  appType: string;
  appPageType: string;
  numberOfPages: number;
  sessionDetails: Record<string, string>;

  // Estilo Visual
  designStyle: string;
  colorScheme: string;
  primaryColor: string;
  darkMode: string;
  borderRadius: string;
  density: string;

  // Tipografia
  fontStyle: string;
  fontSize: string;

  // Layout
  layoutType: string;
  navigationStyle: string;
  sidebarPosition: string;
  responsiveness: string;

  // Componentes
  components: string[];

  // Páginas
  pages: string[];
  customPages: string;
  pageDetails: Record<string, PageDetail>;

  // Interações
  animations: string;
  feedback: string[];

  // Tom e Linguagem
  language: string;
  tone: string;

  // Extras
  extraNotes: string;

  // Prompt output language
  promptLanguage: string;

  // Custom Generator Flags
  isOnePageLandingPrompt?: boolean;
}

export const defaultConfig: PromptConfig = {
  projectName: '',
  projectDescription: '',
  appType: 'web-app',
  appPageType: 'single-page',
  numberOfPages: 1,
  sessionDetails: {},

  designStyle: 'minimal',
  colorScheme: 'neutral',
  primaryColor: '#3B82F6',
  darkMode: 'light',
  borderRadius: 'medium',
  density: 'comfortable',

  fontStyle: 'sans-serif',
  fontSize: 'base',

  layoutType: 'sidebar',
  navigationStyle: 'sidebar',
  sidebarPosition: 'left',
  responsiveness: 'fully-responsive',

  components: [],
  pages: [],
  customPages: '',
  pageDetails: {},

  animations: 'subtle',
  feedback: [],

  language: 'pt',
  tone: 'professional',

  extraNotes: '',

  promptLanguage: 'en',
};
