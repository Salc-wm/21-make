import type { Lang } from '../../core/i18n';

const t = (lang: Lang, pt: string, en: string, es: string, fr: string) => {
  if (lang === 'pt') return pt;
  if (lang === 'es') return es;
  if (lang === 'fr') return fr;
  return en;
};

export const getProjectTypes = (lang: Lang) => [
  { value: 'static-spa', label: 'SPA / ' + t(lang, 'Site Estático', 'Static Site', 'Sitio Estático', 'Site Statique'), desc: 'React, Vue, Vite, etc.' },
  { value: 'ssr', label: 'SSR / Full-Stack', desc: 'Next.js, Nuxt, SvelteKit' },
  { value: 'api', label: 'API / Backend', desc: 'Express, Fastify, etc.' },
  { value: 'fullstack-mono', label: 'Monorepo Full-Stack', desc: t(lang, 'Frontend + Backend juntos', 'Frontend + Backend together', 'Frontend + Backend juntos', 'Frontend + Backend ensemble') },
];

export const getTargetOSOptions = (lang: Lang) => [
  { value: 'linux', label: 'Linux', desc: t(lang, 'Recomendado — leve, estável', 'Recommended — lightweight, stable', 'Recomendado — ligero, estable', 'Recommandé — léger, stable') },
  { value: 'windows', label: 'Windows', desc: 'Windows Server / Desktop' },
];

export const getEnvironmentTypes = (lang: Lang) => [
  { value: 'container', label: 'Container', desc: t(lang, 'Docker, Podman — isolado e portável', 'Docker, Podman — isolated and portable', 'Docker, Podman — aislado y portable', 'Docker, Podman — isolé et portable') },
  { value: 'bare-metal', label: t(lang, 'Máquina Direta', 'Bare Metal', 'Máquina Directa', 'Machine Directe'), desc: t(lang, 'Instalar direto no sistema', 'Install directly on the system', 'Instalar directo en el sistema', 'Installer directement sur le système') },
  { value: 'vm', label: 'Virtual Machine', desc: t(lang, 'VM dedicada', 'Dedicated VM', 'VM dedicada', 'VM dédiée') },
];

export const getVmProviders = (lang: Lang) => [
  { value: 'none', label: t(lang, 'Nenhum / N/A', 'None / N/A', 'Ninguno / N/A', 'Aucun / N/A') },
  { value: 'virtualbox', label: 'VirtualBox' },
  { value: 'hyper-v', label: 'Hyper-V' },
  { value: 'vmware', label: 'VMware' },
  { value: 'proxmox', label: 'Proxmox' },
  { value: 'kvm', label: 'KVM / QEMU' },
  { value: 'wsl2', label: 'WSL2 (Windows)' },
];

export const getContainerPlatforms = (lang: Lang) => [
  { value: 'docker', label: 'Docker', desc: t(lang, 'Standard — mais popular', 'Standard — most popular', 'Estándar — más popular', 'Standard — le plus populaire') },
  { value: 'docker-compose', label: 'Docker Compose', desc: t(lang, 'Multi-container com orquestração', 'Multi-container with orchestration', 'Multi-container con orquestación', 'Multi-container avec orchestration') },
  { value: 'podman', label: 'Podman', desc: t(lang, 'Rootless, sem daemon', 'Rootless, daemon-less', 'Rootless, sin daemon', 'Rootless, sans daemon') },
  { value: 'lxc', label: 'LXC / LXD', desc: t(lang, 'System containers leves', 'Lightweight system containers', 'System containers ligeros', 'System containers légers') },
];

export const getBaseImages = (lang: Lang) => [
  { value: 'node-alpine', label: 'node:alpine', desc: t(lang, 'Leve (~50MB), Alpine Linux', 'Lightweight (~50MB), Alpine Linux', 'Ligero (~50MB), Alpine Linux', 'Léger (~50MB), Alpine Linux') },
  { value: 'node-slim', label: 'node:slim', desc: t(lang, 'Debian slim (~80MB)', 'Debian slim (~80MB)', 'Debian slim (~80MB)', 'Debian slim (~80MB)') },
  { value: 'node-bookworm', label: 'node:bookworm', desc: t(lang, 'Debian full (~300MB)', 'Debian full (~300MB)', 'Debian full (~300MB)', 'Debian full (~300MB)') },
  { value: 'nginx-alpine', label: 'nginx:alpine', desc: t(lang, 'Para servir static files', 'To serve static files', 'Para servir static files', 'Pour servir des static files') },
  { value: 'ubuntu', label: 'ubuntu:latest', desc: t(lang, 'Ubuntu para setup completo', 'Ubuntu for full setup', 'Ubuntu para setup completo', 'Ubuntu pour setup complet') },
  { value: 'debian', label: 'debian:slim', desc: t(lang, 'Debian minimal', 'Minimal Debian', 'Debian minimal', 'Debian minimal') },
  { value: 'custom', label: t(lang, 'Personalizado', 'Custom', 'Personalizado', 'Personnalisé'), desc: t(lang, 'Definir imagem custom', 'Set custom image', 'Definir imagem custom', 'Définir imagem custom') },
];

