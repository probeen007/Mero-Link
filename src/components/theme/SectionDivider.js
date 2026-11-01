'use client';

// Small structural seam rendered once between the bio block and the social
// buttons, styled per layout archetype (see src/libs/layoutArchetypes.js) so
// each theme family reads as a distinct piece of design, not just a recolor.

export default function SectionDivider({ variant = 'plain', isLight = false }) {
  const lineClass = isLight
    ? 'from-transparent via-gray-500/50 to-transparent'
    : 'from-transparent via-white/35 to-transparent';

  switch (variant) {
    case 'circuit':
      return (
        <div className="max-w-md mx-auto px-6 flex items-center gap-1.5 opacity-70" aria-hidden="true">
          <div className={`flex-1 h-px border-t border-dashed ${isLight ? 'border-gray-500/50' : 'border-white/30'}`} />
          <span className={`w-1.5 h-1.5 rotate-45 ${isLight ? 'bg-gray-500/60' : 'bg-white/40'}`} />
          <div className={`flex-1 h-px border-t border-dashed ${isLight ? 'border-gray-500/50' : 'border-white/30'}`} />
        </div>
      );
    case 'glow':
      return (
        <div className="max-w-lg mx-auto px-6" aria-hidden="true">
          <div className={`h-px w-full bg-gradient-to-r ${lineClass} blur-[0.3px]`} />
        </div>
      );
    case 'wavy':
      return (
        <div className="max-w-md mx-auto px-6 flex justify-center opacity-70" aria-hidden="true">
          <svg width="120" height="10" viewBox="0 0 120 10" fill="none">
            <path
              d="M0 5 Q 15 0, 30 5 T 60 5 T 90 5 T 120 5"
              stroke={isLight ? 'rgba(107,114,128,0.5)' : 'rgba(255,255,255,0.35)'}
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      );
    case 'ornate':
      return (
        <div className="max-w-md mx-auto px-6 flex items-center gap-3 opacity-80" aria-hidden="true">
          <div className={`flex-1 h-px ${isLight ? 'bg-gray-500/40' : 'bg-white/25'}`} />
          <span className={`w-1.5 h-1.5 rotate-45 border ${isLight ? 'border-gray-500/60' : 'border-white/50'}`} />
          <div className={`flex-1 h-px ${isLight ? 'bg-gray-500/40' : 'bg-white/25'}`} />
        </div>
      );
    case 'chunky':
      return (
        <div className="max-w-md mx-auto px-6" aria-hidden="true">
          <div
            className="h-[3px] w-full opacity-70"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, currentColor 0 10px, transparent 10px 18px)`,
              color: isLight ? 'rgba(107,114,128,0.5)' : 'rgba(255,255,255,0.4)',
            }}
          />
        </div>
      );
    case 'plain':
    default:
      return (
        <div className="max-w-md mx-auto px-6" aria-hidden="true">
          <div className={`h-px w-full bg-gradient-to-r ${lineClass}`} />
        </div>
      );
  }
}
