/**

 * KIWL site i18n: English (default) / French, no page reload.

 * Persists choice in localStorage.

 */

(function (window, document) {

  'use strict';



  var STORAGE_KEY = 'kiwl_lang';

  // AIGC START
  var translations = {
    en: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      industry: 'Industry',
      cases: 'Cases',
      videoNews: 'Video & News',
      contact: 'Contact'
    },
    fr: {
      home: 'Accueil',
      about: 'À propos',
      products: 'Produits',
      industry: 'Industrie',
      cases: 'Cas',
      videoNews: 'Vidéo & Actualités',
      contact: 'Contact'
    }
  };

  function applyDataI18nKeys(lang) {
    var pack = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (pack[key] !== undefined) {
        el.textContent = pack[key];
      }
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      if (pack[key] !== undefined) {
        el.setAttribute('title', pack[key]);
      }
    });
  }

  function switchLanguage(lang) {
    applyLang(lang);
  }
  // AIGC END

  var T = {

    'Home': 'Accueil',

    'About': 'À propos',

    'Products': 'Produits',

    'Industry': 'Industrie',

    'Cases': 'Cas',

    'Video&News': 'Vidéo & Actualités',

    'Video & News': 'Vidéo & Actualités',

    'Contact': 'Contact',

    'Contacts': 'Contacts',

    'Company Profile': 'Profil de l\'entreprise',

    'Company Culture': 'Culture d\'entreprise',

    'Certificate Honor': 'Certificats et distinctions',

    'Factory Photos': 'Photos de l\'usine',

    'Filling Machine': 'Machine de remplissage',

    'Filling Auxiliary Equipment': 'Équipements auxiliaires de remplissage',

    'Packaging Machine': 'Machine d\'emballage',

    'Bottle Blowing Machine': 'Machine de soufflage de bouteilles',

    'Fermentation Machine': 'Machine de fermentation',

    'Noodles Machine': 'Machine à nouilles',

    'Video': 'Vidéo',

    'Company News': 'Actualités de l\'entreprise',

    'Industry News': 'Actualités du secteur',

    'Online Message': 'Message en ligne',

    'Company Map': 'Plan d\'accès',

    'Customer Group Photo': 'Photo de groupe clients',

    'Cooperative brands': 'Marques partenaires',

    'CAN FILLING LINE SOLUTION': 'SOLUTION DE LIGNE DE REMPLISSAGE DE CANETTES',

    'GLASS BOTTLE FILLING LINE SOLUTION': 'SOLUTION DE LIGNE DE REMPLISSAGE EN BOUTEILLE EN VERRE',

    'JUICE PRODUCTION LINE SOLUTION ': 'SOLUTION DE LIGNE DE PRODUCTION DE JUS ',

    'JUICE PRODUCTION LINE SOLUTION': 'SOLUTION DE LIGNE DE PRODUCTION DE JUS',

    'CARBONATED SOFT DRINK PRODUCTION LINE SOLUTION ': 'SOLUTION DE LIGNE DE BOISSONS GAZEUSES ',

    'CARBONATED SOFT DRINK PRODUCTION LINE SOLUTION': 'SOLUTION DE LIGNE DE BOISSONS GAZEUSES',

    'WATER FILLING PRODUCTION LINE SOLUTION': 'SOLUTION DE LIGNE DE PRODUCTION D\'EAU',

    '5 GALLON FILLING LINE SOLUTION': 'SOLUTION DE LIGNE DE REMPLISSAGE 5 GALLONS',

    'SAUCE JAM PRODUCTION LINE SOLUTION': 'SOLUTION DE LIGNE DE PRODUCTION DE SAUCES ET CONFITURES',

    'Oil PRODUCTION LINE SOLUTION': 'SOLUTION DE LIGNE DE PRODUCTION D\'HUILE',

    'About KING WHALE': 'À propos de KING WHALE',

    'Products & services': 'Produits et services',

    'Quick Links': 'Liens rapides',

    'News & information': 'Actualités et informations',

    'Customer case': 'Références clients',

    'Contact us': 'Nous contacter',

    'Message feedback': 'Laisser un message',

    'Site map': 'Plan du site',

    'Contact Us': 'Contactez-nous',

    'Sitemap': 'Plan du site',

    'call us :': 'Appelez-nous :',

    'Email us :': 'Écrivez-nous :',

    'Visit us :': 'Visitez-nous :',

    'Contacts：': 'Contacts :',

    'Mob：': 'Mob. :',

    'Tel：': 'Tél. :',

    'Email：': 'E-mail :',

    'Add：': 'Adr. :',

    'Return to homepage': 'Retour à l\'accueil',

    'Call us': 'Nous appeler',

    'Leave us a message': 'Nous laisser un message',

    'Telephone': 'Téléphone',

    'Message': 'Message',

    'Location：': 'Emplacement :',

    'Beverage Filling and Packing Solution': 'Solutions de remplissage et d\'emballage de boissons',

    'Whole-hearted service, always adhere to customer first': 'Service dévoué, toujours au service du client',

    'Center': 'Centre',

    'Products Center': 'Centre produits',

    'News Center': 'Centre d\'actualités',

    'Read More': 'En savoir plus',

    'Submit': 'Envoyer',

    'Name': 'Nom',

    'Email': 'E-mail',

    'Phone': 'Téléphone',

    'Address': 'Adresse',

    'Mobile:': 'Mobile :',

    'Tel:': 'Tél. :',

    'Fax:': 'Fax :',

    'Previous': 'Précédent',

    'Next': 'Suivant',

    'Search': 'Rechercher',

    'All': 'Tout',

    'Details': 'Détails',

    'Related Products': 'Produits associés',

    'Related News': 'Actualités associées',

    'Product Description': 'Description du produit',

    'Technical Parameters': 'Paramètres techniques',

    'Features': 'Caractéristiques',

    'Application': 'Application',

    'Beverage Filling Machine Production Line': 'Ligne de production de machines de remplissage de boissons',

    'Water treatment equipment': 'Équipement de traitement de l\'eau',

    'Purification system': 'Système de purification',

    'Marking machine': 'Machine de marquage',

    'Packaging palletizing machinery': 'Machines d\'emballage et de palettisation',

    'Plate sterilizer': 'Stérilisateur à plaques',

    'Tubular sterilizer': 'Stérilisateur tubulaire',

    'Beverage mixer': 'Mélangeur de boissons',

    'Bottle trimmer': 'Ébavureur de bouteilles',

    'Labeling machine': 'Machine d\'étiquetage',

    'Labeller': 'Étiqueteuse',

    'Laser jet printer': 'Imprimante laser',

    'Film coating machine': 'Machine d\'enrobage film',

    'Full automatic heat shrinking packaging machine': 'Machine d\'emballage thermorétractable automatique',

    'Instant noodle production line': 'Ligne de production de nouilles instantanées',

    'Bottled water filling line': 'Ligne de remplissage d\'eau en bouteille',

    'Barreled water filling line': 'Ligne de remplissage d\'eau en fût',

    'Carbonated beverage filling line': 'Ligne de remplissage de boissons gazeuses',

    'Juice filling line': 'Ligne de remplissage de jus',

    'Wine filling machine': 'Machine de remplissage de vin',

    'Edible oil filling line': 'Ligne de remplissage d\'huile comestible',

    'Seasoning filling line': 'Ligne de remplissage d\'assaisonnements',

    'Can filling': 'Remplissage de canettes',

    'Glass bottle': 'Bouteille en verre',

    'Location:': 'Emplacement :',

    'Location': 'Emplacement',

    'Products -': 'Produits -',

    'About Us': 'À propos de nous',

    'Industry Application': 'Applications industrielles',

    'Customer Case': 'Références clients',

    'Video & News': 'Vidéo et actualités',

    'Product details': 'Détails du produit',
    '5 gallon drum bottle blower': 'Souffleuse de fûts de 5 gallons',
    'Wide mouth bottle blowing machine': 'Souffleuse de bouteilles à col large',
    'Full-automatic one-out six-bottle blowing machine': 'Souffleuse automatique six cavités',
    'Full-automatic one-out four-bottle blowing machine': 'Souffleuse automatique quatre cavités',
    'Semi-automatic bottle blowing machine': 'Souffleuse semi-automatique',
    'Recommended product': 'Produits recommandés',
    'Product highlights': 'Points forts du produit',
    'Product highlights:': 'Points forts du produit :',
    'Application field': 'Domaines d\'application',
    'Application field:': 'Domaines d\'application :',
    'instructions': 'Instructions',
    'parameter': 'Paramètres',
    'industry': 'Secteurs d\'application',
    'category': 'Catégorie',
    'model number': 'Numéro de modèle',
    'specs': 'Spécifications',
    'High efficiency and energy saving': 'Haute efficacité et économie d\'énergie',
    'High efficiency and energy saving:': 'Haute efficacité et économie d\'énergie :',
    'Precise control': 'Contrôle de précision',
    'Precise control:': 'Contrôle de précision :',
    'High degree of automation': 'Haut degré d\'automatisation',
    'High degree of automation:': 'Haut degré d\'automatisation :',
    'Safety and environmental protection': 'Sécurité et protection de l\'environnement',
    'Safety and environmental protection:': 'Sécurité et protection de l\'environnement :',
    'Easy maintenance': 'Maintenance facilitée',
    'Easy maintenance:': 'Maintenance facilitée :',
    'Flexible customization': 'Personnalisation flexible',
    'Flexible and diverse': 'Flexibilité et polyvalence',
    'Flexible and diverse:': 'Flexibilité et polyvalence :',
    'Excellent quality': 'Qualité exceptionnelle',
    'Efficient production': 'Production efficace',
    'Intelligent control': 'Contrôle intelligent',
    'Environmental protection and energy saving': 'Protection de l\'environnement et économie d\'énergie',
    'blow molding machine': 'machine de soufflage',
    'bottle blowing machine': 'souffleuse de bouteilles',
    'blowing machine': 'souffleuse',
    'wide mouth bottle': 'bouteille à col large',
    'wide mouth bottles': 'bouteilles à col large',
    'production efficiency': 'efficacité de production',
    'after-sales service': 'service après-vente',
    'technical support': 'support technique',

    'Why choose us ?': 'Pourquoi nous choisir ?',

    'Industry Experience': 'Expérience industrielle',

    'One Stop Service': 'Service clé en main',

    'Technological Innovation': 'Innovation technologique',

    'After Service': 'Service après-vente',

    'More About': 'En savoir plus',

    'Learn More +': 'En savoir plus +',

    'Learn More >>': 'En savoir plus >>',

    'Learn More >': 'En savoir plus >',

    'News & Information': 'Actualités et informations',

    'ABOUT KING WHALE': 'À PROPOS DE KING WHALE',

    'view more': 'Voir plus',

    'View more': 'Voir plus',

    '#News information': 'Actualités',

    'We adhere to quality first, service first and continuous innovation': 'Nous privilégions la qualité, le service et l\'innovation continue',

    'Provide various series of bottled water, barreled water, fruit juice, carbonated drinks, alcohol, oil and other filling': 'Séries complètes de lignes de remplissage pour eau en bouteille, eau en fût, jus, boissons gazeuses, alcool, huile, etc.',

    'Provide filling auxiliary equipment, including water treatment equipment, beverage mixer, sterilizer, bottling machine and other equipment': 'Équipements auxiliaires de remplissage : traitement de l\'eau, mélangeur de boissons, stérilisateur, conditionnement, etc.',

    'Provide packaging equipment, including labeling machine, labeling machine, film packaging machine, packaging machine and other series of equipment': 'Équipements d\'emballage : étiqueteuse, ensacheuse, thermorétraction et autres machines de conditionnement',

    'Bottle blowing machine is a kind of equipment that can make plastic particles into hollow containers through blow molding process': 'La souffleuse transforme les granulés plastiques en contenants creux par soufflage',

    'Provide fermentation equipment such as probiotics and lactic acid bacteria': 'Équipements de fermentation pour probiotiques et ferments lactiques',

    'Provide various series of automatic noodle equipment': 'Séries de lignes automatiques pour la production de nouilles',

    'After more than 20 years of equipment manufacturers, a fullset of professional beverage machinery production linesprovide every customer with lifelong equipment services!': 'Plus de 20 ans de fabrication : lignes professionnelles de machines pour boissons et service équipement à vie.',

    'Specializing in the production of food and beverage, beer, mineralwater and other mechanical equipment design and manufacturingthe whole line technology, the whole plant design planning, andinstallation and commissioning technology.': 'Conception et fabrication de lignes complètes pour agroalimentaire, boissons, bière et eau minérale, avec ingénierie clé en main et mise en service.',

    'Focus on intergrated solution for beverage and liquid food, such as mineral water, Juice, carbonated beverage, energy drinks, wine, beer, edible oil, dairy and dauily care products, etc.': 'Solutions intégrées pour boissons et liquides : eau, jus, boissons gazeuses, énergisantes, vin, bière, huiles, produits laitiers et soins.',

    'Choose us to choose quality and trust, and provide customers with various needs': 'Qualité et confiance : nous répondons aux besoins variés de nos clients',

    'model': 'Modèle',

    'productive power': 'Capacité de production',

    'Total power': 'Puissance totale',

    'Total weight': 'Poids total',

    'Overall dimension': 'Dimensions globales',

    'Overall dimensions': 'Dimensions globales'

  };

  // AIGC START — 合并外部法语词典，并按最长匹配翻译长文本
  function mergeExternalDict() {
    if (window.KIWL_PRODUCT_FR) {
      Object.keys(window.KIWL_PRODUCT_FR).forEach(function (k) {
        T[k] = window.KIWL_PRODUCT_FR[k];
      });
    }
  }

  var _sortedKeys = null;

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getSortedKeys() {
    if (!_sortedKeys) {
      _sortedKeys = Object.keys(T).filter(function (k) {
        return k && k.length > 1 && T[k];
      }).sort(function (a, b) {
        return b.length - a.length;
      });
    }
    return _sortedKeys;
  }

  function translateLong(en) {
    if (!en) return en;
    var exact = T[en];
    if (exact) return exact;
    var out = en;
    var keys = getSortedKeys();
    var i;
    for (i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key.length < 3) continue;
      var fr = T[key];
      if (!fr || fr === key) continue;
      out = out.split(key).join(fr);
    }
    // AIGC START — 长文本若仍含大量英文片段，避免英法混杂，保留英文原文
    if (en.length > 80 && out !== en) {
      var leftEn = (out.match(/\b[A-Za-z]{4,}\b/g) || []).length;
      var origEn = (en.match(/\b[A-Za-z]{4,}\b/g) || []).length;
      if (origEn > 4 && leftEn > origEn * 0.45) return en;
    }
    // AIGC END
    return out;
  }

  mergeExternalDict();
  // AIGC END

  var SELECTORS = [

    '#header .nav_size',

    '#header .nav_c_ff',

    '#header .sub_bx dt h1',

    '#header .sub_bx dt p',

    '#header .sub_bx .list h3',

    '#header .sub_bx .list p',

    '#nav dt a',

    '#nav dd a',

    '#footer .top h2',

    '#footer .foot_nav h3 a',

    '#footer .foot_nav li a',

    '#footer .contacts h3',

    '#footer #ft_1 a',

    'footer h4',

    '#index .yingyong .text',

    '#index .title_ys',

    '#index .title_ys_f',

    '#index .text',

    '#index .txt',

    '#index h2',

    '#index h3',

    '#index h4',

    '#index p',

    '#title h1',

    '#title p',

    '#Path_1 span',

    '#Path_1 a',

    '.mid_cont .contacts li',

    '#main h1',

    '#main h2',

    '#main h3',

    '#main h4',

    '#main h5',

    '#main p',

    '#main li',

    '#main dt',

    '#main dd',

    '#main label',

    '#main th',

    '#main td',

    '#main .btn',

    '#main a.btn',

    '.pro_list h3',

    '.list_pro h3',

    '.news_list h3',

    '.pro_text h1',

    '.pro_text h2',

    '.pro_text h3',

    '.pro_text p',

    '.foot_fixed a',

    '.pagination a',

    'input[type=submit]',

    'button[type=submit]',
    '#title_s h1',
    '.content_pd h2',
    '.content_pd h3',
    '.content_pd h4',
    '.content_pd .describe',
    '#pd-Recommend h3',
    '.content_pd .pd_bx h4',
    '.content_pd .pd_bx p',
    '#index .products .title h2',
    '#index .products .title p',
    '#index .products .list h2',
    '#index .products .list h2 a',
    '#index .products .list p',
    '#index .products a.more',
    '.products .list_bx .txt h2',
    '.products .list_bx .txt h2 a',
    '.products .list_bx .txt p',
    '#neiye_bx .products h2 a',
    '#title_s h1',
    '#title h1 .f1'

  ].join(',');



  var SCAN_ROOTS = '#index, #main, .mid_cont, #title, #Path_1, .content_pd, #neiye_bx, #header, #footer, footer, .youshi, .about, .news';



  function norm(s) {

    return (s || '').replace(/\s+/g, ' ').trim();

  }



  function translate(en, lang) {

    if (lang === 'en' || !en) return en;

    if (T[en]) return T[en];

    if (en.indexOf('- ') === 0) {

      var inner = en.slice(2);

      if (T[inner]) return '- ' + T[inner];

    }

    return translateLong(en);

  }



  function hasElementChildren(el) {

    var i;

    for (i = 0; i < el.children.length; i++) {

      if (el.children[i].tagName !== 'BR') return true;

    }

    return false;

  }



  function capture(el) {

    if (!el || el.closest('script, style, noscript')) return;

    var text = norm(el.textContent);

    if (!text || el.querySelector('img:only-child')) return;

    if (hasElementChildren(el) && el.tagName !== 'A') return;

    if (!el.getAttribute('data-i18n-en')) {

      el.setAttribute('data-i18n-en', text);

    }

    if (!el.getAttribute('data-lang-en') && !el.getAttribute('data-lang-rich')) {

      el.setAttribute('data-lang-en', text);

    }

    if (!el.getAttribute('data-lang-fr')) {

      var frText = translateLong(text);

      if (frText && frText !== text) {

        el.setAttribute('data-lang-fr', frText);

      }

    }

    var title = el.getAttribute('title');

    if (title && !el.getAttribute('data-i18n-title-en')) {

      el.setAttribute('data-i18n-title-en', title);

    }

    if (title && !el.getAttribute('data-lang-title-fr')) {

      var frTitle = translateLong(title);

      if (frTitle && frTitle !== title) {

        el.setAttribute('data-lang-title-en', title);

        el.setAttribute('data-lang-title-fr', frTitle);

      }

    }

    if (el.tagName === 'IMG') {

      var alt = el.getAttribute('alt');

      if (alt && !el.getAttribute('data-i18n-alt-en')) {

        el.setAttribute('data-i18n-alt-en', alt);

      }

      if (alt && !el.getAttribute('data-lang-alt-fr')) {

        var frAlt = translateLong(alt);

        if (frAlt && frAlt !== alt) {

          el.setAttribute('data-lang-alt-en', alt);

          el.setAttribute('data-lang-alt-fr', frAlt);

        }

      }

    }

  }



  function captureAll() {

    var nodes = document.querySelectorAll(SELECTORS);

    var i;

    for (i = 0; i < nodes.length; i++) {

      capture(nodes[i]);

    }

    document.querySelectorAll(SCAN_ROOTS).forEach(function (root) {

      root.querySelectorAll('h1,h2,h3,h4,h5,p,li,dt,dd,label,th,td,a,span,button,input[type=submit]').forEach(capture);

    });

    document.querySelectorAll('[data-i18n]').forEach(capture);

    document.querySelectorAll('img[alt]').forEach(function (img) {

      if (img.closest('#header, #nav, #footer, footer, #main, #index, .mid_cont')) {

        capture(img);

      }

    });

    // AIGC START — 产品详情：描述块与参数表单元格
    document.querySelectorAll('.content_pd .describe').forEach(function (el) {

      var text = norm(el.textContent);

      if (!text) return;

      if (!el.getAttribute('data-lang-en')) el.setAttribute('data-lang-en', text);

      if (!el.getAttribute('data-lang-fr')) {

        var frD = translateLong(text);

        if (frD !== text) el.setAttribute('data-lang-fr', frD);

      }

    });

    document.querySelectorAll('.content_pd .content th, .content_pd .content td, .content_pd .content p, .content_pd .content li').forEach(capture);

    // AIGC END

  }



  function decodeAttr(s) {

    if (!s) return '';

    var t = s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

    t = t.replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(parseInt(n, 10)); });

    t = t.replace(/&#x([0-9a-fA-F]+);/g, function (_, h) { return String.fromCharCode(parseInt(h, 16)); });

    return t;

  }



  function applyElementLang(el, lang) {

    if (el.getAttribute('data-lang-rich') === '1') {

      var enHtml = el.getAttribute('data-lang-en-html');

      var frHtml = el.getAttribute('data-lang-fr-html');

      if (lang === 'fr' && frHtml) {

        el.innerHTML = decodeAttr(frHtml);

      } else if (enHtml) {

        el.innerHTML = decodeAttr(enHtml);

      }

      return;

    }

    var en = el.getAttribute('data-lang-en');

    var fr = el.getAttribute('data-lang-fr');

    if (en) {

      var display = lang === 'fr' ? (fr || translateLong(en)) : en;

      display = decodeAttr(display);

      if (el.children.length > 0) {

        var i;

        for (i = 0; i < el.childNodes.length; i++) {

          if (el.childNodes[i].nodeType === 3 && norm(el.childNodes[i].textContent)) {

            el.childNodes[i].textContent = display;

          }

        }

      } else {

        el.textContent = display;

      }

      return;

    }

    if (el.getAttribute('data-i18n-en')) {

      var key = el.getAttribute('data-i18n-en');

      el.textContent = lang === 'fr' ? translateLong(key) : key;

    }

  }



  function applyLang(lang) {

    lang = lang === 'fr' ? 'fr' : 'en';

    document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';

    document.body.classList.toggle('lang-fr', lang === 'fr');

    document.body.classList.toggle('lang-en', lang === 'en');



    document.querySelectorAll('[data-lang-en], [data-lang-rich]').forEach(function (el) {

      applyElementLang(el, lang);

    });



    document.querySelectorAll('[data-i18n-en]').forEach(function (el) {

      if (!el.getAttribute('data-lang-en')) {

        applyElementLang(el, lang);

      }

    });



    document.querySelectorAll('[data-lang-title-en]').forEach(function (el) {

      var en = el.getAttribute('data-lang-title-en');

      var fr = el.getAttribute('data-lang-title-fr');

      el.setAttribute('title', lang === 'fr' ? (fr || translateLong(en)) : en);

    });



    document.querySelectorAll('[data-i18n-title-en]').forEach(function (el) {

      if (!el.getAttribute('data-lang-title-en')) {

        var enT = el.getAttribute('data-i18n-title-en');

        el.setAttribute('title', lang === 'fr' ? (T[enT] || enT) : enT);

      }

    });



    document.querySelectorAll('[data-lang-alt-en]').forEach(function (el) {

      var en = el.getAttribute('data-lang-alt-en');

      var fr = el.getAttribute('data-lang-alt-fr');

      el.setAttribute('alt', lang === 'fr' ? (fr || translateLong(en)) : en);

    });



    document.querySelectorAll('[data-i18n-alt-en]').forEach(function (el) {

      if (!el.getAttribute('data-lang-alt-en')) {

        var enA = el.getAttribute('data-i18n-alt-en');

        el.setAttribute('alt', lang === 'fr' ? (T[enA] || enA) : enA);

      }

    });



    var titleEl = document.querySelector('title[data-lang-en]');

    if (titleEl) {

      var tEn = titleEl.getAttribute('data-lang-en');

      var tFr = titleEl.getAttribute('data-lang-fr');

      document.title = lang === 'fr' ? (tFr || tEn) : tEn;

    }



    document.querySelectorAll('meta[name="description"][data-lang-en]').forEach(function (meta) {

      var mEn = meta.getAttribute('data-lang-en');

      var mFr = meta.getAttribute('data-lang-fr');

      meta.setAttribute('content', lang === 'fr' ? (mFr || mEn) : mEn);

    });



    document.querySelectorAll('.lang-btn').forEach(function (btn) {

      var active = btn.getAttribute('data-lang') === lang;

      btn.classList.toggle('is-active', active);

      btn.setAttribute('aria-pressed', active ? 'true' : 'false');

    });



    try {

      localStorage.setItem(STORAGE_KEY, lang);

    } catch (e) {}

    applyDataI18nKeys(lang);

  }



  function bindSwitcher() {

    document.querySelectorAll('.lang-btn').forEach(function (btn) {

      btn.addEventListener('click', function (e) {

        e.preventDefault();

        e.stopPropagation();

        var lang = btn.getAttribute('data-lang');

        if (lang) applyLang(lang);

      });

    });

  }



  function init() {

    mergeExternalDict();

    _sortedKeys = null;

    captureAll();

    var saved = 'en';

    try {

      saved = localStorage.getItem(STORAGE_KEY) || 'en';

    } catch (e) {}

    if (saved === 'fr') applyLang('fr');

    else applyLang('en');

    bindSwitcher();

  }



  if (document.readyState === 'loading') {

    document.addEventListener('DOMContentLoaded', init);

  } else {

    init();

  }



  window.KIWL_I18N = {
    applyLang: applyLang,
    switchLanguage: switchLanguage,
    translations: translations,
    T: T,
    captureAll: captureAll,
    translate: translate
  };
  window.switchLanguage = switchLanguage;

})(window, document);