export const getNodeVersions = (lang: Lang) => [
  { value: '22', label: 'Node 22 LTS', desc: t(lang, 'Mais recente LTS', 'Latest LTS', 'Más reciente LTS', 'LTS plus récent') },
  { value: '20', label: 'Node 20 LTS', desc: t(lang, 'LTS estável', 'Stable LTS', 'LTS estable', 'LTS stable') },
  { value: '18', label: 'Node 18', desc: t(lang, 'Manutenção', 'Maintenance', 'Mantenimiento', 'Maintenance') },
];

export const getServeMethods = (lang: Lang) => [
  { value: 'nginx', label: 'Nginx', desc: t(lang, 'Server HTTP leve e rápido', 'Lightweight fast HTTP server', 'Server HTTP ligero y rápido', 'Serveur HTTP léger et rapide') },
  { value: 'node', label: t(lang, 'Node.js direto', 'Direct Node.js', 'Node.js directo', 'Node.js direct'), desc: 'node server.js / next start' },
  { value: 'caddy', label: 'Caddy', desc: t(lang, 'Auto-HTTPS, config simples', 'Auto-HTTPS, simple config', 'Auto-HTTPS, config simple', 'Auto-HTTPS, config simple') },
  { value: 'static', label: t(lang, 'Ficheiros Estáticos', 'Static Files', 'Archivos Estáticos', 'Fichiers Statiques'), desc: t(lang, 'Servir via outro server', 'Serve via another server', 'Servir via otro server', 'Servir via un autre serveur') },
  { value: 'pm2', label: 'PM2', desc: t(lang, 'Process manager Node.js', 'Node.js process manager', 'Process manager Node.js', 'Process manager Node.js') },
];

export const getReverseProxies = (lang: Lang) => [
  { value: 'nginx', label: 'Nginx', desc: t(lang, 'Proxy reverso clássico', 'Classic reverse proxy', 'Proxy reverso clásico', 'Proxy inverse classique') },
  { value: 'traefik', label: 'Traefik', desc: t(lang, 'Auto-discovery, docker labels', 'Auto-discovery, docker labels', 'Auto-discovery, docker labels', 'Auto-discovery, docker labels') },
  { value: 'caddy', label: 'Caddy', desc: t(lang, 'Auto-HTTPS integrado', 'Integrated Auto-HTTPS', 'Auto-HTTPS integrado', 'Auto-HTTPS intégré') },
  { value: 'haproxy', label: 'HAProxy', desc: t(lang, 'Balanceador high-performance', 'High-performance load balancer', 'Balanceador high-performance', 'Équilibreur high-performance') },
  { value: 'none', label: t(lang, 'Nenhum', 'None', 'Ninguno', 'Aucun'), desc: t(lang, 'Sem proxy reverso', 'No reverse proxy', 'Sin proxy reverso', 'Sans proxy inverse') },
];

export const getSslMethods = (lang: Lang) => [
  { value: 'letsencrypt', label: "Let's Encrypt", desc: t(lang, 'Certificado grátis, auto-renew', 'Free cert, auto-renew', 'Certificado gratis, auto-renew', 'Certificat gratuit, auto-renew') },
  { value: 'self-signed', label: 'Self-Signed', desc: t(lang, 'Para desenvolvimento/internal', 'For development/internal', 'Para desarrollo/interno', 'Pour développement/interne') },
  { value: 'cloudflare', label: 'Cloudflare SSL', desc: t(lang, 'SSL via Cloudflare proxy', 'SSL via Cloudflare proxy', 'SSL vía proxy de Cloudflare', 'SSL via proxy Cloudflare') },
  { value: 'custom-cert', label: t(lang, 'Certificado Próprio', 'Custom Certificate', 'Certificado Propio', 'Certificat Personnalisé'), desc: t(lang, 'Certificado comprado/empresa', 'Bought/enterprise certificate', 'Certificado comprado/empresa', 'Certificat acheté/entreprise') },
  { value: 'none', label: t(lang, 'Sem SSL', 'No SSL', 'Sin SSL', 'Sans SSL'), desc: t(lang, 'Apenas HTTP (não recomendado)', 'HTTP only (not recommended)', 'Solo HTTP (no recomendado)', 'Seulement HTTP (non recommandé)') },
];

