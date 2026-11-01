import ThemeThumb from '@/components/profile/ThemeThumb';
import JsonLd from '@/components/JsonLd';
import { Button } from '@/components/ui';
import { THEMES, THEME_KEYS, BUTTON_STYLES } from '@/libs/themes';
import { FONT_CHOICES } from '@/libs/fontChoices';
import { demoFor } from '@/libs/demo';
import { breadcrumbLd } from '@/libs/structuredData';
import { pageMeta } from '@/libs/seo';

export const metadata = pageMeta({
  title: '16 free animated link in bio themes',
  description: 'Browse every Mero Link theme: Sticker, Synthwave, Himalaya, Terminal, Sakura and more. Each one animates, and you can change colors, fonts and buttons.',
  path: '/themes',
});

export default function ThemesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd('Themes', '/themes')} />
      <section className="shell pb-12 pt-14 sm:pt-20">
        <h1 className="max-w-3xl font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
          Sixteen themes. None of them boring.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Every card below is a real page, rendered live. Hover to see it move, then make it yours with your own colors, fonts and buttons.
        </p>
      </section>

      <section className="shell" aria-label="All themes">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-6 gap-y-14">
          {THEME_KEYS.map((key, i) => {
            const t = THEMES[key];
            return (
              <li key={key} id={key} className="scroll-mt-24">
                <div className="flex justify-center rounded-[28px] bg-surface-2 p-5">
                  <div className="overflow-hidden rounded-[24px] border-[6px] border-ink shadow-lift">
                    <ThemeThumb {...demoFor(key, i)} scale={0.56} />
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-bold">{t.name}</h2>
                    <p className="text-muted">{t.vibe}</p>
                    <p className="mt-2 text-sm text-muted">
                      <span style={{ fontFamily: FONT_CHOICES[t.display].stack }}>{FONT_CHOICES[t.display].label}</span>
                      {' with '}{BUTTON_STYLES[t.button].toLowerCase()} buttons
                    </p>
                  </div>
                  <Button href="/login" variant="secondary" size="sm" className="shrink-0">Use it</Button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="shell mt-24">
        <div className="rounded-[36px] bg-lime px-6 py-14 text-center text-on-sticker sm:px-12">
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Found your vibe?</h2>
          <p className="mx-auto mt-3 max-w-md">Claim your name, pick a theme, and switch whenever you like. Your links stay put.</p>
          <Button href="/login" size="lg" className="mt-8">Claim your link</Button>
        </div>
      </section>
    </>
  );
}
