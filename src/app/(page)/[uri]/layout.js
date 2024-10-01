
import { Lato } from 'next/font/google'
import '../../globals.css'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

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
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
