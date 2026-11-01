'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { PiSunBold, PiMoonStarsBold } from 'react-icons/pi';

const COLORS = { light: '#FAFAF8', dark: '#111014' };

function current() {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle({ className }) {
  const [theme, setTheme] = useState(null);
  useEffect(() => setTheme(current()), []);

  const toggle = () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', COLORS[next]));
    try { localStorage.setItem('theme', next); } catch {}
    setTheme(next);
  };

  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}
      className={clsx('grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition hover:border-ink/40', className)}
    >
      {/* Icon renders after mount; the server can't know the stored choice. */}
      {theme && (dark ? <PiSunBold className="h-5 w-5" aria-hidden /> : <PiMoonStarsBold className="h-5 w-5" aria-hidden />)}
    </button>
  );
}
