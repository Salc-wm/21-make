import { useState, useRef } from 'react';
import { Sparkles, X, Key, Loader2, AlertCircle, Send, Trash2, Settings2 } from 'lucide-react';

type AIProvider = 'openai' | 'gemini';

interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
}

interface StitchAIPreviewProps {
  prompt: string;
  nightMode: boolean;
}

const PROVIDER_MODELS: Record<AIProvider, { label: string; models: { value: string; label: string }[] }> = {
  openai: {
    label: 'OpenAI',
    models: [
      { value: 'gpt-4o', label: 'GPT-4o' },
      { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
      { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    ],
  },
  gemini: {
    label: 'Google Gemini',
    models: [
      { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
      { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
      { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
    ],
  },
};

async function callAI(config: AIConfig, prompt: string, signal: AbortSignal): Promise<string> {
  if (config.provider === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: 'You are Design, an expert UI/UX designer. When given a design prompt, you produce a detailed textual description of the UI design, including layout decisions, color applications, component specifications, spacing, and any other relevant visual details. Be comprehensive and structured.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 4096,
        temperature: 0.7,
      }),
      signal,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: { message: res.statusText } }));
      throw new Error(err.error?.message || `OpenAI API error: ${res.status}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? 'No response generated.';
  }

  if (config.provider === 'gemini') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: 'You are Design, an expert UI/UX designer. When given a design prompt, you produce a detailed textual description of the UI design, including layout decisions, color applications, component specifications, spacing, and any other relevant visual details. Be comprehensive and structured.' }],
        },
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 4096,
          temperature: 0.7,
        },
      }),
      signal,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: { message: res.statusText } }));
      throw new Error(err.error?.message || `Gemini API error: ${res.status}`);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response generated.';
  }

  throw new Error('Unknown provider');
}

export function StitchAIPreview({ prompt, nightMode: _nightMode }: StitchAIPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [aiConfig, setAIConfig] = useState<AIConfig>(() => {
    try {
      const saved = localStorage.getItem('stitch-ai-config');
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return { provider: 'gemini', apiKey: '', model: 'gemini-2.0-flash' };
  });
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  const saveConfig = (cfg: AIConfig) => {
    setAIConfig(cfg);
    try { localStorage.setItem('stitch-ai-config', JSON.stringify(cfg)); } catch { /* ignore */ }
  };

  const handleGenerate = async () => {
    if (!aiConfig.apiKey.trim()) {
      setShowSettings(true);
      setError('Configura a tua API key primeiro.');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const result = await callAI(aiConfig, prompt, controller.signal);
      setResponse(result);
    } catch (e: unknown) {
      if (e instanceof Error && e.name === 'AbortError') return;
      setError(e instanceof Error ? e.message : 'Unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    abortRef.current?.abort();
    setResponse('');
    setError('');
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition hover:border-zinc-400 hover:bg-zinc-50 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 w-full justify-center"
      >
        <Sparkles className="h-4 w-4 text-amber-500" />
        Testar com IA — Ver resultado Design
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-5 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Design AI Preview</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center justify-center rounded-lg p-1.5 text-xs transition ${
              showSettings
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
            title="Configurações"
          >
            <Settings2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => { handleClear(); setIsOpen(false); }}
            className="flex items-center justify-center rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-50 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-b border-zinc-100 dark:border-zinc-800 px-5 py-4 space-y-3 bg-zinc-50 dark:bg-zinc-800/50">
          {/* Provider */}
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">Provedor de IA</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(PROVIDER_MODELS) as AIProvider[]).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => saveConfig({ ...aiConfig, provider: p, model: PROVIDER_MODELS[p].models[0].value })}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    aiConfig.provider === p
                      ? 'border-zinc-900 dark:border-zinc-300 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-900 dark:ring-zinc-300'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800'
                  }`}
                >
                  {PROVIDER_MODELS[p].label}
                </button>
              ))}
            </div>
          </div>

          {/* Model */}
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">Modelo</label>
            <select
              value={aiConfig.model}
              onChange={e => saveConfig({ ...aiConfig, model: e.target.value })}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            >
              {PROVIDER_MODELS[aiConfig.provider].models.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          {/* API Key */}
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <Key className="inline h-3 w-3 mr-1" />
              API Key
            </label>
            <input
              type="password"
              value={aiConfig.apiKey}
              onChange={e => saveConfig({ ...aiConfig, apiKey: e.target.value })}
              placeholder={aiConfig.provider === 'openai' ? 'sk-...' : 'AIza...'}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 font-mono"
            />
            <p className="mt-1 text-[10px] text-zinc-400">
              A key é guardada apenas localmente no teu browser.
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-5 py-3 flex items-center gap-2">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
            loading
              ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 cursor-wait'
              : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              A gerar...
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              Gerar com {PROVIDER_MODELS[aiConfig.provider].label}
            </>
          )}
        </button>
        {(response || error) && (
          <button
            onClick={handleClear}
            className="flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 p-2 text-zinc-500 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
            title="Limpar"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mx-5 mb-3 flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 px-3 py-2">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500 dark:text-red-400" />
          <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Response */}
      {response && (
        <div className="border-t border-zinc-100 dark:border-zinc-800 max-h-[500px] overflow-y-auto px-5 py-4">
          <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            {response}
          </pre>
        </div>
      )}
    </div>
  );
}
