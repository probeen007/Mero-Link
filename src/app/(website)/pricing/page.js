import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faRocket, faChartLine, faShieldAlt, faPaintBrush, faStar, faInfinity, faCrown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Pricing',
  description: 'See Mero Link pricing and features. Start free and build your online identity with a modern link profile.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Mero Link Pricing',
    description: 'Explore plans and features to grow your online presence.',
    url: 'https://merolink.me/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Mero Link Pricing',
    description: 'Explore plans and features to grow your online presence.',
  },
};

export default function PricingPage() {
  const freeFeatures = [
    "Custom merolink.me/username link",
    "Unlimited social button integrations",
    "Unlimited custom profile links",
    "YouTube & Vimeo video playlist carousels",
    "Core profile themes selection",
    "Basic analytics (today's views & clicks)",
  ];

  const proFeatures = [
    "Everything in the Free plan",
    "Detailed 30-day analytics history charts",
    "Remove 'Powered by Mero Link' branding",
    "Custom page background images",
    "Custom domain routing (e.g. bio.yourname.com)",
    "Priority email and social support",
  ];

  return (
    <div className="bg-white py-12 sm:py-16 md:py-20 text-gray-800">
      <div className="page-shell max-w-5xl">
        
        {/* Header Title Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-blue-700 font-semibold text-xs sm:text-sm">
            <FontAwesomeIcon icon={faStar} className="text-blue-500" />
            <span>Fair & Transparent Pricing</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            Plans built for creators & pros
          </h1>
          
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Get started for free. Claim your public link-in-bio page and customize your profile theme immediately. No credit card required.
          </p>
        </section>

        {/* Pricing Cards Grid */}
        <section className="mt-12 sm:mt-16 grid gap-8 sm:grid-cols-2 items-stretch">
          
          {/* Free Plan Card */}
          <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Free Tier</h3>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">Free Forever</span>
              </div>
              
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                Perfect for individuals and creators starting out who need a unified, professional bio link.
              </p>
              
              <div className="my-6">
                <span className="text-4xl sm:text-5xl font-black text-gray-900">$0</span>
                <span className="text-gray-500 font-semibold text-sm"> / month</span>
              </div>
              
              <hr className="border-gray-150 my-6" />
              
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">What's included:</h4>
              <ul className="space-y-3">
                {freeFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-600">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 mt-1 shrink-0 text-xs sm:text-sm" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-8">
              <Link 
                href="/login" 
                className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm"
              >
                Claim Your Free Profile
              </Link>
            </div>
          </article>

          {/* Pro Plan Card */}
          <article className="bg-gradient-to-b from-slate-900 to-indigo-950 text-white rounded-3xl border border-slate-950 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            {/* Absolute accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold">Pro Plan</h3>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                  <FontAwesomeIcon icon={faCrown} className="text-[10px]" />
                  <span>Coming Soon</span>
                </span>
              </div>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed relative z-10">
                Advanced theme customization, root domains, and deep tracking metrics for professional creators and teams.
              </p>
              
              <div className="my-6 relative z-10">
                <span className="text-4xl sm:text-5xl font-black">$8</span>
                <span className="text-slate-400 font-semibold text-sm"> / month</span>
              </div>
              
              <hr className="border-white/10 my-6 relative z-10" />
              
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 relative z-10">Advanced capabilities:</h4>
              <ul className="space-y-3 relative z-10">
                {proFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-blue-450 mt-1 shrink-0 text-xs sm:text-sm text-blue-400" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-8 relative z-10">
              <button 
                disabled
                className="w-full inline-flex items-center justify-center bg-white/10 border border-white/20 text-slate-300 font-semibold py-3.5 px-6 rounded-xl cursor-not-allowed"
              >
                Launch Notification Waitlist
              </button>
            </div>
          </article>

        </section>

        {/* Pricing disclaimer */}
        <section className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-5 text-sm text-gray-500 leading-relaxed">
          <strong>Note:</strong> Mero Link was built to support the creator ecosystem. Essential profile building features and analytics metrics will remain completely free forever.
        </section>

      </div>
    </div>
  );
}
