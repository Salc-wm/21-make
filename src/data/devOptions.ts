export const frameworks = [
  { value: 'nextjs', label: 'Next.js', desc: 'React framework com SSR/SSG' },
  { value: 'react-vite', label: 'React + Vite', desc: 'SPA rápida com Vite' },
  { value: 'vue-nuxt', label: 'Vue / Nuxt', desc: 'Framework Vue progressivo' },
  { value: 'svelte-kit', label: 'SvelteKit', desc: 'Framework Svelte full-stack' },
  { value: 'angular', label: 'Angular', desc: 'Framework empresarial Google' },
  { value: 'astro', label: 'Astro', desc: 'Sites estáticos com islands' },
  { value: 'remix', label: 'Remix', desc: 'Framework React full-stack' },
  { value: 'vanilla', label: 'Vanilla JS/TS', desc: 'Sem framework, puro' },
];

export const devLanguages = [
  { value: 'typescript', label: 'TypeScript', desc: 'Tipagem estática, mais seguro' },
  { value: 'javascript', label: 'JavaScript', desc: 'Dinâmico, sem tipos' },
];

export const cssApproaches = [
  { value: 'tailwind', label: 'Tailwind CSS', desc: 'Utility-first CSS framework' },
  { value: 'css-modules', label: 'CSS Modules', desc: 'CSS com escopo local' },
  { value: 'styled-components', label: 'Styled Components', desc: 'CSS-in-JS' },
  { value: 'vanilla-css', label: 'Vanilla CSS', desc: 'CSS puro, sem framework' },
  { value: 'scss', label: 'Sass / SCSS', desc: 'CSS com superpoderes' },
];

export const stateManagementOptions = [
  { value: 'context', label: 'React Context', desc: 'Built-in, simples' },
  { value: 'zustand', label: 'Zustand', desc: 'Leve e flexível' },
  { value: 'redux', label: 'Redux Toolkit', desc: 'Robusto, previsível' },
  { value: 'jotai', label: 'Jotai', desc: 'Atómico, minimal' },
  { value: 'pinia', label: 'Pinia (Vue)', desc: 'Store oficial do Vue' },
  { value: 'signals', label: 'Signals', desc: 'Reactividade fine-grained' },
  { value: 'none', label: 'Nenhum / Local', desc: 'Apenas state local' },
];

export const designPatterns = [
  { value: 'mvc', label: 'MVC', desc: 'Model-View-Controller clássico' },
  { value: 'mvvm', label: 'MVVM', desc: 'Model-View-ViewModel com data binding' },
  { value: 'clean', label: 'Clean Architecture', desc: 'Camadas com regra de dependência' },
  { value: 'hexagonal', label: 'Hexagonal / Ports & Adapters', desc: 'Domínio isolado por ports' },
  { value: 'cqrs', label: 'CQRS', desc: 'Separação de leitura e escrita' },
  { value: 'layered', label: 'Layered (N-Tier)', desc: 'Presentation → Business → Data' },
  { value: 'modular', label: 'Modular Monolith', desc: 'Módulos independentes num monólito' },
  { value: 'micro-frontends', label: 'Micro-Frontends', desc: 'Apps independentes compostas' },
  { value: 'event-sourcing', label: 'Event Sourcing', desc: 'Estado derivado de eventos' },
  { value: 'none', label: 'Sem Padrão Específico', desc: 'Estrutura livre' },
];

export const componentPatterns = [
  { value: 'functional', label: 'Componentes Funcionais', desc: 'Hooks-based, moderno' },
  { value: 'server-components', label: 'Server Components', desc: 'RSC do Next.js / React' },
  { value: 'atomic', label: 'Atomic Design', desc: 'Atoms → Molecules → Organisms' },
  { value: 'feature-based', label: 'Feature-Based', desc: 'Agrupado por funcionalidade' },
];

export const routingApproaches = [
  { value: 'app-router', label: 'App Router (Next.js)', desc: 'File-based routing moderno' },
  { value: 'pages-router', label: 'Pages Router (Next.js)', desc: 'File-based routing clássico' },
  { value: 'react-router', label: 'React Router', desc: 'Client-side routing' },
  { value: 'vue-router', label: 'Vue Router', desc: 'Routing oficial Vue' },
  { value: 'file-based', label: 'File-Based (genérico)', desc: 'Convenção por ficheiro' },
  { value: 'none', label: 'Sem Routing', desc: 'SPA de página única' },
];

export const fileOrganizations = [
  { value: 'feature-based', label: 'Feature-Based', desc: 'src/features/auth, src/features/dashboard...' },
  { value: 'type-based', label: 'Type-Based', desc: 'src/components, src/hooks, src/utils...' },
  { value: 'domain-driven', label: 'Domain-Driven', desc: 'Organizado por domínios de negócio' },
  { value: 'nextjs-app', label: 'Next.js App Dir', desc: 'app/, components/, lib/...' },
];

export const apiTypes = [
  { value: 'rest', label: 'REST API' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'trpc', label: 'tRPC' },
  { value: 'server-actions', label: 'Server Actions' },
  { value: 'none', label: 'Sem API / Estático' },
];

