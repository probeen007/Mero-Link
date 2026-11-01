'use client';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { PiCopyBold, PiDownloadSimpleBold, PiShareNetworkBold, PiSealCheckFill, PiSignOutBold, PiEnvelopeSimpleBold } from 'react-icons/pi';
import { Button, Card, Field } from '@/components/ui';
import { VERIFY_EMAIL } from '@/libs/site';
import { useEditor } from './EditorProvider';

function Counter({ value, max }) {
  return <span className={value.length > max * 0.9 ? 'text-accent-text' : ''}>{value.length}/{max}</span>;
}

function ShareCard() {
  const { uri } = useEditor();
  const url = `https://merolink.me/${uri}`;
  const [qr, setQr] = useState('');

  useEffect(() => {
    import('qrcode').then(({ default: QR }) =>
      QR.toDataURL(url, { width: 720, margin: 2, color: { dark: '#111014', light: '#FFFFFF' } }).then(setQr),
    ).catch(() => {});
  }, [url]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(url); toast.success('Link copied'); } catch { toast.error('Could not copy'); }
  };
  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'My Mero Link', url }); } catch {}
    } else copy();
  };

  return (
    <Card className="p-5 sm:p-6">
      <h2 className="font-display text-xl font-bold">Share your page</h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-[160px_1fr] sm:items-center">
        <div className="mx-auto grid h-40 w-40 place-items-center overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-sticker">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {qr ? <img src={qr} alt={`QR code for ${url}`} className="h-full w-full" /> : <span className="h-full w-full animate-pulse bg-surface-2" />}
        </div>
        <div className="grid gap-3">
          <p className="break-all font-mono text-sm">{url}</p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={share}><PiShareNetworkBold aria-hidden /> Share</Button>
            <Button size="sm" variant="secondary" onClick={copy}><PiCopyBold aria-hidden /> Copy link</Button>
            {qr && <Button size="sm" variant="secondary" href={qr} download={`merolink-${uri}-qr.png`}><PiDownloadSimpleBold aria-hidden /> QR code</Button>}
            <Button size="sm" variant="secondary" href={`/api/card/${uri}`} download={`merolink-${uri}-card.png`} target="_blank"><PiDownloadSimpleBold aria-hidden /> Share card</Button>
          </div>
          <p className="text-sm text-muted">The share card is the preview people see when your link is posted on WhatsApp, X or Facebook.</p>
        </div>
      </div>
    </Card>
  );
}

export default function SettingsEditor() {
  const { draft, update, user } = useEditor();

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted">Your name, photo and bio as visitors see them.</p>
      </div>

      <Card className="grid gap-5 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={draft.avatar || '/icon-192x192.png'} alt="" className="h-20 w-20 shrink-0 rounded-full border border-line object-cover" />
          <Field label="Profile photo URL" htmlFor="avatar" hint="Paste a direct image link. Your Google photo is used by default." className="flex-1">
            <input id="avatar" className="field" value={draft.avatar} onChange={(e) => update({ avatar: e.target.value.trim() })} inputMode="url" placeholder="https://..." />
          </Field>
        </div>
        <Field label="Display name" htmlFor="displayName">
          <input id="displayName" className="field" value={draft.displayName} maxLength={60} onChange={(e) => update({ displayName: e.target.value })} placeholder={user?.name || 'Your name'} />
        </Field>
        <Field label="Location" htmlFor="location" hint="Optional. Shown under your name.">
          <input id="location" className="field" value={draft.location} maxLength={60} onChange={(e) => update({ location: e.target.value })} placeholder="Kathmandu, Nepal" />
        </Field>
        <Field label={<span className="flex justify-between">Bio <Counter value={draft.bio} max={300} /></span>} htmlFor="bio">
          <textarea id="bio" className="field min-h-28 resize-y" value={draft.bio} maxLength={300} onChange={(e) => update({ bio: e.target.value })} placeholder="What you do, in a sentence or two." />
        </Field>
      </Card>

      <ShareCard />

      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky text-on-sticker"><PiSealCheckFill className="h-6 w-6" aria-hidden /></span>
        <div className="flex-1">
          <h2 className="font-display text-lg font-bold">{user?.isVerified ? 'You are verified' : 'Get the verified badge'}</h2>
          <p className="text-sm text-muted">
            {user?.isVerified ? 'The badge shows next to your name on your page.' : 'Creators, brands and public figures can request a badge next to their name.'}
          </p>
        </div>
        {!user?.isVerified && (
          <Button variant="secondary" href={`mailto:${VERIFY_EMAIL}?subject=Verification%20request`}><PiEnvelopeSimpleBold aria-hidden /> Request badge</Button>
        )}
      </Card>

      <Card className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
        <div>
          <h2 className="font-semibold">Signed in as</h2>
          <p className="text-sm text-muted">{user?.email}</p>
        </div>
        <Button variant="secondary" onClick={() => signOut({ callbackUrl: '/' })}><PiSignOutBold aria-hidden /> Sign out</Button>
      </Card>
    </div>
  );
}
