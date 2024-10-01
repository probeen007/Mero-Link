
import { Lato } from 'next/font/google'
import '../../globals.css'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Mero Link - Unify Your Online Presence with Ease',
  description: 'Mero Link is a revolutionary startup from Nepal, designed to help you effortlessly unify your online identity. Create personalized link trees to combine all your social media profiles, websites, and essential links into one seamless, shareable link. Perfect for professionals, influencers, and businesses seeking to enhance their digital presence, Mero Link makes it easy to connect and share everything in one place. Join the Mero Link community today and take control of your online presence!',
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
