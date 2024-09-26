import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import AppSidebar from "@/components/layout/AppSidebar";
import {Page} from "@/models/Page";
import {faBars, faLink} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {Lato} from 'next/font/google'
import '../globals.css'
import {headers} from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {redirect} from "next/navigation";
import {Toaster} from "react-hot-toast";

const lato = Lato({ subsets: ['latin'], weight: ['400','700'] })

export const metadata = {
  title: 'Mero Link - Unify Your Online Presence with Ease',
  description: 'Mero Link is a revolutionary startup from Nepal, designed to help you effortlessly unify your online identity. Create personalized link trees to combine all your social media profiles, websites, and essential links into one seamless, shareable link. Perfect for professionals, influencers, and businesses seeking to enhance their digital presence, Mero Link makes it easy to connect and share everything in one place. Join the Mero Link community today and take control of your online presence!',
  keywords: 'Mero Link, custom link tree, online presence, social media, digital identity, startup Nepal, share links, unify profiles',
  author: 'Prabin Bhattarai',
  
}
export default async function AppTemplate({ children, ...rest }) {
  const headersList = headers();
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/');
  }
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({owner: session.user.email});
  return (
   
    <div>
    <Toaster />
    <main className="md:flex min-h-screen">
      <label htmlFor="navCb" className="md:hidden ml-8 mt-4 p-4 rounded-md bg-white shadow inline-flex items-center gap-2 cursor-pointer">
        <FontAwesomeIcon icon={faBars} />
        <span>Open navigation</span>
      </label>
      <input id="navCb" type="checkbox" className="hidden" />
      <label htmlFor="navCb" className="hidden backdrop fixed inset-0 bg-black/80 z-10"></label>
      <aside className="bg-white w-48 p-4 pt-6 shadow fixed md:static -left-48 top-0 bottom-0 z-20 transition-all">
        <div className="sticky top-0 pt-2">
          <div className="rounded-full overflow-hidden aspect-square w-24 mx-auto">
            <Image src={session.user.image} width={256} height={256} alt={'avatar'} />
          </div>
          {page && (
            <Link
              target="_blank"
              href={'/'+page.uri}
              className="text-center mt-4 flex gap-1 items-center justify-center">
              <FontAwesomeIcon size="lg" icon={faLink} className="text-blue-500" />
              <span className="text-xl text-gray-300">/</span>
              <span>{page.uri}</span>
            </Link>
          )}
          <div className="text-center">
            <AppSidebar />
          </div>
        </div>
      </aside>
      <div className="grow">
        {children}
      </div>
    </main>
    </div>
   
  )
}
