'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import {
  PiLinkSimpleBold, PiPaintBrushBold, PiChartLineUpBold, PiGearSixBold, PiArrowSquareOutBold,
  PiCopyBold, PiDeviceMobileBold, PiXBold, PiCheckBold, PiWarningBold, PiCircleNotchBold,
} from 'react-icons/pi';
import { Logo } from '@/components/ui';
import ThemeToggle from '@/components/ThemeToggle';
import { useEditor } from './EditorProvider';
import PhonePreview from './PhonePreview';

const NAV = [
  { href: '/account', label: 'Links', icon: PiLinkSimpleBold },
  { href: '/appearance', label: 'Appearance', icon: PiPaintBrushBold },
  { href: '/analytics', label: 'Analytics', icon: PiChartLineUpBold },
  { href: '/settings', label: 'Settings', icon: PiGearSixBold },
];

function SaveStatus() {
  const { status, retry } = useEditor();
  if (status === 'error') {
    return (
      <button type="button" onClick={retry} className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400">
        <PiWarningBold aria-hidden /> Not saved. Retry
      </button>
    );
  }
  const busy = status === 'saving' || status === 'pending';
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted" aria-live="polite">
      {busy ? <PiCircleNotchBold className="animate-spin" aria-hidden /> : <PiCheckBold aria-hidden />}
      {busy ? 'Saving' : 'Saved'}
    </span>
  );
}

function UrlPill() {
  const { uri } = useEditor();
  const url = `merolink.me/${uri}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${url}`);
      toast.success('Link copied');
    } catch {
      toast.error('Could not copy');
    }
  };
  return (
    <div className="flex min-w-0 items-center gap-1 rounded-full border border-line bg-surface py-1 pl-3.5 pr-1">
      <a href={`/${uri}`} target="_blank" rel="noopener noreferrer" className="truncate text-sm font-medium hover:underline">{url}</a>
      <button type="button" onClick={copy} className="grid h-7 w-7 shrink-0 place-items-center rounded-full hover:bg-surface-2" aria-label="Copy profile link">
        <PiCopyBold aria-hidden />
      </button>
    </div>
  );
}

export default function Shell({ children }) {
  const path = usePathname();
  const [previewOpen, setPreviewOpen] = useState(false);
  const { uri } = useEditor();
  const showPreview = path !== '/analytics';

  return (
    <div className="min-h-[100dvh] bg-bg lg:grid lg:grid-cols-[232px_1fr]">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-[100dvh] flex-col border-r border-line bg-surface px-4 py-6 lg:flex">
        <Link href="/" className="px-2"><Logo /></Link>
        <nav className="mt-10 grid gap-1" aria-label="Dashboard">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = path === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'flex items-center gap-3 rounded-full px-3.5 py-2.5 text-[15px] font-medium transition-colors',
                  active ? 'bg-ink text-bg' : 'text-muted hover:bg-surface-2 hover:text-ink',
                )}
              >
                <Icon className="h-5 w-5" aria-hidden /> {label}
              </Link>
            );
          })}
        </nav>
        <a
          href={`/${uri}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-between rounded-2xl bg-lime px-4 py-3 text-sm font-semibold text-on-sticker"
        >
          View my page <PiArrowSquareOutBold aria-hidden />
        </a>
      </aside>

      <div className="min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <Link href="/" className="lg:hidden"><Logo compact /></Link>
            <UrlPill />
            <div className="ml-auto flex items-center gap-3"><SaveStatus /><ThemeToggle /></div>
          </div>
        </header>

        <div className={clsx('mx-auto px-4 pb-28 pt-6 sm:px-6 lg:pb-12', showPreview ? 'max-w-[1180px] xl:grid xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-10' : 'max-w-5xl')}>
          <main id="main" className="min-w-0">{children}</main>
          {showPreview && (
            <aside className="hidden xl:block" aria-label="Live preview">
              <div className="sticky top-24">
                <PhonePreview />
                <p className="mt-4 text-center text-sm text-muted">Live preview</p>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden" aria-label="Dashboard">
        <div className="grid grid-cols-4">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}
              className={clsx('flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium', path === href ? 'text-ink' : 'text-muted')}>
              <Icon className="h-5 w-5" aria-hidden /> {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile/tablet preview */}
      {showPreview && (
        <>
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="sticker fixed bottom-20 right-4 z-30 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-5 font-semibold text-accent-ink xl:hidden lg:bottom-6"
          >
            <PiDeviceMobileBold aria-hidden /> Preview
          </button>
          {previewOpen && (
            <div className="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm xl:hidden" role="dialog" aria-modal="true" aria-label="Preview">
              <button type="button" onClick={() => setPreviewOpen(false)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-surface text-ink" aria-label="Close preview">
                <PiXBold aria-hidden />
              </button>
              <PhonePreview />
            </div>
          )}
        </>
      )}
    </div>
  );
}
