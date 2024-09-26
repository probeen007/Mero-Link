import { Lato } from 'next/font/google';
import '../globals.css';
import HeaderServer from "@/components/headerserver";
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import Footer from '@/components/footer';
import { Suspense } from 'react';

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Mero Link - Unify Your Online Presence with Ease',
  description: 'Mero Link is a revolutionary startup from Nepal, designed to help you effortlessly unify your online identity. Create personalized link trees to combine all your social media profiles, websites, and essential links into one seamless, shareable link. Perfect for professionals, influencers, and businesses seeking to enhance their digital presence, Mero Link makes it easy to connect and share everything in one place. Join the Mero Link community today and take control of your online presence!',
  keywords: 'Mero Link, custom link tree, online presence, social media, digital identity, startup Nepal, share links, unify profiles',
  author: 'Prabin Bhattarai',
  robots: 'index, follow',
  og: {
    title: 'Mero Link - Simplify Your Digital Presence with Custom Link Trees',
    description: 'Join Mero Link, a startup from Nepal, to effortlessly combine your social media and essential links into one shareable tree. Perfect for individuals and businesses alike!',
    //url: 'https://yourappurl.com', // Replace with your app's URL
    //image: 'https://yourappurl.com/image.jpg', // Replace with a relevant image URL
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
