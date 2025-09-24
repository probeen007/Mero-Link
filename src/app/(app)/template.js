import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import AppSidebar from "@/components/layout/AppSidebar";
import {Page} from "@/models/Page";
import {faBars, faLink, faTimes} from "@fortawesome/free-solid-svg-icons";
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
   
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'white',
            color: 'black',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
      
      <main className="lg:flex min-h-screen">
        {/* Mobile Navigation Toggle */}
        <label htmlFor="navCb" className="lg:hidden fixed top-4 left-4 z-30 p-3 rounded-xl bg-white shadow-lg border border-gray-200 inline-flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-all duration-200">
          <FontAwesomeIcon icon={faBars} className="text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Menu</span>
        </label>
        
        <input id="navCb" type="checkbox" className="hidden" />
        <label htmlFor="navCb" className="hidden backdrop fixed inset-0 bg-black/60 z-20 lg:hidden"></label>
        
        {/* Sidebar */}
        <aside className="bg-white/90 backdrop-blur-xl w-80 p-6 shadow-2xl border-r border-gray-200 fixed lg:static -left-80 top-0 bottom-0 z-30 transition-all duration-300 overflow-y-auto">
          {/* Close button for mobile */}
          <label htmlFor="navCb" className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </label>
          
          <div className="sticky top-0 pt-4">
            {/* User Profile Section */}
            <div className="text-center mb-8">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <Image 
                      src={session.user.image} 
                      width={256} 
                      height={256} 
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <h3 className="font-bold text-gray-800 text-lg mb-1">{session.user.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{session.user.email}</p>
              
              {page && (
                <Link
                  target="_blank"
                  href={'/'+page.uri}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm"
                >
                  <FontAwesomeIcon icon={faLink} className="text-blue-500" />
                  <span className="text-gray-400">/</span>
                  <span>{page.uri}</span>
                </Link>
              )}
            </div>
            
            {/* Navigation */}
            <div className="px-2">
              <AppSidebar />
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-0 min-h-screen">
          <div className="lg:p-8 p-4 pt-20 lg:pt-8">
            {children}
          </div>
        </div>
      </main>
    </div>
   
  )
}
