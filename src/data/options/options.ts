export const appTypes = [
  { value: 'web-app', label: 'Web App' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'e-commerce', label: 'E-Commerce' },
  { value: 'blog-cms', label: 'Blog / CMS' },
  { value: 'saas', label: 'SaaS Platform' },
  { value: 'admin-panel', label: 'Admin Panel' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'mobile-first', label: 'Mobile-First App' },
  { value: 'social', label: 'Social / Community' },
];

export const appPageTypeOptions = [
  { value: 'single-page', label: 'Página Única', desc: 'Tudo numa só página / SPA simples' },
  { value: 'multi-page', label: 'Multi-Página', desc: 'Várias páginas ou sessões distintas' },
];

export const designStyles = [
  { value: 'minimal', label: 'Minimal', desc: 'Limpo, espaçoso, essencial' },
  { value: 'corporate', label: 'Corporativo', desc: 'Formal, estruturado, confiável' },
  { value: 'modern', label: 'Moderno', desc: 'Contemporâneo, atual, sofisticado' },
  { value: 'brutalist', label: 'Brutalista', desc: 'Bold, raw, tipografia forte' },
  { value: 'glassmorphism', label: 'Glassmorphism', desc: 'Transparências, blur, camadas' },
  { value: 'flat', label: 'Flat Design', desc: 'Sem sombras, cores sólidas' },
  { value: 'neomorphism', label: 'Neomorphism', desc: 'Sombras suaves, relevo sutil' },
];

export const colorSchemes = [
  { value: 'neutral', label: 'Neutro', colors: ['#1a1a1a', '#6b7280', '#e5e7eb', '#f9fafb'] },
  { value: 'warm', label: 'Quente', colors: ['#92400e', '#d97706', '#fbbf24', '#fef3c7'] },
  { value: 'cool', label: 'Frio', colors: ['#1e3a5f', '#3b82f6', '#93c5fd', '#eff6ff'] },
  { value: 'earth', label: 'Terra', colors: ['#3d2c1e', '#78593e', '#c4a882', '#f5ede4'] },
  { value: 'monochrome', label: 'Monocromático', colors: ['#000000', '#4b5563', '#9ca3af', '#f3f4f6'] },
  { value: 'vibrant', label: 'Vibrante', colors: ['#7c3aed', '#ec4899', '#f59e0b', '#10b981'] },
  { value: 'pastel', label: 'Pastel', colors: ['#c4b5fd', '#fbcfe8', '#fde68a', '#a7f3d0'] },
  { value: 'custom', label: 'Personalizado', colors: [] },
];

export const darkModeOptions = [
  { value: 'light', label: 'Apenas Light' },
  { value: 'dark', label: 'Apenas Dark' },
  { value: 'both', label: 'Light + Dark (toggle)' },
  { value: 'system', label: 'Seguir sistema' },
];

export const borderRadiusOptions = [
  { value: 'none', label: 'Nenhum', preview: '0px' },
  { value: 'small', label: 'Pequeno', preview: '4px' },
  { value: 'medium', label: 'Médio', preview: '8px' },
  { value: 'large', label: 'Grande', preview: '12px' },
  { value: 'full', label: 'Muito Grande', preview: '16px' },
];

export const densityOptions = [
  { value: 'compact', label: 'Compacto', desc: 'Menos espaçamento, mais conteúdo' },
  { value: 'comfortable', label: 'Confortável', desc: 'Equilíbrio entre espaço e conteúdo' },
  { value: 'spacious', label: 'Espaçoso', desc: 'Muito espaço, respiração visual' },
];

export const fontStyles = [
  { value: 'sans-serif', label: 'Sans-serif', example: 'Inter, Helvetica' },
  { value: 'serif', label: 'Serif', example: 'Georgia, Merriweather' },
  { value: 'mono', label: 'Monospace', example: 'JetBrains Mono, Fira Code' },
  { value: 'display', label: 'Display', example: 'Poppins, Montserrat' },
  { value: 'system', label: 'System UI', example: 'Font nativa do SO' },
];

export const fontSizes = [
  { value: 'small', label: 'Pequeno', desc: '14px base' },
  { value: 'base', label: 'Normal', desc: '16px base' },
  { value: 'large', label: 'Grande', desc: '18px base' },
];

