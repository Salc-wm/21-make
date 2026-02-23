import type { Lang } from '../../core/i18n';

const t = (lang: Lang, pt: string, en: string, es: string, fr: string) => {
  if (lang === 'pt') return pt;
  if (lang === 'es') return es;
  if (lang === 'fr') return fr;
  return en;
};

export const getAppTypes = (lang: Lang) => [
  { value: 'web-app', label: t(lang, 'Web App', 'Web App', 'Aplicación Web', 'Application Web') },
  { value: 'dashboard', label: t(lang, 'Dashboard', 'Dashboard', 'Panel de Control', 'Tableau de Bord') },
  { value: 'landing-page', label: t(lang, 'Landing Page', 'Landing Page', 'Página de Aterrizaje', 'Page de Destination') },
  { value: 'e-commerce', label: t(lang, 'E-Commerce', 'E-Commerce', 'E-Commerce', 'E-Commerce') },
  { value: 'blog-cms', label: t(lang, 'Blog / CMS', 'Blog / CMS', 'Blog / CMS', 'Blog / CMS') },
  { value: 'saas', label: t(lang, 'Plataforma SaaS', 'SaaS Platform', 'Plataforma SaaS', 'Plateforme SaaS') },
  { value: 'admin-panel', label: t(lang, 'Painel de Administração', 'Admin Panel', 'Panel de Administración', 'Panneau d\'Administration') },
  { value: 'portfolio', label: t(lang, 'Portfólio', 'Portfolio', 'Portafolio', 'Portfolio') },
  { value: 'mobile-first', label: t(lang, 'App Mobile-First', 'Mobile-First App', 'App Mobile-First', 'App Mobile-First') },
  { value: 'social', label: t(lang, 'Social / Comunidades', 'Social / Community', 'Social / Comunidad', 'Social / Communauté') },
];

export const getAppPageTypeOptions = (lang: Lang) => [
  { value: 'single-page', label: t(lang, 'Página Única', 'Single Page', 'Página Única', 'Page Unique'), desc: t(lang, 'Tudo numa só página / SPA simples', 'Everything on a single page / simple SPA', 'Todo en una sola página / SPA simple', 'Tout sur une seule page / SPA simple') },
  { value: 'multi-page', label: t(lang, 'Multi-Página', 'Multi-Page', 'Multi-Página', 'Multi-Pages'), desc: t(lang, 'Várias páginas ou sessões distintas', 'Multiple distinct pages or sessions', 'Varias páginas o sesiones distintas', 'Plusieurs pages ou sessions distinctes') },
];

export const getDesignStyles = (lang: Lang) => [
  { value: 'minimal', label: t(lang, 'Minimalista', 'Minimal', 'Minimalista', 'Minimaliste'), desc: t(lang, 'Limpo, espaçoso, essencial', 'Clean, spacious, essential', 'Limpio, espacioso, esencial', 'Épuré, spacieux, essentiel') },
  { value: 'corporate', label: t(lang, 'Corporativo', 'Corporate', 'Corporativo', 'Corporate'), desc: t(lang, 'Formal, estruturado, confiável', 'Formal, structured, reliable', 'Formal, estructurado, confiable', 'Formel, structuré, fiable') },
  { value: 'modern', label: t(lang, 'Moderno', 'Modern', 'Moderno', 'Moderne'), desc: t(lang, 'Contemporâneo, atual, sofisticado', 'Contemporary, current, sophisticated', 'Contemporáneo, actual, sofisticado', 'Contemporain, actuel, sophistiqué') },
  { value: 'brutalist', label: t(lang, 'Brutalista', 'Brutalist', 'Brutalista', 'Brutaliste'), desc: t(lang, 'Audaz, cru, tipografia forte', 'Bold, raw, strong typography', 'Audaz, crudo, tipografía fuerte', 'Audacieux, brut, typographie forte') },
  { value: 'glassmorphism', label: t(lang, 'Glassmorphism', 'Glassmorphism', 'Glassmorphism', 'Glassmorphism'), desc: t(lang, 'Transparências, blur, camadas', 'Transparencies, blur, layers', 'Transparencias, desenfoque, capas', 'Transparences, flou, calques') },
  { value: 'flat', label: t(lang, 'Flat Design', 'Flat Design', 'Flat Design', 'Flat Design'), desc: t(lang, 'Sem sombras, cores sólidas', 'No shadows, solid colors', 'Sin sombras, colores sólidos', 'Sans ombres, couleurs unies') },
  { value: 'neomorphism', label: t(lang, 'Neomorfismo', 'Neomorphism', 'Neomorfismo', 'Néomorphisme'), desc: t(lang, 'Sombras suaves, relevo subútil', 'Soft shadows, subtle relief', 'Sombras suaves, relieve sutil', 'Ombres douces, relief subtil') },
];

