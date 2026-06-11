/**
 * KIWL floating chat widget — EN/FR, WhatsApp with page context
 */
(function (window, document) {
  'use strict';

  var WA_PHONE = '8617751189576';
  var STORAGE_KEY = 'kiwl_lang';

  var TEXT = {
    en: {
      agentName: 'KIWL Support',
      agentStatus: 'Online · Sales team',
      greet: 'Hello! Welcome to CHING KING WHALE MACHINE GROUP 👋',
      intro:
        'We are a professional beverage machinery manufacturer with over 20 years of experience. We provide filling lines for water, juice, wine, oil, carbonated drinks and turnkey plant solutions worldwide.',
      pageIntro: 'I see you are viewing:',
      pageHelp: 'We can provide specifications, pricing and custom solutions for this product or application.',
      waPrompt: 'For a quick quote, chat with our sales manager on WhatsApp:',
      waBtn: 'Chat on WhatsApp',
      waNote: 'Your page link will be sent automatically so we know what you need.',
      userHi: 'Hi, I would like more information.',
    },
    fr: {
      agentName: 'Support KIWL',
      agentStatus: 'En ligne · Équipe commerciale',
      greet: 'Bonjour ! Bienvenue chez CHING KING WHALE MACHINE GROUP 👋',
      intro:
        'Nous sommes un fabricant professionnel de machines pour boissons avec plus de 20 ans d\'expérience. Nous fournissons des lignes de remplissage pour l\'eau, les jus, le vin, l\'huile, les boissons gazeuses et des solutions clés en main dans le monde entier.',
      pageIntro: 'Je vois que vous consultez :',
      pageHelp:
        'Nous pouvons vous fournir des spécifications, des prix et des solutions sur mesure pour ce produit ou cette application.',
      waPrompt: 'Pour un devis rapide, contactez notre responsable commercial sur WhatsApp :',
      waBtn: 'Discuter sur WhatsApp',
      waNote: 'Le lien de votre page sera envoyé automatiquement pour que nous sachions ce dont vous avez besoin.',
      userHi: 'Bonjour, je souhaite obtenir plus d\'informations.',
    },
  };

  var state = {
    lang: 'en',
    open: false,
    started: false,
    messagesEl: null,
  };

  function getLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'fr' ? 'fr' : 'en';
    } catch (e) {
      return 'en';
    }
  }

  function t(key) {
    var pack = TEXT[state.lang] || TEXT.en;
    return pack[key] || TEXT.en[key] || '';
  }

  function getPageContext() {
    var og = document.querySelector('meta[property="og:title"]');
    var title = og && og.getAttribute('content')
      ? og.getAttribute('content').trim()
      : document.title.split('|')[0].trim();
    var descEl = document.querySelector('meta[name="description"]');
    var desc = descEl ? descEl.getAttribute('content').trim() : '';
    if (desc.length > 180) desc = desc.slice(0, 177) + '...';
    var canonical = document.querySelector('link[rel="canonical"]');
    var pageUrl = canonical && canonical.href ? canonical.href : window.location.href;
    return { title: title, desc: desc, url: pageUrl };
  }

  function buildWhatsAppUrl() {
    var ctx = getPageContext();
    var msg;
    if (state.lang === 'fr') {
      msg =
        'Bonjour ! Je suis intéressé(e) par vos machines.\n\n' +
        'Page consultée : ' + ctx.title + '\n' +
        'Lien : ' + ctx.url + '\n\n' +
        'Merci de me contacter. Merci !';
    } else {
      msg =
        'Hello! I am interested in your machinery.\n\n' +
        'Page viewed: ' + ctx.title + '\n' +
        'Link: ' + ctx.url + '\n\n' +
        'Please contact me. Thank you!';
    }
    return 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(msg);
  }

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function scrollMessages() {
    if (state.messagesEl) {
      state.messagesEl.scrollTop = state.messagesEl.scrollHeight;
    }
  }

  function addMessage(type, html) {
    var wrap = el('div', 'kiwl-chat-msg is-' + type);
    wrap.appendChild(el('div', 'kiwl-chat-bubble', html));
    state.messagesEl.appendChild(wrap);
    scrollMessages();
    return wrap;
  }

  function showTyping() {
    var wrap = el('div', 'kiwl-chat-msg is-bot kiwl-chat-typing-wrap');
    wrap.appendChild(
      el('div', 'kiwl-chat-typing', '<span></span><span></span><span></span>')
    );
    state.messagesEl.appendChild(wrap);
    scrollMessages();
    return wrap;
  }

  function delay(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function runConversation() {
    if (state.started) return;
    state.started = true;
    state.messagesEl.innerHTML = '';
    var ctx = getPageContext();

    addMessage('user', t('userHi'));

    var typing = showTyping();
    delay(800).then(function () {
      typing.remove();
      addMessage('bot', t('greet'));
      typing = showTyping();
      return delay(1000);
    }).then(function () {
      typing.remove();
      addMessage('bot', t('intro'));
      typing = showTyping();
      return delay(900);
    }).then(function () {
      typing.remove();
      var pageHtml =
        '<strong>' + t('pageIntro') + '</strong>' +
        '<div class="kiwl-chat-page-ref">' +
        '<div><strong>' + escapeHtml(ctx.title) + '</strong></div>' +
        (ctx.desc ? '<div style="margin-top:4px">' + escapeHtml(ctx.desc) + '</div>' : '') +
        '<div style="margin-top:6px"><a href="' + escapeHtml(ctx.url) + '" target="_blank" rel="noopener">' +
        escapeHtml(ctx.url) + '</a></div></div>';
      addMessage('bot', pageHtml);
      typing = showTyping();
      return delay(800);
    }).then(function () {
      typing.remove();
      addMessage('bot', t('pageHelp'));
      typing = showTyping();
      return delay(700);
    }).then(function () {
      typing.remove();
      addMessage('bot', t('waPrompt'));
      updateFooter();
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function updateHeader() {
    var name = document.getElementById('kiwl-chat-agent-name');
    var status = document.getElementById('kiwl-chat-agent-status');
    if (name) name.textContent = t('agentName');
    if (status) status.textContent = t('agentStatus');
  }

  function updateFooter() {
    var btn = document.getElementById('kiwl-chat-wa-btn');
    var note = document.getElementById('kiwl-chat-footer-note');
    if (btn) {
      btn.href = buildWhatsAppUrl();
      btn.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
        '<span>' + t('waBtn') + '</span>';
    }
    if (note) note.textContent = t('waNote');
  }

  function setLang(lang) {
    state.lang = lang === 'fr' ? 'fr' : 'en';
    updateHeader();
    updateFooter();
    if (state.open && state.started) {
      state.started = false;
      runConversation();
    }
  }

  function toggle(open) {
    state.open = open !== undefined ? open : !state.open;
    var panel = document.getElementById('kiwl-chat-panel');
    if (!panel) return;
    panel.classList.toggle('is-open', state.open);
    if (state.open) {
      runConversation();
      updateFooter();
    }
  }

  function buildWidget() {
    if (document.getElementById('kiwl-chat-root')) return;

    var root = el('div');
    root.id = 'kiwl-chat-root';
    root.setAttribute('role', 'complementary');
    root.setAttribute('aria-label', 'Customer support chat');

    root.innerHTML =
      '<div id="kiwl-chat-panel">' +
        '<div class="kiwl-chat-header">' +
          '<div class="kiwl-chat-avatar">KIWL</div>' +
          '<div class="kiwl-chat-header-info">' +
            '<h4 id="kiwl-chat-agent-name"></h4>' +
            '<p id="kiwl-chat-agent-status"></p>' +
          '</div>' +
          '<button type="button" class="kiwl-chat-close" id="kiwl-chat-close" aria-label="Close">&times;</button>' +
        '</div>' +
        '<div class="kiwl-chat-messages" id="kiwl-chat-messages"></div>' +
        '<div class="kiwl-chat-footer">' +
          '<a id="kiwl-chat-wa-btn" class="kiwl-chat-wa-btn" href="#" target="_blank" rel="noopener noreferrer"></a>' +
          '<p class="kiwl-chat-footer-note" id="kiwl-chat-footer-note"></p>' +
        '</div>' +
      '</div>' +
      '<button type="button" id="kiwl-chat-toggle" aria-label="Open chat" aria-expanded="false">' +
        '<span class="kiwl-chat-badge" aria-hidden="true"></span>' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>' +
      '</button>';

    document.body.appendChild(root);
    state.messagesEl = document.getElementById('kiwl-chat-messages');

    document.getElementById('kiwl-chat-toggle').addEventListener('click', function () {
      toggle();
      this.setAttribute('aria-expanded', state.open ? 'true' : 'false');
    });
    document.getElementById('kiwl-chat-close').addEventListener('click', function () {
      toggle(false);
      document.getElementById('kiwl-chat-toggle').setAttribute('aria-expanded', 'false');
    });

    updateHeader();
    updateFooter();
  }

  function hookI18n() {
    if (!window.KIWL_I18N || !window.KIWL_I18N.applyLang) return;
    var orig = window.KIWL_I18N.applyLang;
    window.KIWL_I18N.applyLang = function (lang) {
      orig(lang);
      setLang(lang);
    };
  }

  function init() {
    state.lang = getLang();
    buildWidget();
    hookI18n();
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) updateFooter();
    });
  }

  window.KIWL_CHAT = { setLang: setLang, open: function () { toggle(true); } };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
