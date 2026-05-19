// AIGC START
/**
 * 将 href 中指向目录的链接（以 / 结尾或 /? 查询）改为指向 index.html
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skipDirs = new Set(['statics', 'uploadfile', 'node_modules', '.git', 'scripts']);

function fixHrefUrl(url) {
  if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(url)) return url;
  if (/index\.html/i.test(url)) return url;

  const m = url.match(/^(.+\/)(\?.*)?$/);
  if (!m) return url;

  const base = m[1];
  const query = m[2] || '';

  if (/^\.\.?\/?$/.test(base)) return url;

  return base + 'index.html' + query;
}

function fixHtmlContent(content) {
  return content.replace(/href=(["'])([^"']*)\1/g, (match, quote, url) => {
    const fixed = fixHrefUrl(url);
    return fixed === url ? match : `href=${quote}${fixed}${quote}`;
  });
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
let replacements = 0;

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  const after = fixHtmlContent(before);
  if (after !== before) {
    const count = (before.match(/href=(["'])([^"']*)\1/g) || []).filter((m, i, arr) => {
      const url = m.match(/href=(["'])([^"']*)\1/)[2];
      return fixHrefUrl(url) !== url;
    }).length;
    fs.writeFileSync(file, after, 'utf8');
    changed++;
    replacements += count;
  }
}

console.log('HTML files scanned:', files.length);
console.log('Files updated:', changed);
console.log('Done.');
// AIGC END
