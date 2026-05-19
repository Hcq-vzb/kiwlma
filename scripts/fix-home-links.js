// AIGC START
/**
 * 将首页链接从 href="./" / href="../" 等目录路径改为显式 index.html
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skipDirs = new Set(['statics', 'uploadfile', 'node_modules', '.git', 'scripts']);

function getHomeHref(filePath) {
  const rel = path.relative(root, filePath).replace(/\\/g, '/');
  const depth = rel.split('/').length - 1;
  return (depth > 0 ? '../'.repeat(depth) : '') + 'index.html';
}

function fixHomeLinks(content, homeHref) {
  let out = content;

  const replacements = [
    [/href=(["'])\.\/\1(\s+title=["']Home["'])/g, `href=$1${homeHref}$1$2`],
    [/href=(["'])\.\.\/\1(\s+title=["']Home["'])/g, `href=$1${homeHref}$1$2`],
    [/href=(["'])\.\/\1(\s+title=["']Return to homepage["'])/g, `href=$1${homeHref}$1$2`],
    [/href=(["'])\.\.\/\1(\s+title=["']Return to homepage["'])/g, `href=$1${homeHref}$1$2`],
    [/href=(["'])\.\/\1>Home<\/a>/g, `href=$1${homeHref}$1>Home</a>`],
    [/href=(["'])\.\.\/\1>Home<\/a>/g, `href=$1${homeHref}$1>Home</a>`],
    [/href=(["'])\/\1(\s+title=["']Home["'])/g, `href=$1${homeHref}$1$2`],
    [/href=(["'])\.\1(\s+title=["']Home["'])/g, `href=$1${homeHref}$1$2`],
    [
      /(<div id="header">[\s\S]{0,800}?<a href=)(["'])(\.\/|\.\.\/)\2(\s*>\s*\r?\n\s*<div class="logo">)/,
      `$1$2${homeHref}$2$4`,
    ],
  ];

  for (const [re, repl] of replacements) {
    out = out.replace(re, repl);
  }

  return out;
}

function walkHtmlFiles(dir, files = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (name.isDirectory()) {
      if (skipDirs.has(name.name)) continue;
      walkHtmlFiles(path.join(dir, name.name), files);
    } else if (name.name.endsWith('.html')) {
      files.push(path.join(dir, name.name));
    }
  }
  return files;
}

const files = walkHtmlFiles(root);
let changed = 0;

for (const file of files) {
  const homeHref = getHomeHref(file);
  const before = fs.readFileSync(file, 'utf8');
  const after = fixHomeLinks(before, homeHref);
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    changed++;
  }
}

console.log('HTML files scanned:', files.length);
console.log('Files updated:', changed);
// AIGC END
