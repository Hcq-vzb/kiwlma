// AIGC START
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function loadDict() {
  const T = {};
  const i18n = fs.readFileSync(path.join(root, 'statics/js/jss/i18n.js'), 'utf8');
  const frFile = fs.readFileSync(path.join(root, 'statics/js/jss/product-fr-phrases.js'), 'utf8');
  const re = /'((?:\\'|[^'])*)'\s*:\s*'((?:\\'|[^'])*)'/g;
  let m;
  while ((m = re.exec(i18n))) {
    if (m[0].indexOf('translations') === -1 && m[0].indexOf('STORAGE') === -1) {
      T[m[1].replace(/\\'/g, "'")] = m[2].replace(/\\'/g, "'");
    }
  }
  while ((m = re.exec(frFile))) {
    T[m[1].replace(/\\'/g, "'")] = m[2].replace(/\\'/g, "'");
  }
  return T;
}

function norm(s) {
  return (s || '').replace(/\s+/g, ' ').trim();
}

function getSortedKeys(T) {
  return Object.keys(T)
    .filter((k) => k && k.length > 1 && T[k])
    .sort((a, b) => b.length - a.length);
}

function translateLong(en, T, sorted) {
  if (!en) return en;
  if (T[en]) return T[en];
  let out = en;
  for (const key of sorted) {
    if (key.length < 3) continue;
    const fr = T[key];
    if (!fr || fr === key) continue;
    out = out.split(key).join(fr);
  }
  if (en.length > 80 && out !== en) {
    const leftEn = (out.match(/\b[A-Za-z]{4,}\b/g) || []).length;
    const origEn = (en.match(/\b[A-Za-z]{4,}\b/g) || []).length;
    if (origEn > 4 && leftEn > origEn * 0.45) return en;
  }
  return out;
}

function translate(en, T, sorted) {
  if (!en) return en;
  if (T[en]) return T[en];
  if (en.indexOf('- ') === 0 && T[en.slice(2)]) return '- ' + T[en.slice(2)];
  return translateLong(en, T, sorted);
}

function attrEscape(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/\r?\n/g, ' ');
}

module.exports = { loadDict, norm, translate, attrEscape, getSortedKeys, translateLong };
// AIGC END
