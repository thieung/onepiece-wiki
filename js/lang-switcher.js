/**
 * lang-switcher.js — Client-side VI/EN toggle
 * Uses data-vi / data-en attributes on elements.
 * Persists choice in localStorage.
 */

const LANG_KEY = 'op_lang';

const UI_STRINGS = {
  'search-placeholder': { vi: 'Tìm arc...', en: 'Search arc...' },
  'map-hint':           { vi: 'Click marker để xem arc · Drag để xoay', en: 'Click marker to view arc · Drag to rotate' },
  'no-results':         { vi: 'Không tìm thấy arc nào 🏴‍☠️', en: 'No arcs found 🏴‍☠️' },
  'btn-timeline':       { vi: 'Timeline', en: 'Timeline' },
  'btn-worldmap':       { vi: 'World Map', en: 'World Map' },
  'map-pause':          { vi: '⏸ Pause', en: '⏸ Pause' },
  'legend-journey':     { vi: 'Hành trình Straw Hat', en: 'Straw Hat Journey' },
  'legend-grandline':   { vi: 'Grand Line', en: 'Grand Line' },
  'legend-redline':     { vi: 'Red Line', en: 'Red Line' },
  'legend-start':       { vi: 'Điểm xuất phát (Foosha Village)', en: 'Starting point (Foosha Village)' },
  'legend-location':    { vi: 'Địa điểm arc', en: 'Arc location' },
  'footer-tagline':     { vi: 'Fan-made interactive guide · Không liên kết chính thức với Eiichiro Oda hay Shueisha',
                          en: 'Fan-made interactive guide · Not affiliated with Eiichiro Oda or Shueisha' },
  'footer-data-label':  { vi: '📖 Dữ liệu arc & chapter:', en: '📖 Arc & chapter data:' },
  'footer-geo-label':   { vi: '🗺 Địa lý thế giới:', en: '🗺 World geography:' },
  'footer-coord-note':  { vi: '· Tọa độ là ước lượng dựa trên topology thế giới One Piece',
                          en: '· Coordinates are approximations based on One Piece world topology' },
  'footer-hint':        { vi: 'Double-click saga nav để lọc · Escape để xóa tìm kiếm · Click marker trên map để xem arc',
                          en: 'Double-click saga nav to filter · Escape to clear search · Click map marker to view arc' },
  'hero-subtitle':      { vi: 'SAGA & ARC TIMELINE — Hướng Dẫn Đầy Đủ', en: 'SAGA & ARC TIMELINE — Complete Story Guide' },
  'scroll-hint':        { vi: 'SCROLL', en: 'SCROLL' },
};

function applyLang(lang) {
  document.documentElement.lang = lang === 'en' ? 'en' : 'vi';
  localStorage.setItem(LANG_KEY, lang);

  // Update all [data-i18n] elements (UI chrome)
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const str = UI_STRINGS[key];
    if (!str) return;
    if (el.tagName === 'INPUT') {
      el.placeholder = str[lang] ?? str.vi;
    } else {
      el.textContent = str[lang] ?? str.vi;
    }
  });

  // Re-render timeline so arc summaries/highlights switch language
  const container = document.getElementById('timeline-container');
  if (container && typeof renderTimeline === 'function') {
    renderTimeline(container);
    // Re-init IntersectionObserver reveal after re-render
    if (typeof initRevealAnimations === 'function') initRevealAnimations();
  }

  // Update toggle button active state
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });
}

function initLangSwitcher() {
  const saved = localStorage.getItem(LANG_KEY) || 'vi';

  // Wire toggle buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  applyLang(saved);
}

document.addEventListener('DOMContentLoaded', initLangSwitcher);
