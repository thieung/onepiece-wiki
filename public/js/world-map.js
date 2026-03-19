/**
 * world-map.js - One Piece 3D World Map Explorer
 * Three.js globe with procedural texture, location markers, raycasting
 *
 * Architecture:
 *   MapScene     — Three.js scene, renderer, camera, lighting
 *   GlobeBuilder — procedural canvas texture, sphere mesh
 *   MarkerSystem — location dots + raycasting for hover/click
 *   InfoPanel    — side panel showing arc card on marker click
 *   MapControls  — OrbitControls wrapper + auto-rotate
 */

/* ─── Constants ─────────────────────────────────────────────── */

const MAP_CONFIG = {
  globeRadius: 2,
  markerRadius: 0.035,
  markerHoverRadius: 0.048,
  cameraDistance: 5.5,
  autoRotateSpeed: 0.3,
  textureWidth: 2048,
  textureHeight: 1024,
  atmosphereScale: 1.08,
};

/* ─── Coordinate helpers ─────────────────────────────────────── */

/**
 * Convert geographic lat/lng to 3D sphere coordinates.
 * @param {number} lat - degrees (-90 to 90)
 * @param {number} lng - degrees (-180 to 180)
 * @param {number} radius
 * @returns {THREE.Vector3}
 */
function latLngToVec3(lat, lng, radius) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* ─── Procedural Texture (Canvas) ────────────────────────────── */

/**
 * Generate the world map texture entirely via Canvas API.
 * Draws ocean, Grand Line belt, Red Line, 4 Blue sea regions,
 * Calm Belts, and region labels — all styled to match parchment theme.
 * @returns {HTMLCanvasElement}
 */
