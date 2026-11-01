import './globals.css';
import { Suspense } from 'react';
import GlobalProgressBar from '@/components/GlobalProgressBar';
import { brandFontVariables, themeFontVariables } from '@/libs/fonts';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/libs/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: The link in bio that looks like you`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Prabin Bhattarai' }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  manifest: '/manifest.json',
  openGraph: {
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#111014' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${brandFontVariables} ${themeFontVariables}`} suppressHydrationWarning>
      <body>
        <Suspense fallback={null}>
          <GlobalProgressBar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
