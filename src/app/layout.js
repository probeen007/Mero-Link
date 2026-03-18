import './globals.css';
import GlobalProgressBar from '@/components/GlobalProgressBar';
import { Suspense } from 'react';

export const metadata = {
  metadataBase: new URL('https://merolink.it.com'),
  title: {
    default: 'Mero Link - Unify Your Online Presence',
    template: '%s | Mero Link',
  },
  description: 'Create personalized link trees for your social profiles and websites. Perfect for professionals, creators, and businesses.',
  applicationName: 'Mero Link',
  keywords: [
    'Mero Link',
    'link in bio',
    'custom link tree',
    'online presence',
    'social media links',
    'digital identity',
  ],
  authors: [{ name: 'Prabin Bhattarai' }],
  creator: 'Mero Link',
  publisher: 'Mero Link',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mero Link - Unify Your Online Presence',
    description: 'Create personalized link trees for your social profiles and websites. Perfect for professionals, creators, and businesses.',
    url: 'https://merolink.it.com',
    siteName: 'Mero Link',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://i.ibb.co/HNVDd6R/merolinklogo.png',
        width: 1200,
        height: 630,
        alt: 'Mero Link',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mero Link - Unify Your Online Presence',
    description: 'Create personalized link trees for your social profiles and websites.',
    images: ['https://i.ibb.co/HNVDd6R/merolinklogo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2563eb',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Suspense fallback={null}>
          <GlobalProgressBar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
