// ── Project Type ──────────────────────────────────
export const projectTypes = [
  { value: 'static-spa', label: 'SPA / Static Site', desc: 'React, Vue, Vite, etc.' },
  { value: 'ssr', label: 'SSR / Full-Stack', desc: 'Next.js, Nuxt, SvelteKit' },
  { value: 'api', label: 'API / Backend', desc: 'Express, Fastify, etc.' },
  { value: 'fullstack-mono', label: 'Monorepo Full-Stack', desc: 'Frontend + Backend juntos' },
];

// ── Target OS ─────────────────────────────────────
export const targetOSOptions = [
  { value: 'linux', label: 'Linux', desc: 'Recomendado — leve, estável' },
  { value: 'windows', label: 'Windows', desc: 'Windows Server / Desktop' },
];

// ── Environment Type ──────────────────────────────
export const environmentTypes = [
  { value: 'container', label: 'Container', desc: 'Docker, Podman — isolado e portável' },
  { value: 'bare-metal', label: 'Máquina Direta', desc: 'Instalar direto no sistema' },
  { value: 'vm', label: 'Virtual Machine', desc: 'VM dedicada (VirtualBox, Hyper-V, etc.)' },
];

// ── VM Providers ──────────────────────────────────
export const vmProviders = [
  { value: 'none', label: 'Nenhum / N/A' },
  { value: 'virtualbox', label: 'VirtualBox' },
  { value: 'hyper-v', label: 'Hyper-V' },
  { value: 'vmware', label: 'VMware' },
  { value: 'proxmox', label: 'Proxmox' },
  { value: 'kvm', label: 'KVM / QEMU' },
  { value: 'wsl2', label: 'WSL2 (Windows)' },
];

// ── Container Platform ────────────────────────────
export const containerPlatforms = [
  { value: 'docker', label: 'Docker', desc: 'Standard — mais popular' },
  { value: 'docker-compose', label: 'Docker Compose', desc: 'Multi-container com orquestração' },
  { value: 'podman', label: 'Podman', desc: 'Rootless, sem daemon' },
  { value: 'lxc', label: 'LXC / LXD', desc: 'System containers leves' },
];

// ── Base Images ───────────────────────────────────
export const baseImages = [
  { value: 'node-alpine', label: 'node:alpine', desc: 'Leve (~50MB), Alpine Linux' },
  { value: 'node-slim', label: 'node:slim', desc: 'Debian slim (~80MB)' },
  { value: 'node-bookworm', label: 'node:bookworm', desc: 'Debian full (~300MB)' },
  { value: 'nginx-alpine', label: 'nginx:alpine', desc: 'Para servir static files' },
  { value: 'ubuntu', label: 'ubuntu:latest', desc: 'Ubuntu para setup completo' },
  { value: 'debian', label: 'debian:slim', desc: 'Debian minimal' },
  { value: 'custom', label: 'Personalizado', desc: 'Definir imagem custom' },
];

// ── Node Versions ─────────────────────────────────
export const nodeVersions = [
  { value: '22', label: 'Node 22 LTS', desc: 'Mais recente LTS' },
  { value: '20', label: 'Node 20 LTS', desc: 'LTS estável' },
  { value: '18', label: 'Node 18', desc: 'Manutenção' },
];

// ── Serve Method ──────────────────────────────────
export const serveMethods = [
  { value: 'nginx', label: 'Nginx', desc: 'Server HTTP leve e rápido' },
  { value: 'node', label: 'Node.js direto', desc: 'node server.js / next start' },
  { value: 'caddy', label: 'Caddy', desc: 'Auto-HTTPS, config simples' },
  { value: 'static', label: 'Ficheiros Estáticos', desc: 'Servir via outro server' },
  { value: 'pm2', label: 'PM2', desc: 'Process manager Node.js' },
];

// ── Reverse Proxy ─────────────────────────────────
export const reverseProxies = [
  { value: 'nginx', label: 'Nginx', desc: 'Proxy reverso clássico' },
  { value: 'traefik', label: 'Traefik', desc: 'Auto-discovery, docker labels' },
  { value: 'caddy', label: 'Caddy', desc: 'Auto-HTTPS integrado' },
  { value: 'haproxy', label: 'HAProxy', desc: 'Balanceador high-performance' },
  { value: 'none', label: 'Nenhum', desc: 'Sem proxy reverso' },
];