export const getCiCdOptions = (lang: Lang) => [
  { value: 'none', label: 'Manual', desc: t(lang, 'Deploy manual (SSH, FTP, etc.)', 'Manual deploy (SSH, FTP, etc.)', 'Deploy manual (SSH, FTP, etc.)', 'Déploiement manuel (SSH, FTP, etc.)') },
  { value: 'github-actions', label: 'GitHub Actions', desc: t(lang, 'CI/CD integrado GitHub', 'Integrated GitHub CI/CD', 'CI/CD integrado GitHub', 'CI/CD intégré GitHub') },
  { value: 'gitlab-ci', label: 'GitLab CI', desc: t(lang, 'Pipeline GitLab', 'GitLab Pipeline', 'Pipeline GitLab', 'Pipeline GitLab') },
  { value: 'watchtower', label: 'Watchtower', desc: t(lang, 'Auto-update Docker images', 'Auto-update Docker images', 'Auto-update Docker images', 'Mise à jour auto des images Docker') },
  { value: 'webhook', label: 'Webhook', desc: t(lang, 'Trigger por webhook', 'Trigger by webhook', 'Trigger por webhook', 'Déclencheur par webhook') },
];

export const getRegistryOptions = (lang: Lang) => [
  { value: 'none', label: t(lang, 'Nenhum / Local', 'None / Local', 'Ninguno / Local', 'Aucun / Local'), desc: t(lang, 'Build local apenas', 'Local build only', 'Build local solamente', 'Build local uniquement') },
  { value: 'dockerhub', label: 'Docker Hub', desc: t(lang, 'Registry público/privado', 'Public/private registry', 'Registry público/privado', 'Registre public/privé') },
  { value: 'ghcr', label: 'GitHub GHCR', desc: 'GitHub Container Registry' },
  { value: 'gitlab-registry', label: 'GitLab Registry', desc: t(lang, 'Registry GitLab', 'GitLab Registry', 'Registry GitLab', 'Registre GitLab') },
  { value: 'custom', label: t(lang, 'Registry Privado', 'Private Registry', 'Registry Privado', 'Registre Privé'), desc: t(lang, 'Self-hosted registry', 'Self-hosted registry', 'Self-hosted registry', 'Self-hosted registry') },
];

export const getHealthcheckOptions = (lang: Lang) => [
  { value: 'http', label: 'HTTP Endpoint', desc: 'GET /health → 200' },
  { value: 'tcp', label: 'TCP Port Check', desc: t(lang, 'Verificar porta aberta', 'Check open port', 'Verificar porta aberta', 'Vérifier le port ouvert') },
  { value: 'cmd', label: t(lang, 'Comando Custom', 'Custom Command', 'Comando Personalizado', 'Commande Personnalisée'), desc: t(lang, 'Executar comando no container', 'Run command in container', 'Executar comando no container', 'Exécuter une commande dans le conteneur') },
  { value: 'none', label: t(lang, 'Nenhum', 'None', 'Ninguno', 'Aucun'), desc: t(lang, 'Sem healthcheck', 'No healthcheck', 'Sin healthcheck', 'Sans healthcheck') },
];

export const getLoggingOptions = (lang: Lang) => [
  { value: 'stdout', label: 'Stdout / Docker logs', desc: t(lang, 'Logs standard (docker logs)', 'Standard logs (docker logs)', 'Logs estándar (docker logs)', 'Logs standards (docker logs)') },
  { value: 'file', label: t(lang, 'Ficheiro de Log', 'Log File', 'Archivo de Log', 'Fichier de Log'), desc: t(lang, 'Gravar em ficheiro', 'Write to file', 'Grabar en archivo', 'Écrire dans un fichier') },
  { value: 'json', label: 'JSON structured', desc: t(lang, 'Logs em JSON para parsing', 'JSON logs for parsing', 'Logs em JSON para parsing', 'Logs en JSON pour parsing') },
  { value: 'syslog', label: 'Syslog', desc: t(lang, 'Enviar para syslog', 'Send to syslog', 'Enviar a syslog', 'Envoyer à syslog') },
];

