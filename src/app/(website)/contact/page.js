import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHeadset, faShieldAlt, faBriefcase, faStar, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
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
    url: 'https://merolink.me/contact',
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
      title: 'General Support',
      description: 'Questions about account claim, profile customization, and link layouts.',
      icon: faHeadset,
    },
    {
      title: 'Verification Inquiries',
      description: 'Report profile abuse, trademark claims, or identity concerns.',
      icon: faShieldAlt,
    },
    {
      title: 'Business Partnerships',
      description: 'Collaborations, integration requests, or promotional opportunities.',
      icon: faBriefcase,
    },
  ];

  const socialChannels = [
    {
      title: 'X (Twitter)',
      icon: faSquareXTwitter,
      href: 'https://x.com',
      label: '@MeroLink',
    },
    {
      title: 'LinkedIn',
      icon: faLinkedinIn,
      href: 'https://www.linkedin.com/company/merolink/',
      label: 'Mero Link',
    },
  ];

  return (
    <div className="bg-white py-12 sm:py-16 md:py-20 text-gray-800">
      <div className="page-shell max-w-5xl">
        
        {/* Header Title Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-blue-700 font-semibold text-xs sm:text-sm">
            <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
            <span>Customer & Creator Care</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            Get in touch with us
          </h1>
          
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions about Mero Link? Need support with your page setup? Choose your contact method below.
          </p>
        </section>

        {/* Contact Layout Columns */}
        <section className="mt-12 sm:mt-16 grid gap-10 md:grid-cols-[1.2fr_1fr] items-start">
          
          {/* Left Column (Details and support channels) */}
          <div className="space-y-8">
            
            {/* Primary Email Card */}
            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-100 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
                Direct Email Support
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                For account verification, feature requests, or technical issues, send us an email directly.
              </p>
              <div className="mt-5">
                <a 
                  href="mailto:pro.victus07@gmail.com"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                  pro.victus07@gmail.com
                </a>
              </div>
            </div>

            {/* Support Types Grids */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">Support Pipelines</h3>
              <div className="grid gap-4">
                {supportTypes.map((type) => (
                  <div key={type.title} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-3.5 items-start">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <FontAwesomeIcon icon={type.icon} className="text-sm" />
                    </span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">{type.title}</h4>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed">{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Contact Info and Social Channels) */}
          <div className="space-y-6">
            
            {/* Social card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900">Follow us on Socials</h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                We announce updates, community spotlights, and design guides on Twitter and LinkedIn.
              </p>
              
              <div className="grid gap-3 mt-6">
                {socialChannels.map((channel) => (
                  <a 
                    key={channel.title}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50/50 border border-gray-250 rounded-xl transition-all group"
                  >
                    <span className="flex items-center gap-3 text-sm sm:text-base font-bold text-slate-800">
                      <FontAwesomeIcon icon={channel.icon} className="text-blue-600 text-lg shrink-0" />
                      {channel.title}
                    </span>
                    <span className="text-xs text-blue-600 font-semibold group-hover:underline">{channel.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Note card */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex gap-3.5 items-start">
              <FontAwesomeIcon icon={faQuestionCircle} className="text-blue-500 mt-1 shrink-0 text-lg" />
              <div>
                <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Response Time SLA</h4>
                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                  We usually respond to all creator and support inquiries within 24 to 48 business hours. Please include your registered account username for faster routing.
                </p>
              </div>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}
