// Profile themes are plain data. ProfileView + profile.css turn them into a page:
// colours/fonts/radius become --p-* CSS variables, `button`, `avatar`, `align`,
// `effect` and `entrance` become data-attributes that profile.css styles.
import { FONT_CHOICES } from '@/libs/fontChoices';

export const THEMES = {
  paper: {
    name: 'Paper', vibe: 'Clean, quiet, lets your links talk',
    bg: '#F7F7F5', fg: '#141414', muted: '#6B6B6B', card: '#141414', cardFg: '#FFFFFF', accent: '#141414', line: 'rgba(20,20,20,.1)',
    display: 'geist', body: 'geist', button: 'fill', radius: 14, avatar: 'circle', align: 'center', effect: 'none', entrance: 'rise', dark: false,
  },
  midnight: {
    name: 'Midnight', vibe: 'Dark, warm glow, zero noise',
    bg: '#0C0C10', fg: '#F4F4F5', muted: '#A1A1AA', card: '#1B1B22', cardFg: '#F4F4F5', accent: '#FF4D2E', line: 'rgba(255,255,255,.09)',
    display: 'geist', body: 'geist', button: 'fill', radius: 16, avatar: 'circle', align: 'center', effect: 'glow', entrance: 'rise', dark: true,
  },
  sticker: {
    name: 'Sticker', vibe: 'Bold borders, hard shadows, pure fun',
    bg: '#FFE27A', fg: '#111014', muted: '#4A4636', card: '#FFFFFF', cardFg: '#111014', accent: '#FF4D2E', line: '#111014',
    display: 'bricolage', body: 'geist', button: 'hard', radius: 18, avatar: 'squircle', align: 'center', effect: 'confetti', entrance: 'pop', dark: false,
  },
  bubblegum: {
    name: 'Bubblegum', vibe: 'Soft pastels and floating bubbles',
    bg: 'linear-gradient(180deg,#FFD6EA 0%,#FFBEDC 45%,#D2C0FF 100%)', fg: '#3B0A2A', muted: '#7A3C62', card: 'rgba(255,255,255,.8)', cardFg: '#3B0A2A', accent: '#FF4FA3', line: 'rgba(255,255,255,.95)',
    display: 'fredoka', body: 'fredoka', button: 'fill', radius: 999, avatar: 'blob', align: 'center', effect: 'bubbles', entrance: 'pop', dark: false,
  },
  brutal: {
    name: 'Brutal', vibe: 'Raw grid, loud type, no apologies',
    bg: '#F2F2F0', fg: '#0A0A0A', muted: '#3D3D3D', card: '#D4F55A', cardFg: '#0A0A0A', accent: '#0A0A0A', line: '#0A0A0A',
    display: 'archivo', body: 'geist', button: 'hard', radius: 0, avatar: 'square', align: 'left', effect: 'grid', entrance: 'slide', dark: false,
  },
  aurora: {
    name: 'Aurora', vibe: 'Northern lights drifting behind glass',
    bg: '#060A18', fg: '#F5F7FF', muted: 'rgba(245,247,255,.68)', card: 'rgba(255,255,255,.08)', cardFg: '#F5F7FF', accent: '#7CF7D4', line: 'rgba(255,255,255,.16)',
    display: 'space', body: 'geist', button: 'glass', radius: 20, avatar: 'circle', align: 'center', effect: 'aurora', entrance: 'blur', dark: true,
  },
  cosmos: {
    name: 'Cosmos', vibe: 'Deep space, slow stars, shooting streaks',
    bg: 'radial-gradient(ellipse at 50% 115%,#211857 0%,#090717 55%,#04030B 100%)', fg: '#EEF0FF', muted: 'rgba(238,240,255,.64)', card: 'rgba(255,255,255,.06)', cardFg: '#EEF0FF', accent: '#B9A6FF', line: 'rgba(255,255,255,.14)',
    display: 'space', body: 'geist', button: 'glass', radius: 16, avatar: 'circle', align: 'center', effect: 'stars', entrance: 'blur', dark: true,
  },
  terminal: {
    name: 'Terminal', vibe: 'Green phosphor and a blinking caret',
    bg: '#050805', fg: '#7CFF8A', muted: 'rgba(124,255,138,.62)', card: 'transparent', cardFg: '#7CFF8A', accent: '#7CFF8A', line: 'rgba(124,255,138,.45)',
    display: 'mono', body: 'mono', button: 'outline', radius: 2, avatar: 'square', align: 'left', effect: 'scanlines', entrance: 'type', dark: true,
  },
  synthwave: {
    name: 'Synthwave', vibe: 'Sunset sun, endless neon grid',
    bg: 'linear-gradient(180deg,#0D0018 0%,#1E0333 55%,#3A0750 100%)', fg: '#FFE9FF', muted: 'rgba(255,233,255,.72)', card: 'rgba(16,0,28,.6)', cardFg: '#FFE9FF', accent: '#FF5FD2', line: '#FF5FD2',
    display: 'righteous', body: 'outfit', button: 'outline', radius: 6, avatar: 'circle', align: 'center', effect: 'synth', entrance: 'rise', dark: true,
  },
  arcade: {
    name: 'Arcade', vibe: '8-bit sky, pixel clouds, press start',
    bg: '#5C8DFC', fg: '#FFFFFF', muted: 'rgba(255,255,255,.88)', card: '#FFD23F', cardFg: '#1B1B3A', accent: '#FFD23F', line: '#1B1B3A',
    display: 'pixel', body: 'mono', button: 'pixel', radius: 0, avatar: 'square', align: 'center', effect: 'pixels', entrance: 'pop', dark: false,
  },
  neonnoir: {
    name: 'Neon Noir', vibe: 'City rain and a glitching sign',
    bg: 'linear-gradient(180deg,#0B0716 0%,#150A26 100%)', fg: '#E9F1FF', muted: 'rgba(233,241,255,.62)', card: 'rgba(10,8,20,.65)', cardFg: '#E9F1FF', accent: '#00E5FF', line: 'rgba(0,229,255,.55)',
    display: 'rajdhani', body: 'rajdhani', button: 'outline', radius: 4, avatar: 'hex', align: 'center', effect: 'rain', entrance: 'rise', dark: true,
  },
  editorial: {
    name: 'Editorial', vibe: 'Newsprint grain and serif headlines',
    bg: '#F1EEE8', fg: '#1C1B19', muted: '#6F6A60', card: 'transparent', cardFg: '#1C1B19', accent: '#B4271B', line: 'rgba(28,27,25,.85)',
    display: 'dmserif', body: 'geist', button: 'underline', radius: 0, avatar: 'arch', align: 'left', effect: 'grain', entrance: 'rise', dark: false,
  },
  botanical: {
    name: 'Botanical', vibe: 'Sage greens and drifting leaves',
    bg: 'linear-gradient(180deg,#E9F1E1 0%,#CFE0C3 100%)', fg: '#1F3A2B', muted: '#4E6B57', card: '#1F3A2B', cardFg: '#F1F6EC', accent: '#E07A4F', line: 'rgba(31,58,43,.15)',
    display: 'youngserif', body: 'nunito', button: 'fill', radius: 18, avatar: 'leaf', align: 'center', effect: 'leaves', entrance: 'rise', dark: false,
  },
  ocean: {
    name: 'Ocean', vibe: 'Rolling waves in deep blue',
    bg: 'linear-gradient(180deg,#012440 0%,#01497C 60%,#1D6A93 100%)', fg: '#EAF6FF', muted: 'rgba(234,246,255,.72)', card: 'rgba(255,255,255,.1)', cardFg: '#EAF6FF', accent: '#7FDBFF', line: 'rgba(255,255,255,.2)',
    display: 'outfit', body: 'outfit', button: 'glass', radius: 22, avatar: 'circle', align: 'center', effect: 'waves', entrance: 'rise', dark: true,
  },
  sakura: {
    name: 'Sakura', vibe: 'Blush pink and falling petals',
    bg: 'linear-gradient(180deg,#FFF6F8 0%,#FFE0E8 100%)', fg: '#4A2B35', muted: '#8C6370', card: '#FFFFFF', cardFg: '#4A2B35', accent: '#E8749A', line: 'rgba(232,116,154,.3)',
    display: 'zenmaru', body: 'zenmaru', button: 'fill', radius: 999, avatar: 'circle', align: 'center', effect: 'petals', entrance: 'blur', dark: false,
  },
  himalaya: {
    name: 'Himalaya', vibe: 'Dawn peaks and prayer flags',
    bg: 'linear-gradient(180deg,#0B1A36 0%,#22406F 55%,#5873A6 100%)', fg: '#FFFFFF', muted: 'rgba(255,255,255,.78)', card: 'rgba(255,255,255,.94)', cardFg: '#0F2550', accent: '#DC143C', line: 'rgba(255,255,255,.5)',
    display: 'mukta', body: 'mukta', button: 'fill', radius: 14, avatar: 'circle', align: 'center', effect: 'mountains', entrance: 'rise', dark: true,
  },
};

