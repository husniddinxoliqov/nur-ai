/**
 * app.js — Shared helpers: navigation, toast, accessibility
 * NurAI Platform
 */

/* ---- Active nav link ---- */
(function markActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });
})();

/* ---- Toast notifications ---- */
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(container);
  }

  const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `<span aria-hidden="true">${icons[type] || 'ℹ️'}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(110%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

window.showToast = showToast;

/* ---- Nav page-read button ---- */
const navTtsBtn = document.getElementById('nav-tts-btn');
if (navTtsBtn) {
  navTtsBtn.addEventListener('click', () => {
    if (window.Speech && Speech.isSupported()) {
      if (Speech.isSpeakingNow()) {
        Speech.stop();
        navTtsBtn.textContent = '🔊';
        navTtsBtn.setAttribute('aria-label', 'Sahifani o\'qib bering');
      } else {
        const mainContent = document.getElementById('main-content');
        const text = mainContent ? mainContent.innerText : document.body.innerText;
        navTtsBtn.textContent = '⏹';
        navTtsBtn.setAttribute('aria-label', 'O\'qishni to\'xtatish');
        Speech.speak(text, {
          rate: 0.9,
          onEnd: () => {
            navTtsBtn.textContent = '🔊';
            navTtsBtn.setAttribute('aria-label', 'Sahifani o\'qib bering');
          },
          onError: () => {
            navTtsBtn.textContent = '🔊';
          },
        });
      }
    } else {
      showToast('Bu brauzer ovozli o\'qishni qo\'llab-quvvatlamaydi.', 'warning');
    }
  });
}

/* ---- Keyboard shortcut: Alt+R = read page ---- */
document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 'r') {
    if (navTtsBtn) navTtsBtn.click();
  }
  if (e.altKey && e.key === 's') {
    const micBtn = document.querySelector('.mic-btn');
    if (micBtn) micBtn.click();
  }
});
