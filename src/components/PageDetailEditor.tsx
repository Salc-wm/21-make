import { useState, memo } from 'react';
import { t } from '../core/PromptBuilder';
import { ChevronDown, ChevronUp, FileText, AlertCircle } from 'lucide-react';
import { type PageDetail } from '../types';

interface PageDetailEditorProps {
  pageKey: string;
  pageName: string;
  detail: PageDetail;
  onChange: (key: string, detail: PageDetail) => void;
  isCustom?: boolean;
  lang: import('../core/i18n').Lang;
}

const PageDetailItem = memo(function PageDetailItem({ pageKey, pageName, detail, onChange, isCustom, lang }: PageDetailEditorProps) {
  const strings = t(lang);
  const [isOpen, setIsOpen] = useState(false);
  const hasContent = detail.description || detail.components || detail.notes;

  return (
    <div className={`rounded-lg border transition-all ${isOpen ? 'border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800/50' : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900'}`}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold ${isCustom ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>
            <FileText className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{pageName}</span>
            {isCustom && (
              <span className="ml-2 rounded-full bg-blue-100 dark:bg-blue-900/40 px-1.5 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400">
                Custom
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasContent && (
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" title={strings.pageDetailHelper.split(' ')[0] + '...'} />
          )}
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-zinc-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-400" />
          )}
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="border-t border-zinc-200 dark:border-zinc-700 px-4 pb-4 pt-3 space-y-3">
          {/* Description */}
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {strings.pageDescTitle}
              <span className="ml-1 text-zinc-400 font-normal">{strings.pageDescHint}</span>
            </label>
            <textarea
              value={detail.description}
              onChange={e => onChange(pageKey, { ...detail, description: e.target.value })}
              placeholder={strings.pageDescPlaceholder(pageName)}
              rows={2}
              className="w-full resize-y rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          {/* Key Components */}
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {strings.pageElementsTitle}
              <span className="ml-1 text-zinc-400 font-normal">{strings.pageElementsHint}</span>
            </label>
            <input
              type="text"
              value={detail.components}
              onChange={e => onChange(pageKey, { ...detail, components: e.target.value })}
              placeholder={strings.pageElementsPlaceholder}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          {/* Extra Notes */}
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {strings.pageNotesTitle}
              <span className="ml-1 text-zinc-400 font-normal">{strings.pageNotesHint}</span>
            </label>
            <input
              type="text"
              value={detail.notes}
              onChange={e => onChange(pageKey, { ...detail, notes: e.target.value })}
              placeholder={strings.pageNotesPlaceholder}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          {/* Helper tag */}
          <div className="flex items-start gap-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 px-3 py-2">
            <AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-zinc-400" />
            <p className="text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              {strings.pageDetailHelper}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

interface PageDetailEditorListProps {
  pages: string[];
  customPages: string;
  pageDetails: Record<string, PageDetail>;
  onPageDetailChange: (key: string, detail: PageDetail) => void;
  pageLabels: Record<string, string>;
  lang: import('../core/i18n').Lang;
}

export const PageDetailEditorList = memo(function PageDetailEditorList({
  pages,
  customPages,
  pageDetails,
  onPageDetailChange,
  pageLabels,
  lang,
}: PageDetailEditorListProps) {
  const strings = t(lang);
  const customPageList = customPages
    .split(',')
    .map(p => p.trim())
    .filter(Boolean);

  const allPages = [
    ...pages.map(p => ({ key: p, label: pageLabels[p] ?? p, isCustom: false })),
    ...customPageList.map(p => ({ key: `custom:${p}`, label: p, isCustom: true })),
  ];

  if (allPages.length === 0) return null;

  const getDetail = (key: string): PageDetail =>
    pageDetails[key] ?? { name: key, description: '', components: '', notes: '' };

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          {strings.pageDetailTitle}
        </span>
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
        {strings.pageDetailDesc}
      </p>
      {allPages.map(page => (
        <PageDetailItem
          key={page.key}
          pageKey={page.key}
          pageName={page.label}
          detail={getDetail(page.key)}
          onChange={onPageDetailChange}
          isCustom={page.isCustom}
          lang={lang}
        />
      ))}
    </div>
  );
});
