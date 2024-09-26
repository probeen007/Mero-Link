import React, { Suspense } from 'react';

export const metadata = {
  title: 'Mero Link - Dashboard',
  description: 'Mero Link is a revolutionary startup from Nepal, designed to help you effortlessly unify your online identity. Create personalized link trees to combine all your social media profiles, websites, and essential links into one seamless, shareable link. Perfect for professionals, influencers, and businesses seeking to enhance their digital presence, Mero Link makes it easy to connect and share everything in one place. Join the Mero Link community today and take control of your online presence!',
  keywords: 'Mero Link, custom link tree, online presence, social media, digital identity, startup Nepal, share links, unify profiles',
  author: 'Prabin Bhattarai',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '20px' }}>
    <h2>🚀 Just a moment...</h2>
    <p>We're preparing something amazing for you! 🌟</p>
    <p>Please hang tight while we get things ready. ⏳</p>
    <p>✨ Your experience is just loading... ✨</p>
  </div>
}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
