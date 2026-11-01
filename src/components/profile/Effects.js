// Animated theme backgrounds. Pure markup; all motion lives in profile.css and
// only animates transform/opacity. Positions come from a seeded generator so
// server and client render identical markup.

function seeded(count, seed) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    x: Math.round(rand() * 100),
    size: rand(),
    dur: rand(),
    delay: rand(),
  }));
}

// A falling/rising particle: a full-height column that translates by its own
// height, with the visible particle drawn by the inner span. See .fx-col.
function Columns({ kind, count, seed, dir = 'down', minDur, maxDur, minSize, maxSize }) {
  return seeded(count, seed).map((p, i) => (
    <span
      key={i}
      className={`fx-col fx-${dir}`}
      style={{
        left: `${p.x}%`,
        '--d': `${(minDur + p.dur * (maxDur - minDur)).toFixed(1)}s`,
        '--delay': `${(-p.delay * maxDur).toFixed(1)}s`,
      }}
    >
      <span className={`fx-${kind}`} style={{ '--s': `${Math.round(minSize + p.size * (maxSize - minSize))}px` }} />
    </span>
  ));
}

const PRAYER_FLAGS = ['#2E5BFF', '#FFFFFF', '#DC143C', '#1FA055', '#FFC72C'];

export function Backdrop({ effect }) {
  switch (effect) {
    case 'glow':
      return (
        <>
          <span className="fx-orb fx-orb-1" />
          <span className="fx-orb fx-orb-2" />
        </>
      );
    case 'confetti':
      return <span className="fx-confetti" />;
    case 'bubbles':
      return <Columns kind="bubble" count={14} seed={7} dir="up" minDur={14} maxDur={26} minSize={14} maxSize={58} />;
    case 'grid':
      return (
        <>
          <span className="fx-grid" />
          <span className="fx-spin" />
        </>
      );
    case 'aurora':
      return (
        <>
          <span className="fx-band fx-band-1" />
          <span className="fx-band fx-band-2" />
          <span className="fx-band fx-band-3" />
          <span className="fx-stars fx-stars-dim" />
        </>
      );
    case 'stars':
      return (
        <>
          <span className="fx-stars" />
          <span className="fx-stars fx-stars-2" />
          <span className="fx-shoot" />
          <span className="fx-shoot fx-shoot-2" />
          <span className="fx-nebula" />
        </>
      );
    case 'synth':
      return (
        <>
          <span className="fx-sun" />
          <span className="fx-floor"><span className="fx-plane"><span className="fx-plane-grid" /></span></span>
        </>
      );
    case 'pixels':
      return (
        <>
          {[12, 34, 58].map((top, i) => (
            <span key={top} className="fx-cloud-row" style={{ top: `${top}%`, '--d': `${48 + i * 14}s`, '--delay': `${-i * 17}s` }}>
              <span className="fx-cloud" />
            </span>
          ))}
          <span className="fx-ground" />
        </>
      );
    case 'rain':
      return (
        <>
          <span className="fx-city" />
          <Columns kind="drop" count={34} seed={3} minDur={0.7} maxDur={1.4} minSize={40} maxSize={90} />
        </>
      );
    case 'leaves':
      return <Columns kind="leaf" count={10} seed={11} minDur={16} maxDur={28} minSize={12} maxSize={22} />;
    case 'waves':
      return (
        <>
          <span className="fx-caustic" />
          <span className="fx-wave fx-wave-1" />
          <span className="fx-wave fx-wave-2" />
          <span className="fx-wave fx-wave-3" />
        </>
      );
    case 'petals':
      return <Columns kind="petal" count={16} seed={5} minDur={12} maxDur={22} minSize={9} maxSize={15} />;
    case 'mountains':
      return (
        <>
          <span className="fx-moon" />
          <span className="fx-flags" aria-hidden>
            {Array.from({ length: 15 }, (_, i) => (
              <span key={i} className="fx-flag" style={{ background: PRAYER_FLAGS[i % 5], '--i': i }} />
            ))}
          </span>
          <span className="fx-ridge fx-ridge-1" />
          <span className="fx-ridge fx-ridge-2" />
          <span className="fx-ridge fx-ridge-3" />
        </>
      );
    default:
      return null;
  }
}

// Effects drawn above the content (still pointer-events: none).
export function Overlay({ effect }) {
  if (effect === 'scanlines') return <><span className="fx-scan" /><span className="fx-scanbar" /></>;
  if (effect === 'grain') return <span className="fx-grain" />;
  return null;
}