// ── SSL Method ────────────────────────────────────
export const sslMethods = [
  { value: 'letsencrypt', label: "Let's Encrypt", desc: 'Certificado grátis, auto-renew' },
  { value: 'self-signed', label: 'Self-Signed', desc: 'Para desenvolvimento/internal' },
  { value: 'cloudflare', label: 'Cloudflare SSL', desc: 'SSL via Cloudflare proxy' },
  { value: 'custom-cert', label: 'Certificado Próprio', desc: 'Certificado comprado/empresa' },
  { value: 'none', label: 'Sem SSL', desc: 'Apenas HTTP (não recomendado)' },
];

// ── CI/CD ─────────────────────────────────────────
export const ciCdOptions = [
  { value: 'none', label: 'Manual', desc: 'Deploy manual (SSH, FTP, etc.)' },
  { value: 'github-actions', label: 'GitHub Actions', desc: 'CI/CD integrado GitHub' },
  { value: 'gitlab-ci', label: 'GitLab CI', desc: 'Pipeline GitLab' },
  { value: 'watchtower', label: 'Watchtower', desc: 'Auto-update Docker images' },
  { value: 'webhook', label: 'Webhook', desc: 'Trigger por webhook' },
];

// ── Container Registry ────────────────────────────
export const registryOptions = [
  { value: 'none', label: 'Nenhum / Local', desc: 'Build local apenas' },
  { value: 'dockerhub', label: 'Docker Hub', desc: 'Registry público/privado' },
  { value: 'ghcr', label: 'GitHub GHCR', desc: 'GitHub Container Registry' },
  { value: 'gitlab-registry', label: 'GitLab Registry', desc: 'Registry GitLab' },
  { value: 'custom', label: 'Registry Privado', desc: 'Self-hosted registry' },
];

// ── Healthcheck ───────────────────────────────────
export const healthcheckOptions = [
  { value: 'http', label: 'HTTP Endpoint', desc: 'GET /health → 200' },
  { value: 'tcp', label: 'TCP Port Check', desc: 'Verificar porta aberta' },
  { value: 'cmd', label: 'Comando Custom', desc: 'Executar comando no container' },
  { value: 'none', label: 'Nenhum', desc: 'Sem healthcheck' },
];

// ── Logging ───────────────────────────────────────
export const loggingOptions = [
  { value: 'stdout', label: 'Stdout / Docker logs', desc: 'Logs standard (docker logs)' },
  { value: 'file', label: 'Ficheiro de Log', desc: 'Gravar em ficheiro' },
  { value: 'json', label: 'JSON structured', desc: 'Logs em JSON para parsing' },
  { value: 'syslog', label: 'Syslog', desc: 'Enviar para syslog' },
];

// ── Backup Strategy ───────────────────────────────
export const backupStrategies = [
  { value: 'none', label: 'Nenhum' },
  { value: 'volume-backup', label: 'Backup de Volumes', desc: 'Backup periódico dos volumes Docker' },
  { value: 'snapshot', label: 'Snapshot VM/Disco', desc: 'Snapshot do sistema/disco' },
  { value: 'rsync', label: 'Rsync / SCP', desc: 'Sync para servidor remoto' },
];

// ── Automation Orchestrators (Deploy-side) ────────
export const deployAutomationPlatforms = [
  { value: 'n8n', label: 'n8n (self-hosted)', desc: 'Automation server Docker/Node' },
  { value: 'temporal', label: 'Temporal Server', desc: 'Durable execution cluster' },
  { value: 'activepieces', label: 'Activepieces', desc: 'Open-source, auto-hospedado' },
  { value: 'windmill', label: 'Windmill', desc: 'Open-source scripts & flows' },
  { value: 'none', label: 'Nenhum', desc: 'Sem automation server no deploy' },
];

// ── Queue / Worker Systems ────────────────────────
export const queueSystems = [
  { value: 'redis-bull', label: 'Redis + BullMQ', desc: 'Queue de jobs com Redis' },
  { value: 'rabbitmq', label: 'RabbitMQ', desc: 'Message broker AMQP' },
  { value: 'kafka', label: 'Apache Kafka', desc: 'Event streaming distribuído' },
  { value: 'sqs', label: 'AWS SQS', desc: 'Queue gerida da AWS' },
  { value: 'nats', label: 'NATS', desc: 'Lightweight messaging' },
  { value: 'none', label: 'Sem Queue', desc: 'Sem sistema de filas' },
];

// ── Workflow Scaling ──────────────────────────────
export const workflowScaling = [
  { value: 'single', label: 'Instância Única', desc: 'Um worker, sem scaling' },
  { value: 'horizontal', label: 'Horizontal (replicas)', desc: 'Múltiplos workers com load balancing' },
  { value: 'auto-scale', label: 'Auto-Scale', desc: 'Scale up/down baseado em carga' },
  { value: 'queue-workers', label: 'Queue Workers', desc: 'Workers dedicados por fila' },
];
