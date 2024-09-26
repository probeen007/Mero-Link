
import { Lato } from 'next/font/google'
import '../../globals.css'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Mero Link',
  description: 'Mero Link is a startup from Nepal, designed to simplify how you share your online identity. Create a custom link tree that combines all your social media profiles, websites, and important links into one seamless link. This is Merolink user page',
  keywords: 'Mero Link, custom link tree, online presence, social media, digital identity, startup Nepal, share links, unify profiles'
}

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
