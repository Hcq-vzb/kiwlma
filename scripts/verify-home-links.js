// AIGC START
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skipDirs = new Set(['statics', 'uploadfile', 'node_modules', '.git', 'scripts']);

function getHomeHref(filePath) {
  const rel = path.relative(root, filePath).replace(/\\/g, '/');
  const depth = rel.split('/').length - 1;
  return (depth > 0 ? '../'.repeat(depth) : '') + 'index.html';
}

function isBadHomeUrl(url) {
  return url === './' || url === '../' || url === '/' || url === '.' || url === '..';
}

function walkHtml(dir, issues = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (skipDirs.has(e.name)) continue;
      walkHtml(path.join(dir, e.name), issues);
    } else if (e.name.endsWith('.html')) {
      const file = path.join(dir, e.name);
      const expected = getHomeHref(file);
      const content = fs.readFileSync(file, 'utf8');
      const patterns = [
        /href=(["'])([^"']*)\1[^>]*title=["']Home["']/g,
        /title=["']Home["'][^>]*href=(["'])([^"']*)\1/g,
        /href=(["'])([^"']*)\1[^>]*title=["']Return to homepage["']/g,
        /href=(["'])([^"']*)\1>Home<\/a>/g,
      ];
      for (const re of patterns) {
        let m;
        while ((m = re.exec(content))) {
          const url = m[2] || m[3];
          if (isBadHomeUrl(url) || (url !== expected && !url.endsWith('index.html'))) {
            issues.push({ file: path.relative(root, file), url, expected, kind: 'home' });
          }
        }
      }
    }
  }
  return issues;
}

const issues = walkHtml(root);
const bad = issues.filter((i) => isBadHomeUrl(i.url));
console.log('Bad Home URLs (./ ../ / .):', bad.length);
bad.slice(0, 20).forEach((i) => console.log(i.file, i.url));
// AIGC END
