import { useState } from 'react';
import { Save, Download, Trash2, Bookmark } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

interface ProfileManagerProps<T> {
  mode: 'design' | 'dev' | 'deploy';
  currentConfig: T;
  onLoadProfile: (config: T) => void;
}

export function ProfileManager<T>({ mode, currentConfig, onLoadProfile }: ProfileManagerProps<T>) {
  const storageKey = `stitch-profiles-${mode}`;

  const [profiles, setProfiles] = useState<Record<string, T>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {};
  });
  const [selectedProfile, setSelectedProfile] = useState<string>('');

  const saveProfilesToStorage = (newProfiles: Record<string, T>) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newProfiles));
      setProfiles(newProfiles);
    } catch {
      alert("Failed to save profiles to localStorage.");
    }
  };

  const handleSaveAs = () => {
    const name = window.prompt("Enter a name for this new profile:");
    if (!name || !name.trim()) return;
    
    const newProfiles = { ...profiles, [name.trim()]: currentConfig };
    saveProfilesToStorage(newProfiles);
    setSelectedProfile(name.trim());
  };

  const handleUpdateCurrent = () => {
    if (!selectedProfile) return;
    if (window.confirm(`Are you sure you want to overwrite the profile "${selectedProfile}" with your current settings?`)) {
      const newProfiles = { ...profiles, [selectedProfile]: currentConfig };
      saveProfilesToStorage(newProfiles);
    }
  };

  const handleLoad = () => {
    if (!selectedProfile || !profiles[selectedProfile]) return;
    onLoadProfile(profiles[selectedProfile]);
  };

  const handleDelete = () => {
    if (!selectedProfile) return;
    if (window.confirm(`Are you sure you want to delete the profile "${selectedProfile}"?`)) {
      const newProfiles = { ...profiles };
      delete newProfiles[selectedProfile];
      saveProfilesToStorage(newProfiles);
      setSelectedProfile('');
    }
  };

  const hasProfiles = Object.keys(profiles).length > 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-900/10 p-3">
      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
        <Bookmark className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">Perfis Salvos</span>
      </div>

      <div className="flex-1 flex items-center gap-2">
        <CustomSelect
          value={selectedProfile}
          onChange={(val) => setSelectedProfile(val)}
          options={Object.keys(profiles).map(name => ({ value: name, label: name }))}
          placeholder="-- Selecionar Perfil --"
          className="flex-1"
          buttonClassName="px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100"
          placement="top"
        />

        {selectedProfile && (
          <button
            onClick={handleLoad}
            className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
            title="Carregar Perfil"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {selectedProfile && (
          <>
            <button
              onClick={handleUpdateCurrent}
              className="flex items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-700"
              title="Atualizar perfil selecionado"
            >
              <Save className="h-3.5 w-3.5" />
              Atualizar
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center justify-center rounded-md border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/20 px-2 py-1.5 text-red-600 dark:text-red-400 transition hover:bg-red-100 dark:hover:bg-red-900/40"
              title="Eliminar Perfil"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </>
        )}
        
        <button
          onClick={handleSaveAs}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${!selectedProfile ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'}`}
        >
          {hasProfiles ? 'Novo' : 'Salvar Perfil'}
        </button>
      </div>
    </div>
  );
}
