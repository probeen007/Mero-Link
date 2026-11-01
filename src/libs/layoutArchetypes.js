// src/libs/layoutArchetypes.js
// Groups the 36 themes into 6 structural "archetypes" so the live page isn't
// an identical skeleton for every theme. Each theme declares a `layout` key
// (see themes.js) that indexes into this table. One flexible render path in
// LiveUserPage.js reads these values — no per-theme forking of the component.

export const layoutArchetypes = {
  minimal: {
    label: 'Minimal',
    sectionSpacing: 'mt-4 sm:mt-5',
    dividerVariant: 'plain',
    avatarFrameClass: '',
    linksCols: 'md:grid-cols-2',
    linksGap: 'gap-2 sm:gap-4 md:gap-6',
    entrance: { stagger: 0.05, stiffness: 260, damping: 28, y: 10, scale: 1 },
    idle: null,
  },
  'tech-grid': {
    label: 'Tech Grid',
    sectionSpacing: 'mt-3 sm:mt-4',
    dividerVariant: 'circuit',
    avatarFrameClass: 'ring-2 ring-offset-2 ring-offset-transparent ring-white/20',
    linksCols: 'sm:grid-cols-2 lg:grid-cols-3',
    linksGap: 'gap-2 sm:gap-3',
    entrance: { stagger: 0.04, stiffness: 420, damping: 24, y: 8, scale: 0.96 },
    idle: null,
  },
  'cosmic-glass': {
    label: 'Cosmic Glass',
    sectionSpacing: 'mt-7 sm:mt-9',
    dividerVariant: 'glow',
    avatarFrameClass: 'shadow-[0_0_36px_rgba(255,255,255,0.18)]',
    linksCols: 'md:grid-cols-2',
    linksGap: 'gap-3 sm:gap-5',
    entrance: { stagger: 0.08, stiffness: 120, damping: 20, y: 24, scale: 0.98 },
    idle: { keyframes: { y: [0, -6, 0] }, duration: 4 },
  },
  'organic-flow': {
    label: 'Organic Flow',
    sectionSpacing: 'mt-7 sm:mt-9',
    dividerVariant: 'wavy',
    avatarFrameClass: 'shadow-[0_6px_24px_rgba(0,0,0,0.25)]',
    linksCols: 'grid-cols-1',
    linksGap: 'gap-3 sm:gap-4',
    entrance: { stagger: 0.07, stiffness: 180, damping: 16, y: 16, scale: 1 },
    idle: { keyframes: { rotate: [0, -2, 2, 0] }, duration: 6 },
  },
  'heritage-ornate': {
    label: 'Heritage Ornate',
    sectionSpacing: 'mt-8 sm:mt-10',
    dividerVariant: 'ornate',
    avatarFrameClass: 'ring-1 ring-offset-4 ring-offset-transparent ring-white/25',
    linksCols: 'grid-cols-1',
    linksGap: 'gap-3',
    entrance: { stagger: 0.09, stiffness: 200, damping: 30, y: 14, scale: 0.99 },
    idle: null,
  },
  'playful-pop': {
    label: 'Playful Pop',
    sectionSpacing: 'mt-3 sm:mt-4',
    dividerVariant: 'chunky',
    avatarFrameClass: 'shadow-[0_4px_0_rgba(0,0,0,0.25)]',
    linksCols: 'sm:grid-cols-2',
    linksGap: 'gap-2 sm:gap-3',
    entrance: { stagger: 0.06, stiffness: 520, damping: 13, y: 20, scale: 0.9 },
    idle: { keyframes: { rotate: [0, -4, 4, 0] }, duration: 2.2 },
  },
};

export function getLayoutArchetype(layoutKey) {
  return layoutArchetypes[layoutKey] || layoutArchetypes.minimal;
}
