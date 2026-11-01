// src/libs/shapeStyles.js
// Renders every profileShape/socialShape declared in themes.js (circle, square,
// diamond, hexagon, star, shield, flower, leaf, blob, heart) as real CSS.
// Returns { className, style } — className carries sizing/base utilities,
// style carries clip-path/border-radius where a Tailwind utility can't express it.

const CLIP_PATHS = {
  // Diamond is clip-path (not `transform: rotate()`) deliberately: a rotate
  // transform on the same element as a framer-motion entrance/hover animation
  // gets clobbered (framer owns the whole `transform` inline style once it
  // animates anything transform-related). Clip-path has no such conflict.
  diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  hexagon: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
  star: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  shield: 'polygon(50% 0%, 100% 20%, 100% 60%, 50% 100%, 0% 60%, 0% 20%)',
  flower: 'polygon(50% 0%, 67% 20.6%, 93.3% 25%, 84% 50%, 93.3% 75%, 67% 79.4%, 50% 100%, 33% 79.4%, 6.7% 75%, 16% 50%, 6.7% 25%, 33% 20.6%)',
  heart: 'polygon(50% 15%, 61% 3%, 75% 0%, 88% 6%, 95% 18%, 95% 32%, 85% 50%, 50% 85%, 15% 50%, 5% 32%, 5% 18%, 12% 6%, 25% 0%, 39% 3%)',
};

const BORDER_RADIUS_SHAPES = {
  leaf: '0% 100% 0% 100%',
  blob: '63% 37% 54% 46% / 45% 55% 45% 55%',
};

const SIZE_BASE = {
  profile: 'w-28 h-28 sm:w-36 sm:h-36 overflow-hidden shrink-0',
  social: 'w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0',
  thumbnail: 'w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 overflow-hidden',
};

const SQUARE_ROUNDING = {
  profile: 'rounded-2xl',
  social: 'rounded-xl',
  thumbnail: 'rounded-lg',
};

// type: 'profile' | 'social' | 'thumbnail'
// Returns { className, style, isClipped } — no shape needs inner counter-
// rotation, so callers never need to touch the icon/image inside.
export function getShapeStyle(shape, type = 'social') {
  const base = SIZE_BASE[type] || SIZE_BASE.social;

  if (CLIP_PATHS[shape]) {
    return { className: base, style: { clipPath: CLIP_PATHS[shape] }, isClipped: true };
  }
  if (BORDER_RADIUS_SHAPES[shape]) {
    return { className: base, style: { borderRadius: BORDER_RADIUS_SHAPES[shape] }, isClipped: false };
  }
  if (shape === 'square') {
    return { className: `${base} ${SQUARE_ROUNDING[type] || 'rounded-lg'}`, style: {}, isClipped: false };
  }
  // circle default (also covers unrecognized/undefined shape values)
  return { className: `${base} rounded-full`, style: {}, isClipped: false };
}
