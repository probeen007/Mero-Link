import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faRocket, faChartLine, faShieldAlt, faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export const metadata = {
  title: 'Pricing',
  description: 'See Mero Link pricing and features. Start free and build your online identity with a modern link profile.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Mero Link Pricing',
    description: 'Explore plans and features to grow your online presence.',
    url: 'https://merolink.it.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Mero Link Pricing',
    description: 'Explore plans and features to grow your online presence.',
  },
};

export default function PricingPage() {
  const includedFeatures = [
    {
      title: 'Custom profile URL',
      description: 'Create a single public page to share your most important links.',
      icon: faCheckCircle,
    },
    {
      title: 'Theme and branding controls',
      description: 'Customize profile visuals to match your personal or business identity.',
      icon: faPaintBrush,
    },
    {
      title: 'Link performance analytics',
      description: 'Understand visitor activity and optimize your link order based on clicks.',
      icon: faChartLine,
    },
    {
      title: 'Reliable hosting and security',
      description: 'Publish confidently with secure infrastructure and stable performance.',
      icon: faShieldAlt,
    },
  ];

  const gettingStarted = [
    'Create an account and claim your profile URL',
    'Add links, social buttons, and profile details',
    'Choose a theme and publish your page',
    'Share your profile and review analytics regularly',
  ];

  return (
    <div className="bg-white py-10 md:py-14">
      <div className="page-shell">
        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 md:p-10 text-center">
          <div className="inline-flex items-center gap-3">
            <Image
              src="https://i.ibb.co/HNVDd6R/merolinklogo.png"
              alt="Mero Link Logo"
              width={44}
              height={44}
              className="w-11 h-11 rounded-lg shadow-sm"
            />
            <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Mero <span className="text-blue-700">Link</span>
            </span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Transparent pricing for modern profile sharing
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mx-auto">
            Mero Link is currently available as a full-featured free plan, so you can build, publish, and grow your profile page without cost barriers.
          </p>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <article className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Free Plan</h2>
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-700">$0<span className="text-base font-semibold text-gray-500"> / month</span></p>
            </div>
            <p className="mt-3 text-gray-600">
              Best for creators, freelancers, and businesses who need a professional link page and clear performance insights.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {includedFeatures.map((feature) => (
                <div key={feature.title} className="rounded-xl border border-gray-200 bg-gray-50 p-4 hover:shadow-sm transition-shadow duration-200">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FontAwesomeIcon icon={feature.icon} className="text-blue-600" />
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FontAwesomeIcon icon={faRocket} className="text-blue-600" />
              How to get started
            </h2>
            <ol className="mt-4 space-y-3">
              {gettingStarted.map((item, index) => (
                <li key={item} className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700">
                  <span className="mr-2 font-semibold text-blue-700">{index + 1}.</span>
                  {item}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm text-gray-500 leading-relaxed">
              Future paid tiers may be introduced as advanced team and enterprise features are released.
              Existing users will receive clear notice before pricing changes.
            </p>
          </aside>
        </section>
      </div>
    </div>
  );
}