export const THEME_KEYS = Object.keys(THEMES);
export const DEFAULT_THEME = 'midnight';

// Old theme keys (pre-redesign) mapped to their closest new theme.
const LEGACY = {
  default: 'midnight', light: 'paper', corporate: 'paper',
  starfield: 'cosmos', galaxy: 'cosmos', cosmic: 'cosmos',
  gamer: 'arcade', minecraft: 'arcade',
  coder: 'terminal', hacker: 'terminal',
  elegant: 'editorial', artdeco: 'editorial', medieval: 'editorial', egyptian: 'editorial', viking: 'editorial',
  funky: 'sticker', cartoon: 'sticker',
  feminine: 'bubblegum', anime: 'bubblegum',
  retro: 'synthwave', desertdune: 'synthwave', sunsetcliff: 'synthwave',
  nature: 'botanical', forest: 'botanical', emeraldlake: 'botanical', adventure: 'botanical', tropical: 'botanical',
  arcticglass: 'ocean',
  neon: 'neonnoir', cyberpunk: 'neonnoir', rainycity: 'neonnoir', volcanicforge: 'neonnoir',
  nepal: 'himalaya',
};

export function normalizeThemeKey(key) {
  if (THEMES[key]) return key;
  return LEGACY[key] || DEFAULT_THEME;
}

