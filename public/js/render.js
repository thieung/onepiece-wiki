/**
 * render.js - DOM rendering engine for One Piece timeline
 * Builds saga sections and arc cards from data.js
 */

/**
 * Translate a bilingual string { vi, en } using current localStorage lang.
 * Falls back to vi if key is missing.
 * @param {string|{vi:string,en:string}} str
 * @returns {string}
 */
function t(str) {
  if (!str || typeof str === 'string') return str || '';
  const lang = localStorage.getItem('op_lang') || 'vi';
  return str[lang] ?? str.vi ?? '';
}

/**
 * Build chapter badge HTML
 * @param {Object} arc
 * @returns {string}
 */
function renderChapterBadge(arc) {
  const isOngoing = arc.chapterCount === null;
  const label = isOngoing
    ? `Ch. ${arc.chapters} 🔴 LIVE`
    : `Ch. ${arc.chapters}`;
  return `<span class="chapter-badge ${isOngoing ? 'ongoing' : ''}">${label}</span>`;
}

/**
 * Build a single arc card
 * @param {Object} arc
 * @param {number} index - position within saga (1-based)
 * @param {Object} saga
 * @returns {string}
 */
function renderArcCard(arc, index, saga) {
  const lang = localStorage.getItem('op_lang') || 'vi';
  const chapterCountLabel = arc.chapterCount
    ? `${arc.chapterCount} ${lang === 'en' ? 'chapters' : 'chương'}`
    : (lang === 'en' ? 'Ongoing' : 'Đang tiếp tục');

  return `
    <li class="arc-item" data-arc-name="${arc.name.toLowerCase()}" data-saga-id="${saga.id}"
        style="--saga-color: ${saga.color}; --saga-text: ${saga.textColor}">
      <div class="arc-connector"></div>
      <article class="arc-card reveal">
        <header class="arc-card-header">
          <span class="arc-number">ARC ${index}</span>
          <h3 class="arc-name">${arc.name}</h3>
          ${renderChapterBadge(arc)}
        </header>

        <p class="arc-summary">${t(arc.summary)}</p>

        <footer class="arc-card-footer">
          <span class="arc-highlight">${t(arc.highlight)}</span>
          <span class="arc-chapter-count">${chapterCountLabel}</span>
        </footer>
      </article>
    </li>
  `;
}

/**
 * Build a full saga section
 * @param {Object} saga
 * @param {number} globalArcIndex - running arc counter across all sagas
 * @returns {{ html: string, nextIndex: number }}
 */
function renderSagaSection(saga, globalArcIndex) {
  const arcsHtml = saga.arcs
    .map((arc, i) => renderArcCard(arc, globalArcIndex + i + 1, saga))
    .join('');

  const html = `
    <section class="saga-section" id="${saga.id}" data-saga-id="${saga.id}">
      <header class="saga-header">
        <div class="saga-badge reveal"
             style="background: ${saga.color}; color: ${saga.textColor}; border-color: #111;">
          <span class="saga-emoji" aria-hidden="true">${saga.emoji}</span>
          <span class="saga-name">${saga.name}</span>
          <span class="saga-chapters-label">Chapters ${saga.chapters}</span>
        </div>
      </header>
      <p class="saga-description">${t(saga.description)}</p>
      <ol class="arc-list" aria-label="Arcs in ${saga.name}">
        ${arcsHtml}
      </ol>
    </section>
  `;

  return { html, nextIndex: globalArcIndex + saga.arcs.length };
}

/**
 * Render the full timeline into the container element
 * @param {HTMLElement} container
 * @param {boolean} [reversed=false] - if true, show newest sagas/arcs first
 */
function renderTimeline(container, reversed = false) {
  const sagas = reversed ? [...ONE_PIECE_DATA].reverse() : ONE_PIECE_DATA;

  // Compute total arc count for reverse numbering
  const totalArcs = ONE_PIECE_DATA.reduce((sum, s) => sum + s.arcs.length, 0);

  let globalArcIndex = 0;
  const fragments = sagas.map((saga) => {
    const arcList = reversed ? [...saga.arcs].reverse() : saga.arcs;
    const arcStartIndex = reversed
      ? totalArcs - globalArcIndex - arcList.length  // count down
      : globalArcIndex;

    const arcsHtml = arcList
      .map((arc, i) => {
        const arcNum = reversed
          ? arcStartIndex + arcList.length - i  // descending
          : arcStartIndex + i + 1;
        return renderArcCard(arc, arcNum, saga);
      })
      .join('');

    const html = `
      <section class="saga-section" id="${saga.id}" data-saga-id="${saga.id}">
        <header class="saga-header">
          <div class="saga-badge reveal"
               style="background: ${saga.color}; color: ${saga.textColor}; border-color: #111;">
            <span class="saga-emoji" aria-hidden="true">${saga.emoji}</span>
            <span class="saga-name">${saga.name}</span>
            <span class="saga-chapters-label">Chapters ${saga.chapters}</span>
          </div>
        </header>
        <p class="saga-description">${t(saga.description)}</p>
        <ol class="arc-list" aria-label="Arcs in ${saga.name}">
          ${arcsHtml}
        </ol>
      </section>
    `;

    globalArcIndex += arcList.length;
    return html;
  });

  container.innerHTML = fragments.join('');
}

/**
 * Render saga navigation pills
 * @param {HTMLElement} navList
 */
function renderSagaNav(navList) {
  const items = ONE_PIECE_DATA.map((saga) => `
    <li>
      <a href="#${saga.id}"
         class="saga-nav-pill"
         data-saga-id="${saga.id}"
         style="--pill-color: ${saga.color}; --pill-text: ${saga.textColor}">
        <span aria-hidden="true">${saga.emoji}</span>
        <span class="pill-name">${saga.name.replace(' Saga', '').replace(' Country', '')}</span>
      </a>
    </li>
  `).join('');

  navList.innerHTML = items;
}
