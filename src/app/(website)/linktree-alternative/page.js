import { PiPaletteBold, PiLightningBold, PiPlayCircleBold, PiChartBarBold } from 'react-icons/pi';
import JsonLd from '@/components/JsonLd';
import HeroForm from '@/components/forms/HeroForm';
import { Button } from '@/components/ui';
import { breadcrumbLd, faqLd } from '@/libs/structuredData';

export const metadata = {
  title: 'Free Linktree alternative with animated themes',
  description: 'Looking for a Linktree alternative? Mero Link gives you a free link in bio with 16 animated themes, live editing, video embeds and per-link analytics.',
  alternates: { canonical: '/linktree-alternative' },
};

const REASONS = [
  { icon: PiPaletteBold, title: 'A page with personality', body: 'Sixteen animated themes, from falling sakura petals to a synthwave grid, and a builder for colors, fonts, buttons and backgrounds.', tone: 'bg-lime' },
  { icon: PiLightningBold, title: 'Edit live, never hit save', body: 'Your real page sits beside the editor and updates as you type. Changes save on their own.', tone: 'bg-sky' },
  { icon: PiPlayCircleBold, title: 'Videos that stay on your page', body: 'Embed YouTube, Vimeo, Spotify and TikTok. Visitors play them without leaving.', tone: 'bg-butter' },
  { icon: PiChartBarBold, title: 'Know what works', body: 'See views, clicks and the click rate of each link over the last 30 days, free.', tone: 'bg-pink' },
];

const MOVE = [
  ['Claim your name', 'Sign in with Google and pick merolink.me/yourname.'],
  ['Paste your links', 'Copy each link from your current page into the editor. Drag to reorder.'],
  ['Pick a theme', 'Choose one of 16 and tweak it until it feels right.'],
  ['Swap your bio link', 'Replace the old link in your Instagram, TikTok and YouTube bios.'],
];

const FAQ = [
  { q: 'Is Mero Link free like Linktree?', a: 'Yes. Unlimited links, all themes, videos and analytics are free on Mero Link.' },
  { q: 'Can I move my links from Linktree?', a: 'Yes. Paste each link into the Mero Link editor. Most pages take a few minutes to rebuild.' },
  { q: 'Will my old link keep working?', a: 'Your old page is separate. Update the link in your social bios once your Mero Link page is ready.' },
];

export default function LinktreeAlternative() {
  return (
    <>
      <JsonLd data={[breadcrumbLd('Linktree alternative', '/linktree-alternative'), faqLd(FAQ)]} />
      <section className="shell pb-16 pt-14 sm:pt-20">
        <h1 className="max-w-4xl font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
          The Linktree alternative that looks like you
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Same idea, one link for your bio. More personality, more built in, and still free.
        </p>
        <HeroForm className="mt-8" />
      </section>

      <section className="shell grid gap-4 py-12 sm:grid-cols-2" aria-label="Reasons to switch">
        {REASONS.map(({ icon: Icon, title, body, tone }) => (
          <div key={title} className={`rounded-[28px] p-7 text-on-sticker sm:p-9 ${tone}`}>
            <Icon className="h-8 w-8" aria-hidden />
            <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight">{title}</h2>
            <p className="mt-2 max-w-md">{body}</p>
          </div>
        ))}
      </section>

      <section className="shell grid gap-10 py-20 lg:grid-cols-[1fr_1.3fr]" aria-labelledby="move-h">
        <h2 id="move-h" className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Switching takes about five minutes</h2>
        <ol className="grid gap-6">
          {MOVE.map(([title, body], i) => (
            <li key={title} className="flex gap-5 border-b border-line pb-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink font-mono font-semibold">{i + 1}</span>
              <div>
                <h3 className="font-display text-xl font-bold">{title}</h3>
                <p className="mt-1 text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell grid gap-10 py-12 lg:grid-cols-[1fr_1.6fr]" aria-labelledby="lfaq">
        <h2 id="lfaq" className="font-display text-4xl font-extrabold tracking-tight">Good to know</h2>
        <dl className="grid gap-8">
          {FAQ.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-display text-lg font-bold">{q}</dt>
              <dd className="mt-2 text-muted">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="shell mt-12 text-center">
        <Button href="/themes" variant="secondary" size="lg">Browse all 16 themes</Button>
      </section>
    </>
  );
}
