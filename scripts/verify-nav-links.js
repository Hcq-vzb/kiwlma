// AIGC START
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skipDirs = new Set(['statics', 'uploadfile', 'node_modules', '.git', 'scripts']);

function shouldBeFixed(url) {
  if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(url)) return false;
  if (/index\.html/i.test(url)) return false;
  const m = url.match(/^(.+\/)(\?.*)?$/);
  if (!m) return false;
  if (/^\.\.?\/?$/.test(m[1])) return false;
  return true;
}

function walkHtml(dir, remain = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (skipDirs.has(e.name)) continue;
      walkHtml(path.join(dir, e.name), remain);
    } else if (e.name.endsWith('.html')) {
      const file = path.join(dir, e.name);
      const content = fs.readFileSync(file, 'utf8');
      const re = /href=(["'])([^"']*)\1/g;
      let m;
      while ((m = re.exec(content))) {
        if (shouldBeFixed(m[2])) {
          remain.push({ file: path.relative(root, file), url: m[2] });
        }
      }
    }
  }
  return remain;
}

const remain = walkHtml(root);
console.log('Remaining folder hrefs:', remain.length);
remain.slice(0, 25).forEach((r) => console.log(r.file, '->', r.url));
// AIGC END
