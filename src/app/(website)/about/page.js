import JsonLd from '@/components/JsonLd';
import { Button } from '@/components/ui';
import Reveal from '@/components/marketing/Reveal';
import { breadcrumbLd } from '@/libs/structuredData';
import { pageMeta } from '@/libs/seo';

export const metadata = pageMeta({
  title: 'About',
  description: 'Mero means "mine" in Nepali. Mero Link is a link in bio page built in Kathmandu for creators, small shops and anyone with more than one thing to share.',
  path: '/about',
});

const BELIEFS = [
  { title: 'Your page should look like you', body: 'Not like everyone else on the same template. That is why every theme animates and every part of it can be restyled.', tone: 'bg-lime' },
  { title: 'The basics should be free', body: 'Unlimited links, analytics and videos are not premium features. They are the point.', tone: 'bg-sky' },
  { title: 'Fast beats fancy', body: 'Pages are rendered on the server and load quickly on mobile data, because most of your visitors are on a phone.', tone: 'bg-pink' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd('About', '/about')} />
      <section className="shell grid items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h1 className="font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
            Mero means mine.
          </h1>
          <div className="mt-8 grid max-w-xl gap-5 text-lg text-muted">
            <p>
              Mero Link started in Kathmandu with a simple annoyance: link in bio pages all looked the same, and the good parts were behind a paywall.
            </p>
            <p>
              So we built one that feels personal. Pick a theme with real character, tweak it until it is yours, and share one link for everything you make, sell or post.
            </p>
          </div>
        </div>
        <div className="grid aspect-square place-items-center rounded-[40px] border-2 border-ink bg-butter text-on-sticker shadow-sticker" aria-hidden>
          <div className="text-center">
            <p className="text-[clamp(5rem,14vw,9rem)] font-bold leading-none" style={{ fontFamily: 'var(--font-mukta)' }}>मेरो</p>
            <p className="mt-2 font-display text-2xl font-bold">mero, adj. mine</p>
          </div>
        </div>
      </section>

      <section className="shell py-16" aria-labelledby="beliefs-h">
        <h2 id="beliefs-h" className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">What we believe</h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className={`rounded-[28px] p-8 text-on-sticker sm:p-10 lg:row-span-2 ${BELIEFS[0].tone}`}>
            <h3 className="font-display text-3xl font-extrabold tracking-tight">{BELIEFS[0].title}</h3>
            <p className="mt-4 max-w-md text-lg">{BELIEFS[0].body}</p>
          </Reveal>
          {BELIEFS.slice(1).map((b, i) => (
            <Reveal key={b.title} delay={(i + 1) * 0.08} className={`rounded-[28px] p-7 text-on-sticker ${b.tone}`}>
              <h3 className="font-display text-xl font-extrabold">{b.title}</h3>
              <p className="mt-2">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[32px] border border-line bg-surface p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">Make yours in a minute</h2>
            <p className="mt-2 text-muted">Free, no card, no app.</p>
          </div>
          <Button href="/login" size="lg">Claim your link</Button>
        </div>
      </section>
    </>
  );
}
