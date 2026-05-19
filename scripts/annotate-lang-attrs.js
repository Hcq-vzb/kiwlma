// AIGC START
/**
 * 为产品/内容区文本批量写入 data-lang-en / data-lang-fr
 */
const fs = require('fs');
const path = require('path');
const { loadDict, norm, translate, attrEscape, getSortedKeys } = require('./i18n-translate-lib');

const root = path.resolve(__dirname, '..');
const skipDirs = new Set(['statics', 'uploadfile', 'node_modules', '.git', 'scripts', '.vscode']);

const T = loadDict();
const sorted = getSortedKeys(T);

const TAGS = 'h1|h2|h3|h4|p|dt|dd|label|th|span|button|a';
const ZONE_MARKERS = [
  'id="index"',
  'id="main"',
  'class="products"',
  'class="content_pd"',
  'id="neiye_bx"',
  'id="title"',
  'id="Path_1"',
  'id="footer"',
  'id="header"',
  'id="nav"'
];

function inI18nScope(html) {
  return html.includes('i18n.js');
}

function annotateSimpleTags(html) {
  const re = new RegExp(`<(${TAGS})(\\s[^>]*)?>([^<]*)<\\/\\1>`, 'gi');
  return html.replace(re, (full, tag, attrs, inner) => {
    attrs = attrs || '';
    if (attrs.includes('data-lang-en') || attrs.includes('data-lang-rich')) return full;
    if (/script|style|noscript/i.test(attrs)) return full;
    const text = norm(inner);
    if (!text || text.length < 2) return full;
    if (/^[\d\s.,:;+\-/%°]+$/.test(text)) return full;
    const fr = translate(text, T, sorted);
    if (fr === text && text.length > 80) return full;
    return `<${tag}${attrs} data-lang-en="${attrEscape(text)}" data-lang-fr="${attrEscape(fr)}">${inner}</${tag}>`;
  });
}

function annotateTableCells(html) {
  return html.replace(/<td(\s[^>]*)>([^<]*)<\/td>/gi, (full, attrs, inner) => {
    if (full.includes('data-lang-en')) return full;
    const text = norm(inner);
    if (!text || text.length < 2) return full;
    if (/^[\d\s.,:;+\-/%°A-Z0-9\-]+$/i.test(text) && !/[a-z]{3,}/.test(text)) return full;
    const fr = translate(text, T, sorted);
    if (fr === text && text.length > 40) return full;
    return `<td${attrs} data-lang-en="${attrEscape(text)}" data-lang-fr="${attrEscape(fr)}">${inner}</td>`;
  });
}

function annotateDescribeBlocks(html) {
  return html.replace(/<div class="describe"([^>]*)>([\s\S]*?)<\/div>\s*<h3/gi, (full, attrs, inner) => {
    if (full.includes('data-lang-en=')) return full;
    const text = norm(inner.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' '));
    if (!text || text.length < 8) return full;
    const fr = translate(text, T, sorted);
    const frAttr = fr !== text ? ` data-lang-fr="${attrEscape(fr)}"` : '';
    attrs = attrs || '';
    return `<div class="describe"${attrs} data-lang-en="${attrEscape(text)}"${frAttr}>${inner}</div>\n\t\t\t<h3`;
  });
}

function annotateTitleAttrs(html) {
  return html.replace(/\s(title)=(["'])([^"']+)\2/gi, (m, attr, q, val) => {
    if (m.includes('data-lang-title-en')) return m;
    const text = norm(val);
    if (!text || text.length < 2) return m;
    const fr = translate(text, T, sorted);
    return ` data-lang-title-en="${attrEscape(text)}" data-lang-title-fr="${attrEscape(fr)}"${m}`;
  });
}

function annotateAltAttrs(html) {
  return html.replace(/\s(alt)=(["'])([^"']+)\2/gi, (m, attr, q, val) => {
    if (m.includes('data-lang-alt-en')) return m;
    const text = norm(val);
    if (!text || text.length < 2) return m;
    const fr = translate(text, T, sorted);
    return ` data-lang-alt-en="${attrEscape(text)}" data-lang-alt-fr="${attrEscape(fr)}"${m}`;
  });
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

const files = walk(root);
let updated = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  if (!inI18nScope(html)) continue;
  if (!ZONE_MARKERS.some((z) => html.includes(z))) continue;
  const before = html;
  html = annotateSimpleTags(html);
  html = annotateTableCells(html);
  html = annotateDescribeBlocks(html);
  html = annotateTitleAttrs(html);
  html = annotateAltAttrs(html);
  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    updated++;
  }
}

console.log('Annotated files:', updated);
// AIGC END
