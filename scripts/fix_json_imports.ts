import fs from 'fs';
import path from 'path';

function fix(dir: string) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (!p.endsWith('.ts')) return;
    let content = fs.readFileSync(p, 'utf8');
    let newContent = content.replace(/from '\.\.\/\.\.\/json/g, "from '../json");
    if (newContent !== content) {
      fs.writeFileSync(p, newContent);
      console.log('Fixed extra JSON paths in', p);
    }
  });
}

fix('./src/data/prePrompts');
