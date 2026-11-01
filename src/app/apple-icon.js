import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FF4D2E', border: "12px solid #111014", borderRadius: 40, color: '#111014', fontSize: 120, fontWeight: 800, lineHeight: 1 }}>
        m
      </div>
    ),
    size,
  );
}
