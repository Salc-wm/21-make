# Stitch - Assistente de Criação de Prompts

O **Stitch** é uma ferramenta gráfica avançada desenvolvida para arquitetar e gerar prompts estruturados, otimizados para Inteligências Artificiais. A aplicação atua como um assistente dinâmico multi-etapa, facilitando o design de interfaces, a configuração do ambiente de desenvolvimento, a orquestração do deploy e a criação de automações avançadas.

Desenvolvido para operar tanto como uma aplicação web moderna (SPA) quanto como um aplicativo desktop nativo através do [Tauri](https://tauri.app/), o Stitch é construído com tecnologias de ponta, entregando excelente performance e usabilidade.

---

## 🚀 Principais Funcionalidades

O Stitch divide o fluxo de trabalho arquitetural em **quatro pilares principais**, disponíveis em diferentes abas na interface:

1. **🎨 Design Mode:**
   - Construção de prompts voltados para design UI/UX.
   - Definição de paletas de cores, tipografia, estrutura de layout e diretrizes visuais.
   - Configuração detalhada de páginas, subpáginas interações dinâmicas e animações.

2. **💻 Dev Mode:**
   - Focado na geração do código e estrutura da aplicação.
   - Seleção detalhada de frameworks, meta-frameworks, gerenciadores de pacotes (`npm`, `yarn`, `bun`), biblioteca de UI e padrões de arquitetura (Clean Architecture, MVC).

3. **🚀 Deploy Mode:**
   - Criação de prompts para o provisionamento de infraestrutura.
   - Configuração de CI/CD, contêineres Docker, orquestradores, serviços de hospedagem e provisionamento com ferramentas como Traefik, Portainer e Nginx.

4. **⚡ Automation Mode:**
   - Construção de prompts detalhados para ferramentas de fluxo de trabalho como o n8n e Make.
   - Design de autmação com triggers, nós e webhooks.

### 🧩 Recursos Transversais

- **Múltiplos Idiomas de Prompt:** O prompt gerado pode ser construído nativamente em **Português (PT)** ou **Inglês (EN)**.
- **Sincronização de Contexto Global:** As configurações gerais do projeto (nome do projeto, descrição e idioma) são compartilhadas automaticamente entre as abas, preenchendo o contexto independentemente do pilar que você estiver editando.
- **Estimativa de Tokens e Preview em Tempo Real:** Visualização ao vivo do prompt gerado, com métricas que indicam tamanho do texto e contagem estimada de tokens, ajudando a manter os limites das LLMs.
- **Gerenciador de Perfis (Pre-Prompts):** Capacidade de salvar o contexto do prompt atual, servindo como template, para iniciar novos projetos instantaneamente.
- **Dicionário de Arquitetura Contínuo:** Geração de mapas mentais consistentes da arquitetura, renderizados em Múltiplos formatos: Markdown, XML estruturado ou sintaxe comprimida (POML).
- **Desktop Ready (Tauri):** Integração com `window API` e `file-system plugin` para salvar arquivos localmente, além de usar atalhos globais fora do escopo do browser.
- **Dark Mode Nativo:** Personalização estética para modo claro ou escuro.

---

## 🛠 Tecnologias Utilizadas

A stack principal utilizada neste projeto inclui tecnologias focadas em otimização, legibilidade e suporte _cross-platform_:

- **React 19** com **Vite**
- **TypeScript**
- **Tailwind CSS v4** + `lucide-react` (para a iconografia vetorial leve)
- **Framer Motion** (animações fluidas na interface)
- **Tauri** (Runtime Rust para empacotar o projeto como Desktop App)
- **Docker** + **Traefik** (Preparado para deploy resiliente na web via conteinerização)

---

## 📦 Como Instalar e Rodar o Projeto (Build)

### Pré-requisitos

- [Bun](https://bun.sh/) instalado no sistema.
- Ferramentas nativas do Rust (se desejar compilar a versão desktop do Tauri): `rustc`, `cargo`.

---

### Executando o Ambiente Web (Desenvolvimento)

1. Clone o repositório ou navegue até o diretório raiz (`stitchDesign-PromptCreation`).
2. Instale as dependências:
   ```bash
   bun install
   ```
3. Inicie o servidor de desenvolvimento suportado pelo Vite:
   ```bash
   bun run dev
   ```
   Acesse no navegador: `http://localhost:5173`.

### Compilando para Produção (Web / Docker)

Para gerar o bundle ultra-otimizado de arquivos estáticos (HTML/CSS/JS compilado para um único arquivo ou múltiplos chunks assíncronos):

```bash
bun run build
```

Os arquivos otimizados serão posicionados no diretório `/dist`.

#### Subir Instância Via Docker + Traefik

A infraestrutura inclui um contêiner empacotado no Nginx preparado com limites restritos (256MB) e labels para um ecossistema Traefik auto-descoberto:

```bash
docker-compose up -d --build
```

> **Nota:** Certifique-se de que a `network` externa chamada `proxy` já exista em seu orquestrador, onde o seu Traefik principal escuta o tráfego de entrada.

### Empacotando como Aplicação Desktop (Tauri)

O Stitch está perfeitamente habilitado para rodar nativamente como aplicativo desktop.

- Para **abrir a janela Tauri localmente em modo Dev**:

  ```bash
  bun run tauri dev
  ```

- Para **gerar os binários compilados (.exe no Windows, .dmg no Mac, .AppImage Linux)**:
  ```bash
  bun run tauri build
  ```

---

## 📝 Regras e Contribuição

Esse software abraça componentes de alta performance. As alocações em array e manipulações de DOM evitam duplicação extensa através de um núcleo em _React Providers/Hooks_ modulares. Importações de dependências usam a diretriz estrita (via _Tree Shaking_) para não inflacionar o bundle final. Mantenha os mesmos padrões nas aberturas de PR.

---

`#Feito com IA e muita automação!`