export const getColorSchemes = (lang: Lang) => [
  { value: 'neutral', label: t(lang, 'Neutro', 'Neutral', 'Neutro', 'Neutre'), colors: ['#1a1a1a', '#6b7280', '#e5e7eb', '#f9fafb'] },
  { value: 'warm', label: t(lang, 'Quente', 'Warm', 'Cálido', 'Chaud'), colors: ['#92400e', '#d97706', '#fbbf24', '#fef3c7'] },
  { value: 'cool', label: t(lang, 'Frio', 'Cool', 'Frío', 'Froid'), colors: ['#1e3a5f', '#3b82f6', '#93c5fd', '#eff6ff'] },
  { value: 'earth', label: t(lang, 'Terra', 'Earth', 'Tierra', 'Terre'), colors: ['#3d2c1e', '#78593e', '#c4a882', '#f5ede4'] },
  { value: 'monochrome', label: t(lang, 'Monocromático', 'Monochrome', 'Monocromático', 'Monochrome'), colors: ['#000000', '#4b5563', '#9ca3af', '#f3f4f6'] },
  { value: 'vibrant', label: t(lang, 'Vibrante', 'Vibrant', 'Vibrante', 'Vibrant'), colors: ['#7c3aed', '#ec4899', '#f59e0b', '#10b981'] },
  { value: 'pastel', label: t(lang, 'Pastel', 'Pastel', 'Pastel', 'Pastel'), colors: ['#c4b5fd', '#fbcfe8', '#fde68a', '#a7f3d0'] },
  { value: 'custom', label: t(lang, 'Personalizado', 'Custom', 'Personalizado', 'Personnalisé'), colors: [] },
];

export const getDarkModeOptions = (lang: Lang) => [
  { value: 'light', label: t(lang, 'Apenas Light', 'Light only', 'Solo Claro', 'Clair uniquement') },
  { value: 'dark', label: t(lang, 'Apenas Dark', 'Dark only', 'Solo Oscuro', 'Sombre uniquement') },
  { value: 'both', label: t(lang, 'Light + Dark (toggle)', 'Light + Dark (toggle)', 'Claro + Oscuro (toggle)', 'Clair + Sombre (toggle)') },
  { value: 'system', label: t(lang, 'Seguir sistema', 'Follow system', 'Seguir sistema', 'Suivre le système') },
];

export const getBorderRadiusOptions = (lang: Lang) => [
  { value: 'none', label: t(lang, 'Nenhum', 'None', 'Ninguno', 'Aucun'), preview: '0px' },
  { value: 'small', label: t(lang, 'Pequeno', 'Small', 'Pequeño', 'Petit'), preview: '4px' },
  { value: 'medium', label: t(lang, 'Médio', 'Medium', 'Medio', 'Moyen'), preview: '8px' },
  { value: 'large', label: t(lang, 'Grande', 'Large', 'Grande', 'Grand'), preview: '12px' },
  { value: 'full', label: t(lang, 'Muito Grande', 'Full', 'Muy Grande', 'Très Grand'), preview: '16px' },
];

export const getDensityOptions = (lang: Lang) => [
  { value: 'compact', label: t(lang, 'Compacto', 'Compact', 'Compacto', 'Compact'), desc: t(lang, 'Menos espaçamento, mais conteúdo', 'Less spacing, more content', 'Menos espacio, más contenido', 'Moins d\'espace, plus de contenu') },
  { value: 'comfortable', label: t(lang, 'Confortável', 'Comfortable', 'Cómodo', 'Confortable'), desc: t(lang, 'Equilíbrio entre espaço e conteúdo', 'Balance between space and content', 'Equilibrio entre espacio y contenido', 'Équilibre entre espace et contenu') },
  { value: 'spacious', label: t(lang, 'Espaçoso', 'Spacious', 'Espacioso', 'Spacieux'), desc: t(lang, 'Muito espaço, respiração visual', 'Lots of space, visual breathing room', 'Mucho espacio, respiro visual', 'Beaucoup d\'espace, respiration visuelle') },
];

