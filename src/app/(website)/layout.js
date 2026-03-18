import { Lato } from 'next/font/google';
import HeaderServer from "@/components/headerserver";
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import Footer from '@/components/footer';
import PWAInstaller from '@/components/PWAInstaller';
import { Suspense } from 'react';
import { LoadingSkeleton } from '@/components/LoadingStates';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  
});

export const metadata = {
  metadataBase: new URL('https://merolink.it.com'),
  title: 'Mero Link - Unify Your Online Presence with Ease',
  description: 'Unify your online presence with Mero Link! Create personalized link trees for your social profiles and websites. Perfect for professionals and businesses.',
  keywords: ['Mero Link', 'custom link tree', 'link in bio', 'online presence', 'share links', 'digital identity'],
  authors: [{ name: 'Prabin Bhattarai' }],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mero Link'
  },
  openGraph: {
    title: 'Mero Link - Simplify Your Digital Presence with Custom Link Trees',
    description: 'Join Mero Link, a startup from Nepal, to effortlessly combine your social media and essential links into one shareable tree. Perfect for individuals and businesses alike!',
    url: 'https://merolink.it.com',
    siteName: 'Mero Link',
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
    title: 'Mero Link - Simplify Your Digital Presence',
    description: 'Create one smart profile link for all your social channels and projects.',
    images: ['https://i.ibb.co/HNVDd6R/merolinklogo.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2563eb',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Mero Link',
      url: 'https://merolink.it.com',
      logo: 'https://i.ibb.co/HNVDd6R/merolinklogo.png',
      sameAs: [
        'https://www.linkedin.com/company/merolink/',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Mero Link',
      url: 'https://merolink.it.com',
    },
  ],
};

export default function WebsiteLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <main className={lato.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:bg-white focus:text-blue-700 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip to main content
        </a>
        <HeaderServer />
        <div id="main-content" className="w-full mx-auto" tabIndex={-1}>
          <Suspense fallback={<LoadingSkeleton />}>
            {children}
          </Suspense>
        </div>
        <Footer />
        <PWAInstaller />
      </main>
    </SessionProviderWrapper>
  );
}
