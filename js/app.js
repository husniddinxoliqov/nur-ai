/**
 * NurAI — Main App Utilities
 * Font-size control, mobile menu, TTS status bar,
 * tabs, keyboard shortcuts, active nav highlight.
 */

(function () {
  'use strict';

  /* ── Font-size control ────────────────── */

  const FS_SIZES = ['normal', 'large', 'xlarge'];
  let fIdx = 0;

  function initFontControls() {
    const saved = localStorage.getItem('nur_fs');
    if (saved) {
      fIdx = Math.max(0, FS_SIZES.indexOf(saved));
      applyFS();
    }

    const inc = document.getElementById('font-increase');
    const dec = document.getElementById('font-decrease');

    inc && inc.addEventListener('click', () => {
      if (fIdx < FS_SIZES.length - 1) { fIdx++; applyFS(); NurSpeech.speak('Shrift kattalashtirildi'); }
    });
    dec && dec.addEventListener('click', () => {
      if (fIdx > 0) { fIdx--; applyFS(); NurSpeech.speak('Shrift kichiklashtirildi'); }
    });
  }

  function applyFS() {
    document.documentElement.dataset.fs = FS_SIZES[fIdx] === 'normal' ? '' : FS_SIZES[fIdx];
    localStorage.setItem('nur_fs', FS_SIZES[fIdx]);
  }

  /* ── TTS status bar ───────────────────── */

  function initTTSBar() {
    const bar       = document.getElementById('tts-bar');
    const barText   = document.getElementById('tts-bar-text');
    const stopBtn   = document.getElementById('tts-bar-stop');
    const ttsToggle = document.getElementById('tts-toggle');

    // Wire speech engine callbacks
    NurSpeech._onReadStart = (text) => {
      if (!bar) return;
      bar.hidden = false;
      if (barText) barText.textContent = text.length > 80 ? text.slice(0, 77) + '…' : text;
    };
    NurSpeech._onReadEnd = () => {
      if (bar) bar.hidden = true;
    };

    stopBtn && stopBtn.addEventListener('click', () => {
      NurSpeech.stop();
      if (bar) bar.hidden = true;
    });

    // Toggle button
    if (ttsToggle) {
      ttsToggle.addEventListener('click', () => {
        const on = NurSpeech.toggle();
        ttsToggle.classList.toggle('active', on);
        ttsToggle.setAttribute('aria-pressed', String(on));
        if (on) NurSpeech.speak('Ovozli o\'qish yoqildi');
      });
      // Reflect initial state
      ttsToggle.classList.toggle('active', NurSpeech.enabled);
      ttsToggle.setAttribute('aria-pressed', String(NurSpeech.enabled));
    }

    // Hero "listen" button
    const heroListen = document.getElementById('hero-listen');
    heroListen && heroListen.addEventListener('click', () => {
      const hero = document.querySelector('.hero');
      if (!hero) return;
      const t = hero.querySelector('.hero__title');
      const d = hero.querySelector('.hero__desc');
      NurSpeech.speak(
        [(t && t.textContent.trim()), (d && d.textContent.trim())].filter(Boolean).join('. ')
      );
    });
  }

  /* ── Mobile menu ──────────────────────── */

  function initMobileMenu() {
    const btn = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) && !btn.contains(e.target)) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Active nav link ──────────────────── */

  function highlightNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav__link').forEach(a => {
      const href = a.getAttribute('href') || '';
      // strip leading ../ for inner pages
      const name = href.split('/').pop();
      if (name && path.endsWith(name)) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ── Tabs ─────────────────────────────── */

  function initTabs() {
    document.querySelectorAll('[role="tablist"]').forEach(list => {
      list.querySelectorAll('[role="tab"]').forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab, list));
        tab.addEventListener('keydown', (e) => {
          const tabs = [...list.querySelectorAll('[role="tab"]')];
          const i    = tabs.indexOf(tab);
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            activateTab(tabs[(i + 1) % tabs.length], list);
            tabs[(i + 1) % tabs.length].focus();
          }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            activateTab(tabs[(i - 1 + tabs.length) % tabs.length], list);
            tabs[(i - 1 + tabs.length) % tabs.length].focus();
          }
        });
      });
    });
  }

  function activateTab(tab, list) {
    list.querySelectorAll('[role="tab"]').forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.classList.remove('active');
      const panelId = t.getAttribute('aria-controls');
      const panel   = panelId && document.getElementById(panelId);
      if (panel) { panel.classList.remove('active'); panel.hidden = true; }
    });
    tab.setAttribute('aria-selected', 'true');
    tab.classList.add('active');
    const panelId = tab.getAttribute('aria-controls');
    const panel   = panelId && document.getElementById(panelId);
    if (panel) { panel.classList.add('active'); panel.hidden = false; }
  }

  /* ── Global keyboard shortcuts ────────── */

  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Escape → stop TTS
      if (e.key === 'Escape') NurSpeech.stop();

      if (!e.altKey) return;
      switch (e.key) {
        case '0': e.preventDefault(); window.location.href = rootPath() + 'index.html'; break;
        case '1': e.preventDefault(); window.location.href = rootPath() + 'pages/smart-edu.html'; break;
        case '2': e.preventDefault(); window.location.href = rootPath() + 'pages/nur-freelance.html'; break;
        case '3': e.preventDefault(); window.location.href = rootPath() + 'pages/nur-community.html'; break;
      }
    });
  }

  function rootPath() {
    return window.location.pathname.includes('/pages/') ? '../' : '';
  }

  /* ── Read-on-focus for cards ──────────── */

  function initCardTTS() {
    document.querySelectorAll('.module-card, .card[tabindex]').forEach(c => {
      c.addEventListener('focusin', () => {
        const h = c.querySelector('h2,h3,h4');
        if (h && NurSpeech.enabled) NurSpeech.speak(h.textContent);
      });
    });
  }

  /* ── Boot ─────────────────────────────── */

  function boot() {
    initFontControls();
    initTTSBar();
    initMobileMenu();
    highlightNav();
    initTabs();
    initKeyboard();
    initCardTTS();

    // Welcome on home page
    const onHome = !window.location.pathname.includes('/pages/');
    if (onHome) {
      setTimeout(() => {
        NurSpeech.speak(
          'NurAI platformasiga xush kelibsiz. Ko\'zi ojizlar uchun sun\'iy intellektga asoslangan ta\'lim platformasi.'
        );
      }, 900);
    }

    // Announce browser support
    const s = NurSpeech.support();
    if (!s.tts) console.warn('NurAI: TTS not supported in this browser.');
    if (!s.stt) console.warn('NurAI: STT not supported in this browser.');
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();

  /* ── Public helpers ───────────────────── */
  window.NurApp = {
    speak:   (t)  => NurSpeech.speak(t),
    stop:    ()   => NurSpeech.stop(),
    activateTab
  };

}());
