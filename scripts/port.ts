import fs from 'fs';
import { automationPrePrompts } from './src/data/automationPrePrompts';
import { deployPrePrompts } from './src/data/deployPrePrompts';
import { devPrePrompts } from './src/data/devPrePrompts';
import { prePrompts } from './src/data/prePrompts';

fs.writeFileSync('./src/data/automationPrePrompts.json', JSON.stringify(automationPrePrompts, null, 2));
fs.writeFileSync('./src/data/deployPrePrompts.json', JSON.stringify(deployPrePrompts, null, 2));
fs.writeFileSync('./src/data/devPrePrompts.json', JSON.stringify(devPrePrompts, null, 2));
fs.writeFileSync('./src/data/prePrompts.json', JSON.stringify(prePrompts, null, 2));

console.log('JSON files generated successfully!');
