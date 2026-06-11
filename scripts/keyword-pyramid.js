/**
 * Pyramid keyword strategy: head -> category -> long-tail + brand
 */
const BRAND = 'CHING KING WHALE';
const BRAND_FULL = 'CHING KING WHALE MACHINE GROUP';

const HEAD = ['beverage filling machine', 'filling machine manufacturer', 'beverage machinery'];

const TOP_CATEGORY = {
  'Filling-machine': ['filling machine', 'liquid filling line', 'beverage bottling equipment'],
  'Filling-Auxiliary-Equipment': ['filling auxiliary equipment', 'water treatment equipment', 'beverage processing equipment'],
  'Packaging-Machine': ['packaging machine', 'labeling machine', 'bottle packaging equipment'],
  'Bottle-blowing-Machine': ['bottle blowing machine', 'PET bottle blowing machine', 'blow molding machine'],
  'Fermentation-Machine': ['fermentation machine', 'fermentation tank', 'beverage fermentation equipment'],
  'Noodles-Machine': ['noodle production line', 'instant noodle machine', 'food processing equipment'],
  'Conveying-equipment': ['conveying equipment', 'bottle conveyor', 'production line conveyor'],
  'Marking-machine': ['marking machine', 'coding machine', 'bottle marking equipment'],
  'Purification-system': ['purification system', 'water purification', 'beverage purification equipment'],
  'Packaging-palletizing-machinery': ['palletizing machinery', 'packaging palletizer', 'automatic palletizer'],
  'Auxiliary-machinery': ['auxiliary machinery', 'beverage auxiliary equipment', 'production line auxiliary'],
};

const PRODUCT_LONGTAIL = {
  'can-filling': ['can filling machine', 'canning line', 'beer can filler', 'aluminum can filling machine'],
  'glass-bottle': ['glass bottle filling machine', 'glass bottle filler', 'wine bottle filling machine'],
  'Bottled-water-filling-line': ['bottled water filling line', 'water bottling machine', 'PET water filling line'],
  'Barreled-water-filling-line': ['barreled water filling line', '5 gallon water filling', 'bucket water line'],
  'Juice-filling-line': ['juice filling line', 'fruit juice bottling machine', 'juice production line'],
  'Wine-filling-machine': ['wine filling machine', 'wine bottling line', 'glass wine filler'],
  'Edible-oil-filling-line': ['edible oil filling line', 'oil bottling machine', 'cooking oil filler'],
  'Carbonated-beverage-filling-line': ['carbonated beverage filling line', 'CSD filling machine', 'soda bottling line'],
  'Seasoning-filling-line': ['seasoning filling line', 'sauce filling machine', 'condiment filler'],
  'Water-treatment-equipment': ['water treatment equipment', 'RO water treatment', 'beverage water purification'],
  'Beverage-mixer': ['beverage mixer', 'drink mixing tank', 'beverage blending equipment'],
  'Tubular-sterilizer': ['tubular sterilizer', 'UHT sterilizer', 'beverage sterilization equipment'],
  'Plate-sterilizer': ['plate sterilizer', 'plate heat exchanger', 'beverage pasteurizer'],
  'Bottle-trimmer': ['bottle trimmer', 'bottle neck trimming machine', 'glass bottle processing'],
  'Labeling-machine': ['labeling machine', 'bottle labelling machine', 'self adhesive labeler'],
  labeller: ['labeller', 'labeling machine', 'bottle label applicator'],
  'Laser-jet-printer': ['laser jet printer', 'bottle coding machine', 'industrial inkjet printer'],
  'Film-coating-machine': ['film coating machine', 'shrink wrap machine', 'bottle film wrapper'],
  'Full-automatic-heat-shrinking-packaging-machine': ['heat shrink packaging machine', 'shrink wrapping machine', 'bundle packaging machine'],
  'Semi-automatic-bottle-blowing-machine': ['semi automatic bottle blowing machine', 'PET blow molding machine', 'small bottle blower'],
  'Full-automatic-one-out-four-bottle-blowing-machine': ['4 cavity bottle blowing machine', 'automatic bottle blower', 'PET bottle making machine'],
  'Full-automatic-one-out-six-bottle-blowing-machine': ['6 cavity bottle blowing machine', 'high speed bottle blower', 'PET blow molder'],
  'Instant-noodle-production-line': ['instant noodle production line', 'noodle making machine', 'noodle processing line'],
  'Biological-fermentation-tank': ['biological fermentation tank', 'fermentation vessel', 'stainless fermentation tank'],
  'Mixing-preparation-tank': ['mixing preparation tank', 'blending tank', 'beverage mixing tank'],
  'Multi-stage-fermentation-barrel': ['multi stage fermentation barrel', 'fermentation barrel', 'brewing fermentation tank'],
  'Batching-system': ['batching system', 'ingredient batching', 'automatic batching equipment'],
  'Thermostatic-enzymolysis-tank': ['thermostatic enzymolysis tank', 'enzymolysis tank', 'enzyme reaction tank'],
  'Full-automatic-enzymolysis-tank': ['automatic enzymolysis tank', 'enzyme processing tank', 'food enzymolysis equipment'],
};

