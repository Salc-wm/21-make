import type { ArchitectureDictionary } from '../architectureDictionary';

export function generateDictJSON(dict: ArchitectureDictionary): string {
  return JSON.stringify(dict, null, 2);
}
