import './globals.css';

export const metadata = {
  title: 'Mero Link - Unify Your Online Presence',
  description: 'Create personalized link trees for your social profiles and websites. Perfect for professionals and businesses.',
  keywords: 'Mero Link, custom link tree, online presence, social media, digital identity',
  author: 'Prabin Bhattarai',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