export const getFontStyles = (lang: Lang) => [
  { value: 'sans-serif', label: 'Sans-serif', example: 'Inter, Helvetica' },
  { value: 'serif', label: 'Serif', example: 'Georgia, Merriweather' },
  { value: 'mono', label: 'Monospace', example: 'JetBrains Mono, Fira Code' },
  { value: 'display', label: 'Display', example: 'Poppins, Montserrat' },
  { value: 'system', label: t(lang, 'System UI', 'System UI', 'System UI', 'System UI'), example: t(lang, 'Fonte nativa do SO', 'Native OS font', 'Fuente nativa del SO', 'Police OS native') },
];

export const getFontSizes = (lang: Lang) => [
  { value: 'small', label: t(lang, 'Pequeno', 'Small', 'Pequeño', 'Petit'), desc: '14px base' },
  { value: 'base', label: t(lang, 'Normal', 'Normal', 'Normal', 'Normal'), desc: '16px base' },
  { value: 'large', label: t(lang, 'Grande', 'Large', 'Grande', 'Grand'), desc: '18px base' },
];

export const getLayoutTypes = (lang: Lang) => [
  { value: 'sidebar', label: t(lang, 'Sidebar + Conteúdo', 'Sidebar + Content', 'Sidebar + Contenido', 'Barre latérale + Contenu') },
  { value: 'topbar', label: t(lang, 'Topbar + Conteúdo', 'Topbar + Content', 'Topbar + Contenido', 'Barre supérieure + Contenu') },
  { value: 'full-width', label: t(lang, 'Largura Total', 'Full Width', 'Ancho Completo', 'Pleine Largeur') },
  { value: 'centered', label: t(lang, 'Centrado (max-width)', 'Centered (max-width)', 'Centrado (max-width)', 'Centré (max-width)') },
  { value: 'split', label: t(lang, 'Split (duas colunas)', 'Split (two columns)', 'Dividido (dos columnas)', 'Divisé (deux colonnes)') },
  { value: 'cards-grid', label: t(lang, 'Grid de Cards', 'Cards Grid', 'Grid de Tarjetas', 'Grille de Cartes') },
];

export const getNavigationStyles = (lang: Lang) => [
  { value: 'sidebar', label: t(lang, 'Sidebar Fixa', 'Fixed Sidebar', 'Sidebar Fija', 'Barre latérale fixe') },
  { value: 'sidebar-collapsible', label: t(lang, 'Sidebar Colapsável', 'Collapsible Sidebar', 'Sidebar Plegable', 'Barre latérale pliable') },
  { value: 'topbar', label: t(lang, 'Barra Superior', 'Top Bar', 'Barra Superior', 'Barre supérieure') },
  { value: 'tabs', label: t(lang, 'Separadores (Tabs)', 'Tabs', 'Pestañas', 'Onglets') },
  { value: 'breadcrumbs', label: t(lang, 'Trilhos (Breadcrumbs)', 'Breadcrumbs', 'Migas de pan', 'Fil d\'Ariane') },
  { value: 'bottom-nav', label: t(lang, 'Navegação Inferior (Mobile)', 'Bottom Nav (Mobile)', 'Navegación Inferior (Móvil)', 'Navigation Inférieure (Mobile)') },
  { value: 'hamburger', label: t(lang, 'Menu Hamburger', 'Hamburger Menu', 'Menú Hamburguesa', 'Menu Hamburger') },
];