export const getBackupStrategies = (lang: Lang) => [
  { value: 'none', label: t(lang, 'Nenhum', 'None', 'Ninguno', 'Aucun') },
  { value: 'volume-backup', label: t(lang, 'Backup de Volumes', 'Volume Backup', 'Backup de Volúmenes', 'Sauvegarde de Volumes'), desc: t(lang, 'Backup periódico dos volumes Docker', 'Periodic Docker volume backup', 'Backup periódico de volúmenes Docker', 'Sauvegarde périodique des volumes Docker') },
  { value: 'snapshot', label: 'Snapshot VM/Disco', desc: t(lang, 'Snapshot do sistema/disco', 'System/disk snapshot', 'Snapshot del sistema/disco', 'Snapshot du système/disque') },
  { value: 'rsync', label: 'Rsync / SCP', desc: t(lang, 'Sync para servidor remoto', 'Sync to remote server', 'Sync a servidor remoto', 'Sync vers serveur distant') },
];

export const getDeployAutomationPlatforms = (lang: Lang) => [
  { value: 'n8n', label: 'n8n (self-hosted)', desc: 'Automation server Docker/Node' },
  { value: 'temporal', label: 'Temporal Server', desc: 'Durable execution cluster' },
  { value: 'activepieces', label: 'Activepieces', desc: t(lang, 'Open-source, auto-hospedado', 'Open-source, self-hosted', 'Open-source, auto-hospedado', 'Open-source, auto-hébergé') },
  { value: 'windmill', label: 'Windmill', desc: 'Open-source scripts & flows' },
  { value: 'none', label: t(lang, 'Nenhum', 'None', 'Ninguno', 'Aucun'), desc: t(lang, 'Sem automation server no deploy', 'No deploy automation server', 'Sin servidor de automatización', 'Pas de serveur d\'automatisation au déploiement') },
];

export const getQueueSystems = (lang: Lang) => [
  { value: 'redis-bull', label: 'Redis + BullMQ', desc: t(lang, 'Queue de jobs com Redis', 'Job queue with Redis', 'Queue de jobs con Redis', 'Queue de travaux avec Redis') },
  { value: 'rabbitmq', label: 'RabbitMQ', desc: 'Message broker AMQP' },
  { value: 'kafka', label: 'Apache Kafka', desc: t(lang, 'Event streaming distribuído', 'Distributed event streaming', 'Event streaming distribuido', 'Event streaming distribué') },
  { value: 'sqs', label: 'AWS SQS', desc: t(lang, 'Queue gerida da AWS', 'AWS managed queue', 'Queue gestionada por AWS', 'File gérée par AWS') },
  { value: 'nats', label: 'NATS', desc: 'Lightweight messaging' },
  { value: 'none', label: t(lang, 'Sem Queue', 'No Queue', 'Sin Queue', 'Sans File'), desc: t(lang, 'Sem sistema de filas', 'No queue system', 'Sin sistema de colas', 'Sans système de file') },
];

export const getWorkflowScaling = (lang: Lang) => [
  { value: 'single', label: t(lang, 'Instância Única', 'Single Instance', 'Instancia Única', 'Instance Unique'), desc: t(lang, 'Um worker, sem scaling', 'Single worker, no scaling', 'Un worker, sin scaling', 'Un worker, sans scaling') },
  { value: 'horizontal', label: t(lang, 'Horizontal (replicas)', 'Horizontal (replicas)', 'Horizontal (réplicas)', 'Horizontal (répliques)'), desc: t(lang, 'Múltiplos workers com load balancing', 'Multiple workers with load balancing', 'Múltiples workers con balanceo de carga', 'Plusieurs workers avec load balancing') },
  { value: 'auto-scale', label: 'Auto-Scale', desc: t(lang, 'Scale up/down baseado em carga', 'Scale up/down based on load', 'Scale up/down basado en carga', 'Échelle haut/bas basée sur la charge') },
  { value: 'queue-workers', label: 'Queue Workers', desc: t(lang, 'Workers dedicados por fila', 'Dedicated workers per queue', 'Workers dedicados por cola', 'Workers dédiés par file') },
];
