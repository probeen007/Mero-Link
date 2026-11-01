'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import clsx from 'clsx';
import { PiArrowRightBold } from 'react-icons/pi';

const SAMPLES = ['aarya', 'rohanbeats', 'mira.clay', 'kathmandueats', 'yourname'];

export default function HeroForm({ className, dark = false }) {
  const router = useRouter();
  const { status } = useSession();
  const [value, setValue] = useState('');
  const [hint, setHint] = useState(SAMPLES[0]);

  // Rotate the placeholder through sample names while the field is empty.
  useEffect(() => {
    if (value) return;
    let i = 0;
    const id = setInterval(() => setHint(SAMPLES[(i = (i + 1) % SAMPLES.length)]), 2200);
    return () => clearInterval(id);
  }, [value]);

  async function onSubmit(ev) {
    ev.preventDefault();
    const name = value.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 30);
    if (status === 'authenticated') {
      router.push(`/account${name ? `?desiredUsername=${encodeURIComponent(name)}` : ''}`);
      return;
    }
    try { if (name) localStorage.setItem('desiredUsername', name); } catch {}
    await signIn('google', { callbackUrl: '/account' });
  }

  return (
    <form onSubmit={onSubmit} className={clsx('w-full max-w-lg', className)}>
      <div className={clsx('flex flex-col gap-2 rounded-[22px] border-2 border-ink p-1.5 shadow-sticker sm:flex-row sm:items-center',
        dark ? 'bg-white text-on-sticker' : 'bg-surface')}>
        <label className="flex min-w-0 flex-1 items-center px-3.5">
          <span className="shrink-0 font-semibold opacity-60">merolink.me/</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/\s/g, ''))}
            placeholder={hint}
            aria-label="Pick your username"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={30}
            className="h-12 min-w-0 flex-1 bg-transparent font-semibold outline-none placeholder:opacity-40"
          />
        </label>
        <button type="submit" className={clsx('inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0',
          dark ? 'bg-[#111014] text-white' : 'bg-accent text-accent-ink')}>
          Claim your link <PiArrowRightBold aria-hidden />
        </button>
      </div>
    </form>
  );
}
