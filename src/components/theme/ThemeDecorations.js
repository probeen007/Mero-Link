'use client';

// Bespoke ambient background decoration per theme, matching its name/identity.
// Pure CSS/SVG (no raster images) so it's covered for free by the global
// `prefers-reduced-motion` rule in globals.css. `default`/`light`/`corporate`
// (the `minimal` layout archetype) deliberately render nothing — that's the
// existing `hasPageAnimation: false` intent, not a gap.
export default function ThemeDecorations({ themeKey }) {
  if (!themeKey) return null;

  switch (themeKey) {
    case "aurora":
      return (
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-emerald-500/20 blur-[120px] animate-[themeWaveFlow_25s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-cyan-500/15 blur-[100px] animate-[themeWaveFlow_30s_ease-in-out_infinite_2s]" />
          <div className="absolute top-[30%] left-[40%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[90px] animate-[themeWaveFlow_20s_ease-in-out_infinite_4s]" />
        </div>
      );
    case "neon":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: "linear-gradient(rgba(6,182,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }} />
          <div className="absolute w-full h-1 bg-cyan-500/20 blur-[2px] animate-[themeScanline_8s_linear_infinite]" />
        </div>
      );
    case "starfield":
    case "galaxy":
    case "cosmic":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_8px_#fff]"
              style={{
                top: `${(i * 17) % 100}%`,
                left: `${(i * 23) % 100}%`,
                opacity: 0.15 + ((i * 3) % 7) * 0.1,
                animationDuration: `${2 + (i % 3)}s`,
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>
      );
    case "coder":
    case "hacker":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none font-mono text-[9px] text-green-500/15 leading-none">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px)",
            backgroundSize: "100% 4px"
          }} />
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-[themeRain_8s_linear_infinite]"
              style={{
                left: `${i * 12.5 + 2}%`,
                animationDuration: `${6 + (i % 4) * 2}s`,
                animationDelay: `${i * 0.7}s`,
                whiteSpace: "pre-wrap",
                width: "12px"
              }}
            >
              {"1010110010110101101".split("").map((char, idx) => (
                <div key={idx} style={{ opacity: 1 - idx * 0.05 }}>{char}</div>
              ))}
            </div>
          ))}
        </div>
      );
    case "sakura":
    case "anime":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2.5 h-3 bg-pink-300/40 rounded-tr-[50%] rounded-bl-[50%] shadow-[0_0_6px_rgba(244,143,177,0.2)] animate-[themeSakuraPetal_12s_linear_infinite]"
              style={{
                left: `${(i * 13) % 90 + 5}%`,
                animationDuration: `${8 + (i % 3) * 3}s`,
                animationDelay: `${i * 1.2}s`,
                transform: `rotate(${i * 36}deg)`
              }}
            />
          ))}
        </div>
      );
    case "ocean":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-cyan-400/20 rounded-full animate-[themeFloatUp_14s_linear_infinite]"
              style={{
                width: `${6 + (i % 3) * 4}px`,
                height: `${6 + (i % 3) * 4}px`,
                left: `${(i * 9) % 95}%`,
                animationDuration: `${10 + (i % 4) * 3}s`,
                animationDelay: `${i * 0.9}s`
              }}
            />
          ))}
        </div>
      );
    case "forest":
    case "nature":
    case "emeraldlake":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-emerald-400/30 rounded-full blur-[0.5px] shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-[themeFloatUp_18s_linear_infinite]"
              style={{
                left: `${(i * 11) % 90 + 5}%`,
                animationDuration: `${12 + (i % 3) * 4}s`,
                animationDelay: `${i * 1.5}s`
              }}
            />
          ))}
        </div>
      );
    case "rainycity":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[50px] bg-gradient-to-b from-sky-400/0 to-sky-400/30 animate-[themeRain_3.5s_linear_infinite]"
              style={{
                left: `${(i * 7) % 98}%`,
                animationDuration: `${2.2 + (i % 3) * 0.6}s`,
                animationDelay: `${i * 0.25}s`
              }}
            />
          ))}
        </div>
      );
    case "volcanicforge":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-[themeFloatUp_12s_linear_infinite]"
              style={{
                left: `${(i * 13) % 90 + 5}%`,
                animationDuration: `${7 + (i % 4) * 3}s`,
                animationDelay: `${i * 0.8}s`
              }}
            />
          ))}
        </div>
      );
    case "retro":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex flex-col justify-end">
          <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-b from-orange-500 via-pink-500 to-transparent blur-[1px] opacity-35 animate-[themeSunPulse_8s_ease-in-out_infinite]" style={{
            maskImage: "repeating-linear-gradient(to bottom, black, black 16px, transparent 16px, transparent 22px)",
            WebkitMaskImage: "repeating-linear-gradient(to bottom, black, black 16px, transparent 16px, transparent 22px)"
          }} />
          <div className="w-full h-[35%] opacity-15" style={{
            backgroundImage: "linear-gradient(transparent 50%, rgba(236,72,153,0.3) 50%), linear-gradient(90deg, rgba(236,72,153,0.3) 1px, transparent 1px)",
            backgroundSize: "100% 20px, 30px 100%",
            perspective: "200px",
            transform: "rotateX(60deg) scale(2)",
            transformOrigin: "bottom center"
          }} />
        </div>
      );
    case "cyberpunk":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-24 h-24 border border-yellow-500/10 border-dashed animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-16 border-r border-t border-yellow-500/10 border-dashed" />
          <div className="absolute w-full h-[2px] bg-yellow-500/10 blur-[1px] animate-[themeScanline_6s_linear_infinite]" />
        </div>
      );
    case "gamer":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-1 bg-fuchsia-500/25 blur-[2px] animate-[themeScanline_7s_linear_infinite]" />
          <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-fuchsia-400/30" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-pink-400/30" />
        </div>
      );
    case "elegant":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(ellipse 40% 30% at 50% 50%, rgba(255,215,0,.05) 0%, transparent 60%)", animation: "themeBreathe 24s ease-in-out infinite" }} />
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute w-[3px] h-[3px] bg-yellow-200/70 rounded-full shadow-[0_0_6px_rgba(255,215,0,.6)] animate-pulse"
              style={{ top: `${(i * 13) % 90 + 5}%`, left: `${(i * 19) % 90 + 5}%`, animationDuration: `${3 + (i % 3)}s`, animationDelay: `${i * 0.5}s` }} />
          ))}
        </div>
      );
    case "funky":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
          <div className="absolute top-[10%] left-[10%] w-40 h-40 rounded-full bg-red-500/20 blur-[50px] animate-[themeWaveFlow_16s_ease-in-out_infinite]" />
          <div className="absolute bottom-[15%] right-[15%] w-48 h-48 rounded-full bg-cyan-400/20 blur-[60px] animate-[themeWaveFlow_20s_ease-in-out_infinite_3s]" />
          <div className="absolute top-[40%] right-[30%] w-32 h-32 rounded-full bg-yellow-400/15 blur-[45px] animate-[themeWaveFlow_14s_ease-in-out_infinite_1.5s]" />
        </div>
      );
    case "feminine":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-pink-300/25 blur-[1px] animate-[themeFloatUp_16s_linear_infinite]"
              style={{ width: `${6 + (i % 3) * 4}px`, height: `${6 + (i % 3) * 4}px`, left: `${(i * 11) % 90 + 5}%`, animationDuration: `${11 + (i % 3) * 3}s`, animationDelay: `${i * 1.3}s` }} />
          ))}
        </div>
      );
    case "nepal":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 30% at 50% 80%, rgba(234,179,8,.06) 0%, transparent 55%)", animation: "themeBreathe 20s ease-in-out infinite" }} />
          {[...Array(9)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-amber-400/70 rounded-full shadow-[0_0_6px_rgba(251,191,36,.7)] animate-[themeFloatUp_14s_linear_infinite]"
              style={{ left: `${(i * 11) % 90 + 5}%`, animationDuration: `${9 + (i % 3) * 3}s`, animationDelay: `${i * 0.9}s` }} />
          ))}
        </div>
      );
    case "minecraft":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ imageRendering: "pixelated" }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`absolute animate-[themeRain_9s_linear_infinite] ${i % 2 === 0 ? "bg-emerald-600/40" : "bg-amber-800/40"}`}
              style={{ width: "10px", height: "10px", left: `${i * 10 + 2}%`, animationDuration: `${7 + (i % 4) * 2}s`, animationDelay: `${i * 0.6}s` }} />
          ))}
        </div>
      );
    case "adventure":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
          <svg className="w-64 h-64 opacity-[0.05] animate-[themeCompassSpin_60s_linear_infinite]" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="46" stroke="#fbbf24" strokeWidth="1" />
            <path d="M50 8 L56 50 L50 92 L44 50 Z" fill="#fbbf24" />
            <path d="M8 50 L50 44 L92 50 L50 56 Z" fill="#fbbf24" opacity="0.6" />
          </svg>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-amber-200/40 rounded-full animate-[themeDrift_18s_ease-in-out_infinite]"
              style={{ top: `${(i * 17) % 90 + 5}%`, left: `${(i * 23) % 90 + 5}%`, animationDelay: `${i * 1.1}s` }} />
          ))}
        </div>
      );
    case "cartoon":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => {
            const colors = ["bg-red-400/30", "bg-blue-400/30", "bg-yellow-400/30", "bg-emerald-400/30"];
            return (
              <div key={i} className={`absolute rounded-full ${colors[i % colors.length]} animate-[themePopBounce_3s_ease-in-out_infinite]`}
                style={{ width: `${8 + (i % 3) * 4}px`, height: `${8 + (i % 3) * 4}px`, top: `${(i * 13) % 85 + 5}%`, left: `${(i * 19) % 85 + 5}%`, animationDelay: `${i * 0.3}s` }} />
            );
          })}
        </div>
      );
    case "egyptian":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-b from-amber-400/25 to-transparent blur-[10px] animate-[themeSunPulse_10s_ease-in-out_infinite]" />
          {[...Array(9)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-amber-300/50 rounded-full animate-[themeFloatUp_20s_linear_infinite]"
              style={{ left: `${(i * 11) % 90 + 5}%`, animationDuration: `${14 + (i % 3) * 4}s`, animationDelay: `${i * 1.4}s` }} />
          ))}
        </div>
      );
    case "viking":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 inset-x-0 h-1/3" style={{ background: "radial-gradient(ellipse 50% 100% at 50% 100%, rgba(180,83,9,.1) 0%, transparent 60%)", animation: "themeBreathe 18s ease-in-out infinite" }} />
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-orange-500/70 rounded-full shadow-[0_0_6px_rgba(251,146,60,.7)] animate-[themeFloatUp_12s_linear_infinite]"
              style={{ left: `${(i * 10) % 90 + 5}%`, animationDuration: `${7 + (i % 4) * 2}s`, animationDelay: `${i * 0.7}s` }} />
          ))}
        </div>
      );
    case "medieval":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[8%] w-20 h-20 rounded-full bg-amber-500/15 blur-[24px] animate-[themeFlicker_2.4s_ease-in-out_infinite]" />
          <div className="absolute top-[15%] right-[10%] w-16 h-16 rounded-full bg-red-500/12 blur-[20px] animate-[themeFlicker_3.1s_ease-in-out_infinite_0.6s]" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-white/20 rounded-full animate-[themeDrift_20s_ease-in-out_infinite]"
              style={{ top: `${(i * 15) % 85 + 5}%`, left: `${(i * 21) % 85 + 5}%`, animationDelay: `${i * 1.2}s` }} />
          ))}
        </div>
      );
    case "tropical":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
          <div className="absolute -left-10 top-1/4 w-40 h-40 rounded-full bg-cyan-400/15 blur-[50px] animate-[themeWaveFlow_18s_ease-in-out_infinite]" />
          <div className="absolute -right-10 bottom-1/4 w-44 h-44 rounded-full bg-orange-400/12 blur-[55px] animate-[themeWaveFlow_22s_ease-in-out_infinite_2s]" />
        </div>
      );
    case "artdeco":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: "repeating-linear-gradient(45deg, rgba(217,169,78,.4) 0 2px, transparent 2px 22px)",
          }} />
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(217,169,78,.9) 45%, rgba(217,169,78,.9) 55%, transparent 100%)",
            backgroundSize: "200% 100%", animation: "themeShimmerX 7s linear infinite",
          }} />
        </div>
      );
    case "desertdune":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 inset-x-0 h-1/2" style={{ background: "linear-gradient(0deg, rgba(217,119,6,.08) 0%, transparent 100%)", animation: "themeDrift 26s ease-in-out infinite" }} />
          {[...Array(7)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-amber-200/40 rounded-full animate-[themeFloatUp_22s_linear_infinite]"
              style={{ left: `${(i * 13) % 90 + 5}%`, animationDuration: `${16 + (i % 3) * 4}s`, animationDelay: `${i * 1.7}s` }} />
          ))}
        </div>
      );
    case "arcticglass":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-white/60 rounded-full animate-[themeFloatUp_16s_linear_infinite]"
              style={{ left: `${(i * 7) % 95}%`, animationDuration: `${10 + (i % 4) * 3}s`, animationDelay: `${i * 0.8}s` }} />
          ))}
          <div className="absolute inset-0 opacity-[0.05]" style={{
            background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,.6) 50%, transparent 60%)",
            backgroundSize: "250% 250%", animation: "themeShimmerX 9s linear infinite",
          }} />
        </div>
      );
    case "sunsetcliff":
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-gradient-to-b from-orange-400/25 via-pink-400/15 to-transparent blur-[8px] animate-[themeSunPulse_9s_ease-in-out_infinite]" />
          {[...Array(7)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-orange-200/40 rounded-full animate-[themeDrift_20s_ease-in-out_infinite]"
              style={{ top: `${(i * 15) % 85 + 5}%`, left: `${(i * 21) % 85 + 5}%`, animationDelay: `${i * 1.3}s` }} />
          ))}
        </div>
      );
    default:
      return null;
  }
}
