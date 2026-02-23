import type { Lang } from '../../core/i18n';

const t = (lang: Lang, pt: string, en: string, es: string, fr: string) => {
  if (lang === 'pt') return pt;
  if (lang === 'es') return es;
  if (lang === 'fr') return fr;
  return en;
};

export const getFrameworks = (lang: Lang) => [
  { value: 'nextjs', label: 'Next.js', desc: t(lang, 'React framework com SSR/SSG', 'React framework with SSR/SSG', 'Framework React con SSR/SSG', 'Framework React avec SSR/SSG') },
  { value: 'react-vite', label: 'React + Vite', desc: t(lang, 'SPA rápida com Vite', 'Fast SPA with Vite', 'SPA rápida con Vite', 'SPA rapide avec Vite') },
  { value: 'vue-nuxt', label: 'Vue / Nuxt', desc: t(lang, 'Framework Vue progressivo', 'Progressive Vue framework', 'Framework Vue progresivo', 'Framework Vue progressif') },
  { value: 'svelte-kit', label: 'SvelteKit', desc: t(lang, 'Framework Svelte full-stack', 'Full-stack Svelte framework', 'Framework Svelte full-stack', 'Framework Svelte full-stack') },
  { value: 'angular', label: 'Angular', desc: t(lang, 'Framework empresarial Google', 'Google enterprise framework', 'Framework empresarial Google', 'Framework d\'entreprise Google') },
  { value: 'astro', label: 'Astro', desc: t(lang, 'Sites estáticos com islands', 'Static sites with islands', 'Sitios estáticos con islands', 'Sites statiques avec islands') },
  { value: 'remix', label: 'Remix', desc: t(lang, 'Framework React full-stack', 'Full-stack React framework', 'Framework React full-stack', 'Framework React full-stack') },
  { value: 'vanilla', label: 'Vanilla JS/TS', desc: t(lang, 'Sem framework, puro', 'No framework, vanilla', 'Sin framework, puro', 'Sans framework, pur') },
];

export const getDevLanguages = (lang: Lang) => [
  { value: 'typescript', label: 'TypeScript', desc: t(lang, 'Tipagem estática, mais seguro', 'Static typing, safer', 'Tipado estático, más seguro', 'Typage statique, plus sûr') },
  { value: 'javascript', label: 'JavaScript', desc: t(lang, 'Dinâmico, sem tipos', 'Dynamic, untyped', 'Dinámico, sin tipos', 'Dynamique, non typé') },
];

export const getCssApproaches = (lang: Lang) => [
  { value: 'tailwind', label: 'Tailwind CSS', desc: t(lang, 'Utility-first CSS framework', 'Utility-first CSS framework', 'Framework CSS utility-first', 'Framework CSS utility-first') },
  { value: 'css-modules', label: 'CSS Modules', desc: t(lang, 'CSS com escopo local', 'Locally scoped CSS', 'CSS con alcance local', 'CSS avec portée locale') },
  { value: 'styled-components', label: 'Styled Components', desc: t(lang, 'CSS-in-JS', 'CSS-in-JS', 'CSS-in-JS', 'CSS-in-JS') },
  { value: 'vanilla-css', label: 'Vanilla CSS', desc: t(lang, 'CSS puro, sem framework', 'Vanilla CSS, no framework', 'CSS puro, sin framework', 'CSS pur, sans framework') },
  { value: 'scss', label: 'Sass / SCSS', desc: t(lang, 'CSS com superpoderes', 'CSS with superpowers', 'CSS con superpoderes', 'CSS avec des superpouvoirs') },
];

