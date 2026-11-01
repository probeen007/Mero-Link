import { PiArrowUpRightBold, PiLifebuoyBold, PiSealCheckBold, PiBriefcaseBold } from 'react-icons/pi';
import { FaLinkedinIn } from 'react-icons/fa6';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd } from '@/libs/structuredData';
import { CONTACT_EMAIL, VERIFY_EMAIL } from '@/libs/site';
import { pageMeta } from '@/libs/seo';

export const metadata = pageMeta({
  title: 'Contact',
  description: 'Get help with your Mero Link page, request a verified badge, or talk to us about partnerships.',
  path: '/contact',
});

const CHANNELS = [
  { icon: PiLifebuoyBold, title: 'Help with your page', body: 'Something broken or confusing? Tell us what happened.', href: `mailto:${CONTACT_EMAIL}?subject=Help%20with%20my%20page`, label: CONTACT_EMAIL, tone: 'bg-lime' },
  { icon: PiSealCheckBold, title: 'Verified badge', body: 'Creators, brands and public figures can request a badge.', href: `mailto:${VERIFY_EMAIL}?subject=Verification%20request`, label: VERIFY_EMAIL, tone: 'bg-sky' },
  { icon: PiBriefcaseBold, title: 'Partnerships', body: 'Agencies, events and brands working with many creators.', href: `mailto:${CONTACT_EMAIL}?subject=Partnership`, label: CONTACT_EMAIL, tone: 'bg-butter' },
  { icon: FaLinkedinIn, title: 'LinkedIn', body: 'Follow along as we build.', href: 'https://www.linkedin.com/company/merolink/', label: 'linkedin.com/company/merolink', tone: 'bg-pink' },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd('Contact', '/contact')} />
      <section className="shell grid gap-12 pb-12 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h1 className="font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">Say hello</h1>
          <p className="mt-6 max-w-sm text-lg text-muted">A real person reads every email, usually within a day.</p>
        </div>
        <ul className="grid gap-3">
          {CHANNELS.map(({ icon: Icon, title, body, href, label, tone }) => (
            <li key={title}>
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-[24px] border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-ink sm:p-6">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-on-sticker ${tone}`}><Icon className="h-6 w-6" aria-hidden /></span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-bold">{title}</span>
                  <span className="block text-sm text-muted">{body}</span>
                  <span className="mt-1 block truncate text-sm font-medium text-accent-text">{label}</span>
                </span>
                <PiArrowUpRightBold className="shrink-0 text-muted transition group-hover:text-ink" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
