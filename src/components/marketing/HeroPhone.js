'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ProfileView from '@/components/profile/ProfileView';
import { DEMO_PROFILES } from '@/libs/demo';
import { THEMES } from '@/libs/themes';

// Real profile renders cycling through four sample creators and their themes.
export default function HeroPhone() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const demo = DEMO_PROFILES[i];

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % DEMO_PROFILES.length), 4200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative mx-auto w-[300px] sm:w-[320px]">
      <div className="relative h-[620px] overflow-hidden rounded-[48px] border-[10px] border-[#111014] bg-[#111014] ring-1 ring-line shadow-[0_40px_80px_-30px_rgb(17_16_20/0.5)] sm:h-[660px]">
        <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-[#111014]" aria-hidden />
        <AnimatePresence initial={false}>
          <motion.div
            key={demo.uri}
            className="absolute inset-0 overflow-hidden rounded-[38px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Own transform so the profile's fixed background stays inside the phone. */}
            <div className="absolute inset-0 overflow-y-auto no-scrollbar [transform:translateZ(0)]">
              <ProfileView page={{ ...demo.page, theme: demo.theme, bgMode: 'theme' }} user={demo.user} uri={demo.uri} preview />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -left-6 top-24 hidden rotate-[-6deg] sm:block" aria-hidden>
        <AnimatePresence mode="wait">
          <motion.span
            key={demo.theme}
            initial={{ opacity: 0, y: 10, rotate: -12 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            exit={{ opacity: 0, y: -10 }}
            className="inline-block rounded-full border-2 border-ink shadow-sticker bg-butter px-4 py-2 font-display text-sm font-bold text-on-sticker"
          >
            {THEMES[demo.theme].name} theme
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="absolute -right-4 border-2 border-ink shadow-sticker bottom-28 hidden rotate-[5deg] rounded-full bg-lime px-4 py-2 font-display text-sm font-bold text-on-sticker sm:inline-block" aria-hidden>
        merolink.me/{demo.uri}
      </span>
    </div>
  );
}
