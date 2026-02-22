# 21 MAKE - Prompt Creation Assistant

_[Versão em Português](README.md) | [English Version](README.en.md)_

**21 MAKE** is an advanced graphical tool developed to architect and generate structured prompts, optimized for Artificial Intelligences. The application acts as a dynamic multi-step assistant, facilitating interface design, development environment configuration, deployment orchestration, and the creation of advanced automations.

Developed to operate both as a modern web application (SPA) and as a native desktop application through [Tauri](https://tauri.app/), 21 MAKE is built with cutting-edge technologies, delivering excellent performance and usability.

---

## 🚀 Main Features

21 MAKE divides the architectural workflow into **four main pillars**, available in different tabs in the interface:

1. **🎨 Design Mode:**
   - Construction of prompts aimed at UI/UX design.
   - Definition of color palettes, typography, layout structure, and visual guidelines.
   - Detailed configuration of pages, subpages, dynamic interactions, and animations.

2. **💻 Dev Mode:**
   - Focused on generating the application's code and structure.
   - Detailed selection of frameworks, meta-frameworks, package managers (`npm`, `yarn`, `bun`), UI libraries, and architectural patterns (Clean Architecture, MVC).

3. **🚀 Deploy Mode:**
   - Creation of prompts for infrastructure provisioning.
   - Configuration of CI/CD, Docker containers, orchestrators, hosting services, and provisioning with tools like Traefik, Portainer, and Nginx.

4. **⚡ Automation Mode:**
   - Construction of detailed prompts for workflow tools like n8n and Make.
   - Automation design with triggers, nodes, and webhooks.

### 🧩 Cross-cutting Features

- **Multiple Prompt Languages:** The generated prompt can be built natively in **Portuguese (PT)** or **English (EN)**.
- **Global Context Synchronization:** General project settings (project name, description, and language) are shared automatically across tabs, filling the context regardless of the pillar you are editing.
- **Real-Time Token Estimation and Preview:** Live visualization of the generated prompt, with metrics indicating text size and estimated token count, helping to keep within LLM limits.
- **Profile Manager (Pre-Prompts):** Ability to save the current prompt context, serving as a template to instantly start new projects.
- **Continuous Architecture Dictionary:** Generation of consistent architecture mind maps, rendered in multiple formats: Markdown, structured XML, or compressed syntax (POML).
- **Desktop Ready (Tauri):** Integration with `window API` and `file-system plugin` to save files locally, in addition to using global shortcuts outside the browser scope.
- **Native Dark Mode:** Aesthetic personalization for light or dark mode.

---

## 🛠 Technologies Used

The main stack used in this project includes technologies focused on optimization, readability, and cross-platform support:

- **React 19** with **Vite**
- **TypeScript**
- **Tailwind CSS v4** + `lucide-react` (for lightweight vector iconography)
- **Framer Motion** (fluid animations in the interface)
- **Tauri** (Rust runtime to package the project as a Desktop App)
- **Docker** + **Traefik** (Ready for resilient web deployment via containerization)

---

## 📦 How to Install and Run the Project (Build)

### Prerequisites

- [Bun](https://bun.sh/) installed on the system.
- Native Rust tools (if you want to compile the Tauri desktop version): `rustc`, `cargo`.

---

### Running the Web Environment (Development)

1. Clone the repository or navigate to the root directory (`stitchDesign-PromptCreation`).
2. Install the dependencies:
   ```bash
   bun install
   ```
3. Start the development server supported by Vite:
   ```bash
   bun run dev
   ```
   Access in the browser: `http://localhost:5173`.

### Compiling for Production (Web / Docker)

To generate the ultra-optimized bundle of static files (HTML/CSS/JS compiled to a single file or multiple asynchronous chunks):

```bash
bun run build
```

The optimized files will be placed in the `/dist` directory.

#### Deploy Instance Via Docker + Traefik

The infrastructure includes a container packaged in Nginx prepared with strict limits (256MB) and labels for an auto-discovered Traefik ecosystem:

```bash
docker-compose up -d --build
```

> **Note:** Ensure that the external `network` called `proxy` already exists in your orchestrator, where your main Traefik listens to incoming traffic.

### Packaging as a Desktop Application (Tauri)

21 MAKE is perfectly enabled to run natively as a desktop application.

- To **open the Tauri window locally in Dev mode**:

  ```bash
  bun run tauri dev
  ```

- To **generate the compiled binaries (.exe on Windows, .dmg on Mac, .AppImage Linux)**:
  ```bash
  bun run tauri build
  ```

---

## 📝 Rules and Contribution

This software embraces high-performance components. Array allocations and DOM manipulations avoid extensive duplication through a core in modular _React Providers/Hooks_. Dependency imports use strict guidelines (via _Tree Shaking_) to avoid inflating the final bundle. Keep the same standards when opening PRs.
