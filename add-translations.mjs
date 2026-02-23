import fs from 'fs';
import path from 'path';

const ptAdditions = `
    // Features
    aiPreviewBtn: 'Testar com IA — Ver resultado Design',
    aiPreviewTitle: 'Design AI Preview',
    settings: 'Configurações',
    provider: 'Provedor de IA',
    model: 'Modelo',
    apiKeyInfo: 'A key é guardada apenas localmente no teu browser.',
    generateWith: 'Gerar com',
    generating: 'A gerar...',
    clear: 'Limpar',
    apiKeyError: 'Configura a tua API key primeiro.',
    unknownError: 'Ocorreu um erro desconhecido.',
    pageDetailTitle: 'Detalhar Páginas Individualmente',
    pageDetailDesc: 'Clica em cada página para adicionar descrição, componentes e notas específicas que guiarão o design de cada ecrã.',
    pageDescTitle: 'Descrição da Página',
    pageDescHint: '— O que esta página faz?',
    pageElementsTitle: 'Elementos / Componentes Principais',
    pageElementsHint: '— O que deve estar visível?',
    pageNotesTitle: 'Notas Específicas',
    pageNotesHint: '— Comportamento, estados especiais, etc.',
    pageDetailHelper: 'Estes detalhes serão incluídos no prompt para guiar o Design na criação desta página específica.',
    savedProfiles: 'Perfis Salvos',
    selectProfile: '-- Selecionar Perfil --',
    loadProfile: 'Carregar Perfil',
    updateProfile: 'Atualizar',
    deleteProfile: 'Eliminar Perfil',
    newProfile: 'Novo',
    saveProfile: 'Salvar Perfil',
    deployCmdsTitle: 'Comandos de Deploy',
    deployCmdsReady: '— prontos para executar',
    copyAll: 'Copiar tudo',
    dictTitle: 'Dicionário de Arquitetura',
    // ...
`;

const enAdditions = `
    // Features
    aiPreviewBtn: 'Test with AI — See Design result',
    aiPreviewTitle: 'Design AI Preview',
    settings: 'Settings',
    provider: 'AI Provider',
    model: 'Model',
    apiKeyInfo: 'The key is stored locally in your browser only.',
    generateWith: 'Generate with',
    generating: 'Generating...',
    clear: 'Clear',
    apiKeyError: 'Configure your API key first.',
    unknownError: 'An unknown error occurred.',
    pageDetailTitle: 'Detail Pages Individually',
    pageDetailDesc: 'Click on each page to add description, components, and specific notes that will guide the design of each screen.',
    pageDescTitle: 'Page Description',
    pageDescHint: '— What does this page do?',
    pageElementsTitle: 'Main Elements / Components',
    pageElementsHint: '— What should be visible?',
    pageNotesTitle: 'Specific Notes',
    pageNotesHint: '— Behavior, special states, etc.',
    pageDetailHelper: 'These details will be included in the prompt to guide the Design in creating this specific page.',
    savedProfiles: 'Saved Profiles',
    selectProfile: '-- Select Profile --',
    loadProfile: 'Load Profile',
    updateProfile: 'Update',
    deleteProfile: 'Delete Profile',
    newProfile: 'New',
    saveProfile: 'Save Profile',
    deployCmdsTitle: 'Deploy Commands',
    deployCmdsReady: '— ready to execute',
    copyAll: 'Copy all',
    dictTitle: 'Architecture Dictionary',
    // ...
`;

