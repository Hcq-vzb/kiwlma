// AIGC START
/** 移除 describe 块中英法混杂的 data-lang-fr */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const skip = new Set(['statics', 'uploadfile', 'node_modules', '.git', 'scripts']);

function walk(d, out = []) {
  for (const n of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, n.name);
    if (n.isDirectory()) {
      if (!skip.has(n.name)) walk(p, out);
    } else if (n.name.endsWith('.html')) out.push(p);
  }
  return out;
}

let n = 0;
for (const file of walk(root)) {
  let h = fs.readFileSync(file, 'utf8');
  const re =
    /(<div class="describe"[^>]*data-lang-en="[^"]*") data-lang-fr="([^"]*)"([^>]*>)/gi;
  const next = h.replace(re, (m, a, fr, b) => {
    const enWords = (fr.match(/\b(the|and|with|can|machine|one|which)\b/gi) || []).length;
    if (enWords >= 3) {
      n++;
      return a + b;
    }
    return m;
  });
  if (next !== h) fs.writeFileSync(file, next, 'utf8');
}
console.log('Cleaned describe blocks:', n);
// AIGC END