const SOLUTION_LONGTAIL = {
  'Juice-filling-line-solution': ['juice filling line solution', 'fruit juice production line', 'juice bottling plant'],
  'water-filling-line-solution': ['water filling line solution', 'bottled water production line', 'water bottling plant'],
  'glass-bottle-wine-filling-line-solution': ['wine filling line solution', 'glass bottle wine line', 'winery bottling equipment'],
  'csd-filling-line-solution': ['CSD filling line solution', 'carbonated drink production line', 'soft drink bottling plant'],
  'can-filling-solution': ['can filling solution', 'canning production line', 'beverage canning plant'],
  'oil-filling-solution': ['oil filling solution', 'edible oil production line', 'oil bottling plant'],
  '5-gallon-filling-line-solution': ['5 gallon filling line', 'barreled water solution', 'water dispenser filling line'],
  '5L-barreled-water-filling-scheme': ['5L barreled water filling', 'bucket water production line', 'barreled water plant'],
  'auec-jam-production-line-souution': ['jam production line', 'sauce production line', 'au ec jam filling solution'],
};

const GENERIC_KEYWORDS =
  'can filling machine,glass bottle filling machine,bottled water filling machine';
const GENERIC_TITLE_SUFFIX =
  /- can filling machine,glass bottle filling machine,bottled water filling machine-CHING KING WHALE/i;

function titleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function slugToName(slug) {
  return titleCase(slug.replace(/-/g, ' '));
}

function extractPageTitle(title) {
  let t = title.split('|')[0].trim();
  const parts = t.split(' - ');
  if (parts.length >= 2 && !/^can filling machine/i.test(parts[0])) return parts[0].trim();
  const m = t.match(/^(.+?)\s*-\s*can filling machine/i);
  if (m) return m[1].trim();
  return t.replace(GENERIC_TITLE_SUFFIX, '').replace(/-CHING KING WHALE.*$/i, '').trim();
}

