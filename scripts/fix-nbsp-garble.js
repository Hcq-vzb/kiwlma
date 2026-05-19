// AIGC START
/**
 * 1. 删除字面量 &NBSP;（用户指定）
 * 2. 移除错误的 data-lang-en/fr="&amp;nbsp;"（标题区显示 &NBSP; 的根因）
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skip = new Set(['statics', 'uploadfile', 'node_modules', '.git', 'scripts', '.vscode']);
const LANG_NBSP_ATTR = ' data-lang-en="&amp;nbsp;" data-lang-fr="&amp;nbsp;"';
const updated = [];

function walk(d, files = []) {
  for (const n of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, n.name);
    if (n.isDirectory()) {
      if (!skip.has(n.name)) walk(p, files);
    } else if (n.name.endsWith('.html')) files.push(p);
  }
  return files;
}

for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  html = html.split('&NBSP;').join('');
  html = html.split(LANG_NBSP_ATTR).join('');
  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    updated.push(path.relative(root, file).replace(/\\/g, '/'));
  }
}

const listPath = path.join(root, 'scripts', 'fix-nbsp-garble-updated.txt');
fs.writeFileSync(listPath, updated.sort().join('\n'), 'utf8');
console.log('Fixed files:', updated.length);
console.log('List:', listPath);
// AIGC END
