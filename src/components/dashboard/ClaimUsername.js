'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PiCheckCircleFill, PiXCircleFill, PiCircleNotchBold, PiArrowRightBold } from 'react-icons/pi';
import grabUsername, { checkUsername } from '@/actions/grabUsername';
import { Button, Logo } from '@/components/ui';

export default function ClaimUsername({ name }) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [check, setCheck] = useState(null); // null | 'checking' | { available, message }
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const timer = useRef(null);

  // Prefill from the landing-page claim box.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('desiredUsername');
    let stored = null;
    try {
      stored = localStorage.getItem('desiredUsername');
      localStorage.removeItem('desiredUsername');
    } catch {}
    const initial = (fromUrl || stored || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 30);
    if (initial) onChange(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(next) {
    setValue(next);
    setError('');
    clearTimeout(timer.current);
    if (!next) return setCheck(null);
    setCheck('checking');
    timer.current = setTimeout(async () => setCheck(await checkUsername(next)), 350);
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setSubmitting(true);
    const res = await grabUsername(new FormData(ev.currentTarget));
    if (res.success) {
      router.replace('/appearance?welcome=1');
      router.refresh();
    } else {
      setError(res.message);
      setSubmitting(false);
    }
  }

  const ok = check && check !== 'checking' && check.available;
  const firstName = (name || '').split(' ')[0];

  return (
    <main className="grid min-h-[100dvh] lg:grid-cols-2">
      <section className="flex flex-col px-6 py-8 sm:px-12">
        <Logo />
        <div className="my-auto max-w-md py-12">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl text-balance">
            {firstName ? `Hey ${firstName}, pick your link` : 'Pick your link'}
          </h1>
          <p className="mt-3 text-muted">This is the address you&apos;ll put in every bio. You can share it anywhere.</p>

          <form onSubmit={onSubmit} className="mt-8">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <div className="mt-1.5 flex items-center rounded-2xl border-2 border-ink bg-surface pl-4 shadow-sticker focus-within:ring-4 focus-within:ring-accent/25">
              <span className="font-semibold text-muted">merolink.me/</span>
              <input
                id="username"
                name="username"
                value={value}
                onChange={(e) => onChange(e.target.value.replace(/\s/g, ''))}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                autoFocus
                maxLength={30}
                className="h-14 min-w-0 flex-1 bg-transparent pr-3 font-semibold outline-none"
                aria-describedby="username-status"
              />
              <span className="pr-4 text-xl" aria-hidden>
                {check === 'checking' && <PiCircleNotchBold className="animate-spin text-muted" />}
                {ok && <PiCheckCircleFill className="text-emerald-600" />}
                {check && check !== 'checking' && !check.available && <PiXCircleFill className="text-red-500" />}
              </span>
            </div>
            <p id="username-status" className="mt-2 min-h-5 text-sm" role="status">
              {error ? <span className="text-red-600 dark:text-red-400">{error}</span>
                : ok ? <span className="text-emerald-700 dark:text-emerald-400">merolink.me/{value} is yours to take.</span>
                : check && check !== 'checking' ? <span className="text-red-600 dark:text-red-400">{check.message}</span>
                : <span className="text-muted">Letters, numbers, dashes and underscores.</span>}
            </p>
            <Button type="submit" size="lg" className="mt-6 w-full" disabled={!ok || submitting}>
              {submitting ? 'Claiming' : 'Claim your link'} <PiArrowRightBold aria-hidden />
            </Button>
          </form>
        </div>
      </section>

      <section className="relative hidden overflow-hidden bg-butter lg:block" aria-hidden>
        <div className="absolute inset-0 grid place-items-center">
          <div className="rotate-[-4deg] rounded-[28px] border-2 border-ink bg-white px-8 py-6 text-on-sticker shadow-sticker">
            <p className="font-display text-4xl font-extrabold tracking-tight">merolink.me/</p>
            <p className="font-display text-4xl font-extrabold tracking-tight text-accent">{value || 'you'}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
