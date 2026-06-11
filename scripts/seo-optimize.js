/**
 * SEO optimization: canonical, domain cleanup, meta, schema, sitemaps
 */
const fs = require('fs');
const path = require('path');
const {
  buildPyramidKeywords,
  buildPyramidTitle,
  isGenericKeywords,
  isGenericTitle,
} = require('./keyword-pyramid');

const ROOT = path.resolve(__dirname, '..');
const SITE_BASE = 'https://www.kiwlmachine.com';
const GENERIC_DESC =
  'CHING KING WHALE MACHINE GROUP .J S is a professional manufacturer with over 20 years of experience in beverage machinery manufacturing. It can provide you with satisfactory solutions for filling products such as water, fruit juice, wine, oil, etc.';
const SKIP_DIRS = new Set(['neirongtuisong', 'scripts', 'node_modules', '.git']);

const PATH_ALIASES = {
  'products/': 'products/',
  'Products/': 'products/',
  'contacts/': 'contact-us/',
  'Contacts/': 'contact-us/',
  'contact-us/': 'contact-us/',
  'Contact-Us/': 'contact-us/',
  'about-us/': 'about-us/',
  'About-Us/': 'about-us/',
  'news/': 'News/',
  'News/': 'News/',
  'customer-case/': 'Customer-Case/',
  'Customer-case/': 'Customer-Case/',
  'video/': 'Video-News/',
  'Video-News/': 'Video-News/',
};

