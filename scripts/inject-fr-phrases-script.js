// AIGC START
/** 在 i18n.js 之前插入 product-fr-phrases.js */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skipDirs = new Set(['statics', 'uploadfile', 'node_modules', '.git', 'scripts', '.vscode']);
const tagRe = /<script[^>]+src=["']([^"']*i18n\.js)["'][^>]*>\s*<\/script>/i;
const frRe = /product-fr-phrases\.js/i;

function depthToPrefix(depth) {
  return depth === 0 ? './' : '../'.repeat(depth);
}

function walk(dir, files = []) {
  for (const n of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, n.name);
    if (n.isDirectory()) {
      if (!skipDirs.has(n.name)) walk(p, files);
    } else if (n.name.endsWith('.html')) files.push(p);
  }
  return files;
}

let updated = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!tagRe.test(html) || frRe.test(html)) continue;
  const m = html.match(tagRe);
  if (!m) continue;
  const rel = path.relative(root, file);
  const depth = rel === 'index.html' ? 0 : rel.split(path.sep).length - 1;
  const prefix = depthToPrefix(depth);
  const insert =
    `<script src="${prefix}statics/js/jss/product-fr-phrases.js"></script>\n` +
    m[0];
  html = html.replace(m[0], insert);
  fs.writeFileSync(file, html, 'utf8');
  updated++;
}
console.log('Injected product-fr-phrases.js before i18n on', updated, 'files');
// AIGC END
