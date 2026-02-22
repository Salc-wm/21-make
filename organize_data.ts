import fs from 'fs';
import path from 'path';

const srcDir = './src/data';
const optionsDir = path.join(srcDir, 'options');
const prePromptsDir = path.join(srcDir, 'prePrompts');
const jsonDir = path.join(srcDir, 'json');

[optionsDir, prePromptsDir, jsonDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  const oldPath = path.join(srcDir, file);
  if (fs.statSync(oldPath).isDirectory()) return;

  if (file.endsWith('Options.ts') || file === 'options.ts') {
    fs.renameSync(oldPath, path.join(optionsDir, file));
  } else if (file.endsWith('PrePrompts.json') || file === 'prePrompts.json') {
    fs.renameSync(oldPath, path.join(jsonDir, file));
  } else if (file.endsWith('PrePrompts.ts') || file === 'prePrompts.ts') {
    fs.renameSync(oldPath, path.join(prePromptsDir, file));
  }
});

console.log('Files moved successfully.');
