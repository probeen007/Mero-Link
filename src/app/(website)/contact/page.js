import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHeadset, faShieldAlt, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faInstagramSquare, faLinkedinIn, faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

export const metadata = {
  title: 'Contact',
  description: 'Contact Mero Link for support, verification, or business inquiries through email and social channels.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Mero Link',
    description: 'Reach out to the Mero Link team for support and inquiries.',
    url: 'https://merolink.it.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Mero Link',
    description: 'Reach out to the Mero Link team for support and inquiries.',
  },
};

export default function ContactPage() {
  const supportTypes = [
    {
      title: 'General support',
      description: 'Questions about account setup, profile configuration, and daily usage.',
      icon: faHeadset,
    },
    {
      title: 'Verification and security',
      description: 'Report suspicious activity, account concerns, or security-related issues.',
      icon: faShieldAlt,
    },
    {
      title: 'Business inquiries',
      description: 'Partnerships, integrations, and professional collaboration requests.',
      icon: faBriefcase,
    },
  ];

  const socialChannels = [
    {
      title: 'X (Twitter)',
      subtitle: 'Product updates and announcements',
      icon: faSquareXTwitter,
      href: 'https://x.com',
      label: '@MeroLink',
    },
    {
      title: 'Instagram',
      subtitle: 'Community highlights and visual updates',
      icon: faInstagramSquare,
      href: 'https://instagram.com',
      label: '@MeroLink',
    },
    {
      title: 'LinkedIn',
      subtitle: 'Company news and professional updates',
      icon: faLinkedinIn,
      href: 'https://www.linkedin.com/company/merolink/',
      label: 'Mero Link',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 py-10 md:py-14">
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
          <p className="mt-3 text-sm text-gray-500">Support and inquiries</p>
          <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Contact the Mero Link team
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mx-auto">
            Reach out for product support, account assistance, verification help, or business inquiries.
            We aim to provide clear responses and practical guidance.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <div className="flex items-start sm:items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Email support</h2>
              <p className="mt-1 text-gray-600">For the fastest response, contact us directly by email.</p>
            </div>
          </div>

          <a
            href="mailto:pro.victus07@gmail.com"
            className="mt-5 inline-flex items-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-blue-700 font-semibold hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            pro.victus07@gmail.com
          </a>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supportTypes.map((item) => (
              <article key={item.title} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FontAwesomeIcon icon={item.icon} className="text-blue-600" />
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Social channels</h2>
          <p className="mt-2 text-gray-600">Follow us for product updates and community news.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {socialChannels.map((channel) => (
              <article key={channel.title} className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow duration-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FontAwesomeIcon icon={channel.icon} className="text-blue-600" />
                  {channel.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">{channel.subtitle}</p>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-700 font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded px-1"
                >
                  {channel.label}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-gray-200 bg-white p-5 text-sm sm:text-base text-gray-600">
          Support note: Please include your account email and a short issue summary when contacting support.
          This helps our team resolve your request faster.
        </section>
      </div>
    </div>
  );
}
