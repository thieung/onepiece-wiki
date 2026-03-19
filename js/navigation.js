/**
 * navigation.js - Saga nav, search, scroll animations, progress bar
 */

/* === Scroll progress bar === */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(pct, 100)}%`;
  }, { passive: true });
}

/* === IntersectionObserver reveal === */
function initRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Also mark parent arc-item for dot + connector animation
          const arcItem = entry.target.closest('.arc-item');
          if (arcItem) arcItem.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* === Active saga nav highlight on scroll === */
function initActiveNavHighlight() {
  const pills = document.querySelectorAll('.saga-nav-pill');
  const sections = document.querySelectorAll('.saga-section');
  if (!sections.length) return;

  // Use threshold: 0 + rootMargin to trigger as soon as section enters viewport top.
  // threshold: 0.3 fails for tall sagas (Wano, Dressrosa) that exceed viewport height.
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.sagaId;
          pills.forEach((pill) => {
            pill.classList.toggle('is-active', pill.dataset.sagaId === id);
          });
          // Scroll active pill into view in the nav
          const activePill = document.querySelector(`.saga-nav-pill[data-saga-id="${id}"]`);
          activePill?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    },
    { threshold: 0, rootMargin: '-10% 0px -80% 0px' }
  );

  sections.forEach((s) => sectionObserver.observe(s));
}

/* === Smooth scroll for saga nav pills === */
function initSagaNavScroll() {
  document.querySelectorAll('.saga-nav-pill').forEach((pill) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(pill.dataset.sagaId);
      if (target) {
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* === Search / filter arcs === */
function initSearch() {
  const input = document.getElementById('arc-search');
  if (!input) return;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    filterArcs(query);
  });

  // Clear on Escape
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      filterArcs('');
      input.blur();
    }
  });
}

/**
 * Filter arcs by search query.
 * Shows/hides saga sections and highlights matching cards.
 * @param {string} query
 */
function filterArcs(query) {
  const sagaSections = document.querySelectorAll('.saga-section');
  const noResults = document.getElementById('no-results');
  let totalVisible = 0;

  sagaSections.forEach((section) => {
    const arcItems = section.querySelectorAll('.arc-item');
    let visibleInSaga = 0;

    arcItems.forEach((item) => {
      const name = item.dataset.arcName || '';
      const summaryEl = item.querySelector('.arc-summary');
      const highlightEl = item.querySelector('.arc-highlight');
      const summaryText = summaryEl ? summaryEl.textContent.toLowerCase() : '';
      const highlightText = highlightEl ? highlightEl.textContent.toLowerCase() : '';

      const matches = !query
        || name.includes(query)
        || summaryText.includes(query)
        || highlightText.includes(query);

      item.querySelector('.arc-card')?.classList.toggle('is-highlighted', !!query && matches);
      item.querySelector('.arc-card')?.classList.toggle('is-dimmed', !!query && !matches);

      if (matches) visibleInSaga++;
    });

    // Hide entire saga section if nothing matches
    section.classList.toggle('is-hidden', visibleInSaga === 0 && !!query);
    totalVisible += visibleInSaga;
  });

  if (noResults) {
    noResults.style.display = totalVisible === 0 && query ? 'block' : 'none';
  }
}

/* === Saga filter pills in nav (click to show only that saga) === */
function initSagaFilter() {
  let activeSagaFilter = null;

  document.querySelectorAll('.saga-nav-pill').forEach((pill) => {
    pill.addEventListener('dblclick', (e) => {
      e.preventDefault();
      const sagaId = pill.dataset.sagaId;

      if (activeSagaFilter === sagaId) {
        // Reset filter
        activeSagaFilter = null;
        document.querySelectorAll('.saga-section').forEach((s) => s.classList.remove('is-hidden'));
        document.querySelectorAll('.saga-nav-pill').forEach((p) => p.classList.remove('is-filter-active'));
      } else {
        // Filter to just this saga
        activeSagaFilter = sagaId;
        document.querySelectorAll('.saga-section').forEach((s) => {
          s.classList.toggle('is-hidden', s.dataset.sagaId !== sagaId);
        });
        document.querySelectorAll('.saga-nav-pill').forEach((p) => {
          p.classList.toggle('is-filter-active', p.dataset.sagaId === sagaId);
        });
      }
    });
  });
}

/* === Back to top button === */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* === Sort order toggle (oldest→newest / newest→oldest) === */
const SORT_KEY = 'op_sort';

function getCurrentSort() {
  return localStorage.getItem(SORT_KEY) || 'asc';
}

function reRenderTimeline() {
  const container = document.getElementById('timeline-container');
  const navList   = document.getElementById('saga-nav-list');
  const reversed  = getCurrentSort() === 'desc';

  if (container) renderTimeline(container, reversed);
  if (navList)   renderSagaNav(navList);

  // Re-init DOM-dependent interactions after re-render
  initRevealAnimations();
  initActiveNavHighlight();
  initSagaNavScroll();
  initSagaFilter();
}

function initSortToggle() {
  const btn = document.getElementById('btn-sort-order');
  if (!btn) return;

  function updateBtn(sort) {
    const icon  = btn.querySelector('.sort-icon');
    const label = btn.querySelector('.sort-label');
    if (icon)  icon.textContent  = sort === 'desc' ? '⬇' : '⬆';
    if (label) label.textContent = sort === 'desc' ? 'Mới → Cũ' : 'Cũ → Mới';
    btn.classList.toggle('is-desc', sort === 'desc');
    btn.title = sort === 'desc' ? 'Đang hiển thị mới nhất trước' : 'Đang hiển thị cũ nhất trước';
  }

  updateBtn(getCurrentSort());

  btn.addEventListener('click', () => {
    const next = getCurrentSort() === 'asc' ? 'desc' : 'asc';
    localStorage.setItem(SORT_KEY, next);
    updateBtn(next);
    reRenderTimeline();
  });
}

/* === Boot all modules === */
function init() {
  const container = document.getElementById('timeline-container');
  const navList = document.getElementById('saga-nav-list');
  const reversed = getCurrentSort() === 'desc';

  if (container) renderTimeline(container, reversed);
  if (navList) renderSagaNav(navList);

  // Init interactions after DOM is built
  initProgressBar();
  initRevealAnimations();
  initActiveNavHighlight();
  initSagaNavScroll();
  initSearch();
  initSagaFilter();
  initBackToTop();
  initSortToggle();
}

document.addEventListener('DOMContentLoaded', init);
