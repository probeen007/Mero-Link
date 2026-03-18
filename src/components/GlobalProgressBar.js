'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function GlobalProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(0);
  const intervalRef = useRef(null);
  const finishingRef = useRef(false);

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = () => {
    if (active || finishingRef.current) return;
    setActive(true);
    setWidth(10);
    stopInterval();

    intervalRef.current = setInterval(() => {
      setWidth((prev) => {
        if (prev >= 90) return prev;
        const step = prev < 40 ? 10 : prev < 70 ? 5 : 2;
        return Math.min(90, prev + step);
      });
    }, 140);
  };

  const done = () => {
    if (!active) return;
    finishingRef.current = true;
    stopInterval();
    setWidth(100);

    setTimeout(() => {
      setActive(false);
      setWidth(0);
      finishingRef.current = false;
    }, 220);
  };

  useEffect(() => {
    done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest('a[href]');
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      const target = anchor.getAttribute('target');
      const download = anchor.hasAttribute('download');

      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (target === '_blank' || download) return;

      const isInternal = href.startsWith('/') || href.startsWith(window.location.origin);
      if (!isInternal) return;

      start();
    };

    const handleSubmit = (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      start();
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('submit', handleSubmit, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('submit', handleSubmit, true);
    };
  }, [active]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 h-[3px] z-[10000] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-[width,opacity] duration-200 ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{ width: `${width}%` }}
    />
  );
}
