export const automationPlatforms = [
  { value: 'n8n', label: 'n8n', desc: 'Node-based open automation' },
  { value: 'make', label: 'Make (Integromat)', desc: 'Visual integration platform' },
  { value: 'zapier', label: 'Zapier', desc: 'Mainstream automation' },
  { value: 'custom', label: 'Custom Script', desc: 'Node.js / Python' }
];

export const automationTypes = [
  { value: 'ETL / Data Sync', label: 'ETL / Data Sync', desc: 'Extract, Transform, Load' },
  { value: 'API Gateway', label: 'API Gateway / Webhook Handler', desc: 'Processing incoming data' },
  { value: 'Notifications', label: 'Notifications & Alerts', desc: 'Slack, Email, SMS routing' },
  { value: 'Scheduled Job', label: 'Scheduled Job / Cron', desc: 'Time-based execution' },
  { value: 'AIAgent', label: 'AI Agent / Chatbot', desc: 'LLM orchestrator workflow' }
];

export const triggerTypes = [
  { value: 'Webhook', label: 'Webhook', desc: 'Trigger via HTTP Request' },
  { value: 'Cron', label: 'Cron / Schedule', desc: 'Time-based trigger' },
  { value: 'App Event', label: 'App Event', desc: 'Trigger from specific service (e.g. Stripe, GitHub)' },
  { value: 'Manual', label: 'Manual Trigger', desc: 'Executed manually by user' },
  { value: 'Email', label: 'Email Receive', desc: 'Trigger on new email' },
  { value: 'Message Queue', label: 'Message Queue', desc: 'RabbitMQ, Kafka, AWS SQS' }
];

export const coreNodes = [
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

export const authRequirements = [
  { value: 'bearer', label: 'Bearer Token', desc: 'Standard API Key' },
  { value: 'oauth2', label: 'OAuth2', desc: 'User delegated auth' },
  { value: 'basic', label: 'Basic Auth', desc: 'User/Password' },
  { value: 'custom', label: 'Custom Auth', desc: 'Custom headers/cookies' },
  { value: 'none', label: 'No Auth', desc: 'Public endpoints' }
];

export const errorHandlingOptions = [
  { value: 'Stop execution', label: 'Stop Execution', desc: 'Fail the entire workflow immediately' },
  { value: 'Continue on failure', label: 'Continue on Failure', desc: 'Ignore node error and proceed' },
  { value: 'Error trigger', label: 'Route to Error Trigger', desc: 'Execute secondary error handling workflow' },
  { value: 'Alert', label: 'Alert & Stop', desc: 'Notify via Slack/Email then stop' }
];

export const retryOptions = [
  { value: 'No retries', label: 'No Retries', desc: 'Fail on first attempt' },
  { value: 'Retry 1x', label: 'Retry 1x', desc: 'Single immediate retry' },
  { value: 'Retry 3x (Backoff)', label: 'Retry 3x (Backoff)', desc: 'Exponential backoff' },
  { value: 'Keep trying', label: 'Keep Trying', desc: 'Persistent queue-based retry' }
];
