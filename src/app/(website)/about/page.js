import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faUsers, faShareAlt, faChartLine, faCheckCircle, faBolt, faInfinity, faClock } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'About',
  description: 'Learn how Mero Link helps creators and businesses unify their online presence with one modern, shareable profile link.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Mero Link',
    description: 'Discover the mission and features behind Mero Link.',
    url: 'https://merolink.me/about',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About Mero Link',
    description: 'Discover the mission and features behind Mero Link.',
  },
};

export default function AboutPage() {
  const stats = [
    { value: "<400ms", label: "Render Time", desc: "Supercharged statically generated profiles.", icon: faBolt },
    { value: "<1 min", label: "Setup Time", desc: "Claim your name and go live instantly.", icon: faClock },
    { value: "100%", label: "Free Core Features", desc: "No paywalls for your essential links.", icon: faInfinity },
  ];

  const productPillars = [
    {
      title: 'Unified Link Hub',
      description: 'Bring your portfolio, storefronts, videos, and social profiles together. Manage everything from one clean console.',
      icon: faShareAlt,
    },
    {
      title: 'Built for Speed',
      description: 'Statically pre-rendered profiles load instantly, ensuring high retention and conversion rates from your visitors.',
      icon: faRocket,
    },
    {
      title: 'Detailed Engagement Logs',
      description: 'Track aggregate views, daily click rates, and profile engagement patterns to understand what content fits best.',
      icon: faChartLine,
    },
    {
      title: 'Creator-Centric Design',
      description: 'An elegant theme engine that formats your page beautifully. No messy configurations or code requirements.',
      icon: faUsers,
    },
  ];

  return (
    <div className="bg-white py-12 sm:py-16 md:py-20 text-gray-800">
      <div className="page-shell max-w-5xl">
        
        {/* Header Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-150 px-4 py-2 rounded-xl">
            <Image
              src="https://i.ibb.co/HNVDd6R/merolinklogo.png"
              alt="Mero Link Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg shadow-sm"
            />
            <span className="font-extrabold text-lg bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Mero <span className="text-blue-700">Link</span>
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            One smart link for your complete digital presence
          </h1>
          
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Mero Link helps creators, freelancers, and businesses share their links, social pages, and video carousels inside a single, beautifully polished profile. We make sharing effortless, responsive, and elegant.
          </p>
        </section>

        {/* Stats Grid */}
        <section className="mt-12 sm:mt-16 grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-100 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-blue-600 mb-3 text-lg flex items-center justify-center">
                <FontAwesomeIcon icon={stat.icon} />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">{stat.value}</div>
              <div className="text-sm font-semibold text-slate-700 mt-1">{stat.label}</div>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </section>

        {/* Pillars grid */}
        <section className="mt-16 sm:mt-24 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Core Product Pillars</h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">Our features are designed to serve clean layouts and modern performance metrics.</p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            {productPillars.map((pillar) => (
              <div key={pillar.title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={pillar.icon} className="text-sm" />
                  </span>
                  {pillar.title}
                </h3>
                <p className="mt-3.5 text-gray-600 text-sm sm:text-base leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who it is for */}
        <section className="mt-16 sm:mt-24 bg-gray-50 rounded-3xl border border-gray-200 p-6 sm:p-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center tracking-tight">Built for creators of all types</h2>
            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Creators & Influencers</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">Direct visitors to YouTube channels, TikTok handles, and brand sponsors easily.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Developers & Designers</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">Unify portfolio projects, GitHub branches, and Dribbble cases in a single hub.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Freelancers & Pros</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">Embed custom booking links, service pages, and direct client callouts.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Small Businesses</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">List campaigns, contact channels, products, and dynamic links together.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="mt-16 sm:mt-24 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Claim your Mero Link page</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">Setup takes less than a minute and your core link-in-bio is free forever.</p>
          <div>
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Started Now
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
