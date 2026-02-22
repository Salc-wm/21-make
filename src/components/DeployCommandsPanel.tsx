import { useState, useMemo, memo } from 'react';
import { t } from '../core/PromptBuilder';
import { Terminal, ClipboardCopy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { DeployPromptConfig } from '../deployTypes';

interface DeployCommandsPanelProps {
  config: DeployPromptConfig;
  lang: import('../core/i18n').Lang;
}

interface CommandBlock {
  title: string;
  commands: string[];
}

function buildCommands(config: DeployPromptConfig): CommandBlock[] {
  const isContainer = config.environmentType === 'container';
  const isLinux = config.targetOS === 'linux';
  const isDocker = config.containerPlatform === 'docker' || config.containerPlatform === 'docker-compose';
  const appName = config.projectName?.replace(/\\s+/g, '-').toLowerCase() || 'app';

  const setupBlock: CommandBlock = (() => {
    if (isContainer && isLinux) {
      return {
        title: 'Instalar Docker (Linux)',
        commands: [
          'curl -fsSL https://get.docker.com | sh',
          'sudo usermod -aG docker $USER',
          'newgrp docker',
          'docker --version',
        ],
      };
    }
    if (isContainer && !isLinux) {
      return {
        title: 'Instalar Docker (Windows)',
        commands: [
          'wsl --install',
          'wsl --set-default-version 2',
        ],
      };
    }
    if (!isContainer && isLinux) {
      return {
        title: 'Instalar dependências (Linux)',
        commands: [
          `curl -fsSL https://deb.nodesource.com/setup_${config.nodeVersion}.x | sudo -E bash -`,
          'sudo apt-get install -y nodejs',
          'node --version && npm --version',
          ...(config.serveWith === 'nginx' ? ['sudo apt-get install -y nginx'] : []),
          ...(config.serveWith === 'pm2' ? ['sudo npm install -g pm2'] : []),
          ...(config.serveWith === 'caddy' ? [
            'sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https',
            'curl -1sLf "https://dl.cloudsmith.io/public/caddy/stable/gpg.key" | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg',
            'sudo apt update && sudo apt install caddy',
          ] : [])
        ]
      };
    }
    return {
      title: 'Instalar dependências (Windows)',
      commands: [
        'node --version && npm --version',
        ...(config.serveWith === 'pm2' ? ['npm install -g pm2'] : []),
      ],
    };
  })();

  const cloneBlock: CommandBlock = {
    title: 'Preparar o projeto',
    commands: [
      `mkdir -p ~/${appName} && cd ~/${appName}`,
      'npm install',
    ],
  };

  const buildBlocks: CommandBlock[] = (() => {
    if (isContainer && isDocker) {
      const isStatic = config.projectType === 'static-spa';
      const dockerfileBlock: CommandBlock = {
        title: 'Criar Dockerfile',
        commands: isStatic && config.serveWith === 'nginx' ? [
          `cat > Dockerfile << 'EOF'`,
          `FROM node:${config.nodeVersion}-alpine AS build`,
          `WORKDIR /app`,
          `COPY package*.json ./`,
          `RUN npm ci`,
          `COPY . .`,
          `RUN ${config.buildCommand}`,
          ``,
          `FROM nginx:alpine`,
          `COPY --from=build /app/${config.outputDir} /usr/share/nginx/html`,
          `EXPOSE ${config.exposedPort}`,
          `CMD ["nginx", "-g", "daemon off;"]`,
          `EOF`,
        ] : [
          `cat > Dockerfile << 'EOF'`,
          `FROM node:${config.nodeVersion}-alpine`,
          `WORKDIR /app`,
          `COPY package*.json ./`,
          `RUN npm ci --only=production`,
          `COPY . .`,
          `RUN ${config.buildCommand}`,
          `EXPOSE ${config.exposedPort}`,
          `CMD ["node", "server.js"]`,
          `EOF`,
        ]
      };

      const dockerignoreBlock: CommandBlock = {
        title: 'Criar .dockerignore',
        commands: [
          `cat > .dockerignore << 'EOF'`,
          `node_modules`,
          `.git`,
          `*.md`,
          `${config.outputDir}`,
          `.env*.local`,
          `EOF`,
        ],
      };

      const buildImageBlock: CommandBlock = {
        title: 'Build da imagem',
        commands: [
          `docker build -t ${appName}:latest .`,
        ],
      };

      const runParts = [
        `docker run -d`,
        `  --name ${appName}`,
        `  -p ${config.exposedPort}:${config.exposedPort}`,
        `  --restart unless-stopped`,
        ...(config.volumes.trim() ? config.volumes.split(',').map(v => v.trim()).filter(Boolean).map(v => `  -v ${v}`) : []),
        ...(config.envVars.trim() ? config.envVars.split('\\n').map(v => v.trim()).filter(Boolean).map(v => `  -e "${v}"`) : []),
        ...(config.healthcheck === 'http' ? [
          `  --health-cmd="curl -f http://localhost:${config.exposedPort}/ || exit 1"`,
          `  --health-interval=30s`
        ] : []),
        `  ${appName}:latest`
      ];

      const runContainerBlock: CommandBlock = {
        title: 'Run container',
        commands: [runParts.join(' \\\n')],
      };

      return [dockerfileBlock, dockerignoreBlock, buildImageBlock, runContainerBlock];
    } else if (isContainer && config.containerPlatform === 'docker-compose') {
      const dockerComposeBlock: CommandBlock = {
        title: 'Criar docker-compose.yml',
        commands: [
          `cat > docker-compose.yml << 'EOF'`,
          `version: "3.8"`,
          `services:`,
          `  ${appName}:`,
          `    build: .`,
          `    ports:`,
          `      - "${config.exposedPort}:${config.exposedPort}"`,
          `    restart: unless-stopped`,
          ...(config.envVars.trim() ? [
            `    environment:`,
            ...config.envVars.split('\\n').map(v => `      - ${v.trim()}`).filter(v => v.trim() !== '-'),
          ] : []),
          ...(config.volumes.trim() ? [
            `    volumes:`,
            ...config.volumes.split(',').map(v => `      - ${v.trim()}`).filter(v => v.trim() !== '-'),
          ] : []),
          `EOF`,
        ],
      };
      const startStackBlock: CommandBlock = {
        title: 'Start stack',
        commands: ['docker compose up -d --build'],
      };
      return [dockerComposeBlock, startStackBlock];
    } else {
      const buildProjectBlock: CommandBlock = {
        title: 'Build do projeto',
        commands: [`cd ~/${appName}`, config.buildCommand],
      };

      const serveBlocks: CommandBlock[] = [];
      if (config.serveWith === 'pm2') {
        serveBlocks.push({
          title: 'Iniciar com PM2',
          commands: [
            `pm2 start npm --name "${appName}" -- start`,
            `pm2 save`,
            `pm2 startup`,
          ],
        });
      } else if (config.serveWith === 'nginx') {
        serveBlocks.push({
          title: 'Configurar Nginx',
          commands: [
            `sudo cp -r ~/${appName}/${config.outputDir}/* /var/www/${appName}/`,
            `cat > /etc/nginx/sites-available/${appName} << 'EOF'`,
            `server {`,
            `    listen ${config.exposedPort};`,
            `    server_name ${config.domain || '_'};`,
            `    root /var/www/${appName};`,
            `    index index.html;`,
            `    location / {`,
            `        try_files $uri $uri/ /index.html;`,
            `    }`,
            `}`,
            `EOF`,
            `sudo ln -sf /etc/nginx/sites-available/${appName} /etc/nginx/sites-enabled/`,
            `sudo nginx -t && sudo systemctl reload nginx`,
          ],
        });
      }
      return [buildProjectBlock, ...serveBlocks];
    }
  })();

  const sslBlock: CommandBlock[] = config.sslMethod === 'letsencrypt' && config.domain ? [{
    title: `Configurar SSL (Let's Encrypt)`,
    commands: [
      'sudo apt-get install -y certbot',
      ...(config.reverseProxy === 'nginx' || config.serveWith === 'nginx'
        ? ['sudo apt-get install -y python3-certbot-nginx', `sudo certbot --nginx -d ${config.domain}`]
        : [`sudo certbot certonly --standalone -d ${config.domain}`]),
    ],
  }] : [];

  const verifyCmds = [
    `curl -f http://localhost:${config.exposedPort}/`,
    ...(isContainer && isDocker ? [
      `docker logs ${appName}`,
      `docker ps --filter name=${appName}`
    ] : config.serveWith === 'pm2' ? [
      'pm2 status',
      `pm2 logs ${appName} --lines 20`
    ] : [])
  ];

  const verifyBlock: CommandBlock = {
    title: `Verificar`,
    commands: verifyCmds,
  };

  return [setupBlock, cloneBlock, ...buildBlocks, ...sslBlock, verifyBlock].map((block, index) => ({
    ...block,
    title: `${index + 1}. ${block.title.replace(/^\\d+\\.\\s+/, '')}`
  }));
}

export const DeployCommandsPanel = memo(function DeployCommandsPanel({ config, lang }: DeployCommandsPanelProps) {
  const strings = t(lang);
  const blocks = useMemo(() => buildCommands(config), [config]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const allCommands = useMemo(() =>
    blocks.map(b => `# ${b.title}\n${b.commands.join('\n')}`).join('\n\n'),
    [blocks]
  );

  const [copiedAll, setCopiedAll] = useState(false);

  const copyBlock = async (idx: number) => {
    const text = blocks[idx].commands.join('\n');
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(prev => prev === idx ? null : prev), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(allCommands);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-5 py-3 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      >
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-teal-500" />
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            {strings.deployCmdsTitle}
          </span>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
            {strings.deployCmdsReady}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-zinc-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        )}
      </button>

      {isExpanded && (
        <div className="p-4 space-y-3">
          {/* Copy All */}
          <div className="flex justify-end">
            <button
              onClick={copyAll}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium transition ${
                copiedAll
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'border border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800'
              }`}
            >
              {copiedAll ? <Check className="h-3 w-3" /> : <ClipboardCopy className="h-3 w-3" />}
              {copiedAll ? strings.copied : strings.copyAll}
            </button>
          </div>

          {/* Command blocks */}
          {blocks.map((block, idx) => (
            <div key={idx} className="group rounded-lg border border-zinc-100 dark:border-zinc-800 overflow-hidden">
              <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/60 px-3 py-1.5">
                <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                  {block.title}
                </span>
                <button
                  onClick={() => copyBlock(idx)}
                  className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium transition opacity-0 group-hover:opacity-100 focus:opacity-100 ${
                    copiedIdx === idx
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:hover:text-zinc-300'
                  }`}
                >
                  {copiedIdx === idx ? <Check className="h-2.5 w-2.5" /> : <ClipboardCopy className="h-2.5 w-2.5" />}
                  {copiedIdx === idx ? strings.copied : strings.copy}
                </button>
              </div>
              <pre className="px-3 py-2 overflow-x-auto text-[11px] leading-relaxed font-mono text-teal-700 dark:text-teal-300 bg-zinc-950/[0.02] dark:bg-zinc-950/40 selection:bg-teal-200/30">
                {block.commands.join('\n')}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
