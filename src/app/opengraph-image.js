import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Mero Link: the link in bio that looks like you';

const TILES = [
  { bg: '#D4F55A', label: 'Links' },
  { bg: '#9CCBFF', label: 'Videos' },
  { bg: '#FFB8D9', label: 'Themes' },
  { bg: '#FFE27A', label: 'Analytics' },
];

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FAFAF8', color: '#111014', padding: 80 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ display: 'flex', width: 64, height: 64, borderRadius: 18, background: '#FF4D2E', border: '4px solid #111014', alignItems: 'center', justifyContent: 'center', fontSize: 38, fontWeight: 800 }}>m</div>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>mero link</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>One link.</div>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -4, lineHeight: 1, color: '#FF4D2E' }}>All of you.</div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {TILES.map((t) => (
            <div key={t.label} style={{ display: 'flex', background: t.bg, border: '3px solid #111014', borderRadius: 999, padding: '12px 28px', fontSize: 30, fontWeight: 700 }}>{t.label}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
