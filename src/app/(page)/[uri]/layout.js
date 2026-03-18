
import { Lato } from 'next/font/google'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Mero Link - Unify Your Online Presence with Ease',
  description: 'Unify your online presence with Mero Link! Create personalized link trees for your social profiles and websites. Perfect for professionals and businesses.',
  keywords: ['Mero Link', 'custom link tree', 'online presence', 'social media', 'digital identity', 'share links'],
  authors: [{ name: 'Prabin Bhattarai' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Mero Link - Simplify Your Digital Presence with Custom Link Trees',
    description: 'Join Mero Link, a startup from Nepal, to effortlessly combine your social media and essential links into one shareable tree. Perfect for individuals and businesses alike!',
    url: 'https://merolink.it.com',
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
};

export default function PageLayout({ children }) {
  return (
    <main className={lato.className}>
      {children}
    </main>
  );
}