export const authApproaches = [
  { value: 'nextauth', label: 'NextAuth / Auth.js' },
  { value: 'clerk', label: 'Clerk' },
  { value: 'supabase-auth', label: 'Supabase Auth' },
  { value: 'firebase-auth', label: 'Firebase Auth' },
  { value: 'custom', label: 'Custom (JWT / Session)' },
  { value: 'none', label: 'Sem Autenticação' },
];

export const databases = [
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'supabase', label: 'Supabase (Postgres)' },
  { value: 'firebase', label: 'Firebase / Firestore' },
  { value: 'planetscale', label: 'PlanetScale' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'prisma', label: 'Prisma (ORM)' },
  { value: 'drizzle', label: 'Drizzle (ORM)' },
  { value: 'none', label: 'Sem Base de Dados' },
];

export const packageManagers = [
  { value: 'npm', label: 'npm' },
  { value: 'yarn', label: 'Yarn' },
  { value: 'pnpm', label: 'pnpm' },
  { value: 'bun', label: 'Bun' },
];

export const testingOptions = [
  { value: 'vitest', label: 'Vitest' },
  { value: 'jest', label: 'Jest' },
  { value: 'playwright', label: 'Playwright (E2E)' },
  { value: 'cypress', label: 'Cypress (E2E)' },
  { value: 'testing-library', label: 'Testing Library' },
  { value: 'storybook', label: 'Storybook' },
];

export const codeQualityOptions = [
  { value: 'eslint', label: 'ESLint' },
  { value: 'prettier', label: 'Prettier' },
  { value: 'husky', label: 'Husky (Git Hooks)' },
  { value: 'lint-staged', label: 'Lint-Staged' },
  { value: 'commitlint', label: 'Commitlint' },
  { value: 'biome', label: 'Biome' },
];

export const aiEditors = [
  { value: 'antigravity', label: 'Antigravity', desc: 'Google Deepmind AI Editor' },
  { value: 'cursor', label: 'Cursor', desc: 'AI-powered code editor' },
  { value: 'windsurf', label: 'Windsurf', desc: 'Codeium AI IDE' },
  { value: 'copilot', label: 'GitHub Copilot', desc: 'VS Code AI assistant' },
  { value: 'aider', label: 'Aider', desc: 'Terminal-based AI coding' },
  { value: 'generic', label: 'Genérico', desc: 'Qualquer AI code editor' },
];

export const deployTargets = [
  { value: 'vercel', label: 'Vercel' },
  { value: 'netlify', label: 'Netlify' },
  { value: 'aws', label: 'AWS (Amplify/EC2)' },
  { value: 'docker', label: 'Docker' },
  { value: 'railway', label: 'Railway' },
  { value: 'cloudflare', label: 'Cloudflare Pages' },
  { value: 'none', label: 'Sem Deploy (local)' },
];

// ── Automation Platforms ──────────────────────────
export const automationPlatforms = [
  { value: 'n8n', label: 'n8n', desc: 'Self-hosted, open-source automation' },
  { value: 'make', label: 'Make (Integromat)', desc: 'Visual automation cloud' },
  { value: 'zapier', label: 'Zapier', desc: 'No-code cloud automations' },
  { value: 'activepieces', label: 'Activepieces', desc: 'Open-source, self-hostable' },
  { value: 'pipedream', label: 'Pipedream', desc: 'Code-first workflow automation' },
  { value: 'temporal', label: 'Temporal', desc: 'Durable execution workflows' },
  { value: 'bull-mq', label: 'BullMQ', desc: 'Node.js job queue (Redis-based)' },
  { value: 'custom', label: 'Custom / Outro', desc: 'Plataforma de automação customizada' },
  { value: 'none', label: 'Sem Automação', desc: 'Nenhuma plataforma de automação' },
];

// ── Automation Triggers ───────────────────────────
export const automationTriggers = [
  { value: 'webhook', label: 'Webhook' },
  { value: 'cron', label: 'Cron / Agendamento' },
  { value: 'event', label: 'Evento (DB / Queue)' },
  { value: 'api-poll', label: 'API Polling' },
  { value: 'manual', label: 'Manual / UI Trigger' },
  { value: 'file-watch', label: 'File Watcher' },
  { value: 'email', label: 'Email Inbound' },
];

// ── Automation Gateway Patterns ───────────────────
export const automationGateways = [
  { value: 'sequential', label: 'Sequencial', desc: 'Passos um a um, em série' },
  { value: 'parallel', label: 'Paralelo / Concurrent', desc: 'Múltiplos ramos em simultâneo (fork/join)' },
  { value: 'conditional', label: 'Condicional (IF/ELSE)', desc: 'Branching baseado em condições' },
  { value: 'event-driven', label: 'Event-Driven', desc: 'Reage a eventos assíncronos' },
  { value: 'retry-loop', label: 'Retry / Loop', desc: 'Repetir até sucesso ou N vezes' },
  { value: 'saga', label: 'Saga / Compensação', desc: 'Multi-step com rollback on failure' },
];

// ── Automation API Connectors ─────────────────────
export const automationConnectors = [
  { value: 'rest-api', label: 'REST API da App' },
  { value: 'graphql-api', label: 'GraphQL da App' },
  { value: 'database-direct', label: 'Acesso Direto à DB' },
  { value: 'message-queue', label: 'Message Queue (Redis, RabbitMQ)' },
  { value: 'websocket', label: 'WebSocket' },
  { value: 'server-actions', label: 'Server Actions' },
  { value: 'grpc', label: 'gRPC' },
];