const esAdditions = `
    // Features
    aiPreviewBtn: 'Prueba con IA — Ver Resultado de Diseño',
    aiPreviewTitle: 'Design AI Preview',
    settings: 'Configuraciones',
    provider: 'Proveedor de IA',
    model: 'Modelo',
    apiKeyInfo: 'La clave se guarda localmente en su navegador.',
    generateWith: 'Generar con',
    generating: 'Generando...',
    clear: 'Limpiar',
    apiKeyError: 'Configure su API key primero.',
    unknownError: 'Ocurrió un error desconocido.',
    pageDetailTitle: 'Detallar Páginas Individualmente',
    pageDetailDesc: 'Haz clic en cada página para agregar descripción... que guiarán el diseño.',
    pageDescTitle: 'Descripción de la Página',
    pageDescHint: '— ¿Qué hace esta página?',
    pageElementsTitle: 'Elementos Principales',
    pageElementsHint: '— ¿Qué debe estar visible?',
    pageNotesTitle: 'Notas Específicas',
    pageNotesHint: '— Comportamiento, estados especiales, etc.',
    pageDetailHelper: 'Estos detalles se incluirán en el prompt.',
    savedProfiles: 'Perfiles Guardados',
    selectProfile: '-- Seleccionar Perfil --',
    loadProfile: 'Cargar Perfil',
    updateProfile: 'Actualizar',
    deleteProfile: 'Eliminar Perfil',
    newProfile: 'Nuevo',
    saveProfile: 'Guardar Perfil',
    deployCmdsTitle: 'Comandos de Deploy',
    deployCmdsReady: '— listos para ejecutar',
    copyAll: 'Copiar todo',
    dictTitle: 'Diccionario de Arquitectura',
    // ...
`;

const frAdditions = `
    // Features
    aiPreviewBtn: 'Aperçu IA Design (Test)',
    aiPreviewTitle: 'Aperçu IA Design',
    settings: 'Paramètres',
    provider: 'Fournisseur d\\'IA',
    model: 'Modèle',
    apiKeyInfo: 'La clé est enregistrée localement dans votre navigateur.',
    generateWith: 'Générer avec',
    generating: 'Génération...',
    clear: 'Effacer',
    apiKeyError: 'Configurez votre API key d\\'abord.',
    unknownError: 'Une erreur inconnue s\\'est produite.',
    pageDetailTitle: 'Détailler les pages individuellement',
    pageDetailDesc: 'Cliquez sur chaque page pour ajouter une description... qui guideront le design.',
    pageDescTitle: 'Description de la page',
    pageDescHint: '— Que fait cette page?',
    pageElementsTitle: 'Éléments principaux',
    pageElementsHint: '— Que doit-il être visible?',
    pageNotesTitle: 'Notes spécifiques',
    pageNotesHint: '— Comportement, états spéciaux, etc.',
    pageDetailHelper: 'Ces détails seront inclus dans le prompt.',
    savedProfiles: 'Profils Enregistrés',
    selectProfile: '-- Sélectionner un profil --',
    loadProfile: 'Charger Profil',
    updateProfile: 'Mettre à jour',
    deleteProfile: 'Supprimer le profil',
    newProfile: 'Nouveau',
    saveProfile: 'Enregistrer le profil',
    deployCmdsTitle: 'Commandes de déploiement',
    deployCmdsReady: '— prêts à exécuter',
    copyAll: 'Tout copier',
    dictTitle: 'Dictionnaire d\\'Architecture',
    // ...
`;

const filePath = path.join(process.cwd(), 'src', 'core', 'i18n.ts');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace("confirmReset: 'Pretendes limpar todos os campos e definições (design, dev, e deploy) do projeto atual?',\\n  },", "confirmReset: 'Pretendes limpar todos os campos e definições (design, dev, e deploy) do projeto atual?',\n" + ptAdditions + "\n  },");

content = content.replace("confirmReset: 'Do you want to clear all fields and settings (design, dev, and deploy) for the current project?',\\n  },", "confirmReset: 'Do you want to clear all fields and settings (design, dev, and deploy) for the current project?',\n" + enAdditions + "\n  },");

content = content.replace("confirmReset: '¿Deseas borrar todos los campos y configuraciones de este proyecto?',\\n  },", "confirmReset: '¿Deseas borrar todos los campos y configuraciones de este proyecto?',\n" + esAdditions + "\n  },");

content = content.replace("confirmReset: 'Voulez-vous effacer tous les champs et paramètres de ce projet?',\\n  },", "confirmReset: 'Voulez-vous effacer tous les champs et paramètres de ce projet?',\n" + frAdditions + "\n  },");

fs.writeFileSync(filePath, content);
console.log('Updated i18n.ts');