export const getStateManagementOptions = (lang: Lang) => [
  { value: 'context', label: 'React Context', desc: t(lang, 'Built-in, simples', 'Built-in, simple', 'Integrado, simple', 'Intégré, simple') },
  { value: 'zustand', label: 'Zustand', desc: t(lang, 'Leve e flexível', 'Lightweight and flexible', 'Ligero y flexible', 'Léger et flexible') },
  { value: 'redux', label: 'Redux Toolkit', desc: t(lang, 'Robusto, previsível', 'Robust, predictable', 'Robusto, predecible', 'Robuste, prévisible') },
  { value: 'jotai', label: 'Jotai', desc: t(lang, 'Atômico, minimalista', 'Atomic, minimal', 'Atómico, minimalista', 'Atomique, minimaliste') },
  { value: 'pinia', label: 'Pinia (Vue)', desc: t(lang, 'Store oficial do Vue', 'Official Vue store', 'Store oficial de Vue', 'Store officiel de Vue') },
  { value: 'signals', label: 'Signals', desc: t(lang, 'Reactividade fine-grained', 'Fine-grained reactivity', 'Reactividad fine-grained', 'Réactivité fine-grained') },
  { value: 'none', label: t(lang, 'Nenhum / Local', 'None / Local', 'Ninguno / Local', 'Aucun / Local'), desc: t(lang, 'Apenas state local', 'Only local state', 'Solo estado local', 'Seulement l\'état local') },
];

export const getDesignPatterns = (lang: Lang) => [
  { value: 'mvc', label: 'MVC', desc: t(lang, 'Model-View-Controller clássico', 'Classic Model-View-Controller', 'Clásico Model-View-Controller', 'Classique Model-View-Controller') },
  { value: 'mvvm', label: 'MVVM', desc: t(lang, 'Model-View-ViewModel com data binding', 'Model-View-ViewModel with data binding', 'Model-View-ViewModel con data binding', 'Model-View-ViewModel avec data binding') },
  { value: 'clean', label: 'Clean Architecture', desc: t(lang, 'Camadas com regra de dependência', 'Layers with dependency rule', 'Capas con regla de dependencia', 'Couches avec règle de dépendance') },
  { value: 'hexagonal', label: 'Hexagonal / Ports & Adapters', desc: t(lang, 'Domínio isolado por ports', 'Domain isolated by ports', 'Dominio aislado por ports', 'Domaine isolé par des ports') },
  { value: 'cqrs', label: 'CQRS', desc: t(lang, 'Separação de leitura e escrita', 'Command Query Responsibility Segregation', 'Separación de lectura y escritura', 'Séparation de lecture et d\'écriture') },
  { value: 'layered', label: 'Layered (N-Tier)', desc: t(lang, 'Apresentação → Negócio → Dados', 'Presentation → Business → Data', 'Presentación → Negocio → Datos', 'Présentation → Métier → Données') },
  { value: 'modular', label: 'Modular Monolith', desc: t(lang, 'Módulos independentes num monólito', 'Independent modules in a monolith', 'Módulos independientes en un monolito', 'Modules indépendants dans un monolithe') },
  { value: 'micro-frontends', label: 'Micro-Frontends', desc: t(lang, 'Apps independentes compostas', 'Composed independent apps', 'Apps independientes compuestas', 'Applications indépendantes composées') },
  { value: 'event-sourcing', label: 'Event Sourcing', desc: t(lang, 'Estado derivado de eventos', 'State derived from events', 'Estado derivado de eventos', 'État dérivé d\'événements') },
  { value: 'none', label: t(lang, 'Sem Padrão Específico', 'No Specific Pattern', 'Sin Patrón Específico', 'Aucun Modèle Spécifique'), desc: t(lang, 'Estrutura livre', 'Free structure', 'Estructura libre', 'Structure libre') },
];

