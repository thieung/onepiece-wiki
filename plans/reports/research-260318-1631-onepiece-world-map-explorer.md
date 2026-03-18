# Research Report: One Piece World Map Explorer

**Date:** 2026-03-18

---

## Executive Summary

Có ít nhất **3 fan projects** đã implement One Piece world map, trong đó **OPGlobe** (Three.js r146) là closest match — pure vanilla JS, no build tools, texture sphere + OrbitControls + atmospheric glow. Recommend: dùng **Three.js CDN** (no build), apply One Piece world map texture lên sphere, thêm clickable markers dùng raycasting, tích hợp vào existing vanilla JS site. Không cần framework.

---

## One Piece World Geography

```
             ┌──────────────────────────────────────────────────────────────┐
             │                    NORTH BLUE                               │
             │  Spider Miles · Flevance · Germa Kingdom · Lvneel           │
             ├──────────────────────────────────────────────────────────────┤
WEST BLUE    │ ============= RED LINE ================== MARY GEOISE ===== │ EAST BLUE
Thriller Bark│ ─── CALM BELT ───────────────────────────────────────────── │ Baratie
West Blue    │ ═══════════════ GRAND LINE (PARADISE) ═══════════════════════ │ East Blue
             │  Twin Cape · Whiskey Peak · Alabasta · Skypiea · Water 7    │
             │  Enies Lobby · Thriller Bark · Sabaody · Marineford        │
             │ ─── CALM BELT ───────────────────────────────────────────── │
             │                    SOUTH BLUE                               │
             ├──────────────────────────────────────────────────────────────┤
             │ ─── CALM BELT ───────────────────────────────────────────── │
             │ ═══════════════ NEW WORLD ════════════════════════════════════ │
             │  Fish-Man Island · Punk Hazard · Dressrosa · Zou            │
             │  Whole Cake Island · Wano · Egghead · Elbaf                 │
             │ ─── CALM BELT ───────────────────────────────────────────── │
             └──────────────────────────────────────────────────────────────┘
```

**Key geographic facts:**
- Red Line: continent duy nhất, chia thế giới theo chiều dọc
- Grand Line: băng qua xích đạo theo chiều ngang, perpendicular với Red Line
- 4 Blues: NE/NW/SE/SW quadrants tạo ra bởi Red Line × Grand Line
- Calm Belts: 2 dải không gió bắc/nam Grand Line, chứa Sea Kings
- Paradise: phần đầu Grand Line (East → Sabaody)
- New World: phần sau (Fishman Island → Elbaf)

---

## Existing Fan Projects

| Project | Tech | Features | Notes |
|---------|------|----------|-------|
| **OPGlobe** (Thraced/OPGlobe) | Three.js r146, vanilla JS | 3D sphere, OrbitControls, atmo glow, starfield, Grand/Red Line rings | Simplest, best reference |
| **OnePieceWorld** (crossworld-map) | Next.js + MapLibre GL | 2D map, markers, search, chapter refs | Too heavy (Next.js) |
| **One Piece Journey** (paradoxsid) | Unknown (3D) | Spoiler shield, crew tracking, timeline | Feature-rich |

---

## Tech Stack Recommendation

### For our vanilla JS site → **Three.js CDN (r128+)**

```html
<script src="https://unpkg.com/three@0.128.0/build/three.min.js"></script>
<script src="https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
```

**Why Three.js:**
- Consistent với OPGlobe approach (proven works)
- Pure vanilla, no build tools — fits existing project
- Raycasting API để detect marker clicks
- WebGL performance tốt

**Why NOT Leaflet/MapLibre:**
- Designed cho real-world tile-based maps
- Fantasy map texture không fit tốt với tile system
- Over-engineered cho use case này

### Core Implementation Pattern

```js
// Globe setup (from OPGlobe approach)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// World sphere
const geo = new THREE.SphereGeometry(2, 64, 64);
const texture = new THREE.TextureLoader().load('assets/op-world-map.jpg');
const mat = new THREE.MeshPhongMaterial({ map: texture });
const globe = new THREE.Mesh(geo, mat);

// OrbitControls for drag rotation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;

// Location marker (raycasting detection)
const markerGeo = new THREE.SphereGeometry(0.04, 8, 8);
const markerMat = new THREE.MeshBasicMaterial({ color: 0xFFD700 });
// Position by lat/lng → 3D coords:
// x = r * cos(lat) * cos(lng)
// y = r * sin(lat)
// z = r * cos(lat) * sin(lng)
```

### Red Line & Grand Line visualization

