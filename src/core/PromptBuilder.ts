import { i18n, type Lang } from './i18n';

/**
 * Gets the label for a given value from an options array.
 */
export function getLabel(options: { value: string; label: string }[], value: string): string {
  return options.find(o => o.value === value)?.label ?? value;
}

export function t(lang: Lang) {
  return i18n[lang];
}

export class PromptBuilder {
  private sections: string[] = [];
  private currentLang: Lang;

  constructor(lang: Lang) {
    this.currentLang = lang;
  }

  addSection(title: string, content: string | string[]) {
    if (!content || (Array.isArray(content) && content.length === 0)) return this;
    const body = Array.isArray(content) ? content.join('\n') : content;
    this.sections.push(`${title}\n${body}`);
    return this;
  }

  addField(label: string, value: any, options?: { value: string; label: string }[]) {
    if (!value) return '';
    const displayValue = options ? getLabel(options, value) : value;
    return `- **${label}:** ${displayValue}`;
  }

  addList(items: string[], bullet = '-') {
    return items.filter(Boolean).map(item => `${bullet} ${item}`).join('\n');
  }

  build(mode: 'Design' | 'Developer' | 'Deploy') {
    const footer = i18n[this.currentLang].promptFooter(mode);
    return [...this.sections, `---\n${footer}`].join('\n\n');
  }
}