export const getComponentPatterns = (lang: Lang) => [
  { value: 'functional', label: t(lang, 'Componentes Funcionais', 'Functional Components', 'Componentes Funcionales', 'Composants Fonctionnels'), desc: t(lang, 'Hooks-based, moderno', 'Hooks-based, modern', 'Basado en hooks, moderno', 'Basé sur des hooks, moderne') },
  { value: 'server-components', label: 'Server Components', desc: t(lang, 'RSC do Next.js / React', 'React Server Components', 'React Server Components', 'React Server Components') },
  { value: 'atomic', label: 'Atomic Design', desc: t(lang, 'Átomos → Moléculas → Organismos', 'Atoms → Molecules → Organisms', 'Átomos → Moléculas → Organismos', 'Atomes → Molécules → Organismes') },
  { value: 'feature-based', label: 'Feature-Based', desc: t(lang, 'Agrupado por funcionalidade', 'Grouped by feature', 'Agrupado por funcionalidad', 'Regroupés par fonctionnalité') },
];

export const getRoutingApproaches = (lang: Lang) => [
  { value: 'app-router', label: 'App Router (Next.js)', desc: t(lang, 'File-based routing moderno', 'Modern file-based routing', 'Enrutamiento moderno por archivos', 'Routage moderne basé sur les fichiers') },
  { value: 'pages-router', label: 'Pages Router (Next.js)', desc: t(lang, 'File-based routing clássico', 'Classic file-based routing', 'Enrutamiento clásico por archivos', 'Routage classique basé sur les fichiers') },
  { value: 'react-router', label: 'React Router', desc: t(lang, 'Client-side routing', 'Client-side routing', 'Enrutamiento del lado del cliente', 'Routage côté client') },
  { value: 'vue-router', label: 'Vue Router', desc: t(lang, 'Routing oficial Vue', 'Official Vue routing', 'Enrutamiento oficial de Vue', 'Routage officiel de Vue') },
  { value: 'file-based', label: 'File-Based (genérico)', desc: t(lang, 'Convenção por ficheiro', 'Convention by file', 'Convención por archivo', 'Convention par fichier') },
  { value: 'none', label: t(lang, 'Sem Routing', 'No Routing', 'Sin Enrutamiento', 'Sans Routage'), desc: t(lang, 'SPA de página única', 'Single-page SPA', 'SPA de página única', 'SPA à page unique') },
];

export const getFileOrganizations = (lang: Lang) => [
  { value: 'feature-based', label: 'Feature-Based', desc: 'src/features/auth, src/features/dashboard...' },
  { value: 'type-based', label: 'Type-Based', desc: 'src/components, src/hooks, src/utils...' },
  { value: 'domain-driven', label: 'Domain-Driven', desc: t(lang, 'Organizado por domínios de negócio', 'Organized by business domains', 'Organizado por dominios de negocio', 'Organisé par domaines métiers') },
  { value: 'nextjs-app', label: 'Next.js App Dir', desc: 'app/, components/, lib/...' },
];

export const getApiTypes = (lang: Lang) => [
  { value: 'rest', label: 'REST API' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'trpc', label: 'tRPC' },
  { value: 'server-actions', label: 'Server Actions' },
  { value: 'none', label: t(lang, 'Sem API / Estático', 'No API / Static', 'Sin API / Estático', 'Sans API / Statique') },
];

export const getAuthApproaches = (lang: Lang) => [
  { value: 'nextauth', label: 'NextAuth / Auth.js' },
  { value: 'clerk', label: 'Clerk' },
  { value: 'supabase-auth', label: 'Supabase Auth' },
  { value: 'firebase-auth', label: 'Firebase Auth' },
  { value: 'custom', label: 'Custom (JWT / Session)' },
  { value: 'none', label: t(lang, 'Sem Autenticação', 'No Authentication', 'Sin Autenticación', 'Sans Authentification') },
];

export const getDatabases = (lang: Lang) => [
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'supabase', label: 'Supabase (Postgres)' },
  { value: 'firebase', label: 'Firebase / Firestore' },
  { value: 'planetscale', label: 'PlanetScale' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'prisma', label: 'Prisma (ORM)' },
  { value: 'drizzle', label: 'Drizzle (ORM)' },
  { value: 'none', label: t(lang, 'Sem Base de Dados', 'No Database', 'Sin Base de Datos', 'Sans Base de Données') },
];