// ---- Builder options -------------------------------------------------------

export const BUTTON_STYLES = {
  fill: 'Filled', outline: 'Outline', glass: 'Glass', hard: 'Sticker', underline: 'Underline', pixel: 'Pixel',
};

export const RADII = { sharp: 0, soft: 12, round: 20, pill: 999 };

export const GRADIENTS = {
  sunset: { label: 'Sunset', css: 'linear-gradient(160deg,#FF7A59 0%,#FF4D8D 50%,#7B3FE4 100%)', fg: '#FFFFFF' },
  lagoon: { label: 'Lagoon', css: 'linear-gradient(160deg,#00C9A7 0%,#008DC9 100%)', fg: '#FFFFFF' },
  peach: { label: 'Peach', css: 'linear-gradient(160deg,#FFE3C2 0%,#FFB4A2 100%)', fg: '#3A1E14' },
  mint: { label: 'Mint', css: 'linear-gradient(160deg,#E6FFF4 0%,#A8F0D1 100%)', fg: '#0E3B2E' },
  dusk: { label: 'Dusk', css: 'linear-gradient(160deg,#1E1B4B 0%,#6D28D9 100%)', fg: '#FFFFFF' },
  lemon: { label: 'Lemon', css: 'linear-gradient(160deg,#FFF7AE 0%,#D4F55A 100%)', fg: '#1F2A07' },
  ember: { label: 'Ember', css: 'linear-gradient(160deg,#2B0A06 0%,#B3261E 100%)', fg: '#FFFFFF' },
  sky: { label: 'Sky', css: 'linear-gradient(160deg,#E0F2FF 0%,#9CCBFF 100%)', fg: '#0B2545' },
};

export const BG_MODES = ['theme', 'color', 'gradient', 'image'];

// ---- Resolution ------------------------------------------------------------

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

function readableOn(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? '#111014' : '#FFFFFF';
}

const soft = (color, pct) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;

// Old pages stored bgType/adaptBackground. Only an explicit image survives;
// everything else falls back to the theme background.
export function getBgMode(page) {
  if (page?.bgMode && BG_MODES.includes(page.bgMode)) return page.bgMode;
  if (page?.bgType === 'image' && page?.bgImage && !page?.adaptBackground) return 'image';
  return 'theme';
}

// Returns everything ProfileView needs: the base theme, data-attributes and
// the CSS-variable style object with builder overrides applied.
export function resolveTheme(page) {
  const key = normalizeThemeKey(page?.theme);
  const t = THEMES[key];
  const o = page?.themeOverrides || {};

  let { bg, fg, muted, card, cardFg, accent, line } = t;
  let effect = t.effect;
  let dark = t.dark;

  const bgMode = getBgMode(page);
  if (bgMode === 'color' && HEX.test(page?.bgColor || '')) {
    bg = page.bgColor; fg = readableOn(bg); muted = soft(fg, 68); effect = 'none';
  } else if (bgMode === 'gradient' && GRADIENTS[o.gradient]) {
    bg = GRADIENTS[o.gradient].css; fg = GRADIENTS[o.gradient].fg; muted = soft(fg, 72); effect = 'none';
  } else if (bgMode === 'image' && page?.bgImage) {
    bg = `linear-gradient(rgba(8,8,12,.45),rgba(8,8,12,.7)), url("${encodeURI(page.bgImage)}") center/cover`;
    fg = '#FFFFFF'; muted = 'rgba(255,255,255,.75)'; effect = 'none';
  }
  if (bgMode !== 'theme') dark = fg === '#FFFFFF';

  if (HEX.test(o.accent || '')) {
    accent = o.accent; card = o.accent; cardFg = readableOn(o.accent);
  }

  const button = BUTTON_STYLES[o.button] ? o.button : t.button;
  const radius = o.radius in RADII ? RADII[o.radius] : t.radius;
  const display = FONT_CHOICES[o.font] ? o.font : t.display;
  // Pixel fonts are a headline treatment only; keep body copy readable.
  const body = FONT_CHOICES[o.font] && o.font !== 'pixel' ? o.font : t.body;

  return {
    key,
    theme: t,
    dark,
    attrs: {
      'data-button': button,
      'data-avatar': t.avatar,
      'data-align': t.align,
      'data-effect': effect,
      'data-entrance': t.entrance,
      'data-font': display,
    },
    style: {
      '--p-bg': bg,
      '--p-fg': fg,
      '--p-muted': muted,
      '--p-card': card,
      '--p-card-fg': cardFg,
      '--p-accent': accent,
      '--p-line': line,
      '--p-radius': `${radius}px`,
      '--p-font-display': FONT_CHOICES[display].stack,
      '--p-font-body': FONT_CHOICES[body].stack,
    },
  };
}
