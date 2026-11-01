import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FF4D2E', border: '5px solid #111014', borderRadius: 16, color: '#111014', fontSize: 44, fontWeight: 800, lineHeight: 1 }}>
        m
      </div>
    ),
    size,
  );
}