export const getComponentOptions = (lang: Lang) => [
  { value: 'buttons', label: t(lang, 'Botões (primário, secundário, ghost)', 'Buttons (primary, secondary, ghost)', 'Botones (primario, secundario, ghost)', 'Boutons (primaire, secondaire, ghost)') },
  { value: 'forms', label: t(lang, 'Formulários (inputs, selects, checkboxes)', 'Forms (inputs, selects, checkboxes)', 'Formularios (inputs, selects, checkboxes)', 'Formulaires (inputs, selects, checkboxes)') },
  { value: 'tables', label: t(lang, 'Tabelas de dados', 'Data tables', 'Tablas de datos', 'Tableaux de données') },
  { value: 'cards', label: t(lang, 'Cards', 'Cards', 'Tarjetas', 'Cartes') },
  { value: 'modals', label: t(lang, 'Modais / Dialogs', 'Modals / Dialogs', 'Modales / Diálogos', 'Modales / Dialogues') },
  { value: 'toasts', label: t(lang, 'Toasts / Notificações', 'Toasts / Notifications', 'Toasts / Notificaciones', 'Toasts / Notifications') },
  { value: 'charts', label: t(lang, 'Gráficos / Charts', 'Charts / Graphs', 'Gráficos', 'Graphiques / Diagrammes') },
  { value: 'avatars', label: t(lang, 'Avatares / User Info', 'Avatars / User Info', 'Avatares / Info de Usuario', 'Avatars / Info Utilisateur') },
  { value: 'badges', label: t(lang, 'Badges / Tags', 'Badges / Tags', 'Insignias / Etiquetas', 'Badges / Étiquettes') },
  { value: 'dropdowns', label: t(lang, 'Dropdowns / Menus', 'Dropdowns / Menus', 'Desplegables / Menús', 'Menus déroulants') },
  { value: 'tabs', label: t(lang, 'Tabs / Segmented Control', 'Tabs / Segmented Control', 'Pestañas / Control Segmentado', 'Onglets / Contrôle segmenté') },
  { value: 'accordion', label: t(lang, 'Accordion / Collapsible', 'Accordion / Collapsible', 'Acordeón / Plegable', 'Accordéon / Pliable') },
  { value: 'pagination', label: t(lang, 'Paginação', 'Pagination', 'Paginación', 'Pagination') },
  { value: 'search', label: t(lang, 'Barra de Pesquisa', 'Search Bar', 'Barra de Búsqueda', 'Barre de Recherche') },
  { value: 'filters', label: t(lang, 'Filtros', 'Filters', 'Filtros', 'Filtres') },
  { value: 'file-upload', label: t(lang, 'Upload de Ficheiros', 'File Upload', 'Subida de Archivos', 'Téléchargement de Fichiers') },
  { value: 'date-picker', label: t(lang, 'Seletor de Data', 'Date Picker', 'Selector de Fecha', 'Sélecteur de Date') },
  { value: 'stepper', label: t(lang, 'Passos / Wizard (Stepper)', 'Stepper / Wizard', 'Pasos / Asistente (Stepper)', 'Étapes / Assistant (Stepper)') },
  { value: 'skeleton', label: t(lang, 'Carregamento (Skeleton)', 'Skeleton Loading', 'Carga Esqueleto', 'Chargement Squelette') },
  { value: 'breadcrumbs', label: t(lang, 'Trilhos (Breadcrumbs)', 'Breadcrumbs', 'Migas de pan', 'Fil d\'Ariane') },
  { value: 'tooltips', label: t(lang, 'Dicas (Tooltips)', 'Tooltips', 'Tooltips (Consejos)', 'Infobulles') },
  { value: 'progress', label: t(lang, 'Barra de Progresso', 'Progress Bar', 'Barra de Progreso', 'Barre de Progression') },
];

export const getPageOptions = (lang: Lang) => [
  { value: 'login', label: t(lang, 'Login / Registo', 'Login / Register', 'Login / Registro', 'Connexion / Inscription') },
  { value: 'dashboard', label: t(lang, 'Painel Integrado (Dashboard)', 'Dashboard', 'Panel de Control (Dashboard)', 'Tableau de bord (Dashboard)') },
  { value: 'profile', label: t(lang, 'Perfil de Utilizador', 'User Profile', 'Perfil de Usuario', 'Profil Utilisateur') },
  { value: 'settings', label: t(lang, 'Definições', 'Settings', 'Configuración', 'Paramètres') },
  { value: 'list', label: t(lang, 'Listagem / Tabela', 'List / Table', 'Listado / Tabla', 'Liste / Tableau') },
  { value: 'detail', label: t(lang, 'Página de Detalhe', 'Detail Page', 'Página de Detalle', 'Page de Détail') },
  { value: 'form-page', label: t(lang, 'Página de Formulário', 'Form Page', 'Página de Formulario', 'Page de Formulaire') },
  { value: 'landing', label: t(lang, 'Página de Destino (Landing)', 'Landing Page', 'Página de Aterrizaje (Landing)', 'Page de Destination (Landing)') },
  { value: 'pricing', label: t(lang, 'Página de Preços', 'Pricing Page', 'Página de Precios', 'Page de Tarification') },
  { value: 'error', label: t(lang, 'Página de Erro (404, 500)', 'Error Page (404, 500)', 'Página de Error (404, 500)', 'Page d\'Erreur (404, 500)') },
  { value: 'empty-state', label: t(lang, 'Estado Vazio (Empty State)', 'Empty State', 'Estado Vacío (Empty State)', 'État Vide (Empty State)') },
  { value: 'onboarding', label: t(lang, 'Boas-vindas (Onboarding)', 'Onboarding / Welcome', 'Bienvenida (Onboarding)', 'Intégration / Bienvenue') },
  { value: 'notifications', label: t(lang, 'Notificações', 'Notifications', 'Notificaciones', 'Notifications') },
  { value: 'analytics', label: t(lang, 'Estatísticas / Analytics', 'Analytics / Reports', 'Estadísticas / Informes', 'Statistiques / Rapports') },
];

