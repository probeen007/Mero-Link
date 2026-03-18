import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faUsers, faShareAlt, faChartLine, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export const metadata = {
  title: 'About',
  description: 'Learn how Mero Link helps creators and businesses unify their online presence with one modern, shareable profile link.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Mero Link',
    description: 'Discover the mission and features behind Mero Link.',
    url: 'https://merolink.it.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About Mero Link',
    description: 'Discover the mission and features behind Mero Link.',
  },
};

export default function AboutPage() {
  const productPillars = [
    {
      title: 'Single Shareable Profile',
      description: 'Bring your key links, social channels, and projects into one destination that is easy to update and easy to share.',
      icon: faShareAlt,
    },
    {
      title: 'Fast Setup Experience',
      description: 'Set up your profile in minutes with a clean editor designed for creators, freelancers, students, and businesses.',
      icon: faUsers,
    },
    {
      title: 'Reliable Performance',
      description: 'Deliver a smooth visitor experience with responsive layouts and optimized loading on mobile and desktop.',
      icon: faRocket,
    },
    {
      title: 'Built-In Analytics',
      description: 'Track visits and click activity so you can understand what content performs and optimize your profile over time.',
      icon: faChartLine,
    },
  ];

  const setupSteps = [
    {
      title: 'Create your account',
      description: 'Sign in and claim your public profile URL.',
    },
    {
      title: 'Add your links and social profiles',
      description: 'Organize important destinations such as portfolio, store, YouTube, GitHub, or contact channels.',
    },
    {
      title: 'Customize your profile design',
      description: 'Choose a theme, update your profile image, and match your brand style.',
    },
    {
      title: 'Share and track results',
      description: 'Use your single profile link everywhere and monitor engagement from your audience.',
    },
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
            One profile link for your complete online presence
          </h1>
          <p className="mt-4 max-w-4xl text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mx-auto">
            Mero Link helps professionals and businesses present their links, social profiles, and key content in a single, clean page.
            The goal is simple: make sharing easier, look more professional, and improve how people discover your work.
          </p>
        </section>

        <section className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2">
          {productPillars.map((pillar) => (
            <article key={pillar.title} className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FontAwesomeIcon icon={pillar.icon} className="text-blue-600" />
                {pillar.title}
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">{pillar.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">How to use Mero Link</h2>
          <p className="mt-2 text-gray-600 max-w-3xl">
            Follow these steps to publish a professional profile page quickly.
          </p>
          <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
            {setupSteps.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm font-semibold text-blue-700">Step {index + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Who it is for</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-gray-700">
            <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="mt-1 text-blue-600" />Creators and influencers managing multiple platforms</li>
            <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="mt-1 text-blue-600" />Freelancers showcasing services and portfolio links</li>
            <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="mt-1 text-blue-600" />Students and job seekers sharing projects and contact points</li>
            <li className="flex items-start gap-2"><FontAwesomeIcon icon={faCheckCircle} className="mt-1 text-blue-600" />Businesses centralizing campaigns, social pages, and support links</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