function walkHtml(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (!SKIP_DIRS.has(name)) walkHtml(full, files);
    } else if (name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function rootPrefix(relPath) {
  const dir = path.dirname(relPath);
  if (!dir || dir === '.') return './';
  const depth = dir.split(/[/\\]/).filter(Boolean).length;
  return '../'.repeat(depth);
}

function canonicalUrl(relPath) {
  const p = relPath.replace(/\\/g, '/');
  return p === 'index.html' ? `${SITE_BASE}/` : `${SITE_BASE}/${p}`;
}

function resolveRelativePath(fromDir, target) {
  const parts = fromDir.replace(/\\/g, '/').split('/').filter(Boolean);
  for (const seg of target.replace(/\\/g, '/').split('/')) {
    if (seg === '..') parts.pop();
    else if (seg !== '.' && seg !== '') parts.push(seg);
  }
  return parts.join('/') || 'index.html';
}

function normalizeSitePath(urlPath) {
  let p = urlPath.replace(/^\/+/, '');
  for (const [from, to] of Object.entries(PATH_ALIASES)) {
    if (p.toLowerCase().startsWith(from.toLowerCase())) {
      p = to + p.slice(from.length);
      break;
    }
  }
  if (!p || p === 'index.html') return 'index.html';
  if (!p.endsWith('.html') && !p.includes('?')) {
    p = p.endsWith('/') ? p + 'index.html' : p + '/index.html';
  }
  return p;
}

function fixDomains(html, prefix) {
  let c = html;
  c = c.replace(/https?:\/\/xzj\.rfkjcs\.com\/statics\//gi, prefix + 'statics/');
  c = c.replace(/https?:\/\/xzj\.rfkjcs\.com\/uploadfile\//gi, prefix + 'uploadfile/');
  c = c.replace(/https?:\/\/www\.kiwlmachine\.com\/statics\//gi, prefix + 'statics/');
  c = c.replace(/https?:\/\/www\.kiwlmachine\.com\/uploadfile\//gi, prefix + 'uploadfile/');

  c = c.replace(/https?:\/\/(?:xzj\.rfkjcs\.com|www\.kiwlmachine\.com)(\/[^"'\s>]*)?/gi, (match, urlPath) => {
    if (!urlPath) return prefix + 'index.html';
    const [pathname, query] = urlPath.split('?');
    const normalized = normalizeSitePath(pathname);
    return prefix + normalized + (query ? '?' + query : '');
  });

  return c.replace(new RegExp(prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '+', 'g'), prefix);
}

function titleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractArticleTitle(title) {
  const parts = title.split(' - ');
  if (parts.length >= 2 && !/^can filling machine/i.test(parts[0])) {
    return parts[0].trim();
  }
  const m = title.match(/^(.+?)\s*-\s*can filling machine/i);
  if (m) return m[1].trim();
  return title.replace(/-CHING KING WHALE.*$/i, '').trim();
}

function productName(relPath, title) {
  const m = title.match(/^(.+?)\s*-\s*can filling machine/i);
  if (m) return m[1].trim();
  const parts = relPath.replace(/\\/g, '/').split('/');
  const seg = [...parts].reverse().find((p) => p && p !== 'index.html' && !/^\d+\.html$/.test(p));
  return seg ? titleCase(seg.replace(/-/g, ' ')) : 'Beverage Machinery';
}

function isGenericDescription(desc) {
  if (!desc || desc.length < 15) return true;
  if (desc === GENERIC_DESC) return true;
  if (/^CHING KING WHALE MACHINE GROUP .J S the main products/i.test(desc)) return true;
  if (/^Jiangsu Xinzijing/i.test(desc)) return true;
  if (/^关于/.test(desc)) return true;
  if (/\s{2,}$/.test(desc)) return true;
  if (desc.length < 90 && /\.\.\.$/.test(desc.trim())) return true;
  if (/^Videos and news: Video&?News/i.test(desc)) return true;
  if (/^Company News \| News from/i.test(desc)) return true;
  return false;
}

function uniqueDescription(relPath, title, curDesc) {
  const norm = relPath.replace(/\\/g, '/');
  if (!isGenericDescription(curDesc) && curDesc.length >= 100) return null;

  const articleTitle = extractArticleTitle(title);
  const name = productName(relPath, title);

  if (/^202[3-5]\//.test(norm) || /^News\//.test(norm) || /\/Company-News\//.test(norm) || /\/Industry-News\//.test(norm)) {
    const isGenericNewsTitle = !articleTitle || /^(Company News|Industry News|News)$/i.test(articleTitle);
    if (isGenericNewsTitle && /index\.html$/.test(norm)) {
      const section = norm.includes('Industry') ? 'Industry news' : 'Company news';
      return `${section} archive from CHING KING WHALE MACHINE GROUP - beverage filling machinery news and updates.`;
    }
    const snippet = articleTitle.length > 120 ? articleTitle.slice(0, 117) + '...' : articleTitle;
    return `${snippet} | News from CHING KING WHALE MACHINE GROUP - beverage filling machinery manufacturer.`;
  }

  if (norm.startsWith('Video-News/')) {
    if (norm === 'Video-News/index.html') {
      return 'Videos and company news from CHING KING WHALE MACHINE GROUP - beverage filling line demonstrations and industry updates.';
    }
    const pageFile = norm.match(/\/([^/]+)\.html$/);
    const isGenericVideoTitle = !articleTitle || /^Video&?News$/i.test(articleTitle);
    if (isGenericVideoTitle && pageFile) {
      const section = norm.includes('/video/') ? 'Production line video' : 'Company news video';
      return `${section} #${pageFile[1]} from CHING KING WHALE MACHINE GROUP - beverage filling machinery demonstrations and updates.`;
    }
    return `Videos and news: ${articleTitle} - CHING KING WHALE beverage filling machinery manufacturer.`;
  }

  if (norm.startsWith('about-us/')) {
    if (norm.includes('gong-chang-huan-jing')) {
      return 'Factory photos and production facilities of CHING KING WHALE MACHINE GROUP - beverage filling equipment manufacturer in Jiangsu, China.';
    }
    if (norm.includes('qi-ye-jian-jie')) {
      return 'Company profile of CHING KING WHALE MACHINE GROUP - 20+ years experience in beverage filling machinery manufacturing.';
    }
    if (norm.includes('qi-ye-wen-hua')) {
      return 'Company culture and values of CHING KING WHALE MACHINE GROUP - dedicated beverage machinery manufacturer serving global customers.';
    }
    if (norm.includes('rong-yu-zi-zhi')) {
      return 'Certificates and honors of CHING KING WHALE MACHINE GROUP - trusted beverage filling machine manufacturer.';
    }
    return 'About CHING KING WHALE MACHINE GROUP - professional beverage machinery manufacturer with 20+ years of industry experience.';
  }

  if (norm.startsWith('Customer-Case/')) {
    return `Customer case: ${name} - successful beverage filling line projects by CHING KING WHALE MACHINE GROUP worldwide.`;
  }

  if (norm.startsWith('products/') && norm !== 'products/index.html') {
    const pageNum = norm.match(/\/(\d+)\.html$/);
    const suffix = pageNum ? ` (Page ${pageNum[1]})` : '';
    return `Professional ${name}${suffix} from CHING KING WHALE MACHINE GROUP - 20+ years beverage machinery manufacturing. Custom filling line solutions for water, juice, wine, oil and more.`;
  }

  if (norm.startsWith('Industrial-applications/')) {
    return `Complete ${name} for beverage production plants. CHING KING WHALE provides turnkey filling line design, installation and commissioning worldwide.`;
  }

  if (norm === 'contact-us/index.html') {
    return 'Contact CHING KING WHALE MACHINE GROUP for beverage filling machine quotes. Tel: +86-18551189248, email: cathy@kiwlmachine.com.';
  }

  if (norm === 'products/index.html') {
    return 'Browse beverage filling machines, packaging equipment and turnkey production lines from CHING KING WHALE MACHINE GROUP - 20+ years manufacturing experience.';
  }

  if (isGenericDescription(curDesc) && articleTitle) {
    return `${articleTitle} - CHING KING WHALE MACHINE GROUP, professional beverage filling machinery manufacturer.`;
  }

  return null;
}

function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${url}">`;
  if (/<link\s+rel="canonical"/i.test(html)) {
    return html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, tag);
  }
  if (/<meta\s+name="viewport"/i.test(html)) {
    return html.replace(/(<meta\s+name="viewport"[^>]*>)/i, `$1\n${tag}`);
  }
  return html.replace(/<head[^>]*>/i, (m) => m + '\n' + tag);
}

function setDescription(html, desc) {
  const safe = desc.replace(/"/g, '&quot;');
  const tag = `<meta name="description" content="${safe}">`;
  if (/<meta\s+name="description"/i.test(html)) {
    return html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, tag);
  }
  return html.replace(/(<meta\s+name="keywords"[^>]*>)/i, `$1\n${tag}`);
}

function setHtmlLang(html) {
  return html.replace(/<html([^>]*)>/i, (m, attrs) => {
    const cleaned = attrs.replace(/\slang="[^"]*"/gi, '');
    return `<html lang="en"${cleaned}>`;
  });
}

function setKeywords(html, kw) {
  const tag = `<meta name="keywords" content="${kw.replace(/"/g, '&quot;')}">`;
  if (/<meta\s+name="keywords"/i.test(html)) {
    return html.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i, tag);
  }
  return html.replace(/(<title>[^<]*<\/title>)/i, `$1\n${tag}`);
}

function setTitle(html, newTitle) {
  const safe = newTitle.replace(/</g, '');
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${safe}</title>`);
}

function setRobotsNoindex(html) {
  if (/<meta\s+name="robots"/i.test(html)) {
    return html.replace(/<meta\s+name="robots"\s+content="[^"]*"/i, '<meta name="robots" content="noindex, follow"');
  }
  return html.replace(/<head[^>]*>/i, (m) => m + '\n<meta name="robots" content="noindex, follow">');
}

function removeSchema(html) {
  return html.replace(/\s*<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '');
}

function removeOpenGraph(html) {
  return html.replace(/\s*<meta\s+property="og:[^>]+>/gi, '');
}

function openGraphTags(title, desc, url) {
  const esc = (s) => s.replace(/"/g, '&quot;');
  const cleanTitle = extractArticleTitle(title).slice(0, 100);
  return [
    '<meta property="og:type" content="website">',
    `<meta property="og:title" content="${esc(cleanTitle)}">`,
    `<meta property="og:description" content="${esc(desc.slice(0, 200))}">`,
    `<meta property="og:url" content="${url}">`,
    '<meta property="og:site_name" content="CHING KING WHALE MACHINE GROUP">',
  ].join('\n');
}

function setOpenGraph(html, tags) {
  html = removeOpenGraph(html);
  if (/<link\s+rel="canonical"/i.test(html)) {
    return html.replace(/(<link\s+rel="canonical"[^>]*>)/i, `$1\n${tags}`);
  }
  return html.replace(/<\/head>/i, tags + '\n</head>');
}

const ORG_SCHEMA = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CHING KING WHALE MACHINE GROUP .J S",
  "url": "https://www.kiwlmachine.com",
  "logo": "https://www.kiwlmachine.com/statics/images/inc_tp_tel1.png",
  "description": "Professional beverage machinery manufacturer with 20+ years experience in filling lines for water, juice, wine, oil and more.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+86-18551189248",
    "contactType": "sales",
    "email": "cathy@kiwlmachine.com",
    "availableLanguage": ["English", "French"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Building 4, Xingyuan Road, Nanfeng Town",
    "addressLocality": "Zhangjiagang City",
    "addressRegion": "Jiangsu Province",
    "addressCountry": "CN"
  }
}
</script>`;

function productSchema(name, desc, url) {
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "${esc(name)}",
  "description": "${esc(desc)}",
  "url": "${url}",
  "brand": { "@type": "Brand", "name": "CHING KING WHALE" },
  "manufacturer": {
    "@type": "Organization",
    "name": "CHING KING WHALE MACHINE GROUP .J S",
    "url": "https://www.kiwlmachine.com"
  }
}
</script>`;
}

function articleSchema(headline, desc, url) {
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\s+/g, ' ').trim();
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${esc(headline)}",
  "description": "${esc(desc.slice(0, 300))}",
  "url": "${url}",
  "publisher": {
    "@type": "Organization",
    "name": "CHING KING WHALE MACHINE GROUP .J S",
    "url": "https://www.kiwlmachine.com"
  }
}
</script>`;
}

function isMainSitePage(html) {
  return html.includes('id="header"') && html.includes('jquery-1.10.2');
}

function isRedirectPage(html) {
  return /http-equiv="refresh"/i.test(html) && !isMainSitePage(html);
}

function resolveRedirectCanonical(relPath, html) {
  const m = html.match(/http-equiv="refresh"\s+content="[^"]*url=([^"'>]+)/i);
  if (!m) return null;
  let target = m[1].trim();
  if (/^https?:\/\//i.test(target)) return target.replace(/\/$/, '') || SITE_BASE + '/';
  const dir = path.dirname(relPath).replace(/\\/g, '/');
  const resolved = resolveRelativePath(dir === '.' ? '' : dir, target);
  return canonicalUrl(resolved);
}

function sitemapPriority(relPath) {
  const p = relPath.replace(/\\/g, '/');
  if (p === 'index.html') return '1.0';
  if (['products/index.html', 'contact-us/index.html', 'about-us/index.html'].includes(p)) return '0.9';
  if (/^products\/[^/]+\/index\.html$/.test(p)) return '0.8';
  if (/^products\/.+\/index\.html$/.test(p)) return '0.7';
  if (/^Industrial-applications\/.+\/index\.html$/.test(p)) return '0.7';
  if (/\/(2|3|4|5)\.html$/.test(p)) return '0.4';
  if (/^202[3-5]\//.test(p)) return '0.5';
  return '0.6';
}

function includeInSitemap(html, relPath) {
  if (relPath.includes('neirongtuisong')) return false;
  if (isRedirectPage(html)) return false;
  if (!isMainSitePage(html)) return false;
  return true;
}

function isArticlePage(norm) {
  return (
    /^202[3-5]\//.test(norm) ||
    /^News\//.test(norm) ||
    /\/Company-News\//.test(norm) ||
    /\/Industry-News\//.test(norm)
  );
}

const stats = { domain: 0, changed: 0, meta: 0, schema: 0, lang: 0, og: 0, redirect: 0, excluded: 0, keywords: 0, titles: 0 };
const sitemapUrls = [];
const files = walkHtml(ROOT);

for (const full of files) {
  const rel = path.relative(ROOT, full).replace(/\\/g, '/');
  let html = fs.readFileSync(full, 'utf8');
  const orig = html;
  const prefix = rootPrefix(rel);
  let canonical = canonicalUrl(rel);

  if (/xzj\.rfkjcs\.com|www\.kiwlmachine\.com/i.test(html)) {
    html = fixDomains(html, prefix);
    stats.domain++;
  }

  const langBefore = html;
  html = setHtmlLang(html);
  if (html !== langBefore) stats.lang++;

  if (isRedirectPage(html)) {
    const target = resolveRedirectCanonical(rel, html);
    if (target) {
      canonical = target;
      stats.redirect++;
    }
    html = setCanonical(html, canonical);
    html = setRobotsNoindex(html);
  } else {
    html = setCanonical(html, canonical);
  }

  const titleM = html.match(/<title>([^<]*)<\/title>/i);
  let title = titleM ? titleM[1].trim() : '';
  const descM = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  let curDesc = descM ? descM[1] : '';
  const newDesc = uniqueDescription(rel, title, curDesc);
  if (newDesc) {
    html = setDescription(html, newDesc);
    curDesc = newDesc;
    stats.meta++;
  }

  if (!isRedirectPage(html)) {
    const kwM = html.match(/<meta\s+name="keywords"\s+content="([^"]*)"/i);
    const curKw = kwM ? kwM[1] : '';
    if (isGenericKeywords(curKw) || isMainSitePage(html)) {
      const newKw = buildPyramidKeywords(rel, title);
      if (newKw && newKw !== curKw) {
        html = setKeywords(html, newKw);
        stats.keywords++;
      }
    }
    const newTitle = buildPyramidTitle(rel, title);
    if (newTitle && newTitle !== title) {
      html = setTitle(html, newTitle);
      title = newTitle;
      stats.titles++;
    }
  }

  if (isMainSitePage(html) && !isRedirectPage(html)) {
    const ogBefore = html;
    html = setOpenGraph(html, openGraphTags(title, curDesc || GENERIC_DESC, canonical));
    if (html !== ogBefore) stats.og++;
  }

  html = removeSchema(html);
  const norm = rel.replace(/\\/g, '/');
  if (norm === 'index.html') {
    html = html.replace(/<\/head>/i, ORG_SCHEMA + '\n</head>');
    stats.schema++;
  } else if (/^products\/.+\/index\.html$/.test(norm) && norm !== 'products/index.html') {
    const pname = productName(rel, title);
    html = html.replace(/<\/head>/i, productSchema(pname, curDesc || GENERIC_DESC, canonical) + '\n</head>');
    stats.schema++;
  } else if (isMainSitePage(html) && isArticlePage(norm) && !/\/index\.html$/.test(norm)) {
    const headline = extractArticleTitle(title);
    html = html.replace(/<\/head>/i, articleSchema(headline, curDesc || headline, canonical) + '\n</head>');
    stats.schema++;
  }

  if (html !== orig) {
    fs.writeFileSync(full, html, 'utf8');
    stats.changed++;
  }

  if (includeInSitemap(html, rel)) {
    sitemapUrls.push({ loc: canonicalUrl(rel), priority: sitemapPriority(rel) });
  } else {
    stats.excluded++;
  }
}

const today = new Date().toISOString().slice(0, 10);
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapUrls
    .sort((a, b) => a.loc.localeCompare(b.loc))
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    ),
  '</urlset>',
].join('\n');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');

function listSection(dirName) {
  const dir = path.join(ROOT, dirName);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(dir, d.name, 'index.html')))
    .map((d) => `${dirName}/${d.name}/index.html`);
}

const sections = [
  ['Main', ['index.html', 'about-us/index.html', 'products/index.html', 'contact-us/index.html']],
  ['Products', listSection('products')],
  ['Industry Solutions', listSection('Industrial-applications')],
  ['News & Media', ['News/index.html', 'Video-News/index.html', 'Customer-Case/index.html']],
];

let sitemapHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Sitemap - CHING KING WHALE MACHINE GROUP</title>
<meta name="description" content="Complete sitemap of CHING KING WHALE MACHINE GROUP website.">
<link rel="canonical" href="${SITE_BASE}/sitemap.html">
<style>
body{font-family:Arial,sans-serif;max-width:960px;margin:40px auto;padding:0 20px;color:#333;line-height:1.6}
h1{color:#1a5276;border-bottom:2px solid #1a5276;padding-bottom:10px}
h2{color:#2874a6;margin-top:30px}
ul{column-count:2;column-gap:40px}
a{color:#1a5276;text-decoration:none}
a:hover{text-decoration:underline}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #ddd;font-size:14px;color:#666}
</style>
</head>
<body>
<h1>Site Map</h1>
<p>XML sitemap: <a href="sitemap.xml">sitemap.xml</a> (${sitemapUrls.length} quality pages indexed).</p>
`;

for (const [secTitle, links] of sections) {
  if (!links.length) continue;
  sitemapHtml += `<h2>${secTitle}</h2>\n<ul>\n`;
  for (const l of links) {
    const label = l === 'index.html' ? 'Home' : productName(l, '');
    sitemapHtml += `  <li><a href="${l}">${label}</a></li>\n`;
  }
  sitemapHtml += '</ul>\n';
}

sitemapHtml += `<div class="footer">
  <a href="index.html">Home</a> |
  <a href="products/index.html">Products</a> |
  <a href="contact-us/index.html">Contact Us</a>
</div>
</body>
</html>`;
fs.writeFileSync(path.join(ROOT, 'sitemap.html'), sitemapHtml, 'utf8');

console.log('SEO optimization complete:');
console.log(`  Files written: ${stats.changed}`);
console.log(`  lang="en" added: ${stats.lang}`);
console.log(`  Meta descriptions updated: ${stats.meta}`);
console.log(`  Pyramid keywords updated: ${stats.keywords}`);
console.log(`  Pyramid titles updated: ${stats.titles}`);
console.log(`  Open Graph tags: ${stats.og}`);
console.log(`  Schema.org pages: ${stats.schema}`);
console.log(`  Redirect canonicals fixed: ${stats.redirect}`);
console.log(`  Pages excluded from sitemap: ${stats.excluded}`);
console.log(`  Sitemap URLs: ${sitemapUrls.length}`);
