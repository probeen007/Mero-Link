import Link from 'next/link';
import QRCode from 'qrcode';
import {
  PiArrowRightBold, PiAsteriskBold, PiCheckBold, PiMinusBold, PiAtBold, PiPlusCircleBold, PiShareFatBold,
} from 'react-icons/pi';
import { SiYoutube, SiSpotify, SiTiktok, SiVimeo } from 'react-icons/si';
import HeroForm from '@/components/forms/HeroForm';
import HeroPhone from '@/components/marketing/HeroPhone';
import Reveal from '@/components/marketing/Reveal';
import ThemeThumb from '@/components/profile/ThemeThumb';
import JsonLd from '@/components/JsonLd';
import { Button } from '@/components/ui';
import { THEMES, THEME_KEYS } from '@/libs/themes';
import { FONT_CHOICES } from '@/libs/fontChoices';
import { demoFor } from '@/libs/demo';
import { HOME_FAQ } from '@/libs/faq';
import { faqLd, softwareLd } from '@/libs/structuredData';
import { pageMeta } from '@/libs/seo';

export const metadata = pageMeta({
  title: 'Mero Link: Free link in bio with animated themes',
  description: 'Put your links, videos and socials on one page that looks like you. 16 animated themes, live editor, QR codes and analytics. Free.',
  path: '/',
  absolute: true,
});

const STEPS = [
  { icon: PiAtBold, tone: 'bg-accent', title: 'Claim your name', body: 'Sign in with Google and grab merolink.me/yourname before someone else does.' },
  { icon: PiPlusCircleBold, tone: 'bg-sky', title: 'Add what matters', body: 'Links, socials, videos and section headers. Pick a theme and watch it update live.' },
  { icon: PiShareFatBold, tone: 'bg-lime', title: 'Share it everywhere', body: 'Drop it in your Instagram and TikTok bio, print the QR code, post the share card.' },
];

const COMPARE = [
  ['Looks', 'A handful of flat templates', '16 animated themes, plus your own colors, fonts and buttons'],
  ['Editing', 'Edit, save, refresh, check', 'Live preview beside the editor, saved as you type'],
  ['Media', 'Links out to other apps', 'Videos and music that play on your page'],
  ['Insights', 'Basic totals', 'Views, clicks and click rate for every link'],
  ['Sharing', 'A plain URL', 'QR code and an auto-made share card'],
];

