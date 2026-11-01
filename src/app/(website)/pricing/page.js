import { PiCheckBold } from 'react-icons/pi';
import JsonLd from '@/components/JsonLd';
import { Button } from '@/components/ui';
import { breadcrumbLd, faqLd } from '@/libs/structuredData';
import { CONTACT_EMAIL } from '@/libs/site';

export const metadata = {
  title: 'Pricing: free link in bio',
  description: 'Mero Link is free: unlimited links, 16 animated themes, a theme builder, videos, QR codes and 30-day analytics. Pro with custom domains is coming.',
  alternates: { canonical: '/pricing' },
};

const FREE = [
  'Your own merolink.me/name',
  'Unlimited links, section headers and featured links',
  'All 16 animated themes',
  'Theme builder: colors, fonts, buttons, backgrounds',
  'YouTube, Vimeo, Spotify and TikTok embeds',
  '30-day analytics with per-link click rates',
  'QR code and share card',
];

const PRO = [
  'Everything in Free',
  'Use your own domain',
  'Remove the Mero Link badge',
  'Priority support',
];

const FAQ = [
  { q: 'Is the free plan really free?', a: 'Yes. No trial, no card. The free plan includes every feature listed and has no link limit.' },
  { q: 'When is Pro coming?', a: 'We are building it now. Pages on the free plan will keep working exactly as they do today.' },
  { q: 'Will I lose anything if I stay on Free?', a: 'No. Pro only adds a custom domain, badge removal and priority support.' },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd('Pricing', '/pricing'), faqLd(FAQ)]} />
      <section className="shell pb-14 pt-14 sm:pt-20">
        <h1 className="max-w-3xl font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
          Free. Actually free.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">Everything you need for a great bio page costs nothing. Pro will add a few extras for brands.</p>
      </section>

      <section className="shell grid gap-5 md:grid-cols-[1.25fr_1fr]" aria-label="Plans">
        <div className="rounded-[32px] border-2 border-ink bg-surface p-8 shadow-sticker sm:p-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-3xl font-extrabold">Free</h2>
            <p><span className="font-display text-5xl font-extrabold">$0</span> <span className="text-muted">forever</span></p>
          </div>
          <ul className="mt-8 grid gap-3.5">
            {FREE.map((f) => (
              <li key={f} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-on-sticker"><PiCheckBold className="h-3 w-3" aria-hidden /></span>
                {f}
              </li>
            ))}
          </ul>
          <Button href="/login" size="lg" className="mt-10 w-full">Claim your link</Button>
        </div>

        <div className="flex flex-col rounded-[32px] bg-ink p-8 text-bg sm:p-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-3xl font-extrabold">Pro</h2>
            <p><span className="font-display text-5xl font-extrabold">$8</span> <span className="opacity-60">/ month</span></p>
          </div>
          <p className="mt-2 inline-flex w-fit rounded-full bg-butter px-3 py-1 text-xs font-bold text-on-sticker">Coming soon</p>
          <ul className="mt-8 grid gap-3.5">
            {PRO.map((f) => (
              <li key={f} className="flex gap-3 opacity-90">
                <PiCheckBold className="mt-1 shrink-0 text-accent" aria-hidden /> {f}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <a href={`mailto:${CONTACT_EMAIL}?subject=Mero%20Link%20Pro%20waitlist`}
              className="inline-flex h-14 w-full items-center justify-center rounded-full border border-bg/25 font-semibold transition-colors hover:bg-bg/10">
              Join the waitlist
            </a>
          </div>
        </div>
      </section>

      <section className="shell mt-24 grid gap-10 lg:grid-cols-[1fr_1.6fr]" aria-labelledby="pfaq">
        <h2 id="pfaq" className="font-display text-4xl font-extrabold tracking-tight">Pricing questions</h2>
        <dl className="grid gap-8">
          {FAQ.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-display text-lg font-bold">{q}</dt>
              <dd className="mt-2 text-muted">{a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
