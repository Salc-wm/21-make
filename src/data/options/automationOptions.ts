import type { Lang } from '../../core/i18n';

const t = (lang: Lang, pt: string, en: string, es: string, fr: string) => {
  if (lang === 'pt') return pt;
  if (lang === 'es') return es;
  if (lang === 'fr') return fr;
  return en;
};

export const getAutomationPlatforms = (lang: Lang) => [
  { value: 'n8n', label: 'n8n', desc: 'Node-based open automation' },
  { value: 'make', label: 'Make (Integromat)', desc: 'Visual integration platform' },
  { value: 'zapier', label: 'Zapier', desc: 'Mainstream automation' },
  { value: 'custom', label: t(lang, 'Script Customizado', 'Custom Script', 'Script Personalizado', 'Script Personnalisé'), desc: 'Node.js / Python' }
];

export const getAutomationTypes = (_lang: Lang) => [
  { value: 'ETL / Data Sync', label: 'ETL / Data Sync', desc: 'Extract, Transform, Load' },
  { value: 'API Gateway', label: 'API Gateway / Webhook Handler', desc: 'Processing incoming data' },
  { value: 'Notifications', label: 'Notifications & Alerts', desc: 'Slack, Email, SMS routing' },
  { value: 'Scheduled Job', label: 'Scheduled Job / Cron', desc: 'Time-based execution' },
  { value: 'AIAgent', label: 'AI Agent / Chatbot', desc: 'LLM orchestrator workflow' }
];

export const getTriggerTypes = (lang: Lang) => [
  { value: 'Webhook', label: 'Webhook', desc: t(lang, 'Triggers via Request HTTP', 'Trigger via HTTP Request', 'Triggers vía Request HTTP', 'Déclencheurs via Requête HTTP') },
  { value: 'Cron', label: t(lang, 'Cron / Agendamento', 'Cron / Schedule', 'Cron / Programa', 'Cron / Planification'), desc: t(lang, 'Trigger baseado em tempo', 'Time-based trigger', 'Trigger basado en tiempo', 'Déclencheur basé sur le temps') },
  { value: 'App Event', label: t(lang, 'Evento de App', 'App Event', 'Evento de App', 'Événement d\'App'), desc: t(lang, 'Trigger de um serviço (ex: Stripe, GitHub)', 'Trigger from specific service (e.g. Stripe, GitHub)', 'Trigger de un servicio (ej: Stripe, GitHub)', 'Déclencheur spécifique au service (ex: Stripe, GitHub)') },
  { value: 'Manual', label: t(lang, 'Trigger Manual', 'Manual Trigger', 'Trigger Manual', 'Déclencheur Manuel'), desc: t(lang, 'Executado manualmente pelo utilizador', 'Executed manually by user', 'Ejecutado manualmente por el usuario', 'Exécuté manuellement par l\'utilisateur') },
  { value: 'Email', label: t(lang, 'Receção de E-mail', 'Email Receive', 'Recepción de Correo', 'Réception d\'E-mail'), desc: t(lang, 'Trigger num novo e-mail', 'Trigger on new email', 'Trigger en nuevo email', 'Déclencheur sur nouveau courriel') },
  { value: 'Message Queue', label: 'Message Queue', desc: 'RabbitMQ, Kafka, AWS SQS' }
];

export const getCoreNodes = (_lang: Lang) => [
  { value: 'http', label: 'HTTP Request', desc: 'REST Integrations', category: 'core' },
  { value: 'json', label: 'JSON Parser', desc: 'Data manipulation', category: 'core' },
  { value: 'switch', label: 'Switch / Router', desc: 'Logic branching', category: 'logic' },
  { value: 'merge', label: 'Merge / Array', desc: 'Combining data streams', category: 'logic' },
  { value: 'loop', label: 'Split In Batches / Iteration', desc: 'Looping logic', category: 'logic' },
  { value: 'db', label: 'Database Node', desc: 'Postgres, MySQL, Mongo', category: 'data' },
  { value: 'crypto', label: 'Crypto / Hash', desc: 'Data security', category: 'core' },
  { value: 'llm', label: 'LLM Node', desc: 'OpenAI, Anthropic', category: 'ai' },
  { value: 'code', label: 'Code Node', desc: 'Custom JS/Python execution', category: 'core' }
];