function uniqueList(items) {
  const seen = new Set();
  return items.filter((k) => {
    const key = k.toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isGenericKeywords(kw) {
  if (!kw) return true;
  if (kw === GENERIC_KEYWORDS) return true;
  if (kw === BRAND_FULL + ' .J S' || kw === BRAND_FULL) return true;
  if (/^KIWL(purewater|PET)/i.test(kw)) return true;
  if (/^CBMPHIAKIWL/i.test(kw)) return true;
  if (/PETbottlefilling/i.test(kw)) return true;
  if (/^关于/.test(kw)) return true;
  if (!kw.includes(' ') && kw.includes(',')) return true;
  return false;
}

function isGenericTitle(title) {
  if (!title) return true;
  if (GENERIC_TITLE_SUFFIX.test(title)) return true;
  if (/^Video&?News\s*-/i.test(title)) return true;
  if (/^Products\s*-/i.test(title)) return true;
  return false;
}

function segmentKeywords(relPath) {
  const norm = relPath.replace(/\\/g, '/');
  const parts = norm.split('/').filter(Boolean);
  const keywords = [...HEAD];
  const pageName = extractPageTitle('');

  if (norm === 'index.html') {
    return uniqueList([
      ...HEAD,
      'glass bottle filling machine',
      'bottled water filling machine',
      'can filling machine',
      'packaging machine',
      'labeling machine',
      'bottle blowing machine',
      BRAND,
      'KIWL',
    ]);
  }

  if (norm === 'products/index.html') {
    return uniqueList([
      ...HEAD,
      'packaging machine',
      'bottle blowing machine',
      'water treatment equipment',
      'turnkey beverage line',
      BRAND,
    ]);
  }

  if (norm.startsWith('products/')) {
    const topCat = parts[1];
    if (TOP_CATEGORY[topCat]) keywords.push(...TOP_CATEGORY[topCat]);
    const leaf = parts.find((p) => PRODUCT_LONGTAIL[p]);
    if (leaf) keywords.push(...PRODUCT_LONGTAIL[leaf]);
    else if (parts.length >= 3 && parts[parts.length - 1] !== 'index.html') {
      const slug = parts[parts.length - 2];
      if (PRODUCT_LONGTAIL[slug]) keywords.push(...PRODUCT_LONGTAIL[slug]);
    } else if (parts[2]) {
      keywords.push(slugToName(parts[2]).toLowerCase(), `${slugToName(parts[2]).toLowerCase()} manufacturer`);
    }
    keywords.push(BRAND, 'KIWL machine');
    return uniqueList(keywords).slice(0, 12);
  }

  if (norm.startsWith('Industrial-applications/')) {
    keywords.push('turnkey filling line', 'beverage production line solution', 'beverage plant solution');
    const leaf = parts.find((p) => SOLUTION_LONGTAIL[p]);
    if (leaf) keywords.push(...SOLUTION_LONGTAIL[leaf]);
    else if (parts[1]) keywords.push(slugToName(parts[1]).toLowerCase(), `${slugToName(parts[1]).toLowerCase()} solution`);
    keywords.push(BRAND);
    return uniqueList(keywords).slice(0, 12);
  }

  if (norm === 'about-us/index.html') {
    return uniqueList([...HEAD, 'beverage machinery manufacturer', 'filling machine factory', 'Zhangjiagang', BRAND]);
  }

  if (norm === 'contact-us/index.html') {
    return uniqueList([...HEAD, 'filling machine quote', 'beverage equipment supplier', 'contact manufacturer', BRAND]);
  }

  if (norm.startsWith('Customer-Case/')) {
    return uniqueList([...HEAD, 'customer case', 'filling line project', 'beverage plant reference', BRAND]);
  }

  if (norm.startsWith('Video-News/')) {
    const pageFile = norm.match(/\/([^/]+)\.html$/);
    const extra = pageFile && norm !== 'Video-News/index.html'
      ? [norm.includes('/video/') ? 'production line video' : 'company news video', `video ${pageFile[1]}`]
      : ['beverage machinery video', 'filling line video', 'company news'];
    return uniqueList([...HEAD, ...extra, BRAND, 'KIWL']);
  }

  if (/^202[3-5]\//.test(norm) || norm.startsWith('News/')) {
    return uniqueList([...HEAD, 'beverage industry news', 'filling machine news', 'packaging machinery news', BRAND, 'KIWL']);
  }

  return uniqueList([...HEAD, BRAND, 'KIWL']).slice(0, 10);
}

function buildPyramidKeywords(relPath, title) {
  const norm = relPath.replace(/\\/g, '/');
  const pageTitle = extractPageTitle(title);
  const base = segmentKeywords(relPath);

  if (/^202[3-5]\//.test(norm) || /\/Company-News\//.test(norm) || /\/Industry-News\//.test(norm)) {
    if (pageTitle && pageTitle.length > 8 && !/^(Company News|Industry News)$/i.test(pageTitle)) {
      const longTail = pageTitle.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
      const words = longTail.split(' ').filter((w) => w.length > 3).slice(0, 4);
      if (words.length) base.unshift(words.join(' '));
    }
  }

  if (norm.startsWith('products/') && pageTitle && !/^Products$/i.test(pageTitle)) {
    const lt = pageTitle.toLowerCase();
    if (!base.some((k) => k.toLowerCase() === lt)) base.splice(3, 0, lt, `${lt} manufacturer`);
  }

  return uniqueList(base).slice(0, 12).join(',');
}

function buildPyramidTitle(relPath, title) {
  const norm = relPath.replace(/\\/g, '/');
  const pageTitle = extractPageTitle(title);
  const parts = norm.split('/').filter(Boolean);

  if (title.includes(BRAND_FULL) && title.includes('|') && !isGenericTitle(title)) {
    const expected = buildPyramidTitleInner(norm, pageTitle, parts);
    if (expected && title.replace(/\s+/g, ' ') === expected.replace(/\s+/g, ' ')) return null;
  }

  return buildPyramidTitleInner(norm, pageTitle, parts);
}

function buildPyramidTitleInner(norm, pageTitle, parts) {
  if (norm === 'index.html') {
    return `Beverage Filling Machine Manufacturer | Bottle & Can Filling Lines | ${BRAND_FULL}`;
  }
  if (norm === 'products/index.html') {
    return `Beverage Filling & Packaging Machines | Product Catalog | ${BRAND_FULL}`;
  }
  if (norm === 'about-us/index.html') {
    return `About Us | Beverage Machinery Manufacturer | ${BRAND_FULL}`;
  }
  if (norm === 'contact-us/index.html') {
    return `Contact Us | Filling Machine Quote | ${BRAND_FULL}`;
  }
  if (norm === 'Industrial-applications/index.html') {
    return `Industry Filling Line Solutions | Turnkey Beverage Plants | ${BRAND_FULL}`;
  }
  if (norm === 'Video-News/index.html') {
    return `Videos & News | Beverage Filling Machinery | ${BRAND_FULL}`;
  }
  if (norm === 'Customer-Case/index.html') {
    return `Customer Cases | Filling Line Projects Worldwide | ${BRAND_FULL}`;
  }

  if (norm.startsWith('products/')) {
    const topCat = parts[1] ? slugToName(parts[1]) : 'Products';
    if (/^products\/[^/]+\/index\.html$/.test(norm)) {
      return `${pageTitle} | ${topCat} | ${BRAND_FULL}`;
    }
    if (/^products\/.+\/index\.html$/.test(norm)) {
      return `${pageTitle} Manufacturer | ${topCat} | ${BRAND_FULL}`;
    }
    const pageNum = norm.match(/\/(\d+)\.html$/);
    if (pageNum) {
      return `${pageTitle} | ${topCat} | Page ${pageNum[1]} | ${BRAND_FULL}`;
    }
    return `${pageTitle} | ${topCat} | ${BRAND_FULL}`;
  }

  if (norm.startsWith('Industrial-applications/')) {
    const solution = parts[1] ? slugToName(parts[1]) : 'Solution';
    if (norm.endsWith('index.html')) {
      return `${pageTitle || solution} | Industry Solution | ${BRAND_FULL}`;
    }
    return `${pageTitle || solution} | Filling Line Solution | ${BRAND_FULL}`;
  }

  if (/^202[3-5]\//.test(norm) && pageTitle) {
    return `${pageTitle} | Beverage Machinery News | ${BRAND_FULL}`;
  }

  if (norm.startsWith('Video-News/') && norm !== 'Video-News/index.html') {
    if (pageTitle && !/^Video&?News$/i.test(pageTitle) && !/^Beverage Machinery Video #/i.test(pageTitle)) {
      return `${pageTitle} | Video & News | ${BRAND_FULL}`;
    }
    const pageFile = norm.match(/\/([^/]+)\.html$/);
    const section = norm.includes('/video/') ? 'Production Line Video' : 'Company News Video';
    if (pageFile) {
      return `${section} #${pageFile[1]} | Beverage Machinery | ${BRAND_FULL}`;
    }
  }

  if (pageTitle) {
    return `${pageTitle} | ${BRAND_FULL}`;
  }

  return null;
}

module.exports = {
  buildPyramidKeywords,
  buildPyramidTitle,
  isGenericKeywords,
  isGenericTitle,
  extractPageTitle,
};