export default async function Home() {
  const qr = await QRCode.toString('https://merolink.me', { type: 'svg', margin: 0, color: { dark: '#111014', light: '#0000' } });
  const aarya = demoFor('sticker', 0);
  const himalaya = demoFor('himalaya', 2);

  return (
    <>
      <JsonLd data={[softwareLd, faqLd(HOME_FAQ)]} />

      {/* Hero */}
      <section className="shell grid items-center gap-12 pb-20 pt-10 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:pb-28 lg:pt-20">
        <div className="animate-fade-up">
          <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
            One link.<br />
            <span className="underline decoration-accent decoration-[0.12em] underline-offset-[0.14em]">All of you.</span>
          </h1>
          <p className="mt-7 max-w-md text-lg text-muted">
            Put your links, videos and socials on one page that actually looks like you. Free, and live in a minute.
          </p>
          <HeroForm className="mt-8" />
          <Link href="/themes" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:underline">
            See all 16 themes <PiArrowRightBold aria-hidden />
          </Link>
        </div>
        <div className="animate-fade-up [animation-delay:150ms]">
          <HeroPhone />
        </div>
      </section>

      {/* Theme marquee */}
      <section aria-hidden className="group overflow-hidden border-y-2 border-ink bg-lime py-5 text-on-sticker">
        <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-10">
              {THEME_KEYS.map((k) => (
                <span key={k} className="flex items-center gap-10 whitespace-nowrap text-3xl" style={{ fontFamily: FONT_CHOICES[THEMES[k].display].stack }}>
                  {THEMES[k].name}
                  <PiAsteriskBold className="h-5 w-5 text-[#C43218]" aria-hidden />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Features bento */}
      <section className="shell py-24 lg:py-32" aria-labelledby="features-h">
        <Reveal>
          <h2 id="features-h" className="max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">More than a list of links</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-4 md:grid-rows-[auto_auto_auto]">
          <Reveal className="relative overflow-hidden rounded-[28px] bg-lime p-7 text-on-sticker md:col-span-2 md:row-span-2 sm:p-9">
            <h3 className="font-display text-3xl font-extrabold tracking-tight">Edit it and watch it change</h3>
            <p className="mt-3 max-w-sm">Your page updates live beside the editor. Everything saves as you type, so there&apos;s no button to forget.</p>
            <div className="mt-8 flex justify-center">
              <div className="rotate-[-3deg] overflow-hidden rounded-[26px] border-[6px] border-ink shadow-sticker">
                <ThemeThumb {...aarya} scale={0.62} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="rounded-[28px] bg-sky p-7 text-on-sticker md:col-span-2">
            <div className="flex gap-3 text-3xl" aria-hidden><SiYoutube /><SiSpotify /><SiTiktok /><SiVimeo /></div>
            <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight">Videos and music play right there</h3>
            <p className="mt-2 max-w-md">Players load only when someone taps, so your page stays fast.</p>
          </Reveal>

          <Reveal delay={0.1} className="rounded-[28px] border border-line bg-surface p-7">
            <p className="font-mono text-5xl font-semibold tracking-tight">8.4%</p>
            <p className="mt-1 text-xs text-muted">Example click rate</p>
            <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight">See what people tap</h3>
            <p className="mt-2 text-sm text-muted">Views, clicks and click rate for every link.</p>
          </Reveal>

          <Reveal delay={0.15} className="rounded-[28px] bg-butter p-7 text-on-sticker">
            <div className="h-20 w-20" aria-label="QR code for merolink.me" role="img" dangerouslySetInnerHTML={{ __html: qr }} />
            <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight">A QR code for every page</h3>
            <p className="mt-2 text-sm">For flyers, stalls, menus and business cards.</p>
          </Reveal>

          <Reveal delay={0.05} className="grid items-center gap-8 overflow-hidden rounded-[28px] bg-[#0B1A36] p-7 text-white sm:grid-cols-[1fr_auto] md:col-span-4 sm:p-9">
            <div>
              <h3 className="font-display text-3xl font-extrabold tracking-tight">Made in Nepal, ready for anywhere</h3>
              <p className="mt-3 max-w-lg text-white/75">
                Light pages that open quickly on mobile data, Devanagari-friendly fonts, and a Himalaya theme with prayer flags that actually flutter.
              </p>
            </div>
            <div className="mx-auto -mb-16 overflow-hidden rounded-t-[26px] border-[6px] border-b-0 border-white/90 sm:mx-0">
              <ThemeThumb {...himalaya} scale={0.5} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Theme strip */}
      <section className="bg-tint-pink py-20" aria-labelledby="themes-h">
        <div className="shell flex flex-wrap items-end justify-between gap-4">
          <Reveal><h2 id="themes-h" className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Pick a vibe. Swap it anytime.</h2></Reveal>
          <Button href="/themes" variant="secondary">Browse themes <PiArrowRightBold aria-hidden /></Button>
        </div>
        <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:px-[max(1.5rem,calc((100vw-80rem)/2+2rem))]">
          {THEME_KEYS.map((key, i) => (
            <li key={key} className="shrink-0 snap-start">
              <Link href={`/themes#${key}`} className="group block">
                <div className="overflow-hidden rounded-[22px] border-2 border-line transition group-hover:-translate-y-1 group-hover:border-ink">
                  <ThemeThumb {...demoFor(key, i)} scale={0.46} />
                </div>
                <p className="mt-3 font-display font-bold">{THEMES[key].name}</p>
                <p className="text-sm text-muted">{THEMES[key].vibe}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="shell grid gap-12 py-24 lg:grid-cols-[1fr_1.2fr] lg:py-32" aria-labelledby="how-h">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="how-h" className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Live in three moves</h2>
          <p className="mt-4 max-w-sm text-muted">No design skills and no app needed. Just a browser.</p>
        </div>
        <ol className="relative grid gap-12 border-l-2 border-dashed border-line pl-10">
          {STEPS.map(({ icon: Icon, tone, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="relative">
              <span className={`absolute -left-[62px] grid h-11 w-11 place-items-center rounded-full border-2 border-ink text-on-sticker ${tone}`}>
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display text-2xl font-bold">{title}</h3>
              <p className="mt-2 max-w-md text-muted">{body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Comparison */}
      <section className="shell py-24" aria-labelledby="compare-h">
        <Reveal>
          <h2 id="compare-h" className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Why switch</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-[28px] border border-line p-7">
            <h3 className="font-display text-xl font-bold text-muted">Typical link in bio</h3>
            <ul className="mt-6 grid gap-5">
              {COMPARE.map(([k, them]) => (
                <li key={k} className="flex gap-3 text-muted">
                  <PiMinusBold className="mt-1 shrink-0" aria-hidden />
                  <span><span className="font-semibold">{k}:</span> {them}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[28px] border-2 border-ink bg-sky p-7 text-on-sticker shadow-sticker">
            <h3 className="font-display text-xl font-bold">Mero Link</h3>
            <ul className="mt-6 grid gap-5">
              {COMPARE.map(([k, , us]) => (
                <li key={k} className="flex gap-3">
                  <PiCheckBold className="mt-1 shrink-0" aria-hidden />
                  <span><span className="font-semibold">{k}:</span> {us}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="shell grid gap-10 py-24 lg:grid-cols-[1fr_1.6fr]" aria-labelledby="faq-h">
        <h2 id="faq-h" className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Questions</h2>
        <div className="divide-y divide-line border-y border-line">
          {HOME_FAQ.map(({ q, a }) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
                {q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 max-w-[60ch] text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="shell">
        <Reveal className="relative overflow-hidden rounded-[36px] border-2 border-ink bg-accent px-6 py-16 text-center text-on-sticker shadow-sticker sm:px-12 sm:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-none tracking-tight">Your link is waiting</h2>
          <p className="mx-auto mt-4 max-w-md text-lg">Grab your name now. You can make it pretty later.</p>
          <div className="mt-9 flex justify-center"><HeroForm dark /></div>
        </Reveal>
      </section>
    </>
  );
}
