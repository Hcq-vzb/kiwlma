/**
 * Inject chat-widget CSS/JS on all main site HTML pages
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skipDirs = new Set(['statics', 'uploadfile', 'node_modules', '.git', 'scripts', 'neirongtuisong']);

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

function isMainPage(html) {
  return html.includes('id="header"') && html.includes('jquery-1.10.2');
}

let cssAdded = 0;
let jsAdded = 0;

for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!isMainPage(html)) continue;
  if (html.includes('chat-widget.js')) continue;

  const rel = path.relative(root, file);
  const depth = rel === 'index.html' ? 0 : rel.split(path.sep).length - 1;
  const prefix = depthToPrefix(depth);
  let changed = false;

  const cssTag = `<link href="${prefix}statics/css/chat-widget.css" rel="stylesheet" type="text/css" />`;
  if (!html.includes('chat-widget.css')) {
    if (html.includes('</head>')) {
      html = html.replace('</head>', cssTag + '\n</head>');
      cssAdded++;
      changed = true;
    }
  }

  const jsTag = `<script src="${prefix}statics/js/jss/chat-widget.js"></script>`;
  const i18nRe = /(<script[^>]+src=["'][^"']*i18n\.js["'][^>]*>\s*<\/script>)/i;
  if (i18nRe.test(html)) {
    html = html.replace(i18nRe, '$1\n' + jsTag);
  } else if (html.includes('</body>')) {
    html = html.replace('</body>', jsTag + '\n</body>');
  }
  jsAdded++;
  changed = true;

  if (changed) fs.writeFileSync(file, html, 'utf8');
}

console.log('Chat widget injected:');
console.log('  CSS added:', cssAdded);
console.log('  JS added:', jsAdded);
