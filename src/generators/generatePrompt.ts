import type { PromptConfig } from '../types';
import {
  getAppTypes, getAppPageTypeOptions, getDesignStyles, getColorSchemes, getDarkModeOptions, getBorderRadiusOptions, getDensityOptions, getFontStyles, getFontSizes, getLayoutTypes, getNavigationStyles, getAnimationOptions, getToneOptions, getLanguageOptions, getComponentOptions as getComponentOptionsList, getPageOptions as getPageOptionsList
} from '../data/options/options';
import { PromptBuilder, t } from '../core/PromptBuilder';

export function generatePrompt(config: PromptConfig): string {
  const lang = config.promptLanguage === 'en' ? 'en' : 'pt';
  const builder = new PromptBuilder(lang);
  const strings = t(lang);

  if (config.projectName || config.projectDescription) {
    const sessionEntries = config.appPageType === 'multi-page' && config.numberOfPages > 1 
      ? Object.entries(config.sessionDetails).filter(([, v]) => v.trim()) 
      : [];

    const projectFields = [
      builder.addField(strings.name, config.projectName),
      builder.addField(strings.description, config.projectDescription),
      builder.addField(strings.type, config.appType, getAppTypes(lang)),
      builder.addField(strings.structure, config.appPageType, getAppPageTypeOptions(lang)) +
        (config.appPageType === 'multi-page' && config.numberOfPages > 1 ? ` (${config.numberOfPages} ${strings.pages})` : ''),
      ...(sessionEntries.length > 0 ? [
        `\n### ${lang === 'pt' ? 'Estrutura de Páginas' : 'Page Structure'}`,
        ...sessionEntries.map(([key, value]) => `- **${strings.page} ${key}:** ${value}`)
      ] : [])
    ].filter(Boolean);

    builder.addSection(`# 📋 ${strings.project}`, projectFields);
  }

  builder.addSection(`## 🎯 ${strings.guidelines}`, [
    lang === 'pt' ? 'Cria um design de UI que seja:' : 'Create a UI design that is:',
    builder.addList(lang === 'pt' ? [
      '**Sóbrio** — sem elementos desnecessários, sem ruído visual',
      '**Direto** — hierarquia clara, o utilizador sabe imediatamente o que fazer',
      '**Limpo** — espaço em branco generoso, alinhamentos consistentes, tipografia legível',
      'Prioriza a funcionalidade sobre a decoração',
      'Usa uma abordagem "less is more"'
    ] : [
      '**Clean** — no unnecessary elements, no visual noise',
      '**Direct** — clear hierarchy, the user immediately knows what to do',
      '**Polished** — generous white space, consistent alignment, readable typography',
      'Prioritize functionality over decoration',
      'Use a "less is more" approach'
    ])
  ]);

  const colorInfo = getColorSchemes(lang).find(c => c.value === config.colorScheme);
  const colorPalette = builder.addField(lang === 'pt' ? 'Paleta de Cores' : 'Color Palette', config.colorScheme, getColorSchemes(lang)) +
    (config.colorScheme === 'custom' ? ` (${strings.name}: ${config.primaryColor})` : (colorInfo?.colors?.length ? ` (${colorInfo.colors.join(', ')})` : ''));

  builder.addSection(`## 🎨 ${strings.visualStyle}`, [
    builder.addField(strings.designStyle, config.designStyle, getDesignStyles(lang)),
    colorPalette,
    builder.addField(lang === 'pt' ? 'Modo' : 'Mode', config.darkMode, getDarkModeOptions(lang)),
    builder.addField('Border Radius', config.borderRadius, getBorderRadiusOptions(lang)),
    builder.addField(strings.density || (lang === 'pt' ? 'Densidade' : 'Density'), config.density, getDensityOptions(lang))
  ]);

  const fontInfo = getFontStyles(lang).find(f => f.value === config.fontStyle);
  builder.addSection(`## 🔤 ${strings.typography}`, [
    builder.addField(lang === 'pt' ? 'Família' : 'Font Family', config.fontStyle, getFontStyles(lang)) + (fontInfo?.example ? ` (${lang === 'pt' ? 'ex' : 'e.g.'}: ${fontInfo.example})` : ''),
    builder.addField(lang === 'pt' ? 'Tamanho Base' : 'Base Font Size', config.fontSize, getFontSizes(lang)),
    lang === 'pt' ? '- Hierarquia tipográfica clara: títulos bold, subtítulos medium, corpo regular' : '- Clear typographic hierarchy: bold titles, medium subtitles, regular body text',
    lang === 'pt' ? '- Contraste de cor suficiente para boa legibilidade' : '- Sufficient color contrast for good readability'
  ]);

  const layoutFields = [
    builder.addField('Layout', config.layoutType, getLayoutTypes(lang)),
    builder.addField(lang === 'pt' ? 'Navegação' : 'Navigation', config.navigationStyle, getNavigationStyles(lang)),
    ...(config.navigationStyle.includes('sidebar') ? [builder.addField(lang === 'pt' ? 'Posição da Sidebar' : 'Sidebar Position', config.sidebarPosition === 'left' ? (lang === 'pt' ? 'Esquerda' : 'Left') : (lang === 'pt' ? 'Direita' : 'Right'))] : []),
    builder.addField(lang === 'pt' ? 'Responsividade' : 'Responsiveness', config.responsiveness === 'fully-responsive' ? (lang === 'pt' ? 'Totalmente responsivo' : 'Fully responsive') : (lang === 'pt' ? 'Desktop-first com adaptação mobile' : 'Desktop-first with mobile adaptation'))
  ];
  builder.addSection(`## 📐 ${strings.layoutNav}`, layoutFields);

  if (config.components.length > 0) {
    builder.addSection(`## 🧩 ${strings.components}`, [
      lang === 'pt' ? 'Inclui os seguintes componentes:' : 'Include the following components:',
      builder.addList(config.components.map(c => getComponentOptionsList(lang).find(o => o.value === c)?.label ?? c)),
      '',
      lang === 'pt' ? 'Todos os componentes devem seguir um design system consistente com estados claros (default, hover, active, disabled, focus).' : 'All components must follow a consistent design system with clear states (default, hover, active, disabled, focus).'
    ]);
  }

  if (config.pages.length > 0 || config.customPages.trim()) {
    const customPages = config.customPages.split(',').map(p => p.trim()).filter(Boolean);
    const allPages: { key: string; label: string; isCustom?: boolean }[] = [
      ...config.pages.map(p => ({ key: p, label: getPageOptionsList(lang).find(o => o.value === p)?.label ?? p })),
      ...customPages.map(p => ({ key: `custom:${p}`, label: p, isCustom: true }))
    ];

    const hasDetail = allPages.some(p => {
      const d = config.pageDetails[p.key];
      return d && (d.description || d.components || d.notes);
    });

    const pageContent = [
      hasDetail ? (lang === 'pt' ? `Cria designs para as seguintes ${allPages.length} páginas, respeitando os detalhes especificados:` : `Create designs for the following ${allPages.length} pages, following the specified details:`) : (lang === 'pt' ? 'Cria designs para as seguintes páginas:' : 'Create designs for the following pages:'),
      ...allPages.flatMap(p => {
        const d = config.pageDetails[p.key];
        if (hasDetail) {
          const detailLines = [];
          if (d && (d.description || d.components || d.notes)) {
            if (d.description) detailLines.push(`- **${lang === 'pt' ? 'Descrição' : 'Description'}:** ${d.description}`);
            if (d.components) detailLines.push(`- **${lang === 'pt' ? 'Elementos' : 'Elements'}:** ${d.components}`);
            if (d.notes) detailLines.push(`- **${lang === 'pt' ? 'Notas' : 'Notes'}:** ${d.notes}`);
          } else {
            detailLines.push(`- ${lang === 'pt' ? 'Sem detalhes adicionais especificados — seguir padrão.' : 'No additional details specified — follow defaults.'}`);
          }
          return [`\n### ${p.label}${p.isCustom ? ' *(custom)*' : ''}`, ...detailLines];
        } else {
          return [`- ${p.label}`];
        }
      })
    ];
    builder.addSection(`## 📄 ${strings.pagesTitle || (lang === 'pt' ? 'Páginas' : 'Pages')}`, pageContent);
  }

  builder.addSection(`## ✨ ${strings.interactions}`, [
    builder.addField(lang === 'pt' ? 'Animações' : 'Animations', config.animations, getAnimationOptions(lang)),
    config.feedback.length > 0 ? `- **${lang === 'pt' ? 'Feedback visual' : 'Visual feedback'}:**\n  ` + builder.addList(config.feedback.map(f => f.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())), '  -') : ''
  ]);

  builder.addSection(`## 💬 ${strings.toneLang}`, [
    builder.addField(lang === 'pt' ? 'Idioma da UI' : 'UI Language', config.language, getLanguageOptions(lang)),
    builder.addField(lang === 'pt' ? 'Tom' : 'Tone', config.tone, getToneOptions(lang)),
    lang === 'pt' ? '- Textos curtos e diretos (microcopy eficaz)' : '- Short and direct text (effective microcopy)',
    lang === 'pt' ? '- Labels descritivos e ações claras nos botões' : '- Descriptive labels and clear action buttons'
  ]);

  if (config.extraNotes.trim()) {
    builder.addSection(`## 📝 ${strings.notes}`, config.extraNotes);
  }

  builder.addSection(`## ⚙️ ${strings.qualityRules}`, builder.addList(lang === 'pt' ? [
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
  ]));

  return builder.build('Design');
}
