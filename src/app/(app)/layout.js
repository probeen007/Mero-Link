import React, { Suspense } from 'react';

export const metadata = {
  title: 'Mero Link - Dashboard',
  description: 'Unify your online presence with Mero Link! Create personalized link trees for your social profiles and websites. Perfect for professionals and businesses.',
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