export const getAnimationOptions = (lang: Lang) => [
  { value: 'none', label: t(lang, 'Sem animações', 'No animations', 'Sin animaciones', 'Sans animations') },
  { value: 'subtle', label: t(lang, 'Subtis', 'Subtle', 'Sutiles', 'Subtiles'), desc: t(lang, 'Hover states, transições suaves', 'Hover states, smooth transitions', 'Estados hover, transiciones suaves', 'États de survol, transitions douces') },
  { value: 'moderate', label: t(lang, 'Moderadas', 'Moderate', 'Moderadas', 'Modérées'), desc: t(lang, 'Transições de página, fade-in', 'Page transitions, fade-in', 'Transiciones de página, fade-in', 'Transitions de page, fondu') },
  { value: 'rich', label: t(lang, 'Ricas', 'Rich', 'Ricas', 'Riches'), desc: t(lang, 'Micro-interações, parallax', 'Micro-interactions, parallax', 'Micro-interacciones, parallax', 'Micro-interactions, parallaxe') },
];

export const getFeedbackOptions = (lang: Lang) => [
  { value: 'hover', label: t(lang, 'Hover states claros', 'Clear hover states', 'Estados hover claros', 'États de survol clairs') },
  { value: 'loading', label: t(lang, 'Loading states', 'Loading states', 'Estados de carga (loading)', 'États de chargement') },
  { value: 'empty', label: t(lang, 'Empty states', 'Empty states', 'Estados vacíos (empty)', 'États vides (empty)') },
  { value: 'error', label: t(lang, 'Error states', 'Error states', 'Estados de error', 'États d\'erreur') },
  { value: 'success', label: t(lang, 'Success feedback', 'Success feedback', 'Feedback de éxito', 'Retour de succès') },
  { value: 'confirmation', label: t(lang, 'Diálogos de confirmação', 'Confirmation dialogs', 'Diálogos de confirmación', 'Dialogues de confirmation') },
];

export const getLanguageOptions = (lang: Lang) => [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
];

export const getToneOptions = (lang: Lang) => [
  { value: 'professional', label: t(lang, 'Profissional', 'Professional', 'Profesional', 'Professionnel'), desc: t(lang, 'Sério, direto, confiável', 'Serious, direct, reliable', 'Serio, directo, confiable', 'Sérieux, direct, fiable') },
  { value: 'friendly', label: t(lang, 'Amigável', 'Friendly', 'Amigable', 'Amical'), desc: t(lang, 'Próximo, caloroso, acolhedor', 'Approachable, warm, welcoming', 'Cercano, cálido, acogedor', 'Accessible, chaleureux, accueillant') },
  { value: 'technical', label: t(lang, 'Técnico', 'Technical', 'Técnico', 'Technique'), desc: t(lang, 'Preciso, detalhado, funcional', 'Precise, detailed, functional', 'Preciso, detallado, funcional', 'Précis, détaillé, fonctionnel') },
  { value: 'creative', label: t(lang, 'Criativo', 'Creative', 'Creativo', 'Créatif'), desc: t(lang, 'Expressivo, inspirador, dinâmico', 'Expressive, inspiring, dynamic', 'Expresivo, inspirador, dinámico', 'Expressif, inspirant, dynamique') },
];

