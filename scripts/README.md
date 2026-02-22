# Scripts de Manutenção de Dados

Este diretório contém uma série de scripts desenvolvidos para auxiliar na refatoração e manutenção da massa de dados dos Prompts originários do projeto.

Inicialmente, os `prePrompts` estavam alocados como comentários e lixo misturado dentro de arrays de objetos e declarações codificadas diretamente em arquivos `.ts`. Estes scripts automatizam processos de extração (porting), higienização de comentários e organização de diretórios (pastas exclusivas para .json e arquivos de interface em Typescript).

### Arquivos

1. **`port.ts`**: Script introdutório que importava as instâncias literais das arrays originais (antes das limpezas de comentários) e utilizava `fs.writeFileSync` para exportá-las num dump literal para formato `.json`.
2. **`update-ts-files.ts`**: Script acionado em seguida à extração do dump para ler os 4 arquivos originais do `prePrompts`, buscar via `regex` as implementações longas de array estático, varrer o documento eliminando a sujeira e comentários (`\/\/`), trocando finalmente o Array por um `import` de módulo vindo dos JSONs gerados.
3. **`organize_data.ts`**: Utilizado para gerenciar fisicamente as pastas dentro de `src/data`, categorizando e realocando arquivos separadamente em diretórios genéricos de destino: `options`, `prePrompts` (para as interfaces/types) e `json`.
4. **`fix_imports.ts`**: Realizou um Find and Replace profundo caminhando (`walk()`) por todo o repositório em TypeScript (`src`) atualizando todas os relative paths de importação de `/data/*` adaptados para as novas pastas de organização interna providas na raiz da reformulação de dados.
5. **`fix_internal_imports.ts`**: Pequeno script para reatar e concertar imports relativos muito aninhados e estrupiados gerados por estarem distantes entre as novas arquiteturas dos imports das opções base.
6. **`fix_json_imports.ts`**: Resolveu problema estrito do empacotador onde as chamadas assíncronas em JSON relativas ao ambiente de runtime Vite encontravam-se na árvore raiz além do esperado.
