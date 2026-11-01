'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SiGoogle } from 'react-icons/si';
import { PiCircleNotchBold } from 'react-icons/pi';

export default function LoginWithGoogle() {
  const [pending, setPending] = useState(false);
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => { setPending(true); signIn('google', { callbackUrl: '/account' }).catch(() => setPending(false)); }}
      className="sticker inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-surface font-semibold text-ink disabled:opacity-70"
    >
      {pending ? <PiCircleNotchBold className="h-5 w-5 animate-spin" aria-hidden /> : <SiGoogle className="h-5 w-5" aria-hidden />}
      {pending ? 'Opening Google' : 'Continue with Google'}
    </button>
  );
}
