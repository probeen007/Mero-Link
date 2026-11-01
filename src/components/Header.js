'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { PiListBold, PiXBold } from 'react-icons/pi';
import { Button, Logo } from '@/components/ui';
import ThemeToggle from '@/components/ThemeToggle';

const NAV = [
  { href: '/themes', label: 'Themes' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/linktree-alternative', label: 'Why Mero Link' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const { status } = useSession();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const authed = status === 'authenticated';

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return () => { document.body.style.overflow = ''; };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.querySelector('#mobile-nav a')?.focus();
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    // No backdrop-filter while the menu is open: it would make the header the
    // containing block for the fixed menu panel.
    <header className={clsx('sticky top-0 z-40 border-b border-line/70', open ? 'bg-bg' : 'bg-bg/75 backdrop-blur-md')}>
      <div className="shell flex h-16 items-center gap-6">
        <Link href="/" aria-label="Mero Link home"><Logo /></Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}
              className={clsx('rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors hover:bg-ink/5', path === href ? 'text-ink' : 'text-muted')}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {authed ? (
            <Button href="/account" variant="ink">Dashboard</Button>
          ) : (
            <>
              <Button href="/login" variant="ghost">Log in</Button>
              <Button href="/login">Claim your link</Button>
            </>
          )}
        </div>

        <ThemeToggle className="ml-auto md:hidden" />
        <button type="button" onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-ink/5 md:hidden"
          aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <PiXBold className="h-6 w-6" /> : <PiListBold className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col gap-2 overflow-y-auto bg-bg px-4 pb-8 pt-4 md:hidden">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="rounded-2xl px-4 py-4 font-display text-2xl font-bold hover:bg-surface-2">{label}</Link>
          ))}
          <div className="mt-auto grid gap-3">
            {authed ? (
              <Button href="/account" variant="ink" size="lg">Dashboard</Button>
            ) : (
              <>
                <Button href="/login" size="lg">Claim your link</Button>
                <Button href="/login" variant="secondary" size="lg">Log in</Button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
