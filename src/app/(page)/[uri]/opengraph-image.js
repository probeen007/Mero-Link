import { ImageResponse } from 'next/og';
import { getPublicPage } from '@/libs/pageData';
import { resolveTheme } from '@/libs/themes';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Mero Link profile';

export default async function Image({ params }) {
  const { uri } = await params;
  const data = await getPublicPage(uri);
  const { style } = resolveTheme(data?.page);
  const name = data?.page.displayName || data?.user?.name || `@${uri}`;
  const bio = (data?.page.bio || '').slice(0, 120);
  const avatar = data?.user?.image;
  const linkCount = (data?.page.links || []).filter((l) => l.url && !l.hidden).length;
  const fg = style['--p-fg'];

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: style['--p-bg'], color: fg, padding: 72, alignItems: 'center', gap: 64 }}>
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img src={avatar} width={300} height={300} style={{ borderRadius: 300, objectFit: 'cover', border: `8px solid ${style['--p-accent']}` }} />
        ) : null}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>{name}</div>
          <div style={{ fontSize: 34, marginTop: 14, opacity: 0.7 }}>merolink.me/{uri}</div>
          {bio && <div style={{ fontSize: 30, marginTop: 28, opacity: 0.85, lineHeight: 1.35 }}>{bio}</div>}
          <div style={{ display: 'flex', marginTop: 40 }}>
            <div style={{ display: 'flex', background: '#FF4D2E', color: '#111014', fontSize: 28, fontWeight: 700, padding: '12px 26px', borderRadius: 999 }}>
              {linkCount > 0 ? `${linkCount} links inside` : 'See my links'}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
