import { Lato } from 'next/font/google';
import '../globals.css';
import HeaderServer from "@/components/headerserver";
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import Footer from '@/components/footer';
import { Suspense } from 'react';

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
  og: {
    title: 'Mero Link - Simplify Your Digital Presence with Custom Link Trees',
    description: 'Join Mero Link, a startup from Nepal, to effortlessly combine your social media and essential links into one shareable tree. Perfect for individuals and businesses alike!',
    url: 'https://merolink.me', // Replace with your app's URL
    image: 'https://i.ibb.co/HNVDd6R/merolinklogo.png', // Replace with a relevant image URL
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <SessionProviderWrapper>
          <main>
            <HeaderServer />
            <div className="max-w-4xl mx-auto p-6">
              <Suspense fallback={
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <h2>🔮 A little magic is happening... ✨</h2>
                  <p>🌈 We're weaving together all the colorful threads of your experience. 🧵</p>
                  <p>⏳ Just a moment while we sprinkle some stardust! 🌌</p>
                  <p>🎩 Prepare to be amazed! Your journey is almost here! 🎉</p>
                  {/* Consider adding a spinner or skeleton loader here */}
                </div>
              }>
                {children}
              </Suspense>
            </div>
            <Footer />
          </main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