export const layoutTypes = [
  { value: 'sidebar', label: 'Sidebar + Conteúdo' },
  { value: 'topbar', label: 'Topbar + Conteúdo' },
  { value: 'full-width', label: 'Full Width' },
  { value: 'centered', label: 'Centrado (max-width)' },
  { value: 'split', label: 'Split (duas colunas)' },
  { value: 'cards-grid', label: 'Grid de Cards' },
];

export const navigationStyles = [
  { value: 'sidebar', label: 'Sidebar Fixa' },
  { value: 'sidebar-collapsible', label: 'Sidebar Colapsável' },
  { value: 'topbar', label: 'Barra Superior' },
  { value: 'tabs', label: 'Tabs' },
  { value: 'breadcrumbs', label: 'Breadcrumbs' },
  { value: 'bottom-nav', label: 'Bottom Navigation (mobile)' },
  { value: 'hamburger', label: 'Menu Hamburger' },
];

export const componentOptions = [
  { value: 'buttons', label: 'Botões (primário, secundário, ghost)' },
  { value: 'forms', label: 'Formulários (inputs, selects, checkboxes)' },
  { value: 'tables', label: 'Tabelas de dados' },
  { value: 'cards', label: 'Cards' },
  { value: 'modals', label: 'Modais / Dialogs' },
  { value: 'toasts', label: 'Toasts / Notificações' },
  { value: 'charts', label: 'Gráficos / Charts' },
  { value: 'avatars', label: 'Avatares / User Info' },
  { value: 'badges', label: 'Badges / Tags' },
  { value: 'dropdowns', label: 'Dropdowns / Menus' },
  { value: 'tabs', label: 'Tabs / Segmented Control' },
  { value: 'accordion', label: 'Accordion / Collapsible' },
  { value: 'pagination', label: 'Paginação' },
  { value: 'search', label: 'Barra de Pesquisa' },
  { value: 'filters', label: 'Filtros' },
  { value: 'file-upload', label: 'Upload de Ficheiros' },
  { value: 'date-picker', label: 'Date Picker' },
  { value: 'stepper', label: 'Stepper / Wizard' },
  { value: 'skeleton', label: 'Skeleton Loading' },
  { value: 'breadcrumbs', label: 'Breadcrumbs' },
  { value: 'tooltips', label: 'Tooltips' },
  { value: 'progress', label: 'Progress Bar' },
];

export const pageOptions = [
  { value: 'login', label: 'Login / Registo' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'profile', label: 'Perfil do Utilizador' },
  { value: 'settings', label: 'Definições' },
  { value: 'list', label: 'Listagem / Tabela' },
  { value: 'detail', label: 'Página de Detalhe' },
  { value: 'form-page', label: 'Página de Formulário' },
  { value: 'landing', label: 'Landing Page' },
  { value: 'pricing', label: 'Página de Preços' },
  { value: 'error', label: 'Página de Erro (404, 500)' },
  { value: 'empty-state', label: 'Empty State' },
  { value: 'onboarding', label: 'Onboarding / Welcome' },
  { value: 'notifications', label: 'Notificações' },
  { value: 'analytics', label: 'Analytics / Relatórios' },
];

export const animationOptions = [
  { value: 'none', label: 'Sem animações' },
  { value: 'subtle', label: 'Subtis', desc: 'Hover states, transições suaves' },
  { value: 'moderate', label: 'Moderadas', desc: 'Transições de página, fade-in' },
  { value: 'rich', label: 'Ricas', desc: 'Micro-interações, parallax' },
];

export const feedbackOptions = [
  { value: 'hover', label: 'Hover states claros' },
  { value: 'loading', label: 'Loading states' },
  { value: 'empty', label: 'Empty states' },
  { value: 'error', label: 'Error states' },
  { value: 'success', label: 'Success feedback' },
  { value: 'confirmation', label: 'Diálogos de confirmação' },
];

export const languageOptions = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
];

export const toneOptions = [
  { value: 'professional', label: 'Profissional', desc: 'Sério, direto, confiável' },
  { value: 'friendly', label: 'Amigável', desc: 'Próximo, caloroso, acolhedor' },
  { value: 'technical', label: 'Técnico', desc: 'Preciso, detalhado, funcional' },
  { value: 'creative', label: 'Criativo', desc: 'Expressivo, inspirador, dinâmico' },
];