export const getPackageManagers = (_lang: Lang) => [
  { value: 'npm', label: 'npm' },
  { value: 'yarn', label: 'Yarn' },
  { value: 'pnpm', label: 'pnpm' },
  { value: 'bun', label: 'Bun' },
];

export const getTestingOptions = (_lang: Lang) => [
  { value: 'vitest', label: 'Vitest' },
  { value: 'jest', label: 'Jest' },
  { value: 'playwright', label: 'Playwright (E2E)' },
  { value: 'cypress', label: 'Cypress (E2E)' },
  { value: 'testing-library', label: 'Testing Library' },
  { value: 'storybook', label: 'Storybook' },
];

export const getCodeQualityOptions = (_lang: Lang) => [
  { value: 'eslint', label: 'ESLint' },
  { value: 'prettier', label: 'Prettier' },
  { value: 'husky', label: 'Husky (Git Hooks)' },
  { value: 'lint-staged', label: 'Lint-Staged' },
  { value: 'commitlint', label: 'Commitlint' },
  { value: 'biome', label: 'Biome' },
];

export const getAiEditors = (lang: Lang) => [
  { value: 'antigravity', label: 'Antigravity', desc: 'Google Deepmind AI Editor' },
  { value: 'cursor', label: 'Cursor', desc: 'AI-powered code editor' },
  { value: 'windsurf', label: 'Windsurf', desc: 'Codeium AI IDE' },
  { value: 'copilot', label: 'GitHub Copilot', desc: 'VS Code AI assistant' },
  { value: 'aider', label: 'Aider', desc: 'Terminal-based AI coding' },
  { value: 'generic', label: t(lang, 'Genérico', 'Generic', 'Genérico', 'Générique'), desc: t(lang, 'Qualquer AI code editor', 'Any AI code editor', 'Cualquier editor de código de IA', 'Tout éditeur de code IA') },
];

export const getDeployTargets = (lang: Lang) => [
  { value: 'vercel', label: 'Vercel' },
  { value: 'netlify', label: 'Netlify' },
  { value: 'aws', label: 'AWS (Amplify/EC2)' },
  { value: 'docker', label: 'Docker' },
  { value: 'railway', label: 'Railway' },
  { value: 'cloudflare', label: 'Cloudflare Pages' },
  { value: 'none', label: t(lang, 'Sem Deploy (local)', 'No Deploy (local)', 'Sin Despliegue (local)', 'Sans Déploiement (local)') },
];

// ── Automation Platforms ──────────────────────────
export const getAutomationPlatforms = (lang: Lang) => [
  { value: 'n8n', label: 'n8n', desc: 'Self-hosted, open-source automation' },
  { value: 'make', label: 'Make (Integromat)', desc: 'Visual automation cloud' },
  { value: 'zapier', label: 'Zapier', desc: 'No-code cloud automations' },
  { value: 'activepieces', label: 'Activepieces', desc: 'Open-source, self-hostable' },
  { value: 'pipedream', label: 'Pipedream', desc: 'Code-first workflow automation' },
  { value: 'temporal', label: 'Temporal', desc: 'Durable execution workflows' },
  { value: 'bull-mq', label: 'BullMQ', desc: 'Node.js job queue (Redis-based)' },
  { value: 'custom', label: 'Custom / Outro', desc: t(lang, 'Plataforma de automação customizada', 'Custom automation platform', 'Plataforma de automatización personalizada', 'Plateforme d\'automatisation personnalisée') },
  { value: 'none', label: t(lang, 'Sem Automação', 'No Automation', 'Sin Automatización', 'Sans Automatisation'), desc: t(lang, 'Nenhuma plataforma de automação', 'No automation platform', 'Ninguna plataforma de automatización', 'Aucune plateforme d\'automatisation') },
];

