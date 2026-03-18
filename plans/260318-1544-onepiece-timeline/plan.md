# Plan: One Piece Interactive Timeline Website

**Date:** 2026-03-18 | **Mode:** auto

## Overview
Static web app hiển thị timeline 11 saga / 34+ arc One Piece với số chương và tóm tắt. Phong cách anime/manga One Piece vibe.

## Stack
- Vanilla HTML5 + CSS3 + JS (no framework)
- IntersectionObserver cho scroll animations (cross-browser)
- Google Fonts: Bangers + Noto Sans

## Phases

| Phase | File | Status |
|-------|------|--------|
| 01 | Data layer (js/data.js) | ⬜ |
| 02 | Design tokens (css/variables.css) | ⬜ |
| 03 | Base styles (css/base.css) | ⬜ |
| 04 | Timeline layout (css/timeline.css) | ⬜ |
| 05 | Card styles (css/cards.css) | ⬜ |
| 06 | Animations (css/animations.css) | ⬜ |
| 07 | Render engine (js/render.js) | ⬜ |
| 08 | Navigation + search (js/navigation.js) | ⬜ |
| 09 | HTML entry point (index.html) | ⬜ |

## Structure
```
onepiece-summary/
├── index.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── timeline.css
│   ├── cards.css
│   └── animations.css
└── js/
    ├── data.js
    ├── render.js
    └── navigation.js
```
