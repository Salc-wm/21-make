import fs from 'fs';
import path from 'path';

function walk(dir: string, callback: (file: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) { walk(dirPath, callback); }
    else { callback(dirPath); }
  });
}

const replacements = [
  { from: /data\/options(?![\/\.])/g,         to: 'data/options/options' },
  { from: /data\/devOptions/g,      to: 'data/options/devOptions' },
  { from: /data\/deployOptions/g,   to: 'data/options/deployOptions' },
  { from: /data\/automationOptions/g, to: 'data/options/automationOptions' },
  { from: /data\/prePrompts(?![\/\.])/g,      to: 'data/prePrompts/prePrompts' },
  { from: /data\/devPrePrompts/g,   to: 'data/prePrompts/devPrePrompts' },
  { from: /data\/deployPrePrompts/g,to: 'data/prePrompts/deployPrePrompts' },
  { from: /data\/automationPrePrompts/g, to: 'data/prePrompts/automationPrePrompts' },
  
  // also handle the internal JSON imports in the prePrompts files
  { from: /'\.\/prePrompts\.json'/g, to: "'../json/prePrompts.json'" },
  { from: /'\.\/devPrePrompts\.json'/g, to: "'../json/devPrePrompts.json'" },
  { from: /'\.\/deployPrePrompts\.json'/g, to: "'../json/deployPrePrompts.json'" },
  { from: /'\.\/automationPrePrompts\.json'/g, to: "'../json/automationPrePrompts.json'" },
  { from: /"\.\/prePrompts\.json"/g, to: '"../json/prePrompts.json"' },
  { from: /"\.\/devPrePrompts\.json"/g, to: '"../json/devPrePrompts.json"' },
  { from: /"\.\/deployPrePrompts\.json"/g, to: '"../json/deployPrePrompts.json"' },
  { from: /"\.\/automationPrePrompts\.json"/g, to: '"../json/automationPrePrompts.json"' }
];

walk('./src', (file) => {
  if (!file.endsWith('.ts') && !file.endsWith('.tsx')) return;

  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  replacements.forEach(r => {
    newContent = newContent.replace(r.from, r.to);
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Fixed', file);
  }
});