function buildWorldMapCanvas() {
  const W = MAP_CONFIG.textureWidth;
  const H = MAP_CONFIG.textureHeight;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  /* Ocean background — deep navy gradient */
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, H);
  oceanGrad.addColorStop(0,    '#0B2545');
  oceanGrad.addColorStop(0.35, '#0D3B6E');
  oceanGrad.addColorStop(0.5,  '#0A4072');
  oceanGrad.addColorStop(0.65, '#0D3B6E');
  oceanGrad.addColorStop(1,    '#0B2545');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, W, H);

  /* Subtle ocean shimmer (horizontal wave lines) */
  ctx.strokeStyle = 'rgba(93,173,226,0.05)';
  ctx.lineWidth = 1;
  for (let y = 0; y < H; y += 18) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= W; x += 40) {
      ctx.quadraticCurveTo(x + 20, y + 3, x + 40, y);
    }
    ctx.stroke();
  }

  /* Helper: project lat/lng to canvas x,y */
  const proj = (lat, lng) => ({
    x: (lng + 180) / 360 * W,
    y: (90 - lat)  / 180 * H,
  });

  /* ── Calm Belts ── subtle grey band */
  const calmBeltHalf = 5; // ±5° from equator
  const calmNTop = proj(calmBeltHalf, -180).y;
  const calmNBot = proj(-calmBeltHalf, -180).y;
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(0, calmNTop, W, calmNBot - calmNTop);

  /* ── Grand Line Belt ── golden horizontal stripe */
  const glTop = proj(3, -180).y;
  const glBot = proj(-3, -180).y;
  const grandGrad = ctx.createLinearGradient(0, glTop, 0, glBot);
  grandGrad.addColorStop(0, 'rgba(212,160,23,0)');
  grandGrad.addColorStop(0.3, 'rgba(212,160,23,0.22)');
  grandGrad.addColorStop(0.7, 'rgba(212,160,23,0.22)');
  grandGrad.addColorStop(1, 'rgba(212,160,23,0)');
  ctx.fillStyle = grandGrad;
  ctx.fillRect(0, glTop, W, glBot - glTop);

  /* Grand Line center line */
  const glMid = proj(0, -180).y;
  ctx.strokeStyle = 'rgba(244,196,48,0.55)';
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 6]);
  ctx.beginPath();
  ctx.moveTo(0, glMid);
  ctx.lineTo(W, glMid);
  ctx.stroke();
  ctx.setLineDash([]);

  /* ── Red Line ── vertical crimson band */
  const redLineX1 = proj(0, -2).x;
  const redLineX2 = proj(0, 2).x;
  const redGrad = ctx.createLinearGradient(redLineX1, 0, redLineX2, 0);
  redGrad.addColorStop(0, 'rgba(192,57,43,0)');
  redGrad.addColorStop(0.4, 'rgba(192,57,43,0.7)');
  redGrad.addColorStop(0.6, 'rgba(192,57,43,0.7)');
  redGrad.addColorStop(1, 'rgba(192,57,43,0)');
  ctx.fillStyle = redGrad;
  ctx.fillRect(redLineX1, 0, redLineX2 - redLineX1, H);

  /* Red Line 180° (right side) */
  const rlX2a = proj(0, 178).x;
  const rlX2b = proj(0, 180).x;
  ctx.fillStyle = redGrad;
  ctx.fillRect(rlX2a, 0, rlX2b - rlX2a + 4, H);
  ctx.fillRect(0, 0, 4, H); /* wraps left edge */

  /* ── Sea Region Tints ── */
  const seaRegions = [
    /* name, lat range, lng range, color */
    { label: 'EAST BLUE',  lat1: 5,   lat2: 60,  lng1: -180, lng2: -2,   color: 'rgba(21,101,192,0.12)' },
    { label: 'NORTH BLUE', lat1: 5,   lat2: 60,  lng1: 2,    lng2: 180,  color: 'rgba(46,134,193,0.10)' },
    { label: 'WEST BLUE',  lat1: -60, lat2: -5,  lng1: 2,    lng2: 180,  color: 'rgba(26,82,118,0.12)'  },
    { label: 'SOUTH BLUE', lat1: -60, lat2: -5,  lng1: -180, lng2: -2,   color: 'rgba(13,59,102,0.10)'  },
    { label: 'PARADISE',   lat1: -3,  lat2: 3,   lng1: -120, lng2: -2,   color: 'rgba(212,160,23,0.08)' },
    { label: 'NEW WORLD',  lat1: -3,  lat2: 3,   lng1: 2,    lng2: 180,  color: 'rgba(192,57,43,0.08)'  },
  ];

  seaRegions.forEach(({ lat1, lat2, lng1, lng2, color }) => {
    const p1 = proj(lat2, lng1);
    const p2 = proj(lat1, lng2);
    ctx.fillStyle = color;
    ctx.fillRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
  });

  /* ── Region Labels ── */
  const labels = [
    { text: 'EAST BLUE',   lat:  35, lng: -100, size: 28, color: 'rgba(93,173,226,0.5)' },
    { text: 'NORTH BLUE',  lat:  35, lng:  100, size: 28, color: 'rgba(93,173,226,0.5)' },
    { text: 'WEST BLUE',   lat: -35, lng:  100, size: 28, color: 'rgba(93,173,226,0.4)' },
    { text: 'SOUTH BLUE',  lat: -35, lng: -100, size: 28, color: 'rgba(93,173,226,0.4)' },
    { text: 'GRAND LINE',  lat:   8, lng:  -70, size: 22, color: 'rgba(244,196,48,0.6)' },
    { text: 'NEW WORLD',   lat:  -8, lng:   90, size: 22, color: 'rgba(192,57,43,0.65)' },
    { text: 'PARADISE',    lat:  -8, lng:  -60, size: 22, color: 'rgba(212,160,23,0.55)' },
    { text: 'RED LINE',    lat:  50, lng:   -1, size: 18, color: 'rgba(231,76,60,0.7)', rotate: -90 },
    { text: 'CALM BELT',   lat: -12, lng: -140, size: 16, color: 'rgba(255,255,255,0.25)' },
    { text: 'CALM BELT',   lat:  12, lng: -140, size: 16, color: 'rgba(255,255,255,0.25)' },
  ];

  labels.forEach(({ text, lat, lng, size, color, rotate }) => {
    const { x, y } = proj(lat, lng);
    ctx.save();
    ctx.translate(x, y);
    if (rotate) ctx.rotate(rotate * Math.PI / 180);
    ctx.font = `bold ${size}px 'Bangers', Impact, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '0.15em';
    ctx.fillText(text, 0, 0);
    ctx.restore();
  });

  /* ── Decorative islands (abstract shapes) ── */
  const islands = [
    { lat: 18, lng: -158, r: 6 }, { lat: 8, lng: -130, r: 4 },
    { lat: -3, lng: -70, r: 8 },  { lat: 35, lng: -55, r: 5 },
    { lat: -2, lng: -30, r: 5 },  { lat: -5, lng: -10, r: 6 },
    { lat: 15, lng: 0, r: 7 },    { lat: -8, lng: 50, r: 5 },
    { lat: -12, lng: 90, r: 4 },  { lat: -8, lng: 118, r: 7 },
    { lat: -20, lng: 142, r: 5 }, { lat: 25, lng: 155, r: 5 },
  ];

  islands.forEach(({ lat, lng, r }) => {
    const { x, y } = proj(lat, lng);
    ctx.beginPath();
    ctx.arc(x, y, r * (W / 360), 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(175,101,40,0.45)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(212,160,23,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  return canvas;
}

/* ─── Globe Builder ──────────────────────────────────────────── */

function createGlobe(scene) {
  const R = MAP_CONFIG.globeRadius;

  /* Main sphere with canvas texture */
  const texture = new THREE.CanvasTexture(buildWorldMapCanvas());
  const geo = new THREE.SphereGeometry(R, 64, 64);
  const mat = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 8,
    specular: new THREE.Color(0x1a3a5c),
  });
  const globe = new THREE.Mesh(geo, mat);
  scene.add(globe);

  /* Atmosphere glow layer */
  const atmGeo = new THREE.SphereGeometry(R * MAP_CONFIG.atmosphereScale, 32, 32);
  const atmMat = new THREE.MeshPhongMaterial({
    color: 0x1a6fa8,
    transparent: true,
    opacity: 0.08,
    side: THREE.FrontSide,
    depthWrite: false,
  });
  scene.add(new THREE.Mesh(atmGeo, atmMat));

  /* Outer glow ring */
  const glowGeo = new THREE.SphereGeometry(R * 1.12, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x4a90d9,
    transparent: true,
    opacity: 0.04,
    side: THREE.BackSide,
    depthWrite: false,
  });
  scene.add(new THREE.Mesh(glowGeo, glowMat));

  return globe;
}

/* ─── Orbital Lines (Grand Line & Red Line) ──────────────────── */

function createOrbitalLines(scene) {
  const R = MAP_CONFIG.globeRadius + 0.012;

  /* Grand Line — horizontal torus at equator */
  const glGeo = new THREE.TorusGeometry(R, 0.006, 8, 180);
  const glMat = new THREE.MeshBasicMaterial({ color: 0xD4A017, transparent: true, opacity: 0.75 });
  const grandLine = new THREE.Mesh(glGeo, glMat);
  grandLine.rotation.x = Math.PI / 2;
  scene.add(grandLine);

  /* Red Line — vertical torus */
  const rlGeo = new THREE.TorusGeometry(R, 0.007, 8, 180);
  const rlMat = new THREE.MeshBasicMaterial({ color: 0xC0392B, transparent: true, opacity: 0.8 });
  scene.add(new THREE.Mesh(rlGeo, rlMat));
}

/* ─── Starfield ──────────────────────────────────────────────── */

function createStarfield(scene) {
  const positions = [];
  for (let i = 0; i < 1800; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 40 + Math.random() * 60;
    positions.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.15, transparent: true, opacity: 0.7 });
  scene.add(new THREE.Points(geo, mat));
}

/* ─── Journey Path ───────────────────────────────────────────── */

/**
 * Shared great-circle interpolation used by both path line and ship animation.
 * @param {{lat,lng}} a - start
 * @param {{lat,lng}} b - end
 * @param {number} steps - interpolation segments
 * @param {number} R - sphere radius
 * @returns {THREE.Vector3[]}
 */
function buildArcPoints(a, b, steps, R) {
  const v1 = latLngToVec3(a.lat, a.lng, R).normalize();
  const v2 = latLngToVec3(b.lat, b.lng, R).normalize();
  const angle = Math.acos(Math.min(1, v1.dot(v2)));
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let pt;
    if (angle < 0.0001) {
      pt = v1.clone();
    } else {
      pt = v1.clone().multiplyScalar(Math.sin((1 - t) * angle))
            .add(v2.clone().multiplyScalar(Math.sin(t * angle)))
            .divideScalar(Math.sin(angle));
    }
    pts.push(pt.multiplyScalar(R));
  }
  return pts;
}

/**
 * Draw the Straw Hat Pirates' journey as a dashed gradient line.
 * Returns the full ordered path points array for ship animation.
 * @returns {THREE.Vector3[]} fullPath - all interpolated points in order
 */
function createJourneyPath(scene) {
  const R        = MAP_CONFIG.globeRadius + 0.025;
  const stops    = WORLD_LOCATIONS.filter(loc => !loc.landmark);
  const count    = stops.length;
  const SEGMENTS = 18;

  const positions  = [];
  const colors     = [];
  const fullPath   = []; // returned for ship to follow

  /* Index of path points where each stop begins (for pause detection) */
  const stopIndices = [0];

  const colorStart = new THREE.Color(0x1565C0);
  const colorEnd   = new THREE.Color(0xD4A017);
  const tempColor  = new THREE.Color();

  for (let i = 0; i < count - 1; i++) {
    const pts = buildArcPoints(stops[i], stops[i + 1], SEGMENTS, R);
    pts.forEach((pt, j) => {
      if (j === pts.length - 1 && i < count - 2) return;
      positions.push(pt.x, pt.y, pt.z);
      const t = (i + j / SEGMENTS) / (count - 1);
      tempColor.lerpColors(colorStart, colorEnd, t);
      colors.push(tempColor.r, tempColor.g, tempColor.b);
      fullPath.push(pt.clone());
    });
    stopIndices.push(fullPath.length - 1);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.LineDashedMaterial({
    vertexColors: true, linewidth: 1,
    dashSize: 0.08, gapSize: 0.04,
    transparent: true, opacity: 0.75,
  });
  const line = new THREE.Line(geo, mat);
  line.computeLineDistances();
  scene.add(line);

  /* Thin glow layer */
  const glowMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.2 });
  scene.add(new THREE.Line(geo.clone(), glowMat));

  return { fullPath, stopIndices, stops };
}

/* ─── Pirate Ship ────────────────────────────────────────────── */

/**
 * Build a canvas sprite for the ship (Thousand Sunny ⛵ emoji).
 * @returns {THREE.Sprite}
 */
function createShipSprite() {
  const SIZE = 128;
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  /* Glow halo */
  const grd = ctx.createRadialGradient(SIZE/2, SIZE/2, SIZE*0.12, SIZE/2, SIZE/2, SIZE*0.5);
  grd.addColorStop(0, 'rgba(255,215,0,0.45)');
  grd.addColorStop(1, 'rgba(255,215,0,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, SIZE, SIZE);

  /* Ship emoji */
  ctx.font = `${SIZE * 0.55}px serif`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('⛵', SIZE / 2, SIZE / 2);

  const tex  = new THREE.CanvasTexture(canvas);
  const mat  = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const ship = new THREE.Sprite(mat);
  ship.scale.setScalar(0.22);
  return ship;
}

/**
 * Animate the pirate ship along the full journey path.
 * Returns an update function to call each frame.
 *
 * Behaviour:
 *   - Ship moves at constant angular speed along pre-computed path points
 *   - Pauses PAUSE_FRAMES frames at each location stop
 *   - Loops back to start after reaching Elbaf
 *
 * @param {THREE.Scene} scene
 * @param {THREE.Vector3[]} fullPath
 * @param {number[]} stopIndices  - indices in fullPath where stops occur
 * @returns {() => void} tick - call once per frame
 */
function createShipAnimation(scene, fullPath, stopIndices) {
  const ship = createShipSprite();
  scene.add(ship);

  const SPEED       = 0.6;   // path indices per frame
  const PAUSE_FRAMES = 55;   // frames to pause at each stop

  let pathIdx   = 0;         // current position in fullPath (float)
  let pauseAt   = -1;        // which stopIndex we're pausing at
  let pauseLeft = 0;         // remaining pause frames

  /* Build a Set for O(1) stop lookup */
  const stopSet = new Set(stopIndices);

  function tick() {
    if (fullPath.length < 2) return;

    /* Handle pause at stops */
    if (pauseLeft > 0) {
      pauseLeft--;
      return;
    }

    /* Advance along path */
    pathIdx += SPEED;
    if (pathIdx >= fullPath.length - 1) {
      pathIdx = 0; // loop back to start
    }

    const idxFloor = Math.floor(pathIdx);
    const frac     = pathIdx - idxFloor;
    const idxNext  = Math.min(idxFloor + 1, fullPath.length - 1);

    /* Interpolate position between two path points */
    const pos = fullPath[idxFloor].clone().lerp(fullPath[idxNext], frac);
    ship.position.copy(pos);

    /* Pause check: did we just cross a stop index? */
    if (stopSet.has(idxFloor) && pauseAt !== idxFloor) {
      pauseAt   = idxFloor;
      pauseLeft = PAUSE_FRAMES;
    }
  }

  return tick;
}

/* ─── Marker System ──────────────────────────────────────────── */

/**
 * Build all location markers and return raycasting targets array.
 */
function createMarkers(scene) {
  const targets = [];
  const R = MAP_CONFIG.globeRadius;

  WORLD_LOCATIONS.forEach((loc, idx) => {
    const sagaData = ONE_PIECE_DATA.find(s => s.id === loc.saga);
    const color = sagaData ? parseInt(sagaData.color.replace('#', ''), 16) : 0xD4A017;
    const isStart = idx === 0; // Foosha Village — first location

    /* Start marker is larger and gold; others use saga color */
    const markerR = isStart ? MAP_CONFIG.markerRadius * 2.2 : MAP_CONFIG.markerRadius;
    const markerColor = isStart ? 0xFFD700 : color;

    /* Marker sphere */
    const geo = new THREE.SphereGeometry(markerR, 12, 12);
    const mat = new THREE.MeshBasicMaterial({ color: markerColor });
    const marker = new THREE.Mesh(geo, mat);

    const pos = latLngToVec3(loc.lat, loc.lng, R + 0.02);
    marker.position.copy(pos);
    marker.userData = { location: loc, originalColor: markerColor, isStart };
    scene.add(marker);

    /* Start marker: pulsing outer ring (animated via userData) */
    if (isStart) {
      const pulseGeo = new THREE.RingGeometry(markerR * 2, markerR * 3, 24);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xFFD700, transparent: true, opacity: 0.5,
        side: THREE.DoubleSide, depthWrite: false,
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pulse.position.copy(pos);
      pulse.lookAt(new THREE.Vector3(0, 0, 0));
      pulse.rotateX(Math.PI / 2);
      pulse.userData.isPulse = true;
      scene.add(pulse);

      /* Second outer ring */
      const pulse2 = pulse.clone();
      pulse2.userData.isPulse = true;
      pulse2.userData.phaseOffset = Math.PI; // out-of-phase for alternating pulse
      scene.add(pulse2);
    }

    /* Glow halo around marker */
    const haloGeo = new THREE.RingGeometry(
      MAP_CONFIG.markerRadius * 1.6,
      MAP_CONFIG.markerRadius * 2.8, 16
    );
    const haloMat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.copy(pos);
    halo.lookAt(new THREE.Vector3(0, 0, 0));
    halo.rotateX(Math.PI / 2);
    scene.add(halo);

    targets.push(marker);
  });

  return targets;
}

/* ─── Info Panel ─────────────────────────────────────────────── */

function buildInfoPanel() {
  const panel = document.getElementById('map-info-panel');

  /**
   * Show location info in side panel.
   * @param {Object} loc - location from WORLD_LOCATIONS
   */
  function showLocation(loc) {
    const sagaData = ONE_PIECE_DATA.find(s => s.id === loc.saga);
    const arcData  = sagaData?.arcs.find(a => a.name === loc.arc);

    if (loc.landmark) {
      panel.innerHTML = `
        <div class="map-panel-header" style="--panel-color: #B7950B">
          <span class="map-panel-icon">${loc.icon}</span>
          <span class="map-panel-name">${loc.name}</span>
        </div>
        <p class="map-panel-desc">Thánh địa của Chính phủ Thế giới — nơi 20 vương quốc thành lập 800 năm trước.</p>
      `;
      panel.classList.add('is-open');
      return;
    }

    if (!sagaData || !arcData) { panel.classList.remove('is-open'); return; }

    const lang = localStorage.getItem('op_lang') || 'vi';
    const summary   = typeof arcData.summary   === 'object' ? (arcData.summary[lang]   ?? arcData.summary.vi)   : arcData.summary;
    const highlight = typeof arcData.highlight === 'object' ? (arcData.highlight[lang] ?? arcData.highlight.vi) : arcData.highlight;

    panel.innerHTML = `
      <div class="map-panel-header" style="--panel-color: ${sagaData.color}">
        <span class="map-panel-icon">${loc.icon}</span>
        <div>
          <span class="map-panel-saga">${sagaData.emoji} ${sagaData.name}</span>
          <span class="map-panel-name">${loc.name}</span>
        </div>
      </div>
      <div class="map-panel-arc-name">${arcData.name} Arc</div>
      <div class="map-panel-chapters">Ch. ${arcData.chapters}</div>
      <p class="map-panel-desc">${summary}</p>
      <div class="map-panel-highlight">
        <span>⚓</span> ${highlight}
      </div>
      <a href="#${sagaData.id}" class="map-panel-link" id="map-go-timeline">
        📜 Xem trong Timeline
      </a>
    `;

    /* Switch to timeline view and scroll to saga */
    panel.querySelector('#map-go-timeline')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('btn-view-timeline')?.click();
      setTimeout(() => {
        const target = document.getElementById(sagaData.id);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 120);
    });

    panel.classList.add('is-open');
  }

  function hide() { panel.classList.remove('is-open'); }

  return { showLocation, hide };
}

/* ─── Tooltip ────────────────────────────────────────────────── */

function buildTooltip() {
  const tip = document.getElementById('map-tooltip');

  function show(name, icon, x, y) {
    tip.innerHTML = `${icon} ${name}`;
    tip.style.left = `${x + 14}px`;
    tip.style.top  = `${y - 10}px`;
    tip.classList.add('is-visible');
  }

  function hide() { tip.classList.remove('is-visible'); }

  return { show, hide };
}

/* ─── Main MapScene ──────────────────────────────────────────── */

let mapInstance = null;

function initWorldMap() {
  const container = document.getElementById('map-canvas-wrapper');
  if (!container || !window.THREE) return;

  /* Prevent double init */
  if (mapInstance) { mapInstance.resize(); return; }

  /* Scene */
  const scene    = new THREE.Scene();
  const W = container.clientWidth || 800;
  const H = container.clientHeight || 600;
  const camera   = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
  camera.position.z = MAP_CONFIG.cameraDistance;

  /* Renderer */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  /* Lighting */
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const sun = new THREE.DirectionalLight(0xfff5e0, 1.0);
  sun.position.set(5, 3, 5);
  scene.add(sun);
  const backLight = new THREE.DirectionalLight(0x1a3a5c, 0.3);
  backLight.position.set(-5, -3, -5);
  scene.add(backLight);

  /* Globe, lines, starfield, journey path, markers */
  createGlobe(scene);
  createOrbitalLines(scene);
  createStarfield(scene);
  const { fullPath, stopIndices } = createJourneyPath(scene);
  const shipTick = createShipAnimation(scene, fullPath, stopIndices);
  const markerTargets = createMarkers(scene);

  /* OrbitControls */
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping   = true;
  controls.dampingFactor   = 0.08;
  controls.autoRotate      = true;
  controls.autoRotateSpeed = MAP_CONFIG.autoRotateSpeed;
  controls.minDistance     = 3.2;
  controls.maxDistance     = 9;
  controls.enablePan       = false;

  /* Raycaster */
  const raycaster = new THREE.Raycaster();
  const mouse     = new THREE.Vector2(-999, -999);
  let   hoveredMarker = null;
  const infoPanel  = buildInfoPanel();
  const tooltip    = buildTooltip();

  /* Mouse interaction */
  renderer.domElement.addEventListener('mousemove', (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(markerTargets);

    if (hits.length > 0) {
      const marker = hits[0].object;
      if (hoveredMarker !== marker) {
        if (hoveredMarker) resetMarker(hoveredMarker);
        hoveredMarker = marker;
        marker.scale.setScalar(1.5);
        renderer.domElement.style.cursor = 'pointer';
        const loc = marker.userData.location;
        const label = marker.userData.isStart ? `[START] ${loc.name}` : loc.name;
        tooltip.show(label, loc.icon, e.clientX - rect.left, e.clientY - rect.top);
      }
    } else {
      if (hoveredMarker) { resetMarker(hoveredMarker); hoveredMarker = null; }
      renderer.domElement.style.cursor = 'grab';
      tooltip.hide();
    }
  });

  renderer.domElement.addEventListener('click', (e) => {
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(markerTargets);
    if (hits.length > 0) {
      const loc = hits[0].object.userData.location;
      infoPanel.showLocation(loc);
      controls.autoRotate = false;
    } else {
      infoPanel.hide();
    }
  });

  renderer.domElement.addEventListener('mouseleave', () => {
    tooltip.hide();
    if (hoveredMarker) { resetMarker(hoveredMarker); hoveredMarker = null; }
  });

  function resetMarker(marker) {
    marker.scale.setScalar(1);
    renderer.domElement.style.cursor = 'grab';
  }

  /* Close info panel button */
  document.getElementById('map-panel-close')?.addEventListener('click', () => {
    infoPanel.hide();
    controls.autoRotate = true;
  });

  /* Auto-rotate toggle button */
  const rotBtn = document.getElementById('map-toggle-rotate');
  if (rotBtn) {
    rotBtn.addEventListener('click', () => {
      controls.autoRotate = !controls.autoRotate;
      rotBtn.textContent = controls.autoRotate ? '⏸ Pause' : '▶ Rotate';
    });
  }

  /* Animate loop */
  let clock = 0;
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    clock += 0.025;
    shipTick();

    /* Pulse animation for start marker rings */
    scene.traverse((obj) => {
      if (!obj.userData?.isPulse) return;
      const phase = obj.userData.phaseOffset ?? 0;
      const t = (Math.sin(clock + phase) + 1) / 2; // 0–1 oscillation
      obj.material.opacity = t * 0.55;
      const s = 1 + t * 0.35;
      obj.scale.setScalar(s);
    });

    renderer.render(scene, camera);
  }
  animate();

  /* Resize handler */
  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', resize);

  mapInstance = { resize };
}

/* ─── View Toggle (Timeline ↔ Map) ──────────────────────────── */

function initViewToggle() {
  const btnTimeline = document.getElementById('btn-view-timeline');
  const btnMap      = document.getElementById('btn-view-map');
  const viewTL      = document.getElementById('view-timeline');
  const viewMap     = document.getElementById('view-map');
  if (!btnTimeline || !btnMap) return;

  function showTimeline() {
    viewTL.hidden  = false;
    viewMap.hidden = true;
    btnTimeline.classList.add('is-active');
    btnTimeline.setAttribute('aria-pressed', 'true');
    btnMap.classList.remove('is-active');
    btnMap.setAttribute('aria-pressed', 'false');
    document.body.classList.remove('map-active');
    window.syncNavForView?.(false);
  }

  function showMap() {
    viewTL.hidden  = true;
    viewMap.hidden = false;
    btnMap.classList.add('is-active');
    btnMap.setAttribute('aria-pressed', 'true');
    btnTimeline.classList.remove('is-active');
    btnTimeline.setAttribute('aria-pressed', 'false');
    document.body.classList.add('map-active');
    window.syncNavForView?.(true);
    /* Lazy-init Three.js on first open */
    requestAnimationFrame(initWorldMap);
  }

  btnTimeline.addEventListener('click', showTimeline);
  btnMap.addEventListener('click', showMap);

  /* Default: timeline */
  showTimeline();
}

document.addEventListener('DOMContentLoaded', () => {
  /* Standalone map page: no view-toggle buttons — init directly */
  if (!document.getElementById('btn-view-map')) {
    if (document.getElementById('map-canvas-wrapper')) initWorldMap();
    return;
  }
  initViewToggle();
});
