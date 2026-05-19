// AIGC START
/**
 * 将 index.html 中已修复的 #header 导航同步到全站 HTML（按目录深度调整相对路径）
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const skipDirs = new Set(['statics', 'uploadfile', 'node_modules', '.git', 'scripts']);

const indexContent = fs.readFileSync(indexPath, 'utf8');
const headerStart = indexContent.indexOf('<div id="header">');
const maskIdx = indexContent.indexOf('<motion id="nav_Mask">'.replace('motion', 'div'));

if (headerStart === -1 || maskIdx === -1) {
  console.error('Cannot extract header from index.html');
  process.exit(1);
}

const headerClose = indexContent.indexOf('</div>', maskIdx);
const navTemplate = indexContent.slice(headerStart, headerClose + '</div>'.length);

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

function getDepth(filePath) {
  const rel = path.relative(root, filePath);
  const dir = path.dirname(rel);
  if (dir === '.') return 0;
  return dir.split(path.sep).length;
}

function adjustPaths(navHtml, depth) {
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  let html = navHtml.replace(/\.\//g, prefix);
  if (depth > 0) {
    html = html.replace(/href="index\.html"/g, `href="${prefix}index.html"`);
  }
  return html;
}

function extractOldHeader(content) {
  const start = content.indexOf('<div id="header">');
  if (start === -1) return null;
  const maskPos = content.indexOf('<div id="nav_Mask">', start);
  if (maskPos === -1) return null;
  const closeIdx = content.indexOf('</div>', maskPos);
  if (closeIdx === -1) return null;
  return { start, end: closeIdx + '</div>'.length };
}

function ensureI18nScript(content, depth) {
  if (/i18n\.js/i.test(content)) return content;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  const tag = `<script src="${prefix}statics/js/jss/i18n.js"></script>`;
  const bodyClose = content.lastIndexOf('</body>');
  if (bodyClose === -1) return content;
  return content.slice(0, bodyClose) + tag + '\n' + content.slice(bodyClose);
}

const files = walkHtmlFiles(root);
const updated = [];
const skipped = [];
const failed = [];

for (const file of files) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  if (rel === 'index.html') continue;

  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('<div id="header">')) {
    skipped.push(rel + ' (no header)');
    continue;
  }

  const span = extractOldHeader(content);
  if (!span) {
    failed.push(rel + ' (header parse failed)');
    continue;
  }

  const depth = getDepth(file);
  const newHeader = adjustPaths(navTemplate, depth);
  content = content.slice(0, span.start) + newHeader + content.slice(span.end);
  content = ensureI18nScript(content, depth);

  fs.writeFileSync(file, content, 'utf8');
  updated.push(rel);
}

const listPath = path.join(root, 'scripts', 'sync-nav-updated.txt');
fs.writeFileSync(listPath, updated.sort().join('\n'), 'utf8');

console.log('Nav template length:', navTemplate.length);
console.log('HTML files scanned:', files.length);
console.log('Updated:', updated.length);
console.log('Skipped:', skipped.length);
console.log('Failed:', failed.length);
if (skipped.length) console.log('Skipped sample:', skipped.slice(0, 5));
if (failed.length) console.log('Failed sample:', failed.slice(0, 10));
console.log('List written to:', listPath);
// AIGC END
