import fs from 'fs';

const files = [
  { path: './src/data/automationPrePrompts.ts', name: 'automationPrePrompts', interfaceName: 'AutomationPrePrompt' },
  { path: './src/data/deployPrePrompts.ts', name: 'deployPrePrompts', interfaceName: 'DeployPrePrompt' },
  { path: './src/data/devPrePrompts.ts', name: 'devPrePrompts', interfaceName: 'DevPrePrompt' },
  { path: './src/data/prePrompts.ts', name: 'prePrompts', interfaceName: 'PrePrompt' },
];

files.forEach(({ path, name, interfaceName }) => {
  let content = fs.readFileSync(path, 'utf8');
  
  // Strip comments (rule: "Remove all existing comments from the code before applying changes.")
  // Note: Only targeting single-line comments manually if safely not inside strings, 
  // but a simpler way is string replacements since we know exactly where they are.
  content = content.replace(/\/\/.*$/gm, '');

  const regex = new RegExp(`export const ${name}: ${interfaceName}\\[\\] = \\[([\\s\\S]*?)\\];`, 'm');
  
  if (content.match(regex)) {
      content = content.replace(regex, `import ${name}Data from './${name}.json';\n\nexport const ${name}: ${interfaceName}[] = ${name}Data as ${interfaceName}[];`);
  } else {
      console.log('Regex did NOT match for', name);
  }

  // Ensure double newlines and clean up
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  fs.writeFileSync(path, content);
});
console.log('TS files updated successfully!');
