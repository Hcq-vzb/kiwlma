// AIGC START
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const skip = new Set(['statics', 'uploadfile', 'node_modules', '.git', 'scripts']);
const texts = new Map();

function walk(d) {
  for (const n of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, n.name);
    if (n.isDirectory()) {
      if (!skip.has(n.name)) walk(p);
    } else if (n.name.endsWith('.html')) {
      const h = fs.readFileSync(p, 'utf8');
      const reH = /<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi;
      const reP = /<p[^>]*>([^<]{15,400})<\/p>/gi;
      const reMore = /class="more"[^>]*>([^<]+)</gi;
      let m;
      while ((m = reH.exec(h))) {
        const t = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (t.length > 2 && t.length < 280) texts.set(t, (texts.get(t) || 0) + 1);
      }
      while ((m = reP.exec(h))) {
        const t = m[1].replace(/\s+/g, ' ').trim();
        if (t.length > 14 && t.length < 280) texts.set(t, (texts.get(t) || 0) + 1);
      }
      while ((m = reMore.exec(h))) {
        const t = m[1].trim();
        texts.set(t, (texts.get(t) || 0) + 1);
      }
    }
  }
}
walk(root);
const top = [...texts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 100);
top.forEach(([t, c]) => console.log(c + '\t' + t));
// AIGC END