```js
// Red Line: vertical ring at lng=0 and lng=180
// Grand Line: horizontal ring at lat=0 (equator)
const ringGeo = new THREE.TorusGeometry(2.01, 0.008, 8, 128);
const redLineMat = new THREE.MeshBasicMaterial({ color: 0xC0392B });
const grandLineMat = new THREE.MeshBasicMaterial({ color: 0x1565C0 });
```

---

## Location Data Structure

```js
// Add to data.js
const WORLD_LOCATIONS = [
  // Format: { name, arc, lat (°), lng (°), saga, description }
  { name: 'Foosha Village',   arc: 'Romance Dawn',      lat: 15,  lng: -160, saga: 'east-blue' },
  { name: 'Shells Town',      arc: 'Orange Town',        lat: 12,  lng: -150, saga: 'east-blue' },
  { name: 'Baratie',          arc: 'Baratie',            lat: 5,   lng: -130, saga: 'east-blue' },
  { name: 'Arlong Park',      arc: 'Arlong Park',        lat: 8,   lng: -140, saga: 'east-blue' },
  { name: 'Loguetown',        arc: 'Loguetown',          lat: 2,   lng: -120, saga: 'east-blue' },
  { name: 'Alabasta',         arc: 'Arabasta',           lat: 5,   lng: -80,  saga: 'arabasta' },
  { name: 'Skypiea',          arc: 'Skypiea',            lat: 30,  lng: -60,  saga: 'sky-island' },
  { name: 'Water 7',          arc: 'Water 7',            lat: 5,   lng: -40,  saga: 'water-7' },
  { name: 'Thriller Bark',    arc: 'Thriller Bark',      lat: -5,  lng: -10,  saga: 'thriller-bark' },
  { name: 'Marineford',       arc: 'Marineford',         lat: 20,  lng: 0,    saga: 'summit-war' },
  { name: 'Fish-Man Island',  arc: 'Fish-Man Island',    lat: -20, lng: 30,   saga: 'fishman-island' },
  { name: 'Dressrosa',        arc: 'Dressrosa',          lat: -5,  lng: 60,   saga: 'dressrosa' },
  { name: 'Whole Cake Island',arc: 'Whole Cake Island',  lat: -15, lng: 80,   saga: 'whole-cake-island' },
  { name: 'Wano',             arc: 'Wano Country',       lat: -10, lng: 110,  saga: 'wano' },
  { name: 'Egghead',          arc: 'Egghead',            lat: -25, lng: 140,  saga: 'final' },
];
```

---

## Integration Plan

```
index.html
├── #view-timeline   ← existing timeline (default)
└── #view-map        ← new Three.js world map

Nav toggle: [📜 Timeline] [🗺 World Map]

js/
├── data.js          ← add WORLD_LOCATIONS array
├── render.js        ← existing
├── navigation.js    ← add view toggle logic
└── world-map.js     ← NEW: Three.js globe, markers, raycasting
```

**UX flow:**
1. User clicks "🗺 World Map" in nav
2. Timeline hides, canvas appears
3. Globe auto-rotates, golden markers at each location
4. Hover marker → tooltip with arc name + saga
5. Click marker → side panel shows arc card info (reuse existing card HTML)
6. Click "📜 Timeline" → back to scroll view

---

## Assets Needed

One Piece world map texture image (`assets/op-world-map.jpg`):
- Best source: DeviantArt xads181's globe-optimized texture (CC BY-SA 3.0)
- Alternative: generate from official map scan
- Size recommended: 2048×1024px equirectangular projection

---

## Unresolved Questions

1. **Texture source**: No free CDN-hosted equirectangular One Piece world texture exists — need to bundle asset or use placeholder until user provides one.
2. **Lat/Lng accuracy**: One Piece world geography is fictional, coordinates above are approximations based on arc order + map topology — not canonical.
3. **Mobile performance**: Three.js WebGL on low-end mobile may lag — need canvas resize + device pixel ratio cap.
4. **CORS on file://**: Must run via local server or embed texture as base64 — GitHub Pages serves via HTTPS so no issue for deployment.

---

## Sources
- [OPGlobe — GitHub](https://github.com/Thraced/OPGlobe)
- [One Piece Journey — GitHub Pages](https://paradoxsid.github.io/One-Piece-Journey/)
- [OnePieceWorld — GitHub](https://github.com/crossworld-map/OnePieceWorld)
- [Grand Line | One Piece Wiki](https://onepiece.fandom.com/wiki/Grand_Line)
- [Globe.GL](https://globe.gl/)
- [three-globe — GitHub](https://github.com/vasturiano/three-globe)
- [Leaflet.js](https://leafletjs.com/)
