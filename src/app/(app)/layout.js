import React, { Suspense } from 'react';

export const metadata = {
  title: 'Mero Link - Dashboard',
  description: 'Unify your online presence with Mero Link! Create personalized link trees for your social profiles and websites. Perfect for professionals and businesses.',
  keywords: ['Mero Link', 'dashboard', 'analytics', 'link tree', 'online presence'],
  authors: [{ name: 'Prabin Bhattarai' }],
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppLayout({ children }) {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>🚀 Just a moment...</h2>
      <p>We're preparing something amazing for you! 🌟</p>
      <p>Please hang tight while we get things ready. ⏳</p>
      <p>✨ Your experience is just loading... ✨</p>
    </div>
    }>
      {children}
    </Suspense>
  );
}