export const getAuthRequirements = (lang: Lang) => [
  { value: 'bearer', label: 'Bearer Token', desc: 'Standard API Key' },
  { value: 'oauth2', label: 'OAuth2', desc: 'User delegated auth' },
  { value: 'basic', label: 'Basic Auth', desc: 'User/Password' },
  { value: 'custom', label: 'Custom Auth', desc: 'Custom headers/cookies' },
  { value: 'none', label: t(lang, 'Sem Autenticação', 'No Auth', 'Sin Autenticación', 'Sans Authentification'), desc: t(lang, 'Endpoints públicos', 'Public endpoints', 'Endpoints públicos', 'Endpoints publics') }
];

export const getErrorHandlingOptions = (lang: Lang) => [
  { value: 'Stop execution', label: t(lang, 'Parar Execução', 'Stop Execution', 'Detener Ejecución', 'Arrêter l\'Exécution'), desc: t(lang, 'Falhar o workflow todo imediatamente', 'Fail the entire workflow immediately', 'Fallar todo el workflow inmediatamente', 'Échouer tout le flux de travail immédiatement') },
  { value: 'Continue on failure', label: t(lang, 'Continuar na Falha', 'Continue on Failure', 'Continuar en la Falla', 'Continuer en cas d\'Échec'), desc: t(lang, 'Ignorar o erro do nó e prosseguir', 'Ignore node error and proceed', 'Ignorar error del nodo y proceder', 'Ignorer l\'erreur du nœud et procéder') },
  { value: 'Error trigger', label: t(lang, 'Route to Error Trigger', 'Route to Error Trigger', 'Enrutar a Error Trigger', 'Route vers Error Trigger'), desc: t(lang, 'Executar workflow secundário para erro', 'Execute secondary error handling workflow', 'Ejecutar workflow secundario para error', 'Exécuter flux de travail secondaire pour erreur') },
  { value: 'Alert', label: t(lang, 'Alerta e Parar', 'Alert & Stop', 'Alerta y Detener', 'Alerte & Arrêter'), desc: t(lang, 'Notificar via Slack/Email e depois parar', 'Notify via Slack/Email then stop', 'Notificar vía Slack/Email y después parar', 'Notifier via Slack/Email puis arrêter') }
];

export const getRetryOptions = (lang: Lang) => [
  { value: 'No retries', label: t(lang, 'Sem Retentativas', 'No Retries', 'Sin Reintentos', 'Sans Re-tentatives'), desc: t(lang, 'Falhar na primeira tentativa', 'Fail on first attempt', 'Fallar en el primer intento', 'Échouer à la première tentative') },
  { value: 'Retry 1x', label: t(lang, 'Repetir 1x', 'Retry 1x', 'Reintentar 1x', 'Réessayer 1x'), desc: t(lang, 'Uma retentativa imediata', 'Single immediate retry', 'Reintento único inmediato', 'Unique réessai immédiat') },
  { value: 'Retry 3x (Backoff)', label: 'Retry 3x (Backoff)', desc: t(lang, 'Exponential backoff', 'Exponential backoff', 'Exponential backoff', 'Recul exponentiel') },
  { value: 'Keep trying', label: t(lang, 'Continuar a Tentar', 'Keep Trying', 'Seguir Intentando', 'Continuer l\'Essai'), desc: t(lang, 'Retentativa persistente (queue)', 'Persistent queue-based retry', 'Reintento persistente (cola)', 'Réessai persistant (file)') }
];
