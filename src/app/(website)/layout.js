import { Lato } from 'next/font/google';
import '../globals.css';
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
  title: 'Mero Link - Unify Your Online Presence with Ease',
  description: 'Unify your online presence with Mero Link! Create personalized link trees for your social profiles and websites. Perfect for professionals and businesses.',
  keywords: 'Mero Link, custom link tree, online presence, social media, digital identity, startup Nepal, share links, unify profiles',
  author: 'Prabin Bhattarai',
  robots: 'index, follow',
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
  og: {
    title: 'Mero Link - Simplify Your Digital Presence with Custom Link Trees',
    description: 'Join Mero Link, a startup from Nepal, to effortlessly combine your social media and essential links into one shareable tree. Perfect for individuals and businesses alike!',
    url: 'https://merolink.it.com', // Replace with your app's URL
    image: 'https://i.ibb.co/HNVDd6R/merolinklogo.png', // Replace with a relevant image URL
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#2563eb',
};

export default function WebsiteLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <main className={lato.className}>
        <HeaderServer />
        <div className="max-w-8xl mx-auto">
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
