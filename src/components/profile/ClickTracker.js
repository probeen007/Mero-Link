'use client';
import { useEffect } from 'react';

// One delegated listener for every tracked link on a public profile.
export default function ClickTracker({ uri }) {
  useEffect(() => {
    const onClick = (ev) => {
      const a = ev.target.closest?.('a[data-track]');
      if (!a) return;
      const url = btoa(unescape(encodeURIComponent(a.href)));
      navigator.sendBeacon?.(`/api/click?url=${encodeURIComponent(url)}&page=${encodeURIComponent(uri)}`);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [uri]);
  return null;
}