// ── Automation Triggers ───────────────────────────
export const getAutomationTriggers = (lang: Lang) => [
  { value: 'webhook', label: 'Webhook' },
  { value: 'cron', label: t(lang, 'Cron / Agendamento', 'Cron / Scheduled', 'Cron / Programado', 'Cron / Planifié') },
  { value: 'event', label: t(lang, 'Evento (DB / Queue)', 'Event (DB / Queue)', 'Evento (DB / Queue)', 'Événement (DB / File)') },
  { value: 'api-poll', label: 'API Polling' },
  { value: 'manual', label: t(lang, 'Manual / UI Trigger', 'Manual / UI Trigger', 'Manual / Disparador UI', 'Manuel / Déclencheur UI') },
  { value: 'file-watch', label: 'File Watcher' },
  { value: 'email', label: 'Email Inbound' },
];

// ── Automation Gateway Patterns ───────────────────
export const getAutomationGateways = (lang: Lang) => [
  { value: 'sequential', label: t(lang, 'Sequencial', 'Sequential', 'Secuencial', 'Séquentiel'), desc: t(lang, 'Passos um a um, em série', 'Steps one by one, in series', 'Pasos uno a uno, en serie', 'Étapes une par une, en série') },
  { value: 'parallel', label: t(lang, 'Paralelo / Concurrent', 'Parallel / Concurrent', 'Paralelo / Concurrente', 'Parallèle / Simultané'), desc: t(lang, 'Múltiplos ramos em simultâneo (fork/join)', 'Multiple simultaneous branches (fork/join)', 'Múltiples ramas simultáneas (fork/join)', 'Plusieurs branches simultanées (forche/jonction)') },
  { value: 'conditional', label: t(lang, 'Condicional (IF/ELSE)', 'Conditional (IF/ELSE)', 'Condicional (IF/ELSE)', 'Conditionnel (SI/SINON)'), desc: t(lang, 'Branching baseado em condições', 'Branching based on conditions', 'Ramificación basada en condiciones', 'Ramification basée sur des conditions') },
  { value: 'event-driven', label: 'Event-Driven', desc: t(lang, 'Reage a eventos assíncronos', 'Reacts to asynchronous events', 'Reacciona a eventos asíncronos', 'Réagit à des événements asynchrones') },
  { value: 'retry-loop', label: t(lang, 'Retry / Loop', 'Retry / Loop', 'Reintento / Bucle', 'Réessai / Boucle'), desc: t(lang, 'Repetir até sucesso ou N vezes', 'Repeat until success or N times', 'Repetir hasta el éxito o N veces', 'Répéter jusqu\'au succès ou N fois') },
  { value: 'saga', label: t(lang, 'Saga / Compensação', 'Saga / Compensation', 'Saga / Compensación', 'Saga / Compensation'), desc: t(lang, 'Multi-step com rollback on failure', 'Multi-step with rollback on failure', 'Múltiples pasos con rollback en fallo', 'Multi-étapes avec annulation en cas d\'échec') },
];

// ── Automation API Connectors ─────────────────────
export const getAutomationConnectors = (lang: Lang) => [
  { value: 'rest-api', label: t(lang, 'REST API da App', 'App REST API', 'APP REST API', 'REST API de l\'App') },
  { value: 'graphql-api', label: t(lang, 'GraphQL da App', 'App GraphQL', 'APP GraphQL', 'GraphQL de l\'App') },
  { value: 'database-direct', label: t(lang, 'Acesso Direto à DB', 'Direct DB Access', 'Acceso Directo a la BD', 'Accès Direct à la BD') },
  { value: 'message-queue', label: 'Message Queue (Redis, RabbitMQ)' },
  { value: 'websocket', label: 'WebSocket' },
  { value: 'server-actions', label: 'Server Actions' },
  { value: 'grpc', label: 'gRPC' },
];
